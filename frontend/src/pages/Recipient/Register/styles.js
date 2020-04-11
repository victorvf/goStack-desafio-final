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
    padding: 15px 30px 30px;
    margin-top: 35px;
    background: #fff;
    border-radius: 4px;

    form {
        width: 100%;
        display: flex;
        flex-direction: column;

        strong {
            color: #444;
            margin-bottom: 5px;
            margin-top: 15px;
            align-self: flex-start;
        }

        span {
            font-size: 14px;
            align-self: flex-start;
            color: rgba(255, 35, 35, 1);
            margin: 5px 0 0;
        }

        input {
            width: 100%;
            height: 45px;
            padding: 0 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    }
`;

export const FirstForm = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MiddleForm = styled.div`
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-right: 15px;

        &:first-child {
            strong {
                width: 500px;
            }
        }

        &:last-child {
            margin-right: 0;
        }
    }
`;

export const LastForm = styled.div`
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-right: 15px;

        &:last-child {
            margin-right: 0;
        }
    }
`;
