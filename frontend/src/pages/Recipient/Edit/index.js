import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';

import MainButton from '~/components/MainButton';

import { Container, Content, FirstForm, MiddleForm, LastForm } from './styles';

export default function EditRecipient() {
    return (
        <Container>
            <div>
                <h1>Edição de encomendas</h1>
                <div>
                    <MainButton back onClick={() => history.push('/recipient')}>
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
                    <FirstForm>
                        <span>Nome</span>
                        <Input name="name" placeholder="John Doe" />
                    </FirstForm>
                    <MiddleForm>
                        <div>
                            <span>Rua</span>
                            <Input
                                name="street"
                                placeholder="Rua Joaquim Pires"
                            />
                        </div>

                        <div>
                            <span>Número</span>
                            <Input name="number" placeholder="1068" />
                        </div>

                        <div>
                            <span>Complemento</span>
                            <Input name="complement" />
                        </div>
                    </MiddleForm>
                    <LastForm>
                        <div>
                            <span>Cidade</span>
                            <Input name="city" placeholder="Teresina" />
                        </div>

                        <div>
                            <span>Estado</span>
                            <Input name="state" placeholder="PI" />
                        </div>

                        <div>
                            <span>CEP</span>
                            <Input name="cep" placeholder="64.049-000" />
                        </div>
                    </LastForm>
                </Form>
            </Content>
        </Container>
    );
}
