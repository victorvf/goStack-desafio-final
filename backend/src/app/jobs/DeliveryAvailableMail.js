import Mail from '../../lib/Mail';

class DeliveryAvailableMail {
    get key() {
        return 'DeliveryAvailableMail';
    }

    async handle({ data }) {
        const { delivery } = data;

        await Mail.sendMail({
            to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
            subject: 'Nova Encomenda Disponível',
            template: 'available',
            context: {
                deliveryman: delivery.deliveryman.name,
                order_id: delivery.id,
                delivery: delivery.product,
            },
        });
    }
}

export default new DeliveryAvailableMail();
