import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

class CompletedDeliveriesController {
    async index(request, response){
        const deliveryman = await Deliveryman.findByPk(request.params.id);

        if(!deliveryman){
            return response.status(404).json({
                error: 'Deliveryman not found',
            });
        };

        const orders = await Order.findAll({
            where: {
                start_date: !null,
                end_date: !null,
                canceled_at: null
            },
        });

        if(!orders){
            return response.status(404).json({
                error: "You haven't orders delivered"
            });
        };

        return response.json(orders);
    };
};

export default new CompletedDeliveriesController();
