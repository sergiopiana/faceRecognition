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
import s from './Face.css';



class Face extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nombre:''}
    this.state = {grupo:'colaboradores'}
    this.state = {imagen:''}
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
    console.log(this.state.grupo)

    let data = {
      "image": imageSrc,
      "gallery_name":"colaboradores"
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
      console.log("resultado:"+json.images[0].candidates[0].subject_id)
      this.setState({nombre:json.images[0].candidates[0].subject_id})
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
          <h1>Validacion</h1>

          <div className="card">
            <div className="card-img-top" align='center'>
              <Webcam
                audio={false}
                height={400}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={500}
               />
          </div>
            <div className="card-body">
              <button type="button" className="btn btn-primary" onClick={this.capture}>Validar</button>
              <h1>{this.state.nombre}<span class="badge badge-secondary">{this.state.grupo}</span></h1>
            </div>
          </div>


          
          
          <div>
            <div className="row">
              <div className="col-sm-2">
                
              </div>
            </div>
            
          </div>         

          
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Face);
