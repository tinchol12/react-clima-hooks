import React, { useState, useEffect } from 'react';

import Header from './Components/Header';
import Formulario from './Components/Formulario';
import Error from './Components/Error';
import Clima from './Components/Clima';

function App() {

  //State Principal
  const [ ciudad, guardarCiudad ] = useState('');
  const [ pais, guardarPais ] = useState('');
  const [ error, guardarError ] = useState(false); //arranca como false
  const [ resultado, guardarResultado ] = useState({});

  useEffect(() => {

    // prevenir ejecución
    if(ciudad === '') return;

    const consultarAPI = async () => {
        const appId = 'b06655432a64797441e54e702e22dd84';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`; 
  
      // consultar la URL
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

       guardarResultado(resultado);
    }

    consultarAPI();
  }, [ ciudad, pais ]);

  const datosConsulta = datos => {
    //Validar que ambos campos este ocupados
    if(datos.ciudad === '' || datos.pais === '') {
      guardarError(true);
      return;
    }

    // Ciudad y pais existen, agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }  

  //Cargar un componente condicionalmente (si cumple, se carga)
  let componente;
  if(error) {
    //Existe el error, mostrarlo
    componente = <Error mensaje='Ambos campos son obligatorios' />
  }
  else if(resultado.cod === '404') {
    componente = <Error mensaje='La ciudad no existe en ese País' />
  }
  else {
    //No existe error, Mostrar el clima
    componente = <Clima resultado={resultado} />;
  }


  return (
     <div className="App">
        <Header 
          titulo='Clima React App'
        />

       <div className="contenedor-form">
          <div className="container">
              <div className="row">
                  <div className="col s12 m6">
                      <Formulario 
                        datosConsulta={datosConsulta}
                      />
                  </div>

                  <div className="col s12 m6">
                      {componente}
                  </div>

              </div>
          </div>
       </div>

     </div>
  );
}

export default App;