import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, MainContainer, Button } from '@sketchpixy/rubix';
import actions from '../redux/actions';

@connect((state) => state)
export default class Header extends React.Component {
  newGame() {
    let { dispatch } = this.props;
    console.log("New Game");
    dispatch(actions.newGame());
  }

  render() {
    let { games } = this.props;
    let { text } = games;

    return (
      <Col xs={12}>
        <Button bsStyle="primary" onClick={::this.newGame}>New Game</Button>
      </Col>
    );
  }
}
