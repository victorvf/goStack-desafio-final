import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    padding: 0 25px;
    background: #7d40e7;

    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image`
    margin-bottom: 50px;
`;

export const InputText = styled.TextInput.attrs({
    placeholderTextColor: 'rgba(0, 0, 0, 0.6)',
})`
    background: #fff;
    color: #333;
    height: 45px;
    padding: 0 15px;
    border-radius: 4px;
    margin-bottom: 15px;
    align-self: stretch;
`;

export const Button = styled(RectButton)`
    height: 45px;
    background: #82bf18;
    border-radius: 4px;

    align-self: stretch;
    align-items: center;
    justify-content: center;
`;

export const TextButton = styled.Text`
    font-size: 15px;
    color: #fff;
`;
