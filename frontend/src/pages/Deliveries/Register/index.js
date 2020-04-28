import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Input, Select } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import MainButton from '~/components/MainButton';

import { Container, Content, FirstForm, LastForm } from './styles';

const schema = Yup.object().shape({
    recipient_id: Yup.string('Destinatário inválido').required(
        'Destinatário é obrigatório'
    ),
    deliveryman_id: Yup.string('Entregador inválido').required(
        'Entregador é obrigatório'
    ),
    product: Yup.string('Produto inválido').required('Produto é obrigatório'),
});

export default function RegisterDelivery() {
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
            await api.post('/order/create', {
                recipient_id,
                deliveryman_id,
                product,
            });

            toast.success('Encomenda salva com sucesso!');
            history.push('/deliveries');
        } catch (err) {
            toast.error('Falha ao cadastra encomenda!');
        }
    }

    return (
        <Container>
            <div>
                <h1>Cadastro de encomendas</h1>
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
                                placeholder="Nome do destinatário"
                            />
                        </div>

                        <div>
                            <strong>Entregador</strong>
                            <Select
                                name="deliveryman_id"
                                options={deliverymans}
                                placeholder="Nome do entregador"
                            />
                        </div>
                    </FirstForm>

                    <LastForm>
                        <strong>Produto</strong>
                        <Input name="product" placeholder="Nome do produto" />
                    </LastForm>
                </Form>
            </Content>
        </Container>
    );
}
