import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 10px 0;
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    padding-top: 14px;
    padding-left: 14px;
`;

export const Title = styled.Text`
    font-size: 14px;
    color: #7d40e7;
    margin-left: 10px;
`;

export const ProgressContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background: #7d40e7;
    height: 1px;
    margin: 24px 22px 10px;
`;

export const Status = styled.View`
    margin-top: -3.5px;
    width: 9px;
    height: 9px;
    background: ${(props) => (props.active ? '#7D40E7' : '#fff')};
    border: 1px solid #7d40e7;
    border-radius: 5px;
`;

export const ProgressName = styled.View`
    flex-direction: row;
    margin-top: 2px;
    justify-content: space-between;
    margin: 7px 10px 14px;
`;

export const StatusName = styled.Text`
    width: 50px;
    text-align: center;
    color: #999;
    font-size: 10px;
`;

export const Content = styled.View`
    background: #f8f9fd;
    padding: 14px;
`;

export const Infos = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Date = styled.View``;

export const City = styled.View``;

export const DeliveryText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #444;
`;

export const Span = styled.Text`
    font-size: 13px;
    color: #666;
`;

export const Button = styled(RectButton)`
    border: 0;
    background: transparent;
    margin-left: 15px;
`;

export const TextButton = styled.Text`
    font-size: 13px;
    color: #7d40e7;
`;
