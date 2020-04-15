import React from 'react';

import { Container, Background, Input, Button, TextButton } from './styles';

export default function ConfirmDelivery() {
    return (
        <>
            <Background />
            <Container>
                <Input />
                <Button>
                    <TextButton>Enviar</TextButton>
                </Button>
            </Container>
        </>
    );
}

ConfirmDelivery.navigationOptions = {
    headerTitle: 'Confirmar entrega',
    headerTitleAlign: 'center',
};
