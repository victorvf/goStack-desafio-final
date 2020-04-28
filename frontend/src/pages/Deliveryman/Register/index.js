import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import MainButton from '~/components/MainButton';

import AvatarInput from '../AvatarInput';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string()
        .email('Insira um e-mail válido')
        .required('E-mail é obrigatório'),
    avatar_id: Yup.string(),
});

export default function RegisterDeliveryman() {
    async function handleSubmit({ name, email, avatar_id }) {
        try {
            await api.post('/deliveryman/create', {
                name,
                email,
                avatar_id,
            });

            toast.success('Entregador cadastrado com sucesso!');
            history.push('/deliveryman');
        } catch (err) {
            toast.error('Falha ao cadastrar entregador!');
        }
    }

    return (
        <Container>
            <div>
                <h1>Cadastro de entregadores</h1>
                <div>
                    <MainButton
                        back
                        onClick={() => history.push('/deliveryman')}
                    >
                        <MdKeyboardArrowLeft size={20} color="#fff" />
                        Voltar
                    </MainButton>
                    <MainButton type="submit" form="form-deliveryman">
                        <MdDone size={20} color="#fff" />
                        Salvar
                    </MainButton>
                </div>
            </div>

            <Content>
                <Form
                    schema={schema}
                    onSubmit={handleSubmit}
                    id="form-deliveryman"
                >
                    <AvatarInput name="avatar_id" />

                    <strong>Entregador</strong>
                    <Input name="name" placeholder="Nome do entregador" />

                    <strong>E-mail</strong>
                    <Input name="email" placeholder="E-mail do entregador" />
                </Form>
            </Content>
        </Container>
    );
}
