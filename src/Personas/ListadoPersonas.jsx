import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function ListadoPersonas() {

    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    const traerPersonas = async() => {
        try {
            const respuesta = await axios.get('https://react-abm-basico-server.herokuapp.com/api/personas');
            setListado(respuesta.data);
            setError('');
        } catch(e) {
            if (e.message=='Network error') {
                setError('No me pude conectar con el servidor');
            } else {
                setError('Otro mensaje que venga del server');
            }
        }
    }

    React.useEffect(() => {
        traerPersonas();
    }, [])

    const borrarPersona = async(idPersonaABorrar) => {
        try {
            await axios.delete('https://react-abm-basico-server.herokuapp.com/api/personas/' + idPersonaABorrar)
            traerPersonas();
        } catch(e) {

        }
    }


    return (
        <div>
            <Link to={"/personas/agregar"}>Agregar</Link>
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
                    {listado.map(unaPersona => (
                        <tr>
                            <td>{unaPersona.nombre}</td>
                            <td>{unaPersona.apellido}</td>
                            <td>
                                <Link to={"/personas/editar/"+unaPersona.id.toString()}>Editar</Link> |&nbsp;
                                <Link onClick={() => borrarPersona(unaPersona.id)}>Borrar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
