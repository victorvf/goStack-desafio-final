import { Op } from 'sequelize';

import Deliveryman from '../../models/Deliveryman';
import File from '../../models/File';

import Cache from '../../../lib/Cache';

class DeliverymanController {
    async index(request, response) {
        const { deliverymanQuery = '', page = 1 } = request.query;

        const cacheKey = `deliverymen:${page}`;

        const cached = await Cache.get(cacheKey);

        if (deliverymanQuery === '' && cached) {
            return response.json(cached);
        }

        const deliverymen = await Deliveryman.findAll({
            where: {
                name: { [Op.iLike]: `%${deliverymanQuery}%` },
            },
            limit: 4,
            offset: (page - 1) * 4,
            order: ['id'],
            attributes: ['id', 'name', 'email'],
            include: {
                model: File,
                as: 'avatar',
                attributes: ['id', 'name', 'path', 'url'],
            },
        });

        await Cache.set(cacheKey, deliverymen);

        return response.json(deliverymen);
    }

    async show(request, response) {
        const deliveryman = await Deliveryman.findByPk(request.params.id, {
            attributes: ['id', 'name', 'email', 'created_at'],
            include: {
                model: File,
                as: 'avatar',
                attributes: ['id', 'name', 'path', 'url'],
            },
        });

        if (!deliveryman) {
            return response.status(404).json({
                error: 'Deliveryman not found',
            });
        }

        return response.json(deliveryman);
    }

    async store(request, response) {
        const deliverymanExists = await Deliveryman.findOne({
            where: {
                email: request.body.email,
            },
        });

        if (deliverymanExists) {
            return response.status(400).json({
                error: 'deliveryman already exists',
            });
        }

        const { id, name, email } = await Deliveryman.create(request.body);

        await Cache.invalidatePrefix('deliverymen');

        return response.json({
            id,
            name,
            email,
        });
    }

    async update(request, response) {
        const deliveryman = await Deliveryman.findByPk(request.params.id);

        if (request.body.email && request.body.email !== deliveryman.email) {
            const deliverymanExists = await Deliveryman.findOne({
                where: {
                    email: request.body.email,
                },
            });

            if (deliverymanExists) {
                return response.status(400).json({
                    error: 'deliveryman already exists',
                });
            }
        }

        if (request.body.avatar_id) {
            const file = await File.findByPk(request.body.avatar_id);

            if (!file) {
                return response.status(404).json({
                    error: 'photo not found',
                });
            }
        }

        await deliveryman.update(request.body);

        await deliveryman.reload({
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'name', 'path', 'url'],
                },
            ],
        });

        await Cache.invalidatePrefix('deliverymen');

        return response.json(deliveryman);
    }

    async delete(request, response) {
        const deliveryman = await Deliveryman.findByPk(request.params.id);

        if (!deliveryman) {
            return response.status(404).json({
                error: 'deliveryman not found',
            });
        }

        await deliveryman.destroy();

        await Cache.invalidatePrefix('deliverymen');

        return response.json({
            message: 'Deliveryman success deleted',
        });
    }
}

export default new DeliverymanController();
