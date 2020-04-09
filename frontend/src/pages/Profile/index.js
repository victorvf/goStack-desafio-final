import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import { Container } from './styles';

export default function Profile() {
    return (
        <Container>
            <Form>
                <Input type="text" name="name" placeholder="Nome completo" />
                <Input
                    type="email"
                    name="email"
                    placeholder="Seu endereço de e-mail"
                />
                <hr />

                <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Sua senha atual"
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Nova senha"
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirma nova senha"
                />

                <button type="submit">Atualizar perfil</button>
            </Form>
            <button type="submit">Sair</button>
        </Container>
    );
}
