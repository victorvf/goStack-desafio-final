import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import MainButton from '~/components/MainButton';

import logo from '~/assets/fastfeet-logo.png';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
    function handleSubmit(data) {
        console.tron.log(data);
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

                <MainButton type="submit">Entrar no sistema</MainButton>
            </Form>
        </>
    );
}