import * as Yup from 'yup';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Notification from '../schemas/Notification';

import Queue from '../../lib/Queue';
import OrderAvailableMail from '../jobs/OrderAvailableMail';

class OrderController{
    async index(request, response){
        const { page = 1 } = request.query;

        const orders = await Order.findAll({
            where: {
                canceled_at: null,
            },
            attributes: ['id', 'product'],
            limit: 20,
            offset: (page - 1) * 20,
            order: ['id'],
            include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['id', 'name'],
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: ['id', 'name'],
                },
            ],
        });

        return response.json(orders);
    };

    async show(request, response){
        const { order_id } = request.query;

        const order = await Order.findByPk(order_id, {
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
                        'number'
                    ],
                },
            ],
        });

        if(!order){
            return response.status(404).json({
                error: 'Order not found',
            });
        };

        return response.json(order);
    };

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

    async update(request, response){
        let deliveryman = null;
        let recipient = null;

        const schema = Yup.object().shape({
            product: Yup.string(),
            recipient_id: Yup.number(),
            deliveryman_id: Yup.number(),
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({
                error: 'validation fails',
            });
        };

        const order = await Order.findByPk(request.params.id);

        if(!order){
            return response.status(404).json({
                error: 'order not found',
            });
        };

        if(request.body.recipient_id){

            recipient = await Deliveryman.findByPk(request.body.recipient_id);

            if(!recipient){
                return response.status(404).json({
                    error: 'recipient not found',
                });
            };
        };

        if(request.body.deliveryman_id){

            deliveryman = await Deliveryman.findByPk(request.body.deliveryman_id);

            if(!deliveryman){
                return response.status(404).json({
                    error: 'deliveryman not found',
                });
            };
        };

        await order.update(request.body);

        if(deliveryman){
            await Notification.create({
                content: `New order available - Product: ${order.product}, Code: ${order.id}`,
                deliveryman: deliveryman.id,
            });

            await Queue.add(OrderAvailableMail.key, {
                order,
                deliveryman,
            });
        } else{
            await Notification.create({
                content: `Check order updated - Code: ${order.id}`,
                deliveryman: order.deliveryman_id,
            });
        };

        return response.json(order);
    };

    async delete(request, response){
        const order = await Order.findByPk(request.params.id);

        if(order.start_date){
            return response.status(400).json({
                error: 'order has already been withdrawn',
            });
        };

        await order.destroy();

        return response.json({
            message: 'order successfully deleted'
        });
    };
};

export default new OrderController();
