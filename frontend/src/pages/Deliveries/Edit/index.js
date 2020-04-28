import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Input, Select } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '~/services/api';
import history from '~/services/history';

import MainButton from '~/components/MainButton';

import { Container, Content, FirstForm, LastForm } from './styles';

const schema = Yup.object().shape({
    recipient_id: Yup.number().integer('Destinatário inválido'),
    deliveryman_id: Yup.number().integer('Entregador inválido'),
    product: Yup.string('Produto inválido'),
});

export default function EditDelivery({ location }) {
    const { delivery } = location.state;
    const [recipients, setRecipients] = useState([]);
    const [deliverymans, setDeliverymans] = useState([]);

    async function loadRecipients() {
        const response = await api.get('/recipients');

        const data = response.data.map((recipient) => {
            const { id } = recipient;
            const title = recipient.name;

            return { id, title };
        });

        setRecipients(data);
    }

    async function loadDeliverymen() {
        const response = await api.get('/deliverymen');

        const data = response.data.map((deliveryman) => {
            const { id } = deliveryman;
            const title = deliveryman.name;

            return { id, title };
        });

        setDeliverymans(data);
    }

    useEffect(() => {
        loadRecipients();

        loadDeliverymen();
    }, []);

    async function handleSubmit({ recipient_id, deliveryman_id, product }) {
        try {
            await api.put(`/order/${delivery.id}/update`, {
                recipient_id,
                deliveryman_id,
                product,
            });

            toast.success('Encomenda editada com sucesso!');
            history.push('/deliveries');
        } catch (err) {
            toast.error('Falha ao editar encomenda!');
        }
    }

    return (
        <Container>
            <div>
                <h1>Edição de encomendas</h1>
                <div>
                    <MainButton
                        back
                        onClick={() => history.push('/deliveries')}
                    >
                        <MdKeyboardArrowLeft size={20} color="#fff" />
                        Voltar
                    </MainButton>
                    <MainButton type="submit" form="form-delivery">
                        <MdDone size={20} color="#fff" />
                        Salvar
                    </MainButton>
                </div>
            </div>

            <Content>
                <Form
                    schema={schema}
                    onSubmit={handleSubmit}
                    id="form-delivery"
                >
                    <FirstForm>
                        <div>
                            <strong>Destinatário</strong>
                            <Select
                                name="recipient_id"
                                options={recipients}
                                defaultValue={delivery.recipient.id}
                                placeholder={delivery.recipient.name}
                            />
                        </div>

                        <div>
                            <strong>Entregador</strong>
                            <Select
                                name="deliveryman_id"
                                options={deliverymans}
                                defaultValue={delivery.deliveryman.id}
                                placeholder={delivery.deliveryman.name}
                            />
                        </div>
                    </FirstForm>

                    <LastForm>
                        <strong>Produto</strong>
                        <Input name="product" placeholder={delivery.product} />
                    </LastForm>
                </Form>
            </Content>
        </Container>
    );
}

EditDelivery.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            delivery: PropTypes.object,
        }),
    }).isRequired,
};
