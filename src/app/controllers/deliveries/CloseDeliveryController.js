import * as Yup from 'yup';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

class CloseDeliveryController{
    async update(request, response){
        const schema = Yup.object().shape({
            order_id: Yup.number().required(),
            end_date: Yup.date().required(),
            signature_id: Yup.number().required(),
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({
                error: 'validation fails',
            });
        };

        const deliveryman = await Deliveryman.findByPk(request.params.id);

        if(!deliveryman){
            return response.status(404).json({
                error: 'deliveryman does not available'
            });
        };

        const order = await Order.findOne({
            where: {
                id: request.body.order_id,
                start_date: !null,
                end_date: null,
                canceled_at: null,
            },
        });

        if(!order){
            return response.status(404).json({
                error: 'order not found',
            });
        };

        return response.json(order);
    };
};

export default new CloseDeliveryController();
