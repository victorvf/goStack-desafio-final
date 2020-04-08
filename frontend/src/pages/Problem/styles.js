import styled from 'styled-components';

export const ProblemTable = styled.table`
    width: 100%;
    margin-top: 35px;
    border-spacing: 0 1em;

    thead th {
        color: #444;
        text-align: center;
    }

    tbody td {
        background: #fff;
        border-radius: 4px;
    }

    tbody tr {
        height: 50px;
        text-align: center;
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
