import { parseISO, isBefore, isAfter, startOfHour } from 'date-fns';

import Delivery from '../../models/Delivery';
import File from '../../models/File';

class CloseDeliveryController {
    async update(request, response) {
        const delivery = await Delivery.findOne({
            where: {
                id: request.params.id,
                end_date: null,
                canceled_at: null,
            },
        });

        if (!delivery) {
            return response.status(404).json({
                error: 'delivery not found',
            });
        }

        const file = await File.findByPk(request.body.signature_id);

        if (!file) {
            return response.status(404).json({
                error: 'file does not available',
            });
        }

        const date = parseISO(request.body.end_date);

        const requestDate = new Date();

        if (
            isBefore(date, startOfHour(requestDate.setHours(8))) ||
            isAfter(date, startOfHour(requestDate.setHours(18)))
        ) {
            return response.status(400).json({
                error: 'date is not permitted',
            });
        }

        await delivery.update({
            end_date: request.body.end_date,
            signature_id: request.body.signature_id,
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

export default new CloseDeliveryController();
