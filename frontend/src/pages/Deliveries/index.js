import React from 'react';
import { MdSearch, MdRemoveRedEye, MdEdit, MdDelete } from 'react-icons/md';

import Actions from '~/components/Actions';
import RegisterButton from '~/components/RegisterButton';

import { Search, SearchButton, DeliveryTable } from './styles';

export default function Deliveries() {
    return (
        <>
            <h1>Gerenciando encomendas</h1>
            <Search>
                <SearchButton>
                    <MdSearch size={20} color="#999" />
                    <input type="text" placeholder="Buscar por encomendas" />
                </SearchButton>
                <RegisterButton />
            </Search>

            <DeliveryTable>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Destinatário</th>
                        <th>Entregador</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#01</td>
                        <td>Victor Vitoria Fontenele</td>
                        <td>Patricia Alencar</td>
                        <td>Teresina</td>
                        <td>Piaui</td>
                        <td>
                            <span>ENTREGUE</span>
                        </td>
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
                        <td>Victor Vitoria Fontenele</td>
                        <td>Patricia Alencar</td>
                        <td>Teresina</td>
                        <td>Piaui</td>
                        <td>
                            <span>ENTREGUE</span>
                        </td>
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
                        <td>Victor Vitoria Fontenele</td>
                        <td>Patricia Alencar</td>
                        <td>Teresina</td>
                        <td>Piaui</td>
                        <td>
                            <span>ENTREGUE</span>
                        </td>
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
            </DeliveryTable>
        </>
    );
}
