import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View``;

export const Background = styled.View`
    background: #7d40e7;
    height: 155px;
`;

export const Content = styled.View`
    margin: -70px 20px 0;
    background: #fff;
    padding: 10px;
    border-radius: 4px;
`;

export const Title = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const TextTitle = styled.Text`
    color: #7d40e7;
    font-size: 15px;
    font-weight: bold;
    margin-left: 8px;
`;

export const Strong = styled.Text`
    color: #999;
    font-size: 15px;
    margin-bottom: 5px;
`;

export const Span = styled.Text`
    color: #666;
    font-size: 15px;
`;

export const MiddleText = styled.View`
    margin: 15px 0;
`;

export const Status = styled.View`
    background: #fff;
    padding: 10px;
    border-radius: 4px;
    margin: 10px 20px 0;
`;

export const Dates = styled.View`
    margin-top: 15px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ContainerButtons = styled.View`
    background: #f8f9fd;
    border-radius: 4px;
    margin: 10px 20px 0;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Button = styled(RectButton)`
    padding: 20px 13px;
    background: #f8f9fd;

    align-items: center;
    justify-content: center;
`;

export const Middle = styled.View`
    border-right-width: 1px;
    border-right-color: #ddd;
    border-left-width: 1px;
    border-left-color: #ddd;
`;

export const TextButton = styled.Text`
    width: 80px;
    text-align: center;
`;
