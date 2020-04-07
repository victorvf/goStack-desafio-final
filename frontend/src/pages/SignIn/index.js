import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import MainButton from '~/components/MainButton';

import logo from '~/assets/fastfeet-logo.png';

export default function SignIn() {
    return (
        <>
            <img src={logo} alt="Fastfeet" />

            <Form>
                <span>SEU E-MAIL</span>
                <Input
                    name="email"
                    type="email"
                    placeholder="exemplo@email.com"
                />

                <span>SUA SENHA</span>
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
