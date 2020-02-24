import Mail from '../../lib/Mail';

class OrderAvailableMail{
    get key(){
        return 'OrderAvailableMail';
    };

    async handle({ data }){
        const { order, deliveryman } = data;

        await Mail.sendMail({
            to: `${deliveryman.name} <${deliveryman.email}>`,
            subject: 'Nova Encomenda Disponível',
            template: 'available',
            context: {
                deliveryman: deliveryman.name,
                order_id: order.id,
                order: order.product,
            },
        });
    };
};

export default new OrderAvailableMail();
