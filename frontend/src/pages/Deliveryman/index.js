import React from 'react';
import { MdSearch, MdEdit, MdDelete, MdAdd } from 'react-icons/md';

import history from '~/services/history';

import Actions from '~/components/Actions';
import MainButton from '~/components/MainButton';

import { Search, SearchButton, DeliverymanTable } from './styles';

export default function Deliveryman() {
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
                    <tr>
                        <td>#01</td>
                        <td>PA</td>
                        <td>Patricia Alencar</td>
                        <td>patricia@email.com</td>
                        <td>
                            <Actions>
                                <button type="button">
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
                    <tr>
                        <td>#01</td>
                        <td>PA</td>
                        <td>Patricia Alencar</td>
                        <td>patricia@email.com</td>
                        <td>
                            <Actions>
                                <button type="button">
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
                    <tr>
                        <td>#01</td>
                        <td>PA</td>
                        <td>Patricia Alencar</td>
                        <td>patricia@email.com</td>
                        <td>
                            <Actions>
                                <button type="button">
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
                </tbody>
            </DeliverymanTable>
        </>
    );
}
