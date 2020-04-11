import styled, { css, keyframes } from 'styled-components';
import { darken } from 'polished';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto 0px;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        input {
            border: 1px solid #ddd;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            margin: 0 0 10px;
        }

        button {
            margin: 5px 0 0;
            height: 44px;
            border: 0;
            border-radius: 4px;
            background: #7d40e7;
            font-weight: bold;
            color: #fff;
            font-size: 16px;
            transition: background 0.2s;
            &:hover {
                background: ${darken(0.05, '#7d40e7')};
            }

            ${(props) =>
                props.loading &&
                css`
                    svg {
                        animation: ${rotate} 2s linear infinite;
                    }
                `}
        }

        hr {
            border: 0;
            height: 1px;
            background: rgba(0, 0, 0, 0.2);
            margin: 10px 0 20px;
        }
    }

    > button {
        width: 100%;
        margin: 15px 0 0;
        height: 44px;
        border: 0;
        border-radius: 4px;
        background: rgba(255, 35, 35, 0.9);
        font-weight: bold;
        color: #fff;
        font-size: 16px;
        transition: background 0.2s;
        &:hover {
            background: ${darken(0.05, 'rgba(255, 35, 35, 0.9)')};
        }
    }
`;
