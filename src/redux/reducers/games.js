import {
  NEW_GAME,
  UPDATE_PIECE,
} from '../actions/actionTypes';
import PieceTypes from '../../components/PieceTypes';

function newPiece(type, isWhite) {
  return { type: type, isWhite: isWhite, firstMove: true }
}

function initBoard() {
  let _ = require('lodash');
  let board = new Array(8);
  _.range(8).map((_row, i) => {
    board[i] = new Array(8);
  });

  board[0][0] = newPiece(PieceTypes.ROCK, true);
  board[1][0] = newPiece(PieceTypes.KNIGHT, true);
  board[2][0] = newPiece(PieceTypes.BISHOP, true);
  board[3][0] = newPiece(PieceTypes.QUEEN, true);
  board[4][0] = newPiece(PieceTypes.KING, true);
  board[5][0] = newPiece(PieceTypes.BISHOP, true);
  board[6][0] = newPiece(PieceTypes.KNIGHT, true);
  board[7][0] = newPiece(PieceTypes.ROCK, true);
  _.range(8).map((_row, i) => {
    board[i][1] = newPiece(PieceTypes.PAWN, true);
  });


  board[0][7] = newPiece(PieceTypes.ROCK, false);
  board[1][7] = newPiece(PieceTypes.KNIGHT, false);
  board[2][7] = newPiece(PieceTypes.BISHOP, false);
  board[3][7] = newPiece(PieceTypes.QUEEN, false);
  board[4][7] = newPiece(PieceTypes.KING, false);
  board[5][7] = newPiece(PieceTypes.BISHOP, false);
  board[6][7] = newPiece(PieceTypes.KNIGHT, false);
  board[7][7] = newPiece(PieceTypes.ROCK, false);
  _.range(8).map((_row, i) => {
    board[i][6] = newPiece(PieceTypes.PAWN, false)
  });

  return board;
}

function games(state = {}, action) {
  switch(action.type) {
    case NEW_GAME:
      return { board: initBoard(), whiteTop: true };
    case UPDATE_PIECE:
      console.log("UPDATING PIECE..");
      let newState = Object.assign({}, state, {})
      const { x, y, toX, toY } = action.payload;
      let piece = newState.board[x][y];
      piece.firstMove = false;
      newState.board[toX][toY] = piece;
      newState.board[x][y] = undefined;
      return newState;
    default:
      return state;
  }
}

module.exports = {
  games,
};
