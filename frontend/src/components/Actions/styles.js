import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
`;

export const MoreButton = styled.button`
    background: none;
    border: 0;
    margin: 0 auto;
    position: relative;
`;

export const ActionsList = styled.div`
    position: absolute;
    width: ${(props) => (props.problem ? '200px' : '150px')};
    right: ${(props) => (props.problem ? '-54px' : '-40px')};
    top: calc(100% + 4px);
    background: #fff;
    box-shadow: 1px 1px 3px #333;
    border-radius: 4px;
    padding: 15px 5px;
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    flex-direction: column;

    &::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        top: +1px;
        left: 73%;
        box-sizing: border-box;

        border: 0.5em solid black;
        border-color: transparent transparent #fff #fff;

        transform-origin: 0 0;
        transform: rotate(135deg);

        box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2);
    }

    button {
        border: 0;
        color: #999;
        font-size: 16px;
        background: none;

        display: flex;
        align-items: center;

        margin-bottom: 5px;
        padding-bottom: 5px;
        border-bottom: 1px solid #f5f5f5;

        &:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: 0;
        }

        svg {
            margin: 0 7px;
        }
    }
`;
