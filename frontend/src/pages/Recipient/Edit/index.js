import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';

import MainButton from '~/components/MainButton';

import { Container, Content, FirstForm, MiddleForm, LastForm } from './styles';

const schema = Yup.object().shape({
    name: Yup.string(),
    cep: Yup.string(),
    street: Yup.string().when('cep', (cep, field) =>
        cep ? field.required('Rua é obrigatória') : field
    ),
    city: Yup.string().when('street', (street, field) =>
        street ? field.required('Cidade é obrigatória') : field
    ),
    state: Yup.string().when('city', (city, field) =>
        city ? field.required('Estado é obrigatório') : field
    ),
    number: Yup.number(),
    complement: Yup.string(),
});

export default function EditRecipient() {
    function handleSubmit(data) {
        console.tron.log(data);
    }

    return (
        <Container>
            <div>
                <h1>Edição de destinatário</h1>
                <div>
                    <MainButton back onClick={() => history.push('/recipient')}>
                        <MdKeyboardArrowLeft size={20} color="#fff" />
                        Voltar
                    </MainButton>
                    <MainButton type="submit" form="form-recipient">
                        <MdDone size={20} color="#fff" />
                        Salvar
                    </MainButton>
                </div>
            </div>

            <Content>
                <Form
                    schema={schema}
                    onSubmit={handleSubmit}
                    id="form-recipient"
                >
                    <FirstForm>
                        <strong>Nome</strong>
                        <Input name="name" placeholder="John Doe" />
                    </FirstForm>
                    <MiddleForm>
                        <div>
                            <strong>Rua</strong>
                            <Input
                                name="street"
                                placeholder="Rua Joaquim Pires"
                            />
                        </div>

                        <div>
                            <strong>Número</strong>
                            <Input name="number" placeholder="1068" />
                        </div>

                        <div>
                            <strong>Complemento</strong>
                            <Input name="complement" />
                        </div>
                    </MiddleForm>
                    <LastForm>
                        <div>
                            <strong>Cidade</strong>
                            <Input name="city" placeholder="Teresina" />
                        </div>

                        <div>
                            <strong>Estado</strong>
                            <Input name="state" placeholder="PI" />
                        </div>

                        <div>
                            <strong>CEP</strong>
                            <Input name="cep" placeholder="64.049-000" />
                        </div>
                    </LastForm>
                </Form>
            </Content>
        </Container>
    );
}
