import styled from 'styled-components';

export const SearchButton = styled.div`
    margin-top: 35px;
    width: 235px;
    background: #fff;
    height: 36px;
    padding: 0 15px;
    border: 1px solid #ddd;
    border-radius: 4px;

    display: flex;
    align-items: center;

    input {
        margin-left: 5px;
        background: #fff;
        height: 100%;
        border: 0;
    }
`;

export const ProblemTable = styled.table`
    width: 100%;
    margin-top: 25px;
    border-spacing: 0 1em;

    thead th {
        color: #444;
        text-align: left;
        padding: 0 15px;

        &:last-child {
            text-align: right;
        }
    }

    tbody td {
        background: #fff;
        border-radius: 4px;
        padding-left: 15px;
        padding-right: 25px;

        &:last-child {
            text-align: right;
        }
    }

    tbody tr {
        height: 50px;
        text-align: left;
    }
`;

export const View = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    display: ${(props) => (props.view ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;

    span {
        color: #666666;
        text-align: justify;
        margin-top: 10px;
        line-height: 25px;
    }
`;

export const ViewContent = styled.div`
    padding: 30px;
    width: 450px;
    background: #fff;
    border-radius: 4px;
`;

export const HeaderView = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        border: 0;
        background: none;
    }
`;

export const Footer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    margin-top: 50px;

    button {
        background: none;
        color: #444;
        border: 1px solid #333;
        border-radius: 4px;
        padding: 8px;

        &:disabled {
            cursor: default;
            opacity: 0.3;
        }
    }
`;
