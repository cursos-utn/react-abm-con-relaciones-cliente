import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <ul>
            <li>
                <Link to="/personas">Personas</Link>
            </li>

            <li>
                <Link to="/telefonos">Telefonos</Link>
            </li>
        </ul>
    );
}
