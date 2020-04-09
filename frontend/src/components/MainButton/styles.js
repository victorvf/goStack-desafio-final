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

export const Button = styled.button`
    border: 0;
    color: #fff;
    height: 36px;
    padding: 0 14px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 4px;
    ${(props) =>
        props.back &&
        css`
            margin-right: 15px;
        `}
    background: ${(props) => (props.back ? '#ccc' : '#7d40e7')};

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background 0.2s;

    &:hover {
        background: ${(props) =>
            props.back ? darken(0.1, '#ccc') : darken(0.1, '#7d40e7')};
    }

    ${(props) =>
        props.loading
            ? css`
                  svg {
                      margin-right: 5px;
                      animation: ${rotate} 2s linear infinite;
                  }
              `
            : css`
                  svg {
                      margin-right: 5px;
                  }
              `}
`;
