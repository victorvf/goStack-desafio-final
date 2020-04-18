import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';

import api from '~/services/api';

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

export default function Dashboard({ navigation }) {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const deliveryman = useSelector((state) => state.auth.profile);

    const [pending, setPending] = useState(true);
    const [delivered, setDelivered] = useState(false);
    const [loading, setLoading] = useState(true);

    const [deliveries, setDeliveries] = useState([]);

    async function loadDeliveriesDelivered() {
        setLoading(true);

        const response = await api.get(
            `/deliveryman/${deliveryman.id}/orders-delivered`
        );

        setDeliveries(response.data);

        setPending(!pending);
        setDelivered(!delivered);
        setLoading(false);
    }

    const loadDeliveriesPending = useCallback(async () => {
        setLoading(true);

        const response = await api.get(
            `/deliveryman/${deliveryman.id}/deliveries`
        );

        setDeliveries(response.data);

        setPending(true);
        setDelivered(false);

        setLoading(false);
    }, [deliveryman.id]);

    useEffect(() => {
        if (isFocused) {
            StatusBar.setBackgroundColor('#fff');
            StatusBar.setBarStyle('dark-content');

            loadDeliveriesPending();
        }
    }, [isFocused, loadDeliveriesPending]);

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
                    <Button onPress={() => loadDeliveriesPending()}>
                        <TextButton active={pending}>Pendentes</TextButton>
                    </Button>
                    <Button onPress={() => loadDeliveriesDelivered()}>
                        <TextButton active={delivered}>Entregues</TextButton>
                    </Button>
                </ActionButtons>
            </Actions>
            {loading ? (
                <ActivityIndicator color="#333" size={30} />
            ) : (
                <DeliveryList
                    data={deliveries}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <Delivery data={item} navigation={navigation} />
                    )}
                />
            )}
        </Container>
    );
}

Dashboard.navigationOptions = {
    headerShown: false,
};

Dashboard.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};
