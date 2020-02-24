import Mail from '../../lib/Mail';

class DeliveryAvailableMail{
    get key(){
        return 'DeliveryAvailableMail';
    };

    async handle({ data }){
        const { delivery, deliveryman } = data;

        await Mail.sendMail({
            to: `${deliveryman.name} <${deliveryman.email}>`,
            subject: 'Nova Encomenda Disponível',
            template: 'available',
            context: {
                deliveryman: deliveryman.name,
                order_id: delivery.id,
                delivery: delivery.product,
            },
        });
    };
};

export default new DeliveryAvailableMail();
