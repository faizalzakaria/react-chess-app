export const pieceSource = {
  beginDrag(props, monitor, component) {
    const piece = { x: props.x, y: props.y, canDrop: component.validMove.bind(component) }
    return piece;
  },
};

export function pieceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}
