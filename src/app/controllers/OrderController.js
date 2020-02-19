import * as Yup from 'yup';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Notification from '../schemas/Notification';

import Queue from '../../lib/Queue';
import OrderAvailableMail from '../jobs/OrderAvailableMail';

class OrderController{
    async store(request, response){
        const schema = Yup.object().shape({
            product: Yup.string().required(),
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({
                error: 'validation fails',
            });
        };

        const orderExists = await Order.findOne({
            where: {
                product: request.body.product,
                recipient_id: request.body.recipient_id,
                deliveryman_id: request.body.deliveryman_id,
                canceled_at: null,
            },
        });

        if(orderExists){
            return response.status(400).json({
                error: 'order already exists',
            });
        };

        const recipient = await Recipient.findByPk(request.body.recipient_id);

        if(!recipient){
            return response.status(404).json({
                error: 'recipient not found',
            });
        };

        const deliveryman = await Deliveryman.findByPk(request.body.deliveryman_id);

        if(!deliveryman){
            return response.status(404).json({
                error: 'deliveryman not found',
            });
        };

        const order = await Order.create(request.body);

        await Notification.create({
            content: `New order available - Product: ${order.product}, Code: ${order.id}`,
            deliveryman: deliveryman.id,
        });

        await Queue.add(OrderAvailableMail.key, {
            order,
            deliveryman,
        });

        return response.json(order);
    };
};

export default new OrderController();
