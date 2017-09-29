import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import PieceTypes from './PieceTypes';
import { pieceSource, pieceCollect } from './PieceSource';

@DragSource(PieceTypes.BISHOP, pieceSource, pieceCollect)
export default class Bishop extends Component {
  validMove(params) {
    const { x, y, toX, toY, board } = params;
    const piece = board[x][y];
    const opponentPiece = board[toX][toY];
    const dx = toX - x;
    const dy = toY - y;
    return piece != undefined &&
            !this.hasFriendlyPiece(piece, opponentPiece) &&
            Math.abs(dx) === Math.abs(dy);
  }

  hasFriendlyPiece(piece, opponentPiece) {
    return (piece != undefined && opponentPiece != undefined && opponentPiece.isWhite === piece.isWhite);
  }

  pieceCode(isWhite) {
    if (isWhite == true)
      return "\u2657";
    else
      return "\u265D";
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
