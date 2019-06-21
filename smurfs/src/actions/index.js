import axios from 'axios';
/* 
  Action Types Go Here!
  Be sure to export each action type so you can pull it into your reducer
*/
export const FETCHING_SMURFS = 'FETCHING_SMURFS';
export const FETCHING_SMURFS_SUCCESS = 'FETCHING_SMURFS_SUCCESS';
export const FETCHING_SMURFS_FAILURE = 'FETCHING_SMURFS_FAILURE';

/*
  For this project you'll need at least 2 action creators for the main portion,
   and 2 more for the stretch problem.
   Be sure to include action types for each type of action creator. Also, be sure to mind
     the "pending" states like, fetching, creating, updating and deleting.
   C - addSmurf
   R - getSmurfs
   U - updateSmurf
   D - deleteSmurf
*/
export const getSmurfs = () => dispatch => {
  dispatch({ type: FETCHING_SMURFS });
  axios
    .get('http://localhost:3333/smurfs')
    .then(res => {
      dispatch({ type: FETCHING_SMURFS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCHING_SMURFS_FAILURE, payload: err.response });
    });
};

export const ADDING_SMURF = 'ADDING_SMURF';
export const ADD_SMURF_SUCCESS = 'ADD_SMURF_SUCCESS';
export const ADD_SMURF_FAILURE = 'ADD_SMURF_FAILURE';

export const addSmurf = smurf => dispatch => {
  dispatch({ type: ADDING_SMURF });
  axios
    .post('http://localhost:3333/smurfs', smurf)
    .then(res => {
      dispatch({ type: ADD_SMURF_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ADD_SMURF_FAILURE, payload: err.response });
    });
};

export const DELETING_SMURF = 'DELETING_SMURF';
export const DEL_SMURF_SUCCESS = 'DEL_SMURF_SUCCESS';
export const DEL_SMURF_FAILURE = 'DEL_SMURF_FAILURE';

export const deleteSmurf = id => dispatch => {
  dispatch({ type: DELETING_SMURF });
  axios
    .delete(`http://localhost:3333/smurfs/${id}`)
    .then(res => {
      dispatch({ type: DEL_SMURF_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: DEL_SMURF_FAILURE, payload: err.response });
    });
};
