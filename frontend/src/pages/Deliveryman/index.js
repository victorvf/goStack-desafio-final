import React, { useState, useEffect } from 'react';
import { MdSearch, MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import Actions from '~/components/Actions';
import MainButton from '~/components/MainButton';

import { Search, SearchButton, DeliverymanTable, Footer } from './styles';

export default function Deliveryman() {
    const [deliverymans, setDeliverymans] = useState([]);
    const [deliverymanQuery, setDeliverymanQuery] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function loadDeliverymen() {
            const response = await api.get('/deliverymen', {
                params: { deliverymanQuery, page },
            });

            setDeliverymans(response.data);
        }

        loadDeliverymen();
    }, [deliverymanQuery, page]);

    async function handleRemove(id) {
        const removeAlert = window.confirm(
            'Tem certeza que deseja excluir o entregador ?'
        );

        if (!removeAlert) return;

        try {
            await api.delete(`/deliveryman/${id}/delete`);

            const newDeliverymans = deliverymans.filter((d) => d.id !== id);

            setDeliverymans(newDeliverymans);
        } catch (err) {
            toast.error('Falha ao excluir entregador! Tente novamente');
        } finally {
            toast.success('Entregador excluído com sucesso!');
        }
    }

    function handleEdit(deliveryman) {
        history.push({
            pathname: '/deliveryman/edit',
            state: { deliveryman },
        });
    }

    function handleQuery(event) {
        setDeliverymanQuery(event.target.value);
    }

    return (
        <>
            <h1>Gerenciando entregadores</h1>
            <Search>
                <SearchButton>
                    <MdSearch size={20} color="#999" />
                    <input
                        type="text"
                        placeholder="Buscar por entregadores"
                        onChange={handleQuery}
                    />
                </SearchButton>
                <MainButton
                    onClick={() => history.push('/deliveryman/register')}
                >
                    <MdAdd size={20} color="#fff" />
                    CADASTRAR
                </MainButton>
            </Search>
            {deliverymans.length === 0 ? (
                <div>
                    <p>Não possui entregadores</p>
                </div>
            ) : (
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
                                <td>
                                    <img
                                        src={
                                            deliveryman.avatar
                                                ? deliveryman.avatar.url
                                                : `https://api.adorable.io/avatars/50/${deliveryman.name}.png`
                                        }
                                        alt="avatar"
                                    />
                                </td>
                                <td>{deliveryman.name}</td>
                                <td>{deliveryman.email}</td>
                                <td>
                                    <Actions>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(deliveryman)
                                            }
                                        >
                                            <MdEdit color="#4D85EE" />
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemove(deliveryman.id)
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
                </DeliverymanTable>
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
