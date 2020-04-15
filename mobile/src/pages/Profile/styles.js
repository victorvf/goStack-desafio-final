import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    padding: 0 30px;
    background: #fff;

    align-items: center;
    justify-content: center;
`;

export const Avatar = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 60px;
    margin-bottom: 40px;
`;

export const Content = styled.View`
    align-items: flex-start;
    align-self: stretch;
    margin-bottom: 15px;
`;

export const Span = styled.Text`
    font-size: 13px;
    color: #666;
`;
export const Strong = styled.Text`
    color: #444;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 15px;
`;
export const Button = styled(RectButton)`
    height: 45px;
    background: #e74040;
    border-radius: 4px;

    align-self: stretch;
    align-items: center;
    justify-content: center;
`;
export const TextButton = styled.Text`
    font-size: 16px;
    color: #fff;
`;
