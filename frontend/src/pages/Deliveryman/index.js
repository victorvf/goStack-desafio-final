import React, { useState, useEffect } from 'react';
import { MdSearch, MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

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
        </>
    );
}
