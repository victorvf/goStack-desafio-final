import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    padding: 0 20px;
    background: #fff;
`;

export const Header = styled.View`
    margin: 22px 0 25px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const HeaderContent = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Avatar = styled.Image`
    width: 70px;
    height: 70px;
    margin-right: 12px;
    border-radius: 35px;
`;

export const Content = styled.View`
    align-items: flex-start;
`;

export const Span = styled.Text`
    font-size: 13px;
    color: #666;
`;

export const Strong = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #444;
`;

export const Actions = styled.View`
    margin-bottom: 5px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ActionButtons = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Button = styled(RectButton)`
    border: 0;
    background: transparent;
    margin-left: 15px;
`;

export const TextButton = styled.Text`
    font-size: 13px;
    ${(props) =>
        props.active
            ? css`
                  color: #7d40e7;
                  border-bottom-width: 1px;
                  border-bottom-color: #7d40e7;
              `
            : css`
                  color: #666;
              `}
`;

export const DeliveryList = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})``;
