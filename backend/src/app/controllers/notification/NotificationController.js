import Notification from '../../schemas/Notification';
import Deliveryman from '../../models/Deliveryman';

class NotificationController {
    async index(request, response) {
        const deliveryman = await Deliveryman.findByPk(request.params.id);

        if (!deliveryman) {
            return response.status(404).json({
                error: 'Deliveryman not found',
            });
        }

        const notifications = await Notification.find({
            deliveryman: deliveryman.id,
        })
            .sort({ createdAt: 'desc' })
            .limit(20);

        return response.json(notifications);
    }

    async update(request, response) {
        const notification = await Notification.findByIdAndUpdate(
            request.params.id,
            { read: true },
            { new: true }
        );

        return response.json(notification);
    }
}

export default new NotificationController();
