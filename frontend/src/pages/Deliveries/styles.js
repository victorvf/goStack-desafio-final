import styled, { css } from 'styled-components';

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

export const DeliveryTable = styled.table`
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

        span {
            background: #a8d080;
            color: #2ca42b;
            padding: 2px 8px 2px 16px;
            border-radius: 12px;
            position: relative;

            ${css`
                &::after {
                    position: absolute;
                    left: 4px;
                    top: 6px;
                    width: 8px;
                    height: 8px;
                    background: #2ca42b;
                    content: '';
                    border-radius: 50%;
                }
            `}
        }
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
        margin-top: 5px;
        color: #666666;

        strong {
            color: #000;
        }
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

export const Informations = styled.div`
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction: column;
`;

export const Date = styled.div`
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction: column;
`;

export const Signature = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    img {
        width: 235px;
        height: 40px;
        margin-top: 25px;
        align-self: center;
    }
`;
