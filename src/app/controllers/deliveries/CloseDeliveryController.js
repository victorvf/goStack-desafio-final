import * as Yup from 'yup';
import { parseISO, isBefore, isAfter, startOfHour } from 'date-fns';

import Order from '../../models/Order';
import Deliveryman from '../../models/Deliveryman';
import File from '../../models/File';

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
                end_date: null,
                canceled_at: null,
            },
        });

        if(!order){
            return response.status(404).json({
                error: 'order not found',
            });
        };

        const file = await File.findByPk(request.body.signature_id);

        if(!file){
            return response.status(404).json({
                error: 'file does not available',
            });
        };

        const date = parseISO(request.body.end_date);

        const requestDate = new Date();

        if(isBefore(date, startOfHour(requestDate.setHours(8)))
        || isAfter(date, startOfHour(requestDate.setHours(18)))){
            return response.status(400).json({
                error: 'date is not permitted'
            });
        };

        await order.update({
            end_date: request.body.end_date,
            signature_id: request.body.signature_id,
        });

        return response.json(order);
    };
};

export default new CloseDeliveryController();
