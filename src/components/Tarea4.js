import React, { useState } from 'react'
import style from '../css/style.css'
import Swal from 'sweetalert2';


const Tarea4 = () => {

  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [edad, setEdad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [genero, setGenero] = useState('');
  const [listar, setListar] = useState([]);
  const [editando, setEditando] = useState(false);

  const generarId = () => {
    return Math.floor(Math.random() * 100000000)

  }

  const llenarCampos = (dato) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `El campo ${dato} esta vacio`
    })
  }

  const agregarUsuario = (e) => {
    e.preventDefault()
    if (nombre.trim() === '') {
      llenarCampos('Nombre')
      return
    }
    if (apellido1.trim() === '') {
      llenarCampos('Primer Apellido')
      return
    }
    if (apellido2.trim() === '') {
      llenarCampos('Segundo Apellido')
      return
    }
    if (edad.trim() === '') {
      llenarCampos('Edad')
      return
    }
    if (direccion.trim() === '') {
      llenarCampos('Direccion')
    }
    if (ciudad.trim() === '') {
      llenarCampos('Ciudad')
    }
    if (genero.trim() === '') {
      llenarCampos('Genero')
    }

    const usuario = { codigo: generarId(), nombre, apellido1, apellido2, edad, direccion, ciudad, genero }
    setListar([...listar, usuario])
    // console.log(usuario)
    setNombre('')
    setApellido1('')
    setApellido2('')
    setEdad('')
    setDireccion('')
    setCiudad('')
    setGenero('')

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Datos actualizados',
      showConfirmButton: false,
      timer: 1500
    })
    console.log(listar)
  }

  const eliminar = (codigo) => {
    Swal.fire({
      title: 'Estas seguro de eliminar el registro?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        const filtro = listar.filter((persona) => persona.codigo !== codigo)
        setListar(filtro)
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
      }
    })
  }


  const editar = (persona) => {
    setCodigo(persona.codigo)
    setNombre(persona.nombre)
    setApellido1(persona.apellido1)
    setApellido2(persona.apellido2)
    setEdad(persona.edad)
    setDireccion(persona.direccion)
    setCiudad(persona.ciudad)
    setGenero(persona.genero)
    setEditando(true)
  }

  const guardarCambios = (e) => {
    e.preventDefault()
    if (nombre.trim() === '') {
      llenarCampos('Nombre')
      return
    }
    if (apellido1.trim() === '') {
      llenarCampos('Primer Apellido')
      return
    }
    if (apellido2.trim() === '') {
      llenarCampos('Segundo Apellido')
      return
    }
    if (edad.trim() === '') {
      llenarCampos('Edad')
      return
    }
    if (direccion.trim() === '') {
      llenarCampos('Direccion')
      return
    }
    if (ciudad.trim() === '') {
      llenarCampos('Ciudad')
      return
    }
    if (genero.trim() === '') {
      llenarCampos('Genero')
      return
    }

    const editado = listar.map(persona => persona.codigo === codigo ? { codigo, nombre, apellido1, apellido2, edad, direccion, ciudad, genero } : persona) //si el nombre es igual al nombre que se esta editando, se edita, si no, se deja igual
    setListar(editado)
    setEditando(false)

    setNombre('')
    setApellido1('')
    setApellido2('')
    setEdad('')
    setDireccion('')
    setCiudad('')
    setGenero('')
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Datos actualizados',
      showConfirmButton: false,
      timer: 1500
    })
  }






  return (
    <div className='container-md mt-5 '>

      <div className='fom-group'>
        <form >

          <div className="columnas">
            <div className="mb-3">
              <label className="form-label"> Nombre </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese Nombre"
                value={nombre}
                onChange={(e) => { setNombre(e.target.value) }}

              />
            </div>

            <div className="mb-3">
              <label className="form-label"> Primer Apellido </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese Primer Apellido"
                value={apellido1}
                onChange={(e) => { setApellido1(e.target.value) }}
              />
            </div>
          </div>

          <div className='columnas'>
            <div className="mb-3 ">
              <label className="form-label">Segundo Apellido</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese Segundo Apellido"
                value={apellido2}
                onChange={(e) => { setApellido2(e.target.value) }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label"> Edad </label>
              <input
                type="number"
                min={0}
                max={100}
                className="form-control"
                placeholder="Ingrese Edad"
                value={edad}
                onChange={(e) => { setEdad(e.target.value) }}
              />
            </div>
          </div>

          <div className="mb-3 ">
            <label className="form-label"> Direccion </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese Direccion"
              value={direccion}
              onChange={(e) => { setDireccion(e.target.value) }}
            />
          </div>

          <div className='columnas'>
            <div>
              <label className="form-label mb-3"> Ciudad </label>
              <select className="form-select" aria-label="Default select example"
                value={ciudad}
                onChange={(e) => { setCiudad(e.target.value) }}
              >
                <option >Seleccione una Ciudad</option>
                <option value={'Guatemala'}>Guatemala</option>
                <option value={'Sacatepequez'}>Sacatepequez</option>
                <option value={'Escuintla'}>Escuintla</option>
                <option value={'San Marcos'}>San Marcos</option>
                <option value={'Santa Rosa'}>Santa Rosa</option>
              </select>
            </div>
            <br />
            <div>
              <label className="form-label mb-3"> Genero </label>
              <select className="form-select" aria-label="Default select example"
                value={genero}
                onChange={(e) => { setGenero(e.target.value) }}
              >
                <option >Seleccione Genero</option>
                <option value={'Femenino'}>Femenino</option>
                <option value={'Masculino'}>Masculino</option>
                <option value={'Sin Especificar'}>Sin Especificar</option>
              </select>
            </div>
          </div>

          {
            editando ?
              (<button className='btn btn-warning btn-block mi-boton'
                onClick={(e) => { guardarCambios(e) }}
                type="submit">Guardar cambios</button>) :
              (<button className='btn btn-primary btn-block'
                onClick={(e) => { agregarUsuario(e) }}
                type="submit"><span><i className="bi bi-plus-circle-fill"></i></span> Agregar Usuario</button>)
          }

        </form>
      </div>

      <div className='container py-5'>
        <table className='table'>
          <thead className='cabecera'>
            <tr>
              <th scope='col'>Codigo</th>
              <th scope='col'>Nombre</th>
              <th scope='col'>Primer Apellido</th>
              <th scope='col'>Segundo Apellido</th>
              <th scope='col'>Edad</th>
              <th scope='col'>Direccion</th>
              <th scope='col'>Ciudad</th>
              <th scope='col'>Genero</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>


          <tbody>
            {
              listar.map((persona) => (
                <tr key={persona.codigo}>
                  <td>{persona.codigo}</td>
                  <td>{persona.nombre}</td>
                  <td>{persona.apellido1}</td>
                  <td>{persona.apellido2}</td>
                  <td>{persona.edad}</td>
                  <td>{persona.direccion}</td>
                  <td>{persona.ciudad}</td>
                  <td>{persona.genero}</td>
                  <td>
                    <button className='btn btn-warning mx-3'
                      onClick={() => { editar(persona) }}
                    >Editar</button>
                    <button className='btn btn-danger mx-3 '
                      onClick={() => { eliminar(persona.codigo) }}
                    >Eliminar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>


    </div>
  )
}

export default Tarea4