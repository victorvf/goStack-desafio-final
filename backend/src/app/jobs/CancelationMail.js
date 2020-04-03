import Mail from '../../lib/Mail';

class CancelationMail {
    get key() {
        return 'CancelationMail';
    }

    async handle({ data }) {
        const { delivery } = data;

        await Mail.sendMail({
            to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
            subject: 'Encomenda Cancelada',
            template: 'cancelation',
            context: {
                deliveryman: delivery.deliveryman.name,
                delivery_id: delivery.id,
                delivery: delivery.product,
            },
        });
    }
}

export default new CancelationMail();
