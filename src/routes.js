import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route } from 'react-router';

import { Grid, Row, Col, MainContainer, Button } from '@sketchpixy/rubix';
import Board from 'components/Board'
import Header from 'components/Header'

class App extends React.Component {
  render() {
    return (
      <MainContainer {...this.props}>
        <div id='body'>
          <Grid>
            <Row>
              <Header />
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
      </MainContainer>
    );
  }
}

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Board} />
  </Route>
);

export default routes;
