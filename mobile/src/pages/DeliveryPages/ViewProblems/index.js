import React from 'react';

import {
    Container,
    Background,
    Title,
    List,
    ProblemContainer,
    Problem,
    Date,
} from './styles';

export default function ViewProblems() {
    const data = [1, 2, 3];

    return (
        <>
            <Background />
            <Container>
                <Title>Encomenda 01</Title>
                <List
                    data={data}
                    keyExtractor={(value) => String(value)}
                    renderItem={({ item }) => (
                        <ProblemContainer>
                            <Problem>Destinatário ausente</Problem>
                            <Date>14/01/2020</Date>
                        </ProblemContainer>
                    )}
                />
            </Container>
        </>
    );
}

ViewProblems.navigationOptions = {
    headerTitle: 'Visualizar problemas',
    headerTitleAlign: 'center',
};
