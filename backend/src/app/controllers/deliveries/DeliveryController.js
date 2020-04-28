import { Op } from 'sequelize';

import File from '../../models/File';
import Delivery from '../../models/Delivery';
import Recipient from '../../models/Recipient';
import Deliveryman from '../../models/Deliveryman';

import CreateDeliveryService from '../../services/CreateDeliveryService';
import UpdateDeliveryService from '../../services/UpdateDeliveryService';

import Cache from '../../../lib/Cache';

class DeliveryController {
    async index(request, response) {
        const { deliveryQuery = '', page = 1 } = request.query;

        const cacheKey = `deliveries:${page}`;

        const cached = await Cache.get(cacheKey);

        if (deliveryQuery === '' && cached) {
            return response.json(cached);
        }

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
                        },
                    ],
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

        await Cache.set(cacheKey, deliveries);

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
        const { product, recipient_id, deliveryman_id } = request.body;

        const delivery = await CreateDeliveryService.run({
            product,
            recipient_id,
            deliveryman_id,
        });

        return response.json(delivery);
    }

    async update(request, response) {
        const delivery_id = request.params.id;

        const {
            product,
            recipient_id,
            deliveryman_id,
            signature_id,
        } = request.body;

        const delivery = await UpdateDeliveryService.run({
            delivery_id,
            product,
            recipient_id,
            deliveryman_id,
            signature_id,
        });

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
