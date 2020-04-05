import React from 'react';
import { MdAdd } from 'react-icons/md';

import { Button } from './styles';

export default function RegisterButton() {
    return (
        <Button type="button">
            <MdAdd size={22} color="#fff" />
            CADASTRAR
        </Button>
    );
}
