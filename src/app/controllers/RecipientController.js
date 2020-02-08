import * as Yup from 'yup';

import Recipient from '../models/Recipient.js';

class RecipientController{
    async index(request, response){
        const recipients = await Recipient.findAll();

        return response.json(recipients);
    };
    async show(request, response){
        const recipient = await Recipient.findByPk(request.params.id);

        if(!recipient){
            return response.status(404).json({
                error: "recipient not found"
            });
        };

        return response.json(recipient);
    };
    async store(request, response){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cep: Yup.string().required(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
            complement: Yup.string()
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({
                error: 'validation fails'
            });
        };

        const recipientExist = await Recipient.findOne({ where: { name: request.body.name }});

        if(recipientExist){
            return response.status(400).json({
                error: "recipient already exists"
            });
        };

        const recipient = await Recipient.create(request.body);

        return response.json(recipient);
    };
    async update(request, response){
        const schema = Yup.object().shape({
            name: Yup.string(),
            cep: Yup.string(),
            street: Yup.string().when(
                'cep',
                (cep, field) =>
                cep ? field.required() : field
            ),
            city: Yup.string().when(
                'cep',
                (cep, field) =>
                cep ? field.required() : field
            ),
            state: Yup.string().when(
                'cep',
                (cep, field) =>
                cep ? field.required() : field
            ),
            number: Yup.number(),
            complement: Yup.string()
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({
                error: 'validation fails'
            });
        };

        const { name } = request.body;
        const recipient = await Recipient.findByPk(request.params.id);

        if(!recipient){
            return response.status(404).json({
                error: "recipient not found"
            });
        };

        if(name && name !== recipient.name){
            const recipientExist = await Recipient.findOne({ where: { name }});

            if(recipientExist){
                return response.status(400).json({
                    error: 'recipient already exists'
                });
            };
        };

        recipient.update(request.body);

        return response.json(recipient);

    };
    async delete(request, response){
        const recipient = await Recipient.findByPk(request.params.id);

        if(!recipient){
            return response.status(404).json({
                error: "recipient not found"
            });
        };

        recipient.destroy();

        return response.json({
            message: "deleted recipient"
        });
    };
};

export default new RecipientController();
