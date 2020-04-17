import styled from 'styled-components/native';

export const Background = styled.View`
    background: #7d40e7;
    height: 155px;
`;

export const Container = styled.View`
    margin: -70px 20px 0;
`;

export const Title = styled.Text`
    align-self: center;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})``;

export const ProblemContainer = styled.View`
    height: 55px;
    padding: 0 10px;
    background: #fff;
    border-radius: 4px;
    margin-bottom: 10px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Problem = styled.Text`
    font-size: 16px;
    color: #999;
`;

export const Date = styled.Text`
    font-size: 13px;
    color: #c1c1c1;
`;
