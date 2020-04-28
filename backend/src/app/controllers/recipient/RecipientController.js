import { Op } from 'sequelize';

import Recipient from '../../models/Recipient';

import Cache from '../../../lib/Cache';

class RecipientController {
    async index(request, response) {
        const { recipientQuery = '', page = 1 } = request.query;

        const cacheKey = `recipients:${page}`;

        const cached = await Cache.get(cacheKey);

        if (recipientQuery === '' && cached) {
            return response.json(cached);
        }

        const recipients = await Recipient.findAll({
            where: {
                name: { [Op.iLike]: `%${recipientQuery}%` },
            },
            limit: 4,
            offset: (page - 1) * 4,
            attributes: [
                'id',
                'name',
                'cep',
                'state',
                'city',
                'street',
                'number',
                'complement',
            ],
        });

        await Cache.set(cacheKey, recipients);

        return response.json(recipients);
    }

    async show(request, response) {
        const recipient = await Recipient.findByPk(request.params.id, {
            attributes: [
                'id',
                'name',
                'cep',
                'state',
                'city',
                'street',
                'number',
                'complement',
            ],
        });

        if (!recipient) {
            return response.status(404).json({
                error: 'recipient not found',
            });
        }

        return response.json(recipient);
    }

    async store(request, response) {
        const recipientExist = await Recipient.findOne({
            where: {
                name: request.body.name,
            },
        });

        if (recipientExist) {
            return response.status(400).json({
                error: 'recipient already exists',
            });
        }

        const {
            id,
            name,
            cep,
            state,
            city,
            street,
            number,
            complement,
        } = await Recipient.create(request.body);

        await Cache.invalidatePrefix('recipients');

        return response.json({
            id,
            name,
            cep,
            state,
            city,
            street,
            number,
            complement,
        });
    }

    async update(request, response) {
        const { name } = request.body;
        const recipient = await Recipient.findByPk(request.params.id);

        if (!recipient) {
            return response.status(404).json({
                error: 'recipient not found',
            });
        }

        if (name && name !== recipient.name) {
            const recipientExist = await Recipient.findOne({ where: { name } });

            if (recipientExist) {
                return response.status(400).json({
                    error: 'recipient already exists',
                });
            }
        }

        await recipient.update(request.body);

        await recipient.reload({
            attributes: [
                'id',
                'name',
                'cep',
                'state',
                'city',
                'street',
                'number',
                'complement',
            ],
        });

        await Cache.invalidatePrefix('recipients');

        return response.json(recipient);
    }

    async delete(request, response) {
        const recipient = await Recipient.findByPk(request.params.id);

        if (!recipient) {
            return response.status(404).json({
                error: 'recipient not found',
            });
        }

        await recipient.destroy();

        await Cache.invalidatePrefix('recipients');

        return response.json({
            message: 'deleted recipient',
        });
    }
}

export default new RecipientController();
