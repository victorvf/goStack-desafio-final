import { Op } from 'sequelize';
import {
    isBefore,
    isAfter,
    parseISO,
    startOfHour,
    startOfDay,
    endOfDay,
} from 'date-fns';

import Delivery from '../../models/Delivery';
import Deliveryman from '../../models/Deliveryman';
import Recipient from '../../models/Recipient';

class OpenDeliveryController {
    async index(request, response) {
        const deliveryman = await Deliveryman.findByPk(request.params.id);

        if (!deliveryman) {
            return response.status(404).json({
                error: 'deliveryman not found',
            });
        }

        const deliveries = await Delivery.findAll({
            where: {
                end_date: null,
                canceled_at: null,
                deliveryman_id: deliveryman.id,
            },
            order: ['id'],
            attributes: [
                'id',
                'product',
                'canceled_at',
                'start_date',
                'end_date',
            ],
            include: [
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

        if (!deliveries) {
            return response.status(404).json({
                error: "you haven't deliveries for delivery",
            });
        }

        return response.json(deliveries);
    }

    async update(request, response) {
        const delivery = await Delivery.findOne({
            where: {
                id: request.body.delivery,
                deliveryman_id: request.params.id,
                start_date: null,
            },
        });

        if (!delivery) {
            return response.status(400).json({
                error: 'delivery is not available',
            });
        }

        const date = parseISO(request.body.start_date);

        const requestDate = new Date();

        if (
            isBefore(date, startOfHour(requestDate.setHours(8))) ||
            isAfter(date, startOfHour(requestDate.setHours(18)))
        ) {
            return response.status(400).json({
                error: 'date is not permitted',
            });
        }

        const deliveries = await Delivery.findAll({
            where: {
                deliveryman_id: request.params.id,
                start_date: {
                    [Op.between]: [startOfDay(date), endOfDay(date)],
                },
            },
        });

        if (deliveries.length >= 5) {
            return response.status(400).json({
                error: 'you can only make 5 deliveries',
            });
        }

        await delivery.update({
            start_date: date,
        });

        await delivery.reload({
            attributes: [
                'id',
                'product',
                'canceled_at',
                'start_date',
                'end_date',
            ],
        });

        return response.json(delivery);
    }
}

export default new OpenDeliveryController();
