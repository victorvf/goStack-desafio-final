import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/fastfeet-logo.png';

import { Container, Content, Profile, LinkNav } from './styles';

export default function Header() {
    return (
        <Container>
            <Content>
                <nav>
                    <img src={logo} alt="fastfeet" />
                    <LinkNav to="/deliveries" active>
                        ENCOMENDAS
                    </LinkNav>
                    <LinkNav to="/deliveryman">ENTREGADORES</LinkNav>
                    <LinkNav to="/recipient">DESTINATÁRIOS</LinkNav>
                    <LinkNav to="/problem">PROBLEMAS</LinkNav>
                </nav>

                <Profile>
                    <div>
                        <strong>Admin FastFeet</strong>
                        <Link to="profile">Meu perfil</Link>
                    </div>
                    <img
                        src="https://api.adorable.io/avatars/50/abott@adorable.png"
                        alt="avatar"
                    />
                </Profile>
            </Content>
        </Container>
    );
}
