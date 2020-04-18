import React, { useState } from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Container, Background, Input, Button, TextButton } from './styles';

export default function ReportProblem({ navigation: { goBack }, route }) {
    const { id } = route.params;
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        setLoading(true);

        await api.post(`/delivery/${id}/create-problem`, { description });

        setLoading(false);

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
                    {loading ? (
                        <ActivityIndicator color="#fff" size={20} />
                    ) : (
                        <TextButton>Enviar</TextButton>
                    )}
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
