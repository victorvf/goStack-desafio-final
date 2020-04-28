import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Notification from '../schemas/Notification';

import Cache from '../../lib/Cache';
import Queue from '../../lib/Queue';
import DeliveryAvailableMail from '../jobs/DeliveryAvailableMail';

class UpdateDeliveryService {
    async run({
        delivery_id,
        product,
        recipient_id,
        deliveryman_id,
        signature_id,
    }) {
        const delivery = await Delivery.findByPk(delivery_id);

        if (!delivery) {
            throw new Error('delivery not found');
        }

        if (recipient_id) {
            const recipient = await Deliveryman.findByPk(recipient_id);

            if (!recipient) {
                throw new Error('recipient not found');
            }
        }

        if (deliveryman_id) {
            const deliveryman = await Deliveryman.findByPk(deliveryman_id);

            if (!deliveryman) {
                throw new Error('deliveryman not found');
            }
        }

        await delivery.update({
            recipient_id,
            deliveryman_id,
            product,
            signature_id,
        });

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

        if (deliveryman_id) {
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

        await Cache.invalidatePrefix('deliveries');

        return delivery;
    }
}

export default new UpdateDeliveryService();
