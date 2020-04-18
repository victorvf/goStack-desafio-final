import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import { Container, Logo, InputText, Button, TextButton } from './styles';

export default function SignIn() {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [id, setId] = useState('');

    const loading = useSelector((state) => state.auth.loading);

    useEffect(() => {
        if (isFocused) {
            StatusBar.setBackgroundColor('#7D40E7');
            StatusBar.setBarStyle('light-content');
        }
    }, [isFocused]);

    function handleSubmit() {
        dispatch(signInRequest(id));
    }

    return (
        <Container>
            <Logo source={logo} />

            <InputText
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Informe seu ID de cadastro"
                value={id}
                onChangeText={setId}
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
            />

            <Button onPress={handleSubmit}>
                {loading ? (
                    <ActivityIndicator color="#fff" size={20} />
                ) : (
                    <TextButton>Entrar no sistema</TextButton>
                )}
            </Button>
        </Container>
    );
}
