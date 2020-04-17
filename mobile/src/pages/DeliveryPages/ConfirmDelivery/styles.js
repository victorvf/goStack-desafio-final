import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Background = styled.View`
    background: #7d40e7;
    height: 155px;
`;

export const Container = styled.View`
    margin: -70px 20px 0;
`;

export const Input = styled.View`
    height: 400px;
    background: #fff;
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

export const CaptureButton = styled(RectButton)`
    background: #9f9f9f;
    padding: 20px;
    border-radius: 45px;
    align-self: center;
    margin-top: -120px;
    margin-bottom: 40px;

    display: ${(props) => (props.visible ? 'flex' : 'none')};
`;

export const ImageCaptured = styled.Image`
    flex: 1;
    border-radius: 4px;

    display: ${(props) => (props.visible ? 'flex' : 'none')};
`;
