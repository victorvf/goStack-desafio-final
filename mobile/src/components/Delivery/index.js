import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import dateFormat from '~/utils/dateFormat';

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
    const startDateFormatted = useMemo(() => {
        return data.start_date ? dateFormat(data.start_date) : null;
    }, [data.start_date]);

    function handleNavigation() {
        navigate('DetailDelivery', { data });
    }

    return (
        <Container>
            <Header>
                <Icon name="local-shipping" size={20} color="#7D40E7" />
                <Title>Encomenda {data.id}</Title>
            </Header>

            <ProgressContainer>
                <Status active />
                <Status active={startDateFormatted} />
                <Status active={!!data.end_date} />
            </ProgressContainer>
            <ProgressName>
                <StatusName>Aguardando Retirada</StatusName>
                <StatusName>Retirada</StatusName>
                <StatusName>Entregue</StatusName>
            </ProgressName>

            <Content>
                <Infos>
                    <Date>
                        <Span>Data de retirada</Span>
                        <DeliveryText>
                            {data.start_date ? startDateFormatted : '--/--/--'}
                        </DeliveryText>
                    </Date>
                    <City>
                        <Span>Cidade</Span>
                        <DeliveryText>{data.recipient.city}</DeliveryText>
                    </City>
                    <Button onPress={handleNavigation}>
                        <TextButton>Ver detalhes</TextButton>
                    </Button>
                </Infos>
            </Content>
        </Container>
    );
}

Delivery.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
    data: PropTypes.shape({
        id: PropTypes.number,
        product: PropTypes.string,
        canceled_at: PropTypes.string,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        recipient: PropTypes.object,
    }).isRequired,
};
