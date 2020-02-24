import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isBefore, isAfter, parseISO, startOfHour, startOfDay, endOfDay } from 'date-fns';

import Order from '../../models/Order';
import Deliveryman from '../../models/Deliveryman';

class DeliveriesController {
    async index(request, response){
        const deliveryman = await Deliveryman.findByPk(request.params.id);

        if(!deliveryman){
            return response.status(404).json({
                error: 'deliveryman not found',
            });
        };

        const orders = await Order.findAll({
            where:{
                end_date: null,
                canceled_at: null,
            },
        });

        if(!orders){
            return response.status(404).json({
                error: "you haven't orders for delivery"
            });
        };

        return response.json(orders);
    };

    async update(request, response){
        const schema = Yup.object().shape({
            order: Yup.number().required(),
            start_date: Yup.date().required(),
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({
                error: "validation fails",
            });
        };

        const order = await Order.findOne({
            where: {
                id: request.body.order,
                deliveryman_id: request.params.id,
                start_date: null,
            },
        });

        if(!order){
            return response.status(400).json({
                error: 'order is not available',
            });
        };

        const date = parseISO(request.body.start_date);

        const requestDate = new Date();

        if(isBefore(date, startOfHour(requestDate.setHours(8)))
        || isAfter(date, startOfHour(requestDate.setHours(18)))){
            return response.status(400).json({
                error: 'date is not permitted'
            });
        };

        const orders = await Order.findAll({
            where: {
                deliveryman_id: request.params.id,
                start_date: {
                    [Op.between]: [startOfDay(date), endOfDay(date)],
                },
            },
        });

        if(orders.length >= 5){
            return response.status(400).json({
                error: 'you can only make 5 deliveries',
            });
        };

        order.update({
            start_date: date,
        });

        return response.json(order);
    };
};

export default new DeliveriesController();
