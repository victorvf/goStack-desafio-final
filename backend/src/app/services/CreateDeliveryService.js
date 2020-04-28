import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

import Notification from '../schemas/Notification';

import Cache from '../../lib/Cache';
import Queue from '../../lib/Queue';
import DeliveryAvailableMail from '../jobs/DeliveryAvailableMail';

class CreateDeliveryService {
    async run({ product, recipient_id, deliveryman_id }) {
        const deliveryExists = await Delivery.findOne({
            where: {
                product,
                recipient_id,
                deliveryman_id,
                canceled_at: null,
            },
        });

        if (deliveryExists) {
            throw new Error('order already exists');
        }

        const recipient = await Recipient.findByPk(recipient_id);

        if (!recipient) {
            throw new Error('recipient not found');
        }

        const deliveryman = await Deliveryman.findByPk(deliveryman_id);

        if (!deliveryman) {
            throw new Error('deliveryman not found');
        }

        const delivery = await Delivery.create({
            product,
            recipient_id,
            deliveryman_id,
        });

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

        await Cache.invalidatePrefix('deliveries');

        return delivery;
    }
}

export default new CreateDeliveryService();
