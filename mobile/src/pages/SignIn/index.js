import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import { Container, Logo, InputText, Button, TextButton } from './styles';

export default function SignIn() {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [id, setId] = useState('');

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
                <TextButton>Entrar no sistema</TextButton>
            </Button>
        </Container>
    );
}
