import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100%;
    background: #f5f5f5;
`;

export const Content = styled.div`
    padding: 35px 50px;

    h1 {
        font-size: 24px;
        color: #444;
        margin-bottom: 35px;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        div {
            background: #fff;
            height: 36px;
            padding: 0 15px;
            border: 1px solid #ddd;
            border-radius: 4px;

            input {
                margin-left: 5px;
                background: #fff;
                height: 100%;
                border: 0;
            }
        }

        > button {
            height: 36px;
            background: #7d40e7;
            border: 0;
            border-radius: 4px;
            padding: 0 14px;
            font-size: 14px;
            font-weight: bold;
            color: #fff;

            display: flex;
            align-items: center;
        }
    }

    table {
        width: 100%;
        margin-top: 25px;

        border-spacing: 0 1em;

        thead th {
            color: #444;
            text-align: center;
        }

        td {
            background: #fff;
            border-radius: 2px;
        }

        tbody tr {
            height: 50px;
            text-align: center;

            button {
                border: 0;
                background: none;
            }

            span {
                background: #2ca42b;
                color: green;
                padding: 2px 4px;
                border-radius: 12px;
            }
        }
    }
`;
