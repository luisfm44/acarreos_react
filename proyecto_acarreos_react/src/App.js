import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import axios from 'axios'





function App(props) {
  const [message, setMessage] = useState(false)
  let [form, setForm] = useState({
    acarreo_cedula: props.acarreo_cedula || ''
  })



  async function handleSubmit(e) {
    e.preventDefault()
    const endpoint = 'acarreo'
    let finalForm = new FormData();

    try {
      const createAcarreo = await axios({
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Max-Age": "1800",
          "Access-Control-Allow-Headers": "content-type",
          "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          "Content-Type": "multipart/form-data"
          // res.setHeader("Content-Type", "application/json;charset=utf-8");
        },
        url: `http://localhost:8080/${endpoint}`,
        data: finalForm
      });

      if (createAcarreo.status >= 200 && createAcarreo.status < 300) {
        console.log('guardó')
      } else {
        setMessage(createAcarreo.message)
      }
    } catch (error) {
      setMessage(error.message)
    }
  }
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  function handleChangeFile(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.files[0]
    })
  }



  return (
    <div className="App">
      <header className="Aplicación Acarreos - pruebaTech">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="acarreo_cedula">Cédula trabajador: </label>
            <input type="text" id="acarreo_cedula" name="acarreo_cedula" className="form-control" onChange={handleChange} value={form.acarreo_cedula} required />
          </div>
          <div className="form-group App-file-description">
            <label htmlFor="acarreo_file">Archivo: </label>
            <input type="file" id="acarreo_file" name="acarreo_file" className="form-control" onChange={handleChangeFile} />

          </div>
          <button type="submit" className="App-button-save">Guardar</button>
        </form>
      </header>
    </div>
  );
}

export default App;
