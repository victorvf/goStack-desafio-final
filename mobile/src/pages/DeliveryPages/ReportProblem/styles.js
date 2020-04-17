import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Background = styled.View`
    background: #7d40e7;
    height: 155px;
`;

export const Container = styled.View`
    margin: -70px 20px 0;
`;

export const Input = styled.TextInput`
    background: #fff;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 20px;
`;

export const Button = styled(RectButton)`
    height: 45px;
    background: #7d40e7;
    border-radius: 4px;

    align-self: stretch;
    align-items: center;
    justify-content: center;
`;

export const TextButton = styled.Text`
    color: #fff;
`;
