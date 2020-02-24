import Order from '../../models/Order';
import Deliveryman from '../../models/Deliveryman';

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
                start_date: {
                    $ne: null,
                },
                end_date: {
                    $ne: null,
                },
                canceled_at: null,
                deliveryman_id: deliveryman.id,
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
