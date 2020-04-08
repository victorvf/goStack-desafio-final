import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';

import MainButton from '~/components/MainButton';

import AvatarInput from '../AvatarInput';

import { Container, Content } from './styles';

export default function EditDeliveryman() {
    return (
        <Container>
            <div>
                <h1>Edição de encomendas</h1>
                <div>
                    <MainButton
                        back
                        onClick={() => history.push('/deliveryman')}
                    >
                        <MdKeyboardArrowLeft size={20} color="#fff" />
                        Voltar
                    </MainButton>
                    <MainButton>
                        <MdDone size={20} color="#fff" />
                        Salvar
                    </MainButton>
                </div>
            </div>

            <Content>
                <Form>
                    <AvatarInput name="avatar_id" />

                    <span>Entregador</span>
                    <Input name="deliveryman" placeholder="John Doe" />

                    <span>Produto</span>
                    <Input name="delivery" placeholder="Samsung J5" />
                </Form>
            </Content>
        </Container>
    );
}
