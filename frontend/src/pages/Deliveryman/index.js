import React, { useState, useEffect } from 'react';
import { MdSearch, MdEdit, MdDelete, MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import Actions from '~/components/Actions';
import MainButton from '~/components/MainButton';

import { Search, SearchButton, DeliverymanTable } from './styles';

export default function Deliveryman() {
    const [deliverymans, setDeliverymans] = useState([]);

    useEffect(() => {
        async function loadDeliverymen() {
            const response = await api.get('/deliverymen');

            setDeliverymans(response.data);
        }

        loadDeliverymen();
    }, []);

    return (
        <>
            <h1>Gerenciando entregadores</h1>
            <Search>
                <SearchButton>
                    <MdSearch size={20} color="#999" />
                    <input type="text" placeholder="Buscar por entregadores" />
                </SearchButton>
                <MainButton
                    onClick={() => history.push('/deliveryman/register')}
                >
                    <MdAdd size={20} color="#fff" />
                    CADASTRAR
                </MainButton>
            </Search>
            <DeliverymanTable>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Foto</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {deliverymans.map((deliveryman) => (
                        <tr key={deliveryman.id}>
                            <td>{`#${deliveryman.id}`}</td>
                            <td>PA</td>
                            <td>{deliveryman.name}</td>
                            <td>{deliveryman.email}</td>
                            <td>
                                <Actions>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            history.push('deliveryman/edit')
                                        }
                                    >
                                        <MdEdit color="#4D85EE" />
                                        Editar
                                    </button>
                                    <button type="button">
                                        <MdDelete color="#DE3B3B" />
                                        Excluir
                                    </button>
                                </Actions>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </DeliverymanTable>
        </>
    );
}
