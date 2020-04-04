import React from 'react';
import { MdSearch, MdAdd, MdMoreHoriz } from 'react-icons/md';

export default function Deliveryman() {
    return (
        <>
            <h1>Gerenciando entregadores</h1>
            <div>
                <div>
                    <MdSearch size={20} color="#999" />
                    <input type="text" placeholder="Buscar por entregadores" />
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
                            <button type="button">
                                <MdMoreHoriz size={20} color="#999" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>#01</td>
                        <td>PA</td>
                        <td>Patricia Alencar</td>
                        <td>patricia@email.com</td>
                        <td>
                            <button type="button">
                                <MdMoreHoriz size={20} color="#999" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>#01</td>
                        <td>PA</td>
                        <td>Patricia Alencar</td>
                        <td>patricia@email.com</td>
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
