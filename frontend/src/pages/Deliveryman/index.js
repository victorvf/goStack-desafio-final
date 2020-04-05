import React from 'react';
import { MdSearch, MdRemoveRedEye, MdEdit, MdDelete } from 'react-icons/md';

import Actions from '~/components/Actions';
import RegisterButton from '~/components/RegisterButton';

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
                <RegisterButton />
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
                        <td>PA</td>
                        <td>Patricia Alencar</td>
                        <td>patricia@email.com</td>
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
                        <td>PA</td>
                        <td>Patricia Alencar</td>
                        <td>patricia@email.com</td>
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
            </DeliverymanTable>
        </>
    );
}
