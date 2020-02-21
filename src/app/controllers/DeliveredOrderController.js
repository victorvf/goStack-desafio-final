import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

class DeliveredOrderController {
    async index(request, response){
        const deliveryman = await Deliveryman.findByPk(request.userId);

        if(!deliveryman){
            return response.status(404).json({
                error: 'Deliveryman not found',
            });
        };

        const orders = await Order.findAll({
            where: {
                start_date: !null,
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

export default new DeliveredOrderController();
