import React, { useState } from 'react';
import { MdRemoveRedEye, MdDelete, MdClose } from 'react-icons/md';

import Actions from '~/components/Actions';

import { ProblemTable, View, ViewContent, HeaderView } from './styles';

export default function Problem() {
    const [view, setView] = useState(false);

    function handleView() {
        setView(!view);
    }

    return (
        <>
            <div>
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
                                Deu tal problema na entrega, porque não tava
                                dando para entregar essa coisa
                            </td>
                            <td>
                                <Actions problem>
                                    <button type="button" onClick={handleView}>
                                        <MdRemoveRedEye color="#8E5BE8" />
                                        Visualizar
                                    </button>

                                    <button type="button">
                                        <MdDelete color="#DE3B3B" />
                                        Cancelar encomenda
                                    </button>
                                </Actions>
                            </td>
                        </tr>
                        <tr>
                            <td>#01</td>
                            <td>
                                Deu tal problema na entrega, porque não tava
                                dando para entregar essa coisa
                            </td>
                            <td>
                                <Actions problem>
                                    <button type="button" onClick={handleView}>
                                        <MdRemoveRedEye color="#8E5BE8" />
                                        Visualizar
                                    </button>

                                    <button type="button">
                                        <MdDelete color="#DE3B3B" />
                                        Cancelar encomenda
                                    </button>
                                </Actions>
                            </td>
                        </tr>
                        <tr>
                            <td>#01</td>
                            <td>
                                Deu tal problema na entrega, porque não tava
                                dando para entregar essa coisa
                            </td>
                            <td>
                                <Actions problem>
                                    <button type="button" onClick={handleView}>
                                        <MdRemoveRedEye color="#8E5BE8" />
                                        Visualizar
                                    </button>

                                    <button type="button">
                                        <MdDelete color="#DE3B3B" />
                                        Cancelar encomenda
                                    </button>
                                </Actions>
                            </td>
                        </tr>
                    </tbody>
                </ProblemTable>
            </div>

            <View view={view}>
                <ViewContent>
                    <HeaderView>
                        <strong>VISUALIZAR PROBLEMA:</strong>
                        <button type="button" onClick={handleView}>
                            <MdClose size={20} color="#333" />
                        </button>
                    </HeaderView>
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec in mauris et felis eleifend elementum vel quis
                        lectus. Vivamus dapibus nisi augue, vitae ultrices
                        ligula elementum at. Proin ut metus in mi tincidunt
                        vestibulum a a felis. Aenean dictum libero eu urna
                        tristique vestibulum. Fusce feugiat justo et augue
                        facilisis, sit amet ornare eros consequat. Suspendisse
                        semper risus feugiat nisl commodo, sed mollis neque
                        auctor. Nullam eu fringilla lectus. Phasellus sed sapien
                        sed turpis imperdiet maximus. Aenean ante nulla.
                    </span>
                </ViewContent>
            </View>
        </>
    );
}
