import * as Yup from 'yup';

import Deliveryman from '../../models/Deliveryman';
import File from '../../models/File';

class DeliverymanController {
    async index(request, response){
        const deliverymen = await Deliveryman.findAll({
            order: ['id'],
            attributes: ['id', 'name', 'email'],
            include: {
                model: File,
                as: 'avatar',
                attributes: ['id', 'name', 'path', 'url']
            }
        });

        return response.json(deliverymen);
    };
    async show(request, response){
        const deliveryman = await Deliveryman.findByPk(request.params.id);

        if(!deliveryman){
            return response.status(404).json({
                error: 'Deliveryman not found'
            });
        };

        return response.json(deliveryman);
    };
    async store(request, response){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            avatar_id: Yup.number()
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({
                error: 'validation fails'
            });
        };

        const deliverymanExists = await Deliveryman.findOne({
            where: {
                email: request.body.email
            }
        });

        if(deliverymanExists){
            return response.status(400).json({
                error: 'deliveryman already exists'
            });
        };

        const { id, name, email } = await Deliveryman.create(request.body);

        return response.json({
            id,
            name,
            email
        });
    };
    async update(request, response){
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            avatar_id: Yup.number()
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({
                error: 'validation fails'
            });
        };

        const deliveryman = await Deliveryman.findByPk(request.params.id);

        if(request.body.email && request.body.email !== deliveryman.email){
            const deliverymanExists = await Deliveryman.findOne({
                where: {
                    email: request.body.email
                }
            });

            if(deliverymanExists){
                return response.status(400).json({
                    error: 'deliveryman already exists'
                });
            };
        };

        const file = await File.findByPk(request.body.avatar_id);

        if(!file){
            return response.status(404).json({
                error: 'photo not found'
            });
        };

        await deliveryman.update(request.body);

        return response.json(deliveryman);
    };
    async delete(request, response){
        const deliveryman = await Deliveryman.findByPk(request.params.id);

        if(!deliveryman){
            return response.status(404).json({
                error: 'deliveryman not found'
            });
        };

        await deliveryman.destroy();

        return response.json({
            message: 'Deliveryman success deleted'
        });
    };
};

export default new DeliverymanController();
