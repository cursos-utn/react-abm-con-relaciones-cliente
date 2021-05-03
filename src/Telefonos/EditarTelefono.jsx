import React from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export default function EditarTelefono(props) {
    const params = useParams();
    const [personas, setPersonas] = React.useState([]);
    const [form, setForm] = React.useState({
        numero: '',
        persona_id: '',
    });

    const buscarTelefonoPorId = async idTelefono => {
        try {
            const respuesta = await axios.get(
                'https://react-abm-basico-server.herokuapp.com/api/telefonos/' + idTelefono,
            );
            setForm(respuesta.data);
        } catch (e) {}
    };

    const obtenerPersonas = async () => {
        try {
            const respuesta = await axios.get('https://react-abm-basico-server.herokuapp.com/api/personas');
            setPersonas(respuesta.data);
        } catch (e) {}
    };

    React.useEffect(() => {
        obtenerPersonas();
    }, []);

    React.useEffect(() => {
        if (!params.id) return;
        buscarTelefonoPorId(params.id);
    }, [params]);

    const handleChangeNumero = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.numero = e.target.value;
        setForm(nuevoState);
    };

    const handleChangePersona = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.persona_id = e.target.value;
        setForm(nuevoState);
    };

    const guardar = async () => {
        // form
        await axios.put('https://react-abm-basico-server.herokuapp.com/api/telefonos/' + params.id, form);
        props.history.push('/');
    };

    return (
        <div>
            <input type="text" name="numero" placeholder="numero" value={form.numero} onChange={handleChangeNumero} />
            <br />
            <select name="persona_id" onChange={handleChangePersona}>
                {personas.map(unaPersona => (
                    <option value={unaPersona.id}>
                        {unaPersona.nombre} {unaPersona.apellido}
                    </option>
                ))}
            </select>
            <button onClick={guardar}>Guardar</button>
        </div>
    );
}
