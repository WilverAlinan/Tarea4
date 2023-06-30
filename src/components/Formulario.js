import React, { useState } from 'react'
import Swal from 'sweetalert2'


const Formulario = () => {

    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [correo, setCorreo] = useState('');
    const [lista, setLista] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);

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
        if (apellido.trim() === '') {
            llenarCampos('Apellido')
            return
        }
        if (edad.trim() === '') {
            llenarCampos('Edad')
            return
        }
        if (correo.trim() === '') {
            llenarCampos('Correo')
        }

        const usuario = { codigo: generarId(), nombre, apellido, edad, correo }
        setLista([...lista, usuario])
        setNombre('')
        setApellido('')
        setEdad('')
        setCorreo('')

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Datos actualizados',
            showConfirmButton: false,
            timer: 1500
        })
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
                const filtro = lista.filter((persona) => persona.codigo !== codigo)
                setLista(filtro)
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
        setApellido(persona.apellido)
        setEdad(persona.edad)
        setCorreo(persona.correo)
        setModoEdicion(true)
    }

    const guardarCambios = (e) => {
        e.preventDefault()
        if (nombre.trim() === '') {
            llenarCampos('Nombre')
            return
        }
        if (apellido.trim() === '') {
            llenarCampos('Apellido')
            return
        }
        if (edad.trim() === '') {
            llenarCampos('Edad')
            return
        }
        if (correo.trim() === '') {
            llenarCampos('Correo')
            return
        }

        const editado = lista.map(persona => persona.codigo === codigo ? { codigo, nombre, apellido, edad, correo } : persona) //si el nombre es igual al nombre que se esta editando, se edita, si no, se deja igual
        setLista(editado)
        setModoEdicion(false)

        setNombre('')
        setApellido('')
        setEdad('')
        setCorreo('')
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Datos actualizados',
            showConfirmButton: false,
            timer: 1500
        })
    }

    


    return (

        <div className='container py-5'>
            <h1>Formulario</h1>
            <form className='form-group'>
                <input
                    type="text"
                    placeholder='Nombre'
                    className='form-control mb-3'
                    value={nombre}
                    onChange={(e) => { setNombre(e.target.value) }} //e.target.value es el valor que se ingresa en el input
                />
                <input
                    type="text"
                    placeholder='Apellido'
                    className='form-control mb-3'
                    value={apellido}
                    onChange={(e) => { setApellido(e.target.value) }}
                />
                <input
                    type="number"
                    min={0}
                    max={100}
                    placeholder='Edad'
                    className='form-control mb-3'
                    value={edad}
                    onChange={(e) => { setEdad(e.target.value) }}
                />
                <input
                    type="email"
                    placeholder='Correo'
                    className='form-control mb-3'
                    value={correo}
                    onChange={(e) => { setCorreo(e.target.value) }}
                />
                {
                    modoEdicion ?
                        (<button className='btn btn-warning btn-block'
                            onClick={(e) => { guardarCambios(e) }}
                            type="submit">Guardar cambios</button>) :
                        (<button className='btn btn-primary btn-block'
                            onClick={(e) => { agregarUsuario(e) }}
                            type="submit"><span><i className="bi bi-plus-circle-fill"></i></span> Agregar Usuario</button>)
                }
            </form>

            <div className='container py-5'>
                <h1>Lista de personas</h1>
                <table className='table'>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope='col'>Codigo</th>
                            <th scope='col'>Nombre</th>
                            <th scope='col'>Apellido</th>
                            <th scope='col'>Edad</th>
                            <th scope='col'>Correo</th>
                            <th scope='col'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lista.map((persona) => (
                                <tr key={persona.codigo}>
                                    <td>{persona.codigo}</td>
                                    <td>{persona.nombre}</td>
                                    <td>{persona.apellido}</td>
                                    <td>{persona.edad}</td>
                                    <td>{persona.correo}</td>
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



        </div >


    )
}

export default Formulario