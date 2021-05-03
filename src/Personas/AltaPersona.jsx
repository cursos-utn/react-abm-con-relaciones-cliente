import React from 'react'
import axios from 'axios';

export default function AltaPersona(props) {
    const [form, setForm] = React.useState({
        nombre: '',
        apellido: ''
    })

    const handleChangeNombre = (e) => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeApellido = (e) => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.apellido = e.target.value;
        setForm(nuevoState);
    }

    const guardar = async() => {
        // form 
        await axios.post('https://react-abm-basico-server.herokuapp.com/api/personas', form);
        props.history.push('/');
    }


    return (
        <div>
            <input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre}/><br/>
            <input type="text" name="apellido" placeholder="apellido" value={form.apellido} onChange={handleChangeApellido}/><br/>
            <button onClick={guardar}>Guardar</button>
        </div>
    )
}
