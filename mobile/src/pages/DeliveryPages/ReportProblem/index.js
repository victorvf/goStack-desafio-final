import React from 'react';

import { Container, Background, Input, Button, TextButton } from './styles';

export default function ReportProblem() {
    return (
        <>
            <Background />
            <Container>
                <Input
                    placeholder="Inclua aqui o problema que ocorreu na entrega."
                    multiline
                    numberOfLines={15}
                    textAlignVertical="top"
                />
                <Button>
                    <TextButton>Enviar</TextButton>
                </Button>
            </Container>
        </>
    );
}

ReportProblem.navigationOptions = {
    headerTitle: 'Informar problema',
    headerTitleAlign: 'center',
};
