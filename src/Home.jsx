import React from 'react';
import {RouterLink} from 'react-router-dom';

export default function Home() {
    return (
        <>
            <RouterLink to="/personas">Personas</RouterLink>
            <RouterLink to="/telefonos">Telefonos</RouterLink>
        </>
    );
}
