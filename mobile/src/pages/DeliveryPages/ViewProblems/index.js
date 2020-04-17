import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import dateFormat from '~/utils/dateFormat';

import {
    Container,
    Background,
    Title,
    List,
    ProblemContainer,
    Problem,
    Date,
} from './styles';

export default function ViewProblems({ route }) {
    const { id } = route.params;
    const isFocused = useIsFocused();
    const [problems, setProblems] = useState([]);

    const loadProblems = useCallback(async () => {
        const response = await api.get(`/delivery/${id}/problems`);

        setProblems(response.data);
    }, [id]);

    useEffect(() => {
        if (isFocused) {
            loadProblems();
        }
    }, [isFocused, loadProblems]);

    return (
        <>
            <Background />
            <Container>
                <Title>Encomenda {id}</Title>
                <List
                    data={problems}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <ProblemContainer>
                            <Problem>{item.description}</Problem>
                            <Date>{dateFormat(item.created_at)}</Date>
                        </ProblemContainer>
                    )}
                />
            </Container>
        </>
    );
}

ViewProblems.navigationOptions = ({ navigation: { goBack } }) => ({
    headerTitle: 'Visualizar problemas',
    headerTitleAlign: 'center',
    headerLeft: () => (
        <TouchableOpacity onPress={() => goBack()}>
            <Icon name="chevron-left" size={23} color="#fff" />
        </TouchableOpacity>
    ),
});

ViewProblems.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};
