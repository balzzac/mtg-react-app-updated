import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Details from '../Details/Details';
import Collection from '../Collection/Collection';

import {CardConsumer} from './Context';

import './App.css';

/**
 * App wrapper react component
 * @return {jsx}
 */
export default class App extends Component {
  /**
   * Renders component
   * @method
   * @return {jsx}
   */
  render() {
    return (
      <React.Fragment>
        <CardConsumer>
          {(value) => {
            return <Header collectionOfCards={value.collectionOfCards} />;
          }}
        </CardConsumer>

        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/details/:id" component={Details} />
          <Route exact path="/collection" component={Collection} />
        </Switch>
      </React.Fragment>
    );
  }
}
