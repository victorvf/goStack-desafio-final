import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';

export default function Problem() {
    return (
        <>
            <h1>Gerenciando entregadores</h1>
            <table>
                <thead>
                    <tr>
                        <th>Encomenda</th>
                        <th>Problema</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#01</td>
                        <td>
                            Deu tal problema na entrega, porque não tava dando
                            para entregar essa coisa
                        </td>
                        <td>
                            <button type="button">
                                <MdMoreHoriz size={20} color="#999" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>#01</td>
                        <td>
                            Deu tal problema na entrega, porque não tava dando
                            para entregar essa coisa
                        </td>
                        <td>
                            <button type="button">
                                <MdMoreHoriz size={20} color="#999" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>#01</td>
                        <td>
                            Deu tal problema na entrega, porque não tava dando
                            para entregar essa coisa
                        </td>
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
