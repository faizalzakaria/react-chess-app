import {
  NEW_GAME,
  UPDATE_PIECE,
} from './actionTypes';

import axios from 'axios';
import GraphQLSettings from '../../../graphql.json';

let GraphQLEndpoint = GraphQLSettings.development.endpoint;

if (process.env.NODE_ENV === 'production') {
  GraphQLEndpoint = GraphQLSettings.production.endpoint;
}

function newGame() {
  // TODO
  return dispatch => {
    dispatch({
      type: NEW_GAME,
    })
  }
}

function updatePiece(payload) {
  return dispatch => {
    dispatch({
      type: UPDATE_PIECE,
      payload: payload,
    })
  }
}

module.exports = {
  newGame,
  updatePiece,
};
