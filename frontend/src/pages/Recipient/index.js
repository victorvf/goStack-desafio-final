import React from 'react';
import { MdSearch, MdRemoveRedEye, MdEdit, MdDelete } from 'react-icons/md';

import Actions from '~/components/Actions';
import RegisterButton from '~/components/RegisterButton';

import { Search, SearchButton, RecipientTable } from './styles';

export default function Recipient() {
    return (
        <>
            <h1>Gerenciando destinatários</h1>
            <Search>
                <SearchButton>
                    <MdSearch size={20} color="#999" />
                    <input type="text" placeholder="Buscar por encomendas" />
                </SearchButton>
                <RegisterButton />
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
                    <tr>
                        <td>#01</td>
                        <td>Patricia Alencar</td>
                        <td>Rua Tomaz Rebelo, Teresina-Piaui</td>
                        <td>
                            <Actions>
                                <button type="button">
                                    <MdRemoveRedEye color="#8E5BE8" />
                                    Visualizar
                                </button>
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
                        <td>Patricia Alencar</td>
                        <td>Rua Tomaz Rebelo, Teresina-Piaui</td>
                        <td>
                            <Actions>
                                <button type="button">
                                    <MdRemoveRedEye color="#8E5BE8" />
                                    Visualizar
                                </button>
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
                        <td>Patricia Alencar</td>
                        <td>Rua Tomaz Rebelo, Teresina-Piaui</td>
                        <td>
                            <Actions>
                                <button type="button">
                                    <MdRemoveRedEye color="#8E5BE8" />
                                    Visualizar
                                </button>
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
            </RecipientTable>
        </>
    );
}
