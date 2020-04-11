import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/fastfeet-logo.png';

import { Container, Content, Profile, LinkNav } from './styles';

export default function Header() {
    const profile = useSelector((state) => state.user.profile);

    return (
        <Container>
            <Content>
                <nav>
                    <img src={logo} alt="fastfeet" />
                    <LinkNav to="/deliveries">ENCOMENDAS</LinkNav>
                    <LinkNav to="/deliveryman">ENTREGADORES</LinkNav>
                    <LinkNav to="/recipient">DESTINATÁRIOS</LinkNav>
                    <LinkNav to="/problem">PROBLEMAS</LinkNav>
                </nav>

                <Profile>
                    <div>
                        <strong>{profile.name}</strong>
                        <Link to="/profile">Meu perfil</Link>
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
