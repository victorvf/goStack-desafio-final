import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100%;
    background: #7d40e7;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    min-width: 360px;
    border: 0;
    border-radius: 4px;
    background: #fff;
    padding: 60px 30px;
    display: flex;
    flex-direction: column;

    img {
        margin: 0 auto 30px;
        width: 240px;
    }

    form {
        display: flex;
        flex-direction: column;

        span {
            font-size: 14px;
            color: rgba(255, 35, 35, 1);
            margin: 0 0 5px;
        }

        input {
            height: 45px;
            padding: 0 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            color: #333;
            margin: 10px 0;
        }
    }
`;
