import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditarPersona(props) {
    const params = useParams();
    const [form, setForm] = React.useState({
        nombre: '',
        apellido: ''
    })

    const buscarPersonaPorId = async(idPersona) => {
        try {
            const respuesta = await axios.get('https://react-abm-basico-server.herokuapp.com/api/personas/'+idPersona)
            setForm(respuesta.data)
        } catch(e) {

        }
    }

    React.useEffect(() => {
        if (!params.id) return;
        buscarPersonaPorId(params.id)
    }, [params])

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
        await axios.put('https://react-abm-basico-server.herokuapp.com/api/personas/'+params.id, form);
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
