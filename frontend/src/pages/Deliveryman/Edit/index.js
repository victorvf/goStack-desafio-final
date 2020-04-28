import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '~/services/api';
import history from '~/services/history';

import MainButton from '~/components/MainButton';

import AvatarInput from '../AvatarInput';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email('Insira um e-mail válido').required(),
    avatar_id: Yup.number(),
});

export default function EditDeliveryman({ location }) {
    const { deliveryman } = location.state;

    async function handleSubmit({ name, email, avatar_id }) {
        try {
            await api.put(`/deliveryman/${deliveryman.id}/update`, {
                name,
                email,
                avatar_id,
            });

            toast.success('Entregador editado com sucesso!');
            history.push('/deliveryman');
        } catch (err) {
            toast.error('Falha ao editar entregador!');
        }
    }

    return (
        <Container>
            <div>
                <h1>Edição de entregadores</h1>
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
                    <Input
                        name="name"
                        defaultValue={deliveryman.name}
                        placeholder={deliveryman.name}
                    />

                    <strong>E-mail</strong>
                    <Input
                        name="email"
                        defaultValue={deliveryman.email}
                        placeholder={deliveryman.email}
                    />
                </Form>
            </Content>
        </Container>
    );
}

EditDeliveryman.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            deliveryman: PropTypes.object,
        }),
    }).isRequired,
};
