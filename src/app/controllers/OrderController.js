import * as Yup from 'yup';

import Order from '../models/Order';

class OrderController{
    async store(request, response){
        const schema = Yup.object().shape({
            product: Yup.string().required(),
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required()
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({
                error: 'validation fails'
            });
        };

        const orderExists = await Order.findOne({
            where: {
                product: request.body.product,
                recipient_id: request.body.recipient_id,
                deliveryman_id: request.body.deliveryman_id,
                canceled_at: null
            }
        });

        if(orderExists){
            return response.status(400).json({
                error: 'order already exists'
            });
        };

        const {id, product, recipient_id, deliveryman_id} = await Order.create(request.body);


    };
};

export default new OrderController();
