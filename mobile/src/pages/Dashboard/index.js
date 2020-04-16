import React, { useEffect } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { signOut } from '~/store/modules/auth/actions';

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
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const deliveryman = useSelector((state) => state.auth.profile);

    useEffect(() => {
        if (isFocused) {
            StatusBar.setBackgroundColor('#fff');
            StatusBar.setBarStyle('dark-content');
        }
    }, [isFocused]);

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <Avatar
                        source={{
                            uri: deliveryman.avatar
                                ? `${deliveryman.avatar.url}`
                                : `https://api.adorable.io/avatar/120/${deliveryman.name}.png`,
                        }}
                    />
                    <Content>
                        <Span>Bem vindo de volta,</Span>
                        <Strong>{deliveryman.name}</Strong>
                    </Content>
                </HeaderContent>
                <TouchableOpacity onPress={handleSignOut}>
                    <Icon name="exit-to-app" size={25} color="#E74040" />
                </TouchableOpacity>
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
