import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';

import MainButton from '~/components/MainButton';

import { Container, Content, FirstForm, LastForm } from './styles';

const schema = Yup.object().shape({
    recipient_id: Yup.number().integer('Destinatário inválido'),
    deliveryman_id: Yup.number().integer('Entregador inválido'),
    product: Yup.string('Produto inválido'),
});

export default function EditDelivery() {
    function handleSubmit(data) {
        console.tron.log(data);
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
                    onSubmit={() => handleSubmit()}
                    id="form-delivery"
                >
                    <FirstForm>
                        <div>
                            <strong>Destinatário</strong>
                            <Input
                                name="recipient_id"
                                placeholder="Victor Fontenele"
                            />
                        </div>

                        <div>
                            <strong>Entregador</strong>
                            <Input
                                name="deliveryman_id"
                                placeholder="John Doe"
                            />
                        </div>
                    </FirstForm>

                    <LastForm>
                        <strong>Nome do produto</strong>
                        <Input name="product" placeholder="Samsung J5" />
                    </LastForm>
                </Form>
            </Content>
        </Container>
    );
}
