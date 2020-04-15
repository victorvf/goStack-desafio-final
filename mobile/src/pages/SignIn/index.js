import React from 'react';

import logo from '~/assets/logo.png';

import { Container, Logo, InputText, Button, TextButton } from './styles';

export default function SignIn() {
    return (
        <Container>
            <Logo source={logo} />

            <InputText placeholder="Informe seu ID de cadastro" />

            <Button>
                <TextButton>Entrar no sistema</TextButton>
            </Button>
        </Container>
    );
}
