import React, { useState, useEffect } from 'react';
import { MdRemoveRedEye, MdDelete, MdClose } from 'react-icons/md';

import api from '~/services/api';

import Actions from '~/components/Actions';

import { ProblemTable, View, ViewContent, HeaderView } from './styles';

export default function Problem() {
    const [view, setView] = useState(false);
    const [problems, setProblems] = useState([]);
    const [problemView, setProblemView] = useState({});

    useEffect(() => {
        async function loadProblems() {
            const response = await api.get('/delivery/problems');

            setProblems(response.data);
        }

        loadProblems();
    }, []);

    function handleProblemView(data) {
        const { description } = data;

        setProblemView({ description });

        setView(!view);
    }

    function handleCloseView() {
        setProblemView({});

        setView(!view);
    }

    return (
        <>
            <div>
                <h1>Gerenciando entregadores</h1>
                {problems.length === 0 ? (
                    <div>
                        <p>Não possui problemas</p>
                    </div>
                ) : (
                    <ProblemTable>
                        <thead>
                            <tr>
                                <th>Encomenda</th>
                                <th>Problema</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {problems.map((problem) => (
                                <tr>
                                    <td>{`#${problem.delivery.id} - ${problem.delivery.product}`}</td>
                                    <td>{problem.description}</td>
                                    <td>
                                        <Actions problem>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleProblemView(problem)
                                                }
                                            >
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
                            ))}
                        </tbody>
                    </ProblemTable>
                )}
            </div>

            <View view={view}>
                <ViewContent>
                    <HeaderView>
                        <strong>VISUALIZAR PROBLEMA:</strong>
                        <button type="button" onClick={() => handleCloseView()}>
                            <MdClose size={20} color="#333" />
                        </button>
                    </HeaderView>
                    <span>{problemView.description}</span>
                </ViewContent>
            </View>
        </>
    );
}
