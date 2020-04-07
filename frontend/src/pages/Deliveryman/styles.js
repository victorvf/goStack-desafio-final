import styled from 'styled-components';

export const Search = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 35px;
`;

export const SearchButton = styled.div`
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

export const DeliverymanTable = styled.table`
    width: 100%;
    margin-top: 25px;
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
