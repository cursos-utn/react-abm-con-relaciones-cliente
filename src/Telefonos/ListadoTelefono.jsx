import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function ListadoTelefonos() {
    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    const traerTelefonos = async () => {
        try {
            const respuestaTelefonos = await axios.get('https://react-abm-basico-server.herokuapp.com/api/personas');
            const listadoPersonas = respuestaTelefonos.data;
            const respuesta = await axios.get('https://react-abm-basico-server.herokuapp.com/api/telefonos');
            const newListado = respuesta.data.map(unTelefono => {
                const personaAsociada = listadoPersonas.find(unaPersona => unaPersona.id == unTelefono.persona_id);
                const nuevaEstructuraTelefono = JSON.parse(JSON.stringify(unTelefono));
                nuevaEstructuraTelefono.persona = personaAsociada
                    ? personaAsociada.nombre + ' ' + personaAsociada.apellido
                    : '';
                return nuevaEstructuraTelefono;
            });
            setListado(respuesta.data);
            setError('');
        } catch (e) {
            if (e.message == 'Network error') {
                setError('No me pude conectar con el servidor');
            } else {
                setError('Otro mensaje que venga del server');
            }
        }
    };

    React.useEffect(() => {
        traerTelefonos();
    }, []);

    const borrarTelefono = async idTelefonoABorrar => {
        try {
            await axios.delete('https://react-abm-basico-server.herokuapp.com/api/telefonos/' + idTelefonoABorrar);
            traerTelefonos();
        } catch (e) {}
    };

    return (
        <div>
            <Link to={'/telefonos/agregar'}>Agregar</Link>
            {error ? <>Error en la conexión</> : <></>}
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listado.map(unTelefono => (
                        <tr>
                            <td>{unTelefono.numero}</td>
                            <td>
                                <Link to={'/telefonos/editar/' + unTelefono.id.toString()}>Editar</Link> |&nbsp;
                                <Link onClick={() => borrarTelefono(unTelefono.id)}>Borrar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
