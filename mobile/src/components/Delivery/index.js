import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Container,
    Header,
    Title,
    ProgressContainer,
    Status,
    ProgressName,
    StatusName,
    Content,
    Infos,
    Date,
    Span,
    City,
    DeliveryText,
    Button,
    TextButton,
} from './styles';

export default function Delivery({ data, navigation: { navigate } }) {
    function handleNavigation() {
        navigate('DetailDelivery');
    }

    return (
        <Container>
            <Header>
                <Icon name="local-shipping" size={20} color="#7D40E7" />
                <Title>Encomenda 01</Title>
            </Header>

            <ProgressContainer>
                <Status active />
                <Status />
                <Status />
            </ProgressContainer>
            <ProgressName>
                <StatusName>Aguardando Retirada</StatusName>
                <StatusName>Retirada</StatusName>
                <StatusName>Entregue</StatusName>
            </ProgressName>

            <Content>
                <Infos>
                    <Date>
                        <Span>Data</Span>
                        <DeliveryText>14/01/2020</DeliveryText>
                    </Date>
                    <City>
                        <Span>Cidade</Span>
                        <DeliveryText>Diadema</DeliveryText>
                    </City>
                    <Button onPress={handleNavigation}>
                        <TextButton>Ver detalhes</TextButton>
                    </Button>
                </Infos>
            </Content>
        </Container>
    );
}
