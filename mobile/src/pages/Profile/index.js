import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';

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
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            StatusBar.setBackgroundColor('#fff');
            StatusBar.setBarStyle('dark-content');
        }
    }, [isFocused]);

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

function IconTab({ color, size }) {
    return <Icon name="person" size={size} color={color} />;
}

Profile.navigationOptions = {
    tabBarLabel: 'Meu perfil',
    tabBarIcon: IconTab,
};

IconTab.propTypes = {
    color: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
};
