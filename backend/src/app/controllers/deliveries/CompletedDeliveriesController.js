import Delivery from '../../models/Delivery';
import Deliveryman from '../../models/Deliveryman';

class CompletedDeliveriesController {
    async index(request, response) {
        const deliveryman = await Deliveryman.findByPk(request.params.id);

        if (!deliveryman) {
            return response.status(404).json({
                error: 'Deliveryman not found',
            });
        }

        const deliveries = await Delivery.findAll({
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
            attributes: [
                'id',
                'product',
                'canceled_at',
                'start_date',
                'end_date',
            ],
        });

        if (!deliveries) {
            return response.status(404).json({
                error: "You haven't deliveries delivered",
            });
        }

        return response.json(deliveries);
    }
}

export default new CompletedDeliveriesController();
