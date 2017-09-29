import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import PieceTypes from './PieceTypes';
import { pieceSource, pieceCollect } from './PieceSource';

@DragSource(PieceTypes.ROCK, pieceSource, pieceCollect)
export default class Rock extends Component {
  validMove(params) {
    const { x, y, toX, toY, board } = params;
    const piece = board[x][y];
    const opponentPiece = board[toX][toY];
    const dx = toX - x;
    const dy = toY - y;
    return piece != undefined &&
            !this.hasFriendlyPiece(piece, opponentPiece) &&
            (dx === 0 ||
            dy === 0);
  }

  hasFriendlyPiece(piece, opponentPiece) {
    return (piece != undefined && opponentPiece != undefined && opponentPiece.isWhite === piece.isWhite);
  }

  pieceCode(isWhite) {
    if (isWhite == true)
      return "\u2656";
    else
      return "\u265C";
  }

  render() {
    const { connectDragSource, isDragging, isWhite } = this.props;

    return connectDragSource(
      <span
        style={{
          fontWeight: 'bold',
          cursor: 'move',
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {this.pieceCode(isWhite)}
      </span>,
    );
  }
}
