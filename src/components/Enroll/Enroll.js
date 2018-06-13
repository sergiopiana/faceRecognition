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
import { withStyles } from '@material-ui/core/styles';

import Webcam from 'react-webcam';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
    container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  
});


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
  render(props) {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

      <Grid container spacing={24}>
        <Grid item xs={4}>
          <Webcam  audio={false} height={350} ref={this.setRef} screenshotFormat="image/jpeg" width={350} />
        </Grid>
        <Grid item xs={4} sm={4}>

            <TextField
              name="nombre"
              label="With placeholder"
              placeholder="Nombre"
              onChange={this.handleChangeNombre.bind(this)}
              className={classes.textField}
              margin="normal"
             />

        </Grid>
        <Grid item xs={4} sm={4}>
          <TextField  name="grupo" label="With placeholder" placeholder="Grupo" onChange={this.handleChangeGrupo.bind(this)} className={classes.textField}  margin="normal" />
        </Grid>
        <Grid item xs={4} sm={4}>
            <Button variant="contained" color="primary" onClick={this.capture} className={classes.button}>
             Enrolar
            </Button>
        </Grid>       
      </Grid>
    </div>       

    );
  }
}

Enroll.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Enroll);
