import Notification from '../schemas/Notification';

class NotificationController {
    async index(request, response){
        const notifications = await Notification
        .find({
            deliveryman: request.userId,
        })
        .sort({ createdAt: 'desc' })
        .limit(20);

        return response.json(notifications);
    };

    async update(request, response){
        const notification = await Notification.findByIdAndUpdate(
            request.params.id,
            { read: true },
            { new: true }
        );

        return response.json(notification);
    };
};

export default new NotificationController();
