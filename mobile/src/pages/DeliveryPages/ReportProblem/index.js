import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Container, Background, Input, Button, TextButton } from './styles';

export default function ReportProblem({ navigation: { goBack }, route }) {
    const { id } = route.params;
    const [description, setDescription] = useState('');

    async function handleSubmit() {
        await api.post(`/delivery/${id}/create-problem`, { description });

        goBack();
    }

    return (
        <>
            <Background />
            <Container>
                <Input
                    placeholder="Inclua aqui o problema que ocorreu na entrega."
                    multiline
                    numberOfLines={15}
                    textAlignVertical="top"
                    value={description}
                    onChangeText={setDescription}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit}
                />
                <Button onPress={handleSubmit}>
                    <TextButton>Enviar</TextButton>
                </Button>
            </Container>
        </>
    );
}

ReportProblem.navigationOptions = ({ navigation: { goBack } }) => ({
    headerTitle: 'Informar problema',
    headerTitleAlign: 'center',
    headerLeft: () => (
        <TouchableOpacity onPress={() => goBack()}>
            <Icon name="chevron-left" size={23} color="#fff" />
        </TouchableOpacity>
    ),
});

ReportProblem.propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func,
    }).isRequired,
    route: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};
