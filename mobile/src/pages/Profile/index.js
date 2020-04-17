import React, { useEffect, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';

import dateFormat from '~/utils/dateFormat';

import { signOut } from '~/store/modules/auth/actions';

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
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const deliveryman = useSelector((state) => state.auth.profile);

    const dateFormatted = useMemo(() => dateFormat(deliveryman.created_at), [
        deliveryman.created_at,
    ]);

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
            <Avatar
                source={{
                    uri: deliveryman.avatar
                        ? `${deliveryman.avatar.url}`
                        : `https://api.adorable.io/avatar/120/${deliveryman.name}.png`,
                }}
            />

            <Content>
                <Span>Nome completo</Span>
                <Strong>{deliveryman.name}</Strong>

                <Span>Email</Span>
                <Strong>{deliveryman.email}</Strong>

                <Span>Data de cadastro</Span>
                <Strong>{dateFormatted}</Strong>
            </Content>

            <Button onPress={handleSignOut}>
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
