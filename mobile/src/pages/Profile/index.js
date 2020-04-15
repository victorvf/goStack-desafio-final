import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Container,
    Avatar,
    Content,
    Span,
    Strong,
    Button,
    TextButton,
} from './styles';

export default function Profile() {
    return (
        <Container>
            <Avatar
                source={{
                    uri: 'https://api.adorable.io/avatar/120/rochelly.png',
                }}
            />

            <Content>
                <Span>Nome completo</Span>
                <Strong>Gaspar Antunes</Strong>

                <Span>Email</Span>
                <Strong>example@rocketseat.com.br</Strong>

                <Span>Data de cadastro</Span>
                <Strong>10/01/2020</Strong>
            </Content>

            <Button onPress={() => {}}>
                <TextButton>Sair</TextButton>
            </Button>
        </Container>
    );
}

Profile.navigationOptions = {
    tabBarLabel: 'Meu perfil',
    tabBarIcon: ({ color, size }) => (
        <Icon name="person" size={size} color={color} />
    ),
};
