import React from 'react';
import { withRouter } from 'react-router';
import BoardSquare from 'components/BoardSquare';
import Knight from 'components/Knight';
import Pawn from 'components/Pawn';
import King from 'components/King';
import Queen from 'components/Queen';
import Bishop from 'components/Bishop';
import Rock from 'components/Rock';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import PieceTypes from './PieceTypes';
import {
  Col,
  Row,
  Grid,
  Icon,
  Button,
  Checkbox,
  ButtonGroup,
} from '@sketchpixy/rubix';

@connect((state) => state)
@DragDropContext(HTML5Backend)
export default class Board extends React.Component {
  static fetchData(store) {
    return store.dispatch(actions.newGame());
  }

  renderPiece(x, y) {
    let props = {...this.props}
    const { games } = props;
    const { board } = games;
    const piece = board[x][y];
    if (piece == undefined)
      return
    props.x = x;
    props.y = y;
    props.isWhite = piece.isWhite;
    switch(piece.type) {
      case PieceTypes.KNIGHT:
        return (<Knight {...props} />);
      case PieceTypes.PAWN:
        return (<Pawn {...props} />);
      case PieceTypes.BISHOP:
        return (<Bishop {...props} />);
      case PieceTypes.KING:
        return (<King {...props} />);
      case PieceTypes.QUEEN:
        return (<Queen {...props} />);
      case PieceTypes.ROCK:
        return (<Rock {...props} />);
      default:
        return;
    }
  }

  renderSquare(i) {
    let props = {...this.props};
    const x = i % 8;
    const y = Math.floor(i / 8);
    const color = ((x + y) % 2 == 0) ? 'black' : 'white';
    props.color = color;
    props.x = x;
    props.y = y;
    return (
      <div key={i} className={color}>
        <BoardSquare {...props}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }

  render() {
    let _ = require('lodash');
    let squares = []
    _.range(64).map((_row, i) => {
      squares.push(this.renderSquare(i));
    });
    return (
      <div className='chessboard'>
        {squares}
      </div>
    );
  }
}
