import * as Yup from 'yup';
import { Op } from 'sequelize';

import File from '../../models/File';
import Delivery from '../../models/Delivery';
import Recipient from '../../models/Recipient';
import Deliveryman from '../../models/Deliveryman';
import Notification from '../../schemas/Notification';

import Queue from '../../../lib/Queue';
import DeliveryAvailableMail from '../../jobs/DeliveryAvailableMail';

class DeliveryController {
    async index(request, response) {
        const { deliveryQuery = '', page = 1 } = request.query;

        const deliveries = await Delivery.findAll({
            where: {
                product: { [Op.iLike]: `%${deliveryQuery}%` },
            },
            attributes: [
                'id',
                'product',
                'end_date',
                'canceled_at',
                'start_date',
            ],
            limit: 4,
            offset: (page - 1) * 4,
            order: ['id'],
            include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'name', 'path', 'url'],
                        }
                    ]
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'id',
                        'name',
                        'cep',
                        'state',
                        'city',
                        'street',
                        'number',
                        'complement',
                    ],
                },
                {
                    model: File,
                    as: 'signature',
                    attributes: ['id', 'name', 'path', 'url'],
                },
            ],
        });

        return response.json(deliveries);
    }

    async show(request, response) {
        const { delivery_id } = request.query;

        const delivery = await Delivery.findByPk(delivery_id, {
            include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['id', 'name'],
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'id',
                        'name',
                        'cep',
                        'city',
                        'state',
                        'street',
                        'number',
                    ],
                },
            ],
        });

        if (!delivery) {
            return response.status(404).json({
                error: 'Delivery not found',
            });
        }

        return response.json(delivery);
    }

    async store(request, response) {
        const schema = Yup.object().shape({
            product: Yup.string().required(),
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
        });

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({
                error: 'validation fails',
            });
        }

        const deliveryExists = await Delivery.findOne({
            where: {
                product: request.body.product,
                recipient_id: request.body.recipient_id,
                deliveryman_id: request.body.deliveryman_id,
                canceled_at: null,
            },
        });

        if (deliveryExists) {
            return response.status(400).json({
                error: 'order already exists',
            });
        }

        const recipient = await Recipient.findByPk(request.body.recipient_id);

        if (!recipient) {
            return response.status(404).json({
                error: 'recipient not found',
            });
        }

        const deliveryman = await Deliveryman.findByPk(
            request.body.deliveryman_id
        );

        if (!deliveryman) {
            return response.status(404).json({
                error: 'deliveryman not found',
            });
        }

        const delivery = await Delivery.create(request.body);

        await delivery.reload({
            attributes: ['id', 'product'],
            include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['name', 'email'],
                },
            ],
        });

        await Notification.create({
            content: `New delivery available - Product: ${delivery.product}, Code: ${delivery.id}`,
            deliveryman: deliveryman.id,
        });

        await Queue.add(DeliveryAvailableMail.key, {
            delivery,
        });

        return response.json(delivery);
    }

    async update(request, response) {
        const schema = Yup.object().shape({
            product: Yup.string(),
            recipient_id: Yup.number(),
            deliveryman_id: Yup.number(),
        });

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({
                error: 'validation fails',
            });
        }

        const delivery = await Delivery.findByPk(request.params.id);

        if (!delivery) {
            return response.status(404).json({
                error: 'delivery not found',
            });
        }

        if (request.body.recipient_id) {
            const recipient = await Deliveryman.findByPk(
                request.body.recipient_id
            );

            if (!recipient) {
                return response.status(404).json({
                    error: 'recipient not found',
                });
            }
        }

        if (request.body.deliveryman_id) {
            const deliveryman = await Deliveryman.findByPk(
                request.body.deliveryman_id
            );

            if (!deliveryman) {
                return response.status(404).json({
                    error: 'deliveryman not found',
                });
            }
        }

        await delivery.update(request.body);

        await delivery.reload({
            attributes: ['id', 'product'],
            include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });

        if (request.body.deliveryman_id) {
            await Notification.create({
                content: `New delivery available - Product: ${delivery.product}, Code: ${delivery.id}`,
                deliveryman: delivery.deliveryman.id,
            });

            await Queue.add(DeliveryAvailableMail.key, {
                delivery,
            });
        } else {
            await Notification.create({
                content: `Check delivery updated - Code: ${delivery.id}`,
                deliveryman: delivery.deliveryman.id,
            });
        }

        return response.json(delivery);
    }

    async delete(request, response) {
        const delivery = await Delivery.findByPk(request.params.id);

        if (delivery.start_date) {
            return response.status(400).json({
                error: 'delivery has already been withdrawn',
            });
        }

        await delivery.destroy();

        return response.json({
            message: 'delivery successfully deleted',
        });
    }
}

export default new DeliveryController();
