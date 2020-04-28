import { Op } from 'sequelize';

import DeliveryProblem from '../../models/Problem';
import Delivery from '../../models/Delivery';
import Deliveryman from '../../models/Deliveryman';

import Queue from '../../../lib/Queue';
import CancelationMail from '../../jobs/CancelationMail';

class ProblemDeliveryController {
    async index(request, response) {
        const { problemQuery = '', page = 1 } = request.query;

        const deliveriesProblem = await DeliveryProblem.findAll({
            where: {
                description: { [Op.iLike]: `%${problemQuery}%` },
            },
            limit: 4,
            offset: (page - 1) * 4,
            attributes: ['id', 'description'],
            include: [
                {
                    model: Delivery,
                    as: 'delivery',
                    attributes: [
                        'id',
                        'product',
                        'end_date',
                        'canceled_at',
                        'start_date',
                    ],
                },
            ],
        });

        if (!deliveriesProblem) {
            return response.status(404).json({
                error: "haven't deliveries with problems",
            });
        }

        return response.json(deliveriesProblem);
    }

    async show(request, response) {
        const delivery_id = request.params.id;

        const problems = await DeliveryProblem.findAll({
            where: {
                delivery_id,
            },
            attributes: ['id', 'description', 'created_at'],
            include: [
                {
                    model: Delivery,
                    as: 'delivery',
                    attributes: ['id', 'product'],
                },
            ],
        });

        if (!problems) {
            return response.status(404).json({
                error: "this delivery hasn't problems",
            });
        }

        return response.json(problems);
    }

    async store(request, response) {
        const delivery_id = request.params.id;
        const { description } = request.body;

        const delivery = await Delivery.findByPk(delivery_id);

        if (!delivery) {
            return response.status(404).json({
                error: 'delivery not found',
            });
        }

        const problem = await DeliveryProblem.create({
            description,
            delivery_id,
        });

        return response.json(problem);
    }

    async update(request, response) {
        const problem = await DeliveryProblem.findByPk(request.params.id);

        if (!problem) {
            return response.status(404).json({
                error: 'problem not found',
            });
        }

        if (request.body.delivery_id) {
            const delivery = await Delivery.findByPk(request.body.delivery_id);

            if (!delivery) {
                return response.status(404).json({
                    error: 'delivery not found',
                });
            }
        }

        await problem.update(request.body);

        await problem.reload({
            attributes: ['id', 'description'],
            include: [
                {
                    model: Delivery,
                    as: 'delivery',
                    attributes: ['id', 'product'],
                },
            ],
        });

        return response.json(problem);
    }

    async delete(request, response) {
        const problem = await DeliveryProblem.findByPk(request.params.id);

        if (!problem) {
            return response.status(404).json({
                error: 'problem not found',
            });
        }

        const delivery = await Delivery.findByPk(problem.delivery_id);

        if (!delivery) {
            return response.status(404).json({
                error: 'delivery not found',
            });
        }

        delivery.canceled_at = new Date();

        await delivery.reload({
            include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });

        await Queue.add(CancelationMail.key, {
            delivery,
        });

        return response.json(delivery);
    }
}

export default new ProblemDeliveryController();
