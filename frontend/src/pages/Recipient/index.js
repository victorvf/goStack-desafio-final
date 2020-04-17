import React, { useState, useEffect } from 'react';
import { MdSearch, MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import Actions from '~/components/Actions';
import MainButton from '~/components/MainButton';

import { Search, SearchButton, RecipientTable, Footer } from './styles';

export default function Recipient() {
    const [recipients, setRecipients] = useState([]);
    const [recipientQuery, setRecipientQuery] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function loadRecipients() {
            const response = await api.get('/recipients', {
                params: { recipientQuery, page },
            });

            setRecipients(response.data);
        }

        loadRecipients();
    }, [recipientQuery, page]);

    async function handleRemove(id) {
        const alertRemove = window.confirm(
            'Tem certeza que deseja excluir o destinatário ?'
        );

        if (!alertRemove) return;

        try {
            await api.delete(`/recipient/${id}/delete`);

            const newRecipients = recipients.filter((r) => r.id !== id);

            setRecipients(newRecipients);
        } catch (err) {
            toast.error('Falha ao excluir destinatário! Tente novamente');
        } finally {
            toast.success('Destinatário excluído com sucesso!');
        }
    }

    function handleEdit(recipient) {
        history.push({
            pathname: '/recipient/edit',
            state: { recipient },
        });
    }

    function handleQuery(event) {
        setRecipientQuery(event.target.value);
    }

    return (
        <>
            <h1>Gerenciando destinatários</h1>
            <Search>
                <SearchButton>
                    <MdSearch size={20} color="#999" />
                    <input
                        type="text"
                        placeholder="Buscar por destinatários"
                        onChange={handleQuery}
                    />
                </SearchButton>
                <MainButton onClick={() => history.push('/recipient/register')}>
                    <MdAdd size={20} color="#fff" />
                    CADASTRAR
                </MainButton>
            </Search>
            {recipients.length === 0 ? (
                <div>
                    <p>Não possui destinatários</p>
                </div>
            ) : (
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
                            <tr key={recipient.id}>
                                <td>{`#${recipient.id}`}</td>
                                <td>{recipient.name}</td>
                                <td>{`${recipient.street}, ${recipient.city} - ${recipient.state}`}</td>
                                <td>
                                    <Actions>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(recipient)
                                            }
                                        >
                                            <MdEdit color="#4D85EE" />
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemove(recipient.id)
                                            }
                                        >
                                            <MdDelete color="#DE3B3B" />
                                            Excluir
                                        </button>
                                    </Actions>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </RecipientTable>
            )}

            <Footer>
                <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Anterior
                </button>

                <span>{`página: ${page}`}</span>

                <button type="button" onClick={() => setPage(page + 1)}>
                    Próxima
                </button>
            </Footer>
        </>
    );
}
