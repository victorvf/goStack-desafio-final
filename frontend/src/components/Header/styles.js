import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
    background: #fff;
    padding: 0 30px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
`;

export const Content = styled.div`
    height: 65px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
        display: flex;
        align-items: center;

        img {
            max-width: 150px;
            margin-right: 20px;
            padding-right: 20px;
            border-right: 1px solid #eee;
        }

        a {
            font-weight: bold;
            font-size: 14px;
            color: #999;

            & + a {
                margin-left: 12px;
            }
        }
    }
`;

const is_active_class = 'active';
export const LinkNav = styled(NavLink).attrs({
    is_active_class,
})`
    &.${is_active_class} {
        color: #000;
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;

    div {
        text-align: right;
        margin-right: 10px;

        strong {
            display: block;
            color: #333;
        }

        a {
            display: block;
            margin-top: 2px;
            font-size: 12px;
            color: #999;
        }
    }

    img {
        height: 40px;
        width: 40px;
        border: 0;
        border-radius: 50%;
        box-shadow: 2px 2px 3px #eee;
    }
`;
