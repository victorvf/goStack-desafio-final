import styled from 'styled-components';

export const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

export const Content = styled.div`
    padding: 30px;
    margin-top: 35px;
    background: #fff;
    border-radius: 4px;

    form {
        width: 100%;

        strong {
            color: #444;
            align-self: flex-start;
            margin-bottom: 10px;
        }

        span {
            font-size: 14px;
            align-self: flex-start;
            color: rgba(255, 35, 35, 1);
            margin: 5px 0 0;
        }
    }
`;

export const FirstForm = styled.div`
    display: flex;

    div {
        display: flex;
        flex-direction: column;

        select {
            padding: 0 10px;
            height: 45px;
            width: 405px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: none;
        }
    }
`;

export const LastForm = styled.div`
    display: flex;
    margin-top: 25px;
    flex-direction: column;

    input {
        width: 100%;
        height: 45px;
        padding: 0 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
`;
