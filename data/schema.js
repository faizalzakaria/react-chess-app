import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import {
  getPieces,
  getPiece,
  createPiece,
  updatePiece,
  removePiece
} from './database';

const pieceType = new GraphQLObjectType({
  name: 'Piece',
  fields: () => ({
    _id: {
      type: GraphQLString,
      resolve: ({_id}) => _id
    },
    captured: {
      type: GraphQLBoolean,
      defaultValue: false,
      resolve: ({captured}) => captured
    },
    coord_x: {
      type: GraphQLInt,
      resolve: ({coord_x}) => coord_x
    },
    coord_y: {
      type: GraphQLInt,
      resolve: ({coord_y}) => coord_y
    }
  })
});

const gameType = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    _id: {
      type: GraphQLString,
      resolve: ({_id}) => _id
    },
    pieces: {
      type: new GraphQLList(pieceType),
      resolve: (game, params) => {
        return getPieces(params)
      }
    }
  })
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    piece: {
      type: pieceType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, { _id }) => getPiece(_id)
    },
    pieces: {
      type: new GraphQLList(pieceType),
      resolve: () => getPieces()
    },
    games: {
      type: new GraphQLList(gameType),
      resolve: () => getGames()
    },
    game: {
      type: gameType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, { _id }) => getGame(_id)
    }
  })
})

export default new GraphQLSchema({
  query: queryType,

  /* uncomment this line when you add your own mutations */
  // mutation: mutationType,
});
