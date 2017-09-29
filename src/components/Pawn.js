import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import PieceTypes from './PieceTypes';
import { pieceSource, pieceCollect } from './PieceSource';

@DragSource(PieceTypes.PAWN, pieceSource, pieceCollect)
export default class Pawn extends Component {
  validMove(params) {
    const { x, y, toX, toY, board, whiteTop } = params;
    const piece = board[x][y];
    const opponentPiece = board[toX][toY];
    if (piece == undefined)
      return false;
    const dx = toX - x;
    const dy = toY - y;
    let validY = [-1, -2];

    if ((piece.isWhite && whiteTop) || (!piece.isWhite && !whiteTop))
      validY = [1, 2];

    return !this.hasFriendlyPiece(piece, opponentPiece) &&
            (dx === 0 &&
              (dy === validY[0] ||
              (piece.firstMove && dy === validY[1]))) ||
            (this.hasOpponentPiece(piece, opponentPiece) && Math.abs(dx) === 1 && dy === validY[0]);
  }

  hasOpponentPiece(piece, opponentPiece) {
    return (piece != undefined && opponentPiece != undefined && opponentPiece.isWhite != piece.isWhite);
  }

  hasFriendlyPiece(piece, opponentPiece) {
    return (piece != undefined && opponentPiece != undefined && opponentPiece.isWhite === piece.isWhite);
  }

  pieceCode(isWhite) {
    if (isWhite == true)
      return "\u2659";
    else
      return "\u265F";
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
