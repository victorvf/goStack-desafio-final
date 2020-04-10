import React, { useState, useEffect } from 'react';
import { MdSearch, MdEdit, MdDelete, MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import Actions from '~/components/Actions';
import MainButton from '~/components/MainButton';

import { Search, SearchButton, RecipientTable } from './styles';

export default function Recipient() {
    const [recipients, setRecipients] = useState([]);

    useEffect(() => {
        async function loadRecipients() {
            const response = await api.get('/recipients');

            setRecipients(response.data);
        }

        loadRecipients();
    }, []);

    return (
        <>
            <h1>Gerenciando destinatários</h1>
            <Search>
                <SearchButton>
                    <MdSearch size={20} color="#999" />
                    <input type="text" placeholder="Buscar por destinatários" />
                </SearchButton>
                <MainButton onClick={() => history.push('/recipient/register')}>
                    <MdAdd size={20} color="#fff" />
                    CADASTRAR
                </MainButton>
            </Search>
            <RecipientTable>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {recipients.map((recipient) => (
                        <tr>
                            <td>{`#${recipient.id}`}</td>
                            <td>{recipient.name}</td>
                            <td>{`${recipient.street}, ${recipient.city} - ${recipient.state}`}</td>
                            <td>
                                <Actions>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            history.push('/recipient/edit')
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
            </RecipientTable>
        </>
    );
}
