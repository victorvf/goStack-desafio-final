import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';

import MainButton from '~/components/MainButton';

import { Container, Content, FirstForm, LastForm } from './styles';

const schema = Yup.object().shape({
    recipient_id: Yup.number()
        .integer('Destinatário inválido')
        .required('Destinatário é obrigatório'),
    deliveryman_id: Yup.number()
        .integer('Entregador inválido')
        .required('Entregador é obrigatório'),
    product: Yup.string('Produto inválido').required('Produto é obrigatório'),
});

export default function RegisterDelivery() {
    function handleSubmit(data) {
        console.tron.log(data);
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
                            <Input
                                name="recipient_id"
                                placeholder="Nome do destinatário"
                            />
                        </div>

                        <div>
                            <strong>Entregador</strong>
                            <Input
                                name="deliveryman_id"
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
