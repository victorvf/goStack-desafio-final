import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function MainButton({ children, ...props }) {
    return <Button {...props}>{children}</Button>;
}

MainButton.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
        .isRequired,
};
