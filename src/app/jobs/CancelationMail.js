import Mail from '../../lib/Mail';

class CancelationMail{
    get key(){
        return 'CancelationMail';
    };

    async handle({ data }){
        const { order } = data;

        await Mail.sendMail({
            to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
            subject: 'Encomenda Cancelada',
            template: 'cancelation',
            context: {
                deliveryman: order.deliveryman.name,
                order_id: order.id,
                order: order.product,
            },
        });
    };
};

export default new CancelationMail();
