import React, { useState, useEffect } from 'react';
import { MdRemoveRedEye, MdDelete, MdClose, MdSearch } from 'react-icons/md';

import api from '~/services/api';

import Actions from '~/components/Actions';

import {
    ProblemTable,
    View,
    ViewContent,
    HeaderView,
    SearchButton,
    Footer,
} from './styles';

export default function Problem() {
    const [view, setView] = useState(false);
    const [problems, setProblems] = useState([]);
    const [problemView, setProblemView] = useState({});
    const [problemQuery, setProblemQuery] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function loadProblems() {
            const response = await api.get('/delivery/problems', {
                params: { problemQuery, page },
            });

            setProblems(response.data);
        }

        loadProblems();
    }, [problemQuery, page]);

    function handleProblemView(data) {
        const { description } = data;

        setProblemView({ description });

        setView(!view);
    }

    function handleCloseView() {
        setProblemView({});

        setView(!view);
    }

    function handleQuery(event) {
        setProblemQuery(event.target.value);
    }

    return (
        <>
            <div>
                <h1>Gerenciando entregadores</h1>
                <SearchButton>
                    <MdSearch size={20} color="#999" />
                    <input
                        type="text"
                        placeholder="Buscar por entregadores"
                        onChange={handleQuery}
                    />
                </SearchButton>
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
                                <tr key={problem.id}>
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

            <Footer>
                <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Anterior
                </button>

                <span>{`página: ${page}`}</span>

                <button type="button" onClick={() => setPage(page + 1)}>
                    Próxima
                </button>
            </Footer>

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
