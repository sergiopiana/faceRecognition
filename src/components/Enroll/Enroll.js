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
import _ from 'lodash';
import Webcam from 'react-webcam';
import s from './Enroll.css';

class Enroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nombre:''}
    this.state = {grupo:'afiliados'}
    this.state = {imagen:''}
    this.state = {mensaje:''}
    this.state = {alerta:'none'}
    this.capture = this.capture.bind(this);
    this.record = this.record.bind(this);
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }
  capture(){
    let imagen = this.webcam.getScreenshot();
    //this.setState(imagen:imagen);
    //console.log(imagen)
    this.recognize(imagen);
  };  
  
  recognize(imageSrc){
    //console.log(this.state.grupo)

    let data = {
      "image": imageSrc,
      "gallery_name":"afiliados"
    }
    fetch('https://api.kairos.com/recognize',{
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
      if(_.find(json.Errors)){
        console.log(json.Errors[0].Message)
      }else{
        if(!_.isUndefined(_.find(json.images[0], ['message', 'no match found']))){
          console.log(_.find(json.images[0], 'status'))
          this.record(imageSrc)
        }else if(!_.isUndefined(_.find(json.images[0], ['status', 'success']))){
          this.setState({mensaje:"Persona ya enrolada"})      
          console.log(_.find(json.images[0], 'status'))
          this.setState({alerta:'block'})

        } 
      }
      //console.log("resultado:"+json.images[0].candidates[0].subject_id)
      
     // this.setState({nombre:json.images[0].candidates[0].subject_id})
    })
  }

  record(imageSrc){
    let data = {
      "image": imageSrc,
      "subject_id":this.state.nombre,
      "gallery_name":"afiliados"
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
  render(){
    return (
    <div className={s.root}>
        <div className={s.container}>
          <div className="card" style={{'margin':'20px'}}>
            <div className="card-body">
              <div className='row'>
                <div className='col-md'>
                  <Webcam  audio={false} height={300} width={400}  ref={this.setRef} screenshotFormat="image/jpeg" />
                </div>
                <div className='col-md'>
                  <form>
                    <div className="form-group">
                      <label>DNI</label>
                      <input type="number" name="nombre" className="form-control" label="With placeholder" placeholder="DNI" onChange={this.handleChangeNombre.bind(this)} margin="normal"  />
                      <small id="emailHelp" className="form-text text-muted">Dni de la persona a enrolar.</small>
                    </div>
                    <div className="form-group">
                      <label>Grupo</label>
                      <input name="grupo" value='afiliados' className="form-control" label="With placeholder" placeholder="Grupo" onChange={this.handleChangeGrupo.bind(this)}  margin="normal" />
                    </div>
                    <div className="form-group">
                    <div className="alert alert-warning" role="alert" style={{'display':this.state.alerta}}>
                      {this.state.mensaje}
                    </div>
                    </div>


                  </form>  
                </div>
              </div>

            </div>
            <div className="card-footer text-muted" align='center'>
              <div>
                  <button type="button" className="btn btn-primary" onClick={this.capture} >Enrolar</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    );
  }
}


export default withStyles(s)(Enroll);
