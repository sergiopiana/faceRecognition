/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Webcam from 'react-webcam';
import s from './Enroll.css';



class Enroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nombre:''}
    this.state = {grupo:''}
    this.state = {imagen:''}
    this.state = {mensaje:''}
    this.capture = this.capture.bind(this);
    this.grabar = this.grabar.bind(this);
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }
  capture(){
    let imagen = this.webcam.getScreenshot();
    //this.setState(imagen:imagen);
    console.log(imagen)
    this.grabar(imagen);
  };  
  // capture = () => {
  //   const imagen = this.webcam.getScreenshot();
  //   this.setState(imagen:imagen);
  //   console.log(imagen)
  //   grabar();
  // };  
  static propTypes = {
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  };

  grabar(imageSrc){
    let data = {
      "image": imageSrc,
      "subject_id":this.state.nombre,
      "gallery_name":this.state.grupo
    }
    fetch('https://api.kairos.com/enroll',{
      method: 'post',
      body:JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'app_id': '563d0676',
        'app_key': '364c193aab78446a85e0707a678aabd3'
      }
    })
    .then(response => response.json())
    .then((json) => {
      console.log("resultado:"+json.images[0].transaction.status)
      this.setState({mensaje:"resultado: "+json.images[0].transaction.status})
    })
  }

  handleChangeNombre(event) { 
    event.preventDefault();
    this.setState({ nombre: event.target.value });  //<-- both use the same reference
  } 
  handleChangeGrupo(event) { 
    event.preventDefault();
    this.setState({ grupo: event.target.value });  //<-- both use the same reference
  } 
  render() {
    const { title } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <div align='center'>
              <Webcam
                audio={false}
                height={350}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={350}
               />
          </div>
          <form>
            <div className="form-group">
              <label>Nombre</label>
              <input  onChange={this.handleChangeNombre.bind(this)}  type="text" className="form-control" name="nombre" aria-describedby="emailHelp" placeholder="Nombre"/>
              <small id="emailHelp" className="form-text text-muted">Usuario de alta</small>
            </div>
            <div className="form-group">
              <label>Grupo</label>
              <input onChange={this.handleChangeGrupo.bind(this)} type="text" className="form-control" name='grupo' placeholder="Grupo"/>
            </div>
          </form> 
          <div>
            <div className="row">
              <div className="col-sm-2">
                <button type="button" className="btn btn-secondary" onClick={this.capture}>Enrolar</button>
              </div>
            </div>
            <div class="alert alert-primary hidden" role="alert" align='center'>
                  {this.state.mensaje}
            </div>
          </div>         

          
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Enroll);
