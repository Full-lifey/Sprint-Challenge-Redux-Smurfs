import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSmurfs, addSmurf, deleteSmurf, editSmurf } from '../actions';

import './App.css';
/*
 to wire this component up you're going to need a few things.
 I'll let you do this part on your own. 
 Just remember, `how do I `connect` my components to redux?`
 `How do I ensure that my component links the state to props?`
 */
class App extends Component {
  state = {
    newSmurf: {
      name: '',
      age: '',
      height: '',
      id: ''
    },
    editingSmurf: false
  };

  componentDidMount() {
    this.props.getSmurfs();
  }
  changeHandler = e => {
    e.preventDefault();
    this.setState({
      newSmurf: {
        ...this.state.newSmurf,
        [e.target.name]: e.target.value
      }
    });
  };
  addSmurf = e => {
    e.preventDefault();
    this.props.addSmurf(this.state.newSmurf);
    this.setState({
      newSmurf: {
        name: '',
        age: '',
        height: '',
        id: ''
      }
    });
  };
  editSmurf = (e, smurf) => {
    e.preventDefault();
    this.setState({
      newSmurf: {
        name: smurf.name,
        age: smurf.age,
        height: smurf.height,
        id: smurf.id
      },
      editingSmurf: true
    });
  };
  submitEditedSmurf = (e, smurf) => {
    e.preventDefault();
  };
  deleteSmurf = (e, id) => {
    e.preventDefault();
    this.props.deleteSmurf(id);
  };
  render() {
    return (
      <div className='App'>
        <h1>SMURFS! 2.0 W/ Redux</h1>
        {this.props.smurfs.map(smurf => {
          return (
            <div className='smurf-item' key={smurf.id}>
              <h2>{smurf.name}</h2>
              <p>{smurf.age}</p>
              <p>{smurf.height}</p>
              <button onClick={e => this.editSmurf(e, smurf)}>Edit</button>
              <button onClick={e => this.deleteSmurf(e, smurf.id)}>X</button>
            </div>
          );
        })}
        <div className='smurf-form'>
          <form onSubmit={this.addSmurf}>
            <input
              type='text'
              name='name'
              value={this.state.newSmurf.name}
              onChange={this.changeHandler}
              placeholder='Name'
            />
            <input
              type='number'
              name='age'
              value={this.state.newSmurf.age}
              onChange={this.changeHandler}
              placeholder='Age'
            />
            <input
              type='text'
              name='height'
              value={this.state.newSmurf.height}
              onChange={this.changeHandler}
              placeholder='Height'
            />
          </form>
          {this.state.editingSmurf ? (
            <button
              onClick={e => {
                this.props.editSmurf(this.state.newSmurf);
                this.setState({
                  newSmurf: {
                    name: '',
                    age: '',
                    height: '',
                    id: ''
                  },
                  editingSmurf: false
                });
              }}
            >
              Edit Smurf
            </button>
          ) : (
            <button onClick={this.addSmurf}>Add Smurf</button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  smurfs: state.smurfs,
  fetchingSmurfs: state.fetchingSmurfs,
  error: state.error
});

export default connect(
  mapStateToProps,
  { getSmurfs, addSmurf, deleteSmurf, editSmurf }
)(App);
