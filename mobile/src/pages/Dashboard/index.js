import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';

import Delivery from '~/components/Delivery';

import {
    Container,
    Header,
    HeaderContent,
    Avatar,
    Content,
    Span,
    Strong,
    Actions,
    ActionButtons,
    Button,
    TextButton,
    DeliveryList,
} from './styles';

const data = [1, 2, 3, 4];

export default function Dashboard({ navigation }) {
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            StatusBar.setBackgroundColor('#fff');
            StatusBar.setBarStyle('dark-content');
        }
    }, [isFocused]);

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <Avatar
                        source={{
                            uri:
                                'https://api.adorable.io/avatar/70/rochelly.png',
                        }}
                    />
                    <Content>
                        <Span>Bem vindo de volta,</Span>
                        <Strong>Gaspar Antunes</Strong>
                    </Content>
                </HeaderContent>
                <Icon name="exit-to-app" size={25} color="#E74040" />
            </Header>
            <Actions>
                <Strong>Entregas</Strong>
                <ActionButtons>
                    <Button>
                        <TextButton active>Pendentes</TextButton>
                    </Button>
                    <Button>
                        <TextButton>Entregues</TextButton>
                    </Button>
                </ActionButtons>
            </Actions>
            <DeliveryList
                data={data}
                keyExtractor={(item) => String(item)}
                renderItem={({ item }) => (
                    <Delivery data={item} navigation={navigation} />
                )}
            />
        </Container>
    );
}

Dashboard.navigationOptions = {
    headerShown: false,
};

Dashboard.propTypes = {
    navigation: PropTypes.shape().isRequired,
};
