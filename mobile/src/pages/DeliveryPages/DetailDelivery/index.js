import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

export default function DetailDelivery({ navigation: { navigate } }) {
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            StatusBar.setBackgroundColor('#7D40E7');
            StatusBar.setBarStyle('light-content');
        }
    }, [isFocused]);

    return (
        <Container>
            <Background />
            <Content>
                <Title>
                    <Icon name="local-shipping" size={20} color="#7D40E7" />
                    <TextTitle>Informações da entrega</TextTitle>
                </Title>

                <Strong>DESTINATÁRIO</Strong>
                <Span>Ludwig van Beethoven</Span>
                <MiddleText>
                    <Strong>ENDEREÇO DE ENTREGA</Strong>
                    <Span>Rua Beethoven, 1729, Diadema - SP, 09960-580</Span>
                </MiddleText>
                <Strong>PRODUTO</Strong>
                <Span>Yamaha SX7</Span>
            </Content>
            <Status>
                <Title>
                    <Icon name="event" size={20} color="#7D40E7" />
                    <TextTitle>Situação da entrega</TextTitle>
                </Title>
                <Strong>STATUS</Strong>
                <Span>Pendente</Span>
                <Dates>
                    <View>
                        <Strong>DATA DE RETIRADA</Strong>
                        <Span>14 / 01 / 2020</Span>
                    </View>
                    <View>
                        <Strong>DATA DE ENTREGA</Strong>
                        <Span>- - / - - / - -</Span>
                    </View>
                </Dates>
            </Status>
            <ContainerButtons>
                <Button
                    onPress={() => {
                        navigate('ReportProblem');
                    }}
                >
                    <Icon name="highlight-off" size={20} color="#E74040" />
                    <TextButton>Informar Problema</TextButton>
                </Button>
                <Middle>
                    <Button
                        onPress={() => {
                            navigate('ViewProblems');
                        }}
                    >
                        <Icon name="info-outline" size={20} color="#E7BA40" />
                        <TextButton>Visualizar Problemas</TextButton>
                    </Button>
                </Middle>
                <Button
                    onPress={() => {
                        navigate('ConfirmDelivery');
                    }}
                >
                    <Icon name="check-circle" size={20} color="#7D40E7" />
                    <TextButton>Confirmar Entrega</TextButton>
                </Button>
            </ContainerButtons>
        </Container>
    );
}

DetailDelivery.navigationOptions = {
    headerTitle: 'Detalhes da encomenda',
    headerTitleAlign: 'center',
};
