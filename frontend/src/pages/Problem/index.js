import React from 'react';
import { MdRemoveRedEye, MdEdit, MdDelete } from 'react-icons/md';

import Actions from '~/components/Actions';

import { ProblemTable } from './styles';

export default function Problem() {
    return (
        <>
            <h1>Gerenciando entregadores</h1>
            <ProblemTable>
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
                        <td>
                            Deu tal problema na entrega, porque não tava dando
                            para entregar essa coisa
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
                        <td>
                            Deu tal problema na entrega, porque não tava dando
                            para entregar essa coisa
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
            </ProblemTable>
        </>
    );
}
