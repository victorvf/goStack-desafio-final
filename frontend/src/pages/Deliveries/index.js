import React, { useState } from 'react';
import {
    MdSearch,
    MdRemoveRedEye,
    MdEdit,
    MdDelete,
    MdAdd,
    MdClose,
} from 'react-icons/md';

import history from '~/services/history';

import Actions from '~/components/Actions';
import MainButton from '~/components/MainButton';

import signature from '~/assets/signature.png';
import {
    Search,
    SearchButton,
    DeliveryTable,
    View,
    ViewContent,
    HeaderView,
    Informations,
    Date,
    Signature,
} from './styles';

export default function Deliveries() {
    const [view, setView] = useState(false);

    function handleView() {
        setView(!view);
    }

    return (
        <>
            <div>
                <h1>Gerenciando encomendas</h1>
                <Search>
                    <SearchButton>
                        <MdSearch size={20} color="#999" />
                        <input
                            type="text"
                            placeholder="Buscar por encomendas"
                        />
                    </SearchButton>

                    <MainButton
                        onClick={() => history.push('/deliveries/register')}
                    >
                        <MdAdd size={20} color="#fff" />
                        CADASTRAR
                    </MainButton>
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
                                    <button type="button" onClick={handleView}>
                                        <MdRemoveRedEye color="#8E5BE8" />
                                        Visualizar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            history.push('/deliveries/edit')
                                        }
                                    >
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
                                    <button type="button" onClick={handleView}>
                                        <MdRemoveRedEye color="#8E5BE8" />
                                        Visualizar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            history.push('/deliveries/edit')
                                        }
                                    >
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
                                    <button type="button" onClick={handleView}>
                                        <MdRemoveRedEye color="#8E5BE8" />
                                        Visualizar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            history.push('/deliveries/edit')
                                        }
                                    >
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
            </div>

            <View view={view}>
                <ViewContent>
                    <HeaderView>
                        <strong>Informações da encomenda:</strong>
                        <button type="button" onClick={handleView}>
                            <MdClose size={20} color="#333" />
                        </button>
                    </HeaderView>

                    <Informations>
                        <span>Rua Beethoven, 1729</span>
                        <span>Diadema - SP</span>
                        <span>00.000-000</span>
                    </Informations>

                    <Date>
                        <strong>Datas:</strong>
                        <span>
                            <strong>Retirada: </strong>25/01/2020
                        </span>
                        <span>
                            <strong>Entrega: </strong>25/01/2020
                        </span>
                    </Date>

                    <Signature>
                        <strong>Assinatura do destinatário:</strong>
                        <img src={signature} alt="signature" />
                    </Signature>
                </ViewContent>
            </View>
        </>
    );
}
