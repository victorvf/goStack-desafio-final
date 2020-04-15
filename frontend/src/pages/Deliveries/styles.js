import styled, { css } from 'styled-components';
import { lighten } from 'polished';

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

export const Status = styled.span.attrs({
    delivered: '#2CA42B',
    pending: '#C1BC35',
    canceled: '#DE3B3B',
    withdraw: '#4D85EE',
})`
    background: #a8d080;
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
            background: ${(props) => {
                switch (props.status) {
                    case 'ENTREGUE':
                        return props.delivered;
                    case 'PENDENTE':
                        return props.pending;
                    case 'CANCELADA':
                        return props.canceled;
                    default:
                        return props.withdraw;
                }
            }};
            content: '';
            border-radius: 50%;
        }
    `};

    ${(props) => {
        switch (props.status) {
            case 'ENTREGUE':
                return css`
                    color: ${props.delivered};
                    background: ${lighten(0.5, props.delivered)};
                `;
            case 'PENDENTE':
                return css`
                    color: ${props.pending};
                    background: ${lighten(0.4, props.pending)};
                `;
            case 'CANCELADA':
                return css`
                    color: ${props.canceled};
                    background: ${lighten(0.3, props.canceled)};
                `;
            default:
                return css`
                    color: ${props.withdraw};
                    background: ${lighten(0.3, props.withdraw)};
                `;
        }
    }};
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
        width: 300px;
        height: 60px;
        margin-top: 25px;
        align-self: center;
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

export const Deliveryman = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 8px;
    }
`;
