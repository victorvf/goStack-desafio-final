import * as Yup from 'yup';

import Problem from '../../models/Problem';
import Order from '../../models/Order';
import Deliveryman from '../../models/Deliveryman';

import Queue from '../../../lib/Queue';
import CancelationMail from '../../jobs/CancelationMail';

class ProblemDeliveryController {
    async index(request, response){
        const deliveriesProblem =  await Problem.findAll({
            include: [
                {
                    model: Order,
                    as: 'order',
                    attributes: ['id', 'product'],
                },
            ],
        });

        if(!deliveriesProblem){
            return response.status(404).json({
                error: "haven't deliveries with problems"
            });
        };

        return response.json(deliveriesProblem);
    };

    async show(request, response){
        const { order_id } = request.body;

        const problems = await Problem.findAll({
            where: {
                order_id,
            },
        });

        if(!problems){
            return response.status(404).json({
                error: "this delivery hasn't problems",
            });
        };

        return response.json(problems);
    };

    async store(request, response){
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            order_id: Yup.number().required(),
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({
                error: 'validation fails',
            });
        };

        const order = await Order.findByPk(request.body.order_id);

        if(!order){
            return response.status(404).json({
                error: 'order not found',
            });
        };

        const deliveryman = await deliveryman.findByPk(request.params.deliveryman_id);

        if(!deliveryman){
            return response.status(404).json({
                error: 'deliveryman not found',
            });
        };

        const problem = await Problem.create(request.body);

        return response.json(problem);
    };

    async update(request, response){
        const schema = Yup.object().shape({
            description: Yup.string(),
            order_id: Yup.number(),
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({
                error: 'validation fails',
            });
        };

        const problem = await Problem.findByPk(request.params.id);

        if(!problem){
            return response.status(404).json({
                error: 'problem not found',
            });
        };

        if(request.body.order_id){
            const order = await Order.findByPk(request.body.order_id);

            if(!order){
                return response.status(404).json({
                    error: 'delivery not found',
                });
            };
        };

        await problem.update(request.body);

        return response.json(problem);
    };

    async delete(request, response){
        const problem = await Problem.findByPk(request.params.id);

        if(!problem){
            return response.status(404).json({
                error: 'problem not found',
            });
        };

        const order = await Order.findByPk(problem.order_id);

        if(!order){
            return response.status(404).json({
                error: 'order not found',
            });
        };

        order.canceled_at = new Date();

        await order.reload({
            include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });

        await Queue.add(CancelationMail.key, {
            order,
        });

        return response.json(order);
    };
};

export default new ProblemDeliveryController();
