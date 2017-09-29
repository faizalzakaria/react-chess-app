import pmongo from 'promised-mongo';

const db = pmongo('reduxtest', ['pieces']);

export function getPiece(_id) {
  return db.pieces.findOne({ _id: pmongo.ObjectId(_id) });
}

export function getPieces() {
  return db.pieces.find({});
}

export function createPiece(piece) {
  if (!piece) {
    return new Promise((resolve, reject) => {
      reject(`"piece" cannot be empty`);
	   });
  }
  return db.pieces.insert({ piece });
}

export function removePiece(_id) {
  return db.pieces.remove({ _id: pmongo.ObjectId(_id) })
				 .then(() => {
					return { _id: _id };
				 });
}

export function updatePiece(_id, piece) {
  let pieceItem = {
    piece
  };

  if (!_id) return new Promise((resolve, reject) => {
    reject(`"_id" required to update Piece Item\n`);
  });

  if (!piece) delete pieceItem.piece;

  return db.pieces.findAndModify({
			new: true, // return the newly modified document
			query: { _id: pmongo.ObjectId(_id) },
			update: { $set: pieceItem }
    }).then(({ value }) => value);
}
