import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '~/services/api';
import history from '~/services/history';

import MainButton from '~/components/MainButton';

import { Container, Content, FirstForm, MiddleForm, LastForm } from './styles';

const schema = Yup.object().shape({
    name: Yup.string().required(),
    cep: Yup.string().required(),
    street: Yup.string().when('cep', (cep, field) =>
        cep ? field.required('Rua é obrigatória') : field
    ),
    city: Yup.string().when('street', (street, field) =>
        street ? field.required('Cidade é obrigatória') : field
    ),
    state: Yup.string().when('city', (city, field) =>
        city ? field.required('Estado é obrigatório') : field
    ),
    number: Yup.number().required(),
    complement: Yup.string(),
});

export default function EditRecipient({ location }) {
    const { recipient } = location.state;

    async function handleSubmit(data) {
        try {
            const { name, cep, state, city, street, number, complement } = data;

            await api.put(`/recipient/${recipient.id}/update`, {
                name,
                cep,
                state,
                city,
                street,
                number,
                complement,
            });

            toast.success('Destinatário editado com sucesso!');
            history.push('/recipient');
        } catch (err) {
            toast.error('Falha ao editar destinatário!');
        }
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
                        <Input name="name" placeholder={recipient.name} />
                    </FirstForm>
                    <MiddleForm>
                        <div>
                            <strong>Rua</strong>
                            <Input
                                name="street"
                                placeholder={recipient.street}
                            />
                        </div>

                        <div>
                            <strong>Número</strong>
                            <Input
                                name="number"
                                placeholder={recipient.number}
                            />
                        </div>

                        <div>
                            <strong>Complemento</strong>
                            <Input
                                name="complement"
                                placeholder={recipient.complement}
                            />
                        </div>
                    </MiddleForm>
                    <LastForm>
                        <div>
                            <strong>Cidade</strong>
                            <Input name="city" placeholder={recipient.city} />
                        </div>

                        <div>
                            <strong>Estado</strong>
                            <Input name="state" placeholder={recipient.state} />
                        </div>

                        <div>
                            <strong>CEP</strong>
                            <InputMask mask="99.999-999">
                                {() => (
                                    <Input
                                        name="cep"
                                        placeholder={recipient.cep}
                                        required
                                    />
                                )}
                            </InputMask>
                        </div>
                    </LastForm>
                </Form>
            </Content>
        </Container>
    );
}

EditRecipient.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            recipient: PropTypes.object,
        }),
    }).isRequired,
};
