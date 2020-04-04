import React from 'react';
import { MdSearch, MdAdd, MdMoreHoriz } from 'react-icons/md';

export default function Deliveries() {
    return (
        <>
            <h1>Gerenciando encomendas</h1>
            <div>
                <div>
                    <MdSearch size={20} color="#999" />
                    <input type="text" placeholder="Buscar por encomendas" />
                </div>
                <button type="button">
                    <MdAdd size={22} color="#fff" />
                    CADASTRAR
                </button>
            </div>
            <table>
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
                            <button type="button">
                                <MdMoreHoriz size={20} color="#999" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>#01</td>
                        <td>Victor Vitoria Fontenele</td>
                        <td>Patricia Alencar</td>
                        <td>Teresina</td>
                        <td>Piaui</td>
                        <td>Entregue</td>
                        <td>
                            <button type="button">
                                <MdMoreHoriz size={20} color="#999" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>#01</td>
                        <td>Victor Vitoria Fontenele</td>
                        <td>Patricia Alencar</td>
                        <td>Teresina</td>
                        <td>Piaui</td>
                        <td>Entregue</td>
                        <td>
                            <button type="button">
                                <MdMoreHoriz size={20} color="#999" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
