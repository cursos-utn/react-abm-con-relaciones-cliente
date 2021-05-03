import {BrowserRouter as Router, Route} from 'react-router-dom';
import AltaPersona from './Personas/AltaPersona';
import EditarPersona from './Personas/EditarPersona';
import ListadoPersonas from './Personas/ListadoPersonas';
import Home from './Home';
import ListadoTelefonos from './Telefonos/ListadoTelefono';
import EditarTelefono from './Telefonos/EditarTelefono';
import AltaTelefono from './Telefonos/AltaTelefono';

export default function App() {
    return (
        <div>
            <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/personas" component={ListadoPersonas} />
                <Route exact path="/personas/editar/:id" component={EditarPersona} />
                <Route exact path="/personas/agregar" component={AltaPersona} />

                <Route exact path="/telefonos" component={ListadoTelefonos} />
                <Route exact path="/telefonos/editar/:id" component={EditarTelefono} />
                <Route exact path="/telefonos/agregar" component={AltaTelefono} />
            </Router>
        </div>
    );
}
