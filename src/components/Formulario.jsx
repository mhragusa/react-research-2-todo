import Swal from 'sweetalert2'
import { v4 as uuidv4} from 'uuid';
import { useFormulario } from '../hooks/useFormulario';

const Formulario = ({agregarTodo}) => {

  const initialState = {
    nombre: "Nombre del todo",
    descripcion: "Descripcion del todo",
    estado: 'pendiente',
    prioridad: false,
  }

  const [inputs, handleChange, reset] = useFormulario(initialState);

  const { nombre, descripcion, estado, prioridad } = inputs;
  
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!nombre.trim()) {
      e.target[0].focus();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre es obligatorio',
      })
      return;
    }

    if (!descripcion.trim()) {
      e.target[1].focus();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La descripción es obligatoria',
      })
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Tarea agragada!',
    })

    agregarTodo({
      nombre,
      descripcion,
      estado: estado === 'pendiente' ? false : true,
      prioridad,
      id: uuidv4(),
      // id: Date.now(),
    });

    reset();
  };

  return (
    <>
      <h3>Agregar TODO</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="form-control mb-2"
          name="nombre"
          placeholder="Ingrese TODO nombre"
          value={nombre}
          onChange={handleChange}
        />

        <textarea 
          className="form-control mb-2"
          placeholder="Ingrese TODO descripción"
          name="descripcion"
          value={descripcion}
          onChange={handleChange}
        />

        <select 
          className="form-control mb-2"
          name="estado"
          value={estado}
          onChange={handleChange}
        >
          <option value="pendiente">Pendiente</option>
          <option value="completado">Completado</option>
        </select>

        <div className="form-check">
          <input 
            id="flexCheckDefault"
            className="form-check-input"
            type="checkbox"
            name="prioridad"
            checked={prioridad}
            onChange={handleChange}
          />
          <label 
            className="form-check-label"
            htmlFor="flexCheckDefault">
            Tarea Prioritaria
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-2"
        >
          Agregar TODO
        </button>
      </form>
    </>
  )
}

export default Formulario
