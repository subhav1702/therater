import React from 'react';
import PropTypes from 'prop-types';

function Layout({ children }) {
    return (
        <>
            {children}
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.object.isRequired,
};

export default Layout;
