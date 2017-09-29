import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PieceTypes from './PieceTypes';
import actions from '../redux/actions';

const squareTarget = {
  canDrop(props, monitor) {
    const { games } = props;
    const { x, y, canDrop } = monitor.getItem();
    const params = Object.assign({}, games, {x: x, y: y, toX: props.x, toY: props.y});
    return canDrop(params);
  },

  drop(props, monitor) {
    // call action
    const { dispatch } = props;
    const { x, y } = monitor.getItem();
    dispatch(actions.updatePiece({ x: x, y: y, toX: props.x, toY: props.y }));
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

@DropTarget(Object.values(PieceTypes), squareTarget, collect)
export default class BoardSquare extends Component {

  renderOverlay(color) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: color,
        }}
      />
    );
  }

  render() {
    const { x, y, connectDropTarget, isOver, canDrop, children } = this.props;
    return connectDropTarget(
      <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}>
        {this.props.children}
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  }
}
