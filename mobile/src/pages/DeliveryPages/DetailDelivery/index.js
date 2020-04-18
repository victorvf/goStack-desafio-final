import React, { useEffect, useMemo } from 'react';
import { View, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import dateFormat from '~/utils/dateFormat';

import {
    Container,
    Background,
    Content,
    Title,
    TextTitle,
    Strong,
    Span,
    MiddleText,
    Status,
    Dates,
    ContainerButtons,
    Button,
    Middle,
    TextButton,
} from './styles';

export default function DetailDelivery({ navigation: { navigate }, route }) {
    const isFocused = useIsFocused();
    const { data } = route.params;

    const startDateFormatted = useMemo(() => {
        return data.start_date ? dateFormat(data.start_date) : null;
    }, [data.start_date]);

    const endDateFormatted = useMemo(() => {
        return data.end_date ? dateFormat(data.end_date) : null;
    }, [data.end_date]);

    function handleStatus() {
        let status;

        if (data.end_date) {
            status = 'Entregue';
        } else if (data.start_date) {
            status = 'Retirada';
        } else if (data.canceled_at) {
            status = 'Cancelada';
        } else {
            status = 'Pendente';
        }

        return status;
    }

    useEffect(() => {
        if (isFocused) {
            StatusBar.setBackgroundColor('#7D40E7');
            StatusBar.setBarStyle('light-content');
        }
    }, [isFocused]);

    function handleNavigate(routePath) {
        if (data.end_date) {
            Alert.alert(
                'Erro',
                'Verifique se encomenda já foi retirada ou entregue'
            );
        } else {
            navigate(routePath, { id: data.id });
        }
    }

    return (
        <Container>
            <Background />
            <Content>
                <Title>
                    <Icon name="local-shipping" size={20} color="#7D40E7" />
                    <TextTitle>Informações da entrega</TextTitle>
                </Title>

                <Strong>DESTINATÁRIO</Strong>
                <Span>{data.recipient.name}</Span>
                <MiddleText>
                    <Strong>ENDEREÇO DE ENTREGA</Strong>
                    <Span>{`${data.recipient.street}, ${data.recipient.number}, ${data.recipient.city} - ${data.recipient.state}, ${data.recipient.cep}`}</Span>
                </MiddleText>
                <Strong>PRODUTO</Strong>
                <Span>{data.product}</Span>
            </Content>
            <Status>
                <Title>
                    <Icon name="event" size={20} color="#7D40E7" />
                    <TextTitle>Situação da entrega</TextTitle>
                </Title>
                <Strong>STATUS</Strong>
                <Span>{handleStatus()}</Span>
                <Dates>
                    <View>
                        <Strong>DATA DE RETIRADA</Strong>
                        <Span>
                            {data.start_date ? startDateFormatted : '--/--/--'}
                        </Span>
                    </View>
                    <View>
                        <Strong>DATA DE ENTREGA</Strong>
                        <Span>
                            {data.end_date ? endDateFormatted : '--/--/--'}
                        </Span>
                    </View>
                </Dates>
            </Status>
            <ContainerButtons>
                <Button
                    onPress={() => {
                        handleNavigate('ReportProblem');
                    }}
                >
                    <Icon name="highlight-off" size={20} color="#E74040" />
                    <TextButton>Informar Problema</TextButton>
                </Button>
                <Middle>
                    <Button
                        onPress={() => {
                            handleNavigate('ViewProblems');
                        }}
                    >
                        <Icon name="info-outline" size={20} color="#E7BA40" />
                        <TextButton>Visualizar Problemas</TextButton>
                    </Button>
                </Middle>
                <Button
                    onPress={() => {
                        handleNavigate('ConfirmDelivery');
                    }}
                >
                    <Icon name="check-circle" size={20} color="#7D40E7" />
                    <TextButton>Confirmar Entrega</TextButton>
                </Button>
            </ContainerButtons>
        </Container>
    );
}

DetailDelivery.navigationOptions = ({ navigation: { goBack } }) => ({
    headerTitle: 'Detalhes da encomenda',
    headerTitleAlign: 'center',
    headerLeft: () => (
        <TouchableOpacity onPress={() => goBack()}>
            <Icon name="chevron-left" size={23} color="#fff" />
        </TouchableOpacity>
    ),
});

DetailDelivery.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
    route: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};
