import React from 'react';
import axios from 'axios';

export default function AltaTelefono(props) {
    const [personas, setPersonas] = React.useState([]);
    const [form, setForm] = React.useState({
        numero: '',
        persona_id: '',
    });

    const obtenerPersonas = async () => {
        try {
            const respuesta = await axios.get('https://react-abm-basico-server.herokuapp.com/api/personas');
            setPersonas(respuesta.data);
        } catch (e) {}
    };

    React.useEffect(() => {
        obtenerPersonas();
    }, []);

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
        await axios.post('https://react-abm-basico-server.herokuapp.com/api/telefonos', form);
        props.history.push('/telefonos');
    };

    return (
        <div>
            <input type="text" name="numero" placeholder="numero" value={form.numero} onChange={handleChangeNumero} />
            <select name="persona_id" onChange={handleChangePersona}>
                <option value="">Seleccione una persona</option>
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
