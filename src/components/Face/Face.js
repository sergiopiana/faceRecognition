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
import Webcam from 'react-webcam';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Face.css';
import _ from 'lodash';


class Face extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id:''}
    this.state = {grupo:''}
    this.state = {imagen:''}
    this.state = {datos:''}
    this.state = {usrNombre:''}
    this.state = {usrPlan:''}
    this.state = {usrCredencial:''}
    this.state = {usrEstado:''}
    this.state = {mensaje:'none'}
    this.capture = this.capture.bind(this);
    this.recognize = this.recognize.bind(this);
    this.findUser = this.findUser.bind(this);
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }
  capture(){
    let imagen = this.webcam.getScreenshot();
    //this.setState(imagen:imagen);
    console.log(imagen)
    this.recognize(imagen);
  };  


  recognize(imageSrc){
    console.log(this.state.grupo)

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

      if(!_.isUndefined(_.find(json.images,'candidates'))){   
        console.log("resultado:"+json.images[0].candidates[0].subject_id)
        this.setState({id:json.images[0].candidates[0].subject_id})
        this.findUser(this.state.id)
      }else{
        this.setState({id:''})
        this.setState({usrNombre:''})
        this.setState({usrCredencial:''})
        this.setState({usrPlan:''})
        this.setState({usrEstado:''}) 
        this.setState({mensaje:'block'})
      }
    })
  }
  findUser(dni){
    fetch(`https://sgi.swissmedical.com.ar/ws.afiliados/app/main/afiliados/findByDocument/key/ ${dni} /DU`,{
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then((json) => {
      this.setState({datos:json})
      let data = _.find(this.state.datos, ['estadoDesc', 'Habilitado'])
      this.setState({usrNombre:data.nombreCompleto})
      this.setState({usrCredencial:data.contra+' '+data.inte})
      this.setState({usrPlan:data.plan.codigoPlan})
      this.setState({usrEstado:data.estadoDesc})
    })    
  }
 
  render() {
    

    return (
    <div className={s.root}>
      <div className={s.container}>
        <div className="card" style={{'margin':'20px'}}>
          <div className="card-body">
            <div className='row'>
              <div className='col-md'>
                <Webcam  audio={false} height={200} ref={this.setRef}  screenshotFormat="image/jpeg" width={300} />
              </div>
              <div className='col-md'>
                <form>
                  <div className="form-group">
                    <label >Nombre</label>
                    <input type="text" className="form-control" value={this.state.usrNombre} id="exampleFormControlInput1" />
                  </div>
                  <div className="form-group">
                    <label >DNI</label>
                    <input type="text" className="form-control" value={this.state.id}  id="exampleFormControlInput1" />
                  </div>                    
                  <div className="form-group">
                    <label >Credencial</label>
                    <input type="text" className="form-control" value={this.state.usrCredencial} id="exampleFormControlInput1" />
                  </div>  
                  <div className="form-group">
                    <label >Plan</label>
                    <input type="text" className="form-control" value={this.state.usrPlan} id="exampleFormControlInput1" />
                  </div>                    
                  <div className="form-group">
                    <label >Estado</label>
                    <input type="text" className="form-control" value={this.state.usrEstado}  id="exampleFormControlInput1" />
                  </div>                                                       
                  <div  className="alert alert-danger" role="alert" style={{'display':this.state.mensaje}}>
                     No se encontro el usuario.
                  </div>  
                </form>

              </div>        
            </div>
          </div>

          <div className="card-footer text-muted" align='center'>
            <div>
            <button type="button" className="btn btn-primary" onClick={this.capture}>Validar</button>
            </div>
        
          </div>

        </div>
      </div>
    </div>

    );
  }
}


export default withStyles(s)(Face);
