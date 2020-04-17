import React, { useState, useEffect } from 'react';
import {
    MdSearch,
    MdRemoveRedEye,
    MdEdit,
    MdDelete,
    MdAdd,
    MdClose,
} from 'react-icons/md';
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import Actions from '~/components/Actions';
import MainButton from '~/components/MainButton';

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
    Status,
    Footer,
    Deliveryman,
} from './styles';

export default function Deliveries() {
    const [deliveries, setDeliveries] = useState([]);
    const [deliveryQuery, setDeliveryQuery] = useState('');
    const [page, setPage] = useState(1);

    const [deliveryView, setDeliveryView] = useState({});
    const [view, setView] = useState(false);

    useEffect(() => {
        async function loadDeliveries() {
            const response = await api.get('/orders', {
                params: { deliveryQuery, page },
            });

            const data = response.data.map((delivery) => {
                if (delivery.end_date) {
                    delivery.status = 'ENTREGUE';
                } else if (delivery.canceled_at) {
                    delivery.status = 'CANCELADA';
                } else if (delivery.start_date) {
                    delivery.status = 'RETIRADA';
                } else {
                    delivery.status = 'PENDENTE';
                }

                return delivery;
            });

            setDeliveries(data);
        }

        loadDeliveries();
    }, [deliveryQuery, page]);

    function handleDeliveryView(data) {
        const { street, number, city, state, cep } = data.recipient;
        const { start_date, end_date } = data;

        let url = null;

        if (data.signature) {
            url = data.signature.url;
        }

        const startDateFormatted = start_date
            ? format(parseISO(start_date), 'dd/MM/yyyy - HH:mm')
            : 'data indisponível';

        const endDateFormatted = end_date
            ? format(parseISO(end_date), 'dd/MM/yyyy - HH:mm')
            : 'data indisponível';

        setDeliveryView({
            street,
            number,
            city,
            state,
            cep,
            start_date: startDateFormatted,
            end_date: endDateFormatted,
            url,
        });

        setView(!view);
    }

    function handleCloseView() {
        setDeliveryView({});

        setView(!view);
    }

    async function handleRemove(id) {
        const removeAlert = window.confirm(
            'Tem certeza que deseja excluir a encomenda ?'
        );

        if (!removeAlert) return;

        try {
            await api.delete(`/order/${id}/delete`);

            const newDeliveries = deliveries.filter((d) => d.id !== id);

            setDeliveries(newDeliveries);
        } catch (err) {
            toast.error('Falha ao excluir encomenda! Tente novamente');
        } finally {
            toast.success('Encomenda excluída com sucesso!');
        }
    }

    function handleEdit(delivery) {
        history.push({
            pathname: '/deliveries/edit',
            state: { delivery },
        });
    }

    function handleQuery(event) {
        setDeliveryQuery(event.target.value);
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
                            onChange={handleQuery}
                        />
                    </SearchButton>

                    <MainButton
                        type="button"
                        onClick={() => history.push('/deliveries/register')}
                    >
                        <MdAdd size={20} color="#fff" />
                        CADASTRAR
                    </MainButton>
                </Search>
                {deliveries.length === 0 ? (
                    <div>
                        <p>Não possui encomendas</p>
                    </div>
                ) : (
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
                            {deliveries.map((delivery) => (
                                <tr key={delivery.id}>
                                    <td>{`#${delivery.id}`}</td>
                                    <td>{delivery.recipient.name}</td>
                                    <td>
                                        <Deliveryman>
                                            <img
                                                src={
                                                    delivery.deliveryman.avatar
                                                        ? delivery.deliveryman
                                                              .avatar.url
                                                        : `https://api.adorable.io/avatars/50/${delivery.deliveryman.name}.png`
                                                }
                                                alt="avatar"
                                            />
                                            <span>
                                                {delivery.deliveryman.name}
                                            </span>
                                        </Deliveryman>
                                    </td>
                                    <td>{delivery.recipient.city}</td>
                                    <td>{delivery.recipient.state}</td>
                                    <td>
                                        <Status status={delivery.status}>
                                            {delivery.status}
                                        </Status>
                                    </td>
                                    <td>
                                        <Actions>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeliveryView(delivery)
                                                }
                                            >
                                                <MdRemoveRedEye color="#8E5BE8" />
                                                Visualizar
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(delivery)
                                                }
                                            >
                                                <MdEdit color="#4D85EE" />
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemove(delivery.id)
                                                }
                                            >
                                                <MdDelete color="#DE3B3B" />
                                                Excluir
                                            </button>
                                        </Actions>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </DeliveryTable>
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
                        <strong>Informações da encomenda:</strong>
                        <button type="button" onClick={() => handleCloseView()}>
                            <MdClose size={20} color="#333" />
                        </button>
                    </HeaderView>

                    <Informations>
                        <span>{deliveryView.street}</span>
                        <span>{`${deliveryView.city} - ${deliveryView.state}`}</span>
                        <span>{deliveryView.cep}</span>
                    </Informations>

                    <Date>
                        <strong>Datas:</strong>
                        <span>
                            <strong>Retirada: </strong>
                            {deliveryView.start_date}
                        </span>
                        <span>
                            <strong>Entrega: </strong>
                            {deliveryView.end_date}
                        </span>
                    </Date>

                    <Signature>
                        <strong>Assinatura do destinatário:</strong>
                        {deliveryView.url ? (
                            <img src={deliveryView.url} alt="signature" />
                        ) : (
                            <span>Não possui assinatura</span>
                        )}
                    </Signature>
                </ViewContent>
            </View>
        </>
    );
}
