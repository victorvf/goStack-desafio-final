import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../../models/Recipient.js';

class RecipientController {
    async index(request, response) {
        const { recipientQuery = '', page = 1 } = request.query;

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
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cep: Yup.string().required(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
            complement: Yup.string(),
        });

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({
                error: 'validation fails',
            });
        }

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
        const schema = Yup.object().shape({
            name: Yup.string(),
            cep: Yup.string(),
            street: Yup.string().when('cep', (cep, field) =>
                cep ? field.required() : field
            ),
            city: Yup.string().when('street', (street, field) =>
                street ? field.required() : field
            ),
            state: Yup.string().when('city', (city, field) =>
                city ? field.required() : field
            ),
            number: Yup.number(),
            complement: Yup.string(),
        });

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({
                error: 'validation fails',
            });
        }

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

        return response.json({
            message: 'deleted recipient',
        });
    }
}

export default new RecipientController();
