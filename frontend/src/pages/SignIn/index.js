import React from 'react';
import * as Yup from 'yup';
import { FaSpinner } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import MainButton from '~/components/MainButton';

import logo from '~/assets/fastfeet-logo.png';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);

    function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password));
    }

    return (
        <>
            <img src={logo} alt="Fastfeet" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <strong>SEU E-MAIL</strong>
                <Input
                    name="email"
                    type="email"
                    placeholder="exemplo@email.com"
                />

                <strong>SUA SENHA</strong>
                <Input
                    name="password"
                    type="password"
                    placeholder="**********"
                />

                <MainButton type="submit" loading={loading}>
                    {loading ? (
                        <FaSpinner size={20} color="#fff" />
                    ) : (
                        'Entrar no sistema'
                    )}
                </MainButton>
            </Form>
        </>
    );
}
