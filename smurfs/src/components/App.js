import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSmurfs } from '../actions';

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
      age: null,
      height: ''
    }
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
  render() {
    return (
      <div className='App'>
        <h1>SMURFS! 2.0 W/ Redux</h1>
        {this.props.smurfs.map(smurf => {
          return (
            <div className='smurf-item'>
              <h2>{smurf.name}</h2>
              <p>{smurf.age}</p>
              <p>{smurf.height}</p>
            </div>
          );
        })}
        <div className='smurf-form'>
          <form>
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
  { getSmurfs }
)(App);
