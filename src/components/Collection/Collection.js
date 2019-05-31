import React, {Component} from 'react';
import Card from '../Main/Cards/Card/Card';

import {CardConsumer} from '../App/Context';

import './Collection.css';
/**
 * Collection React Component
 */
export default class Collection extends Component {
  /**
   * Renders React component
   * @return {string} HTML for React component
   */
  render() {
    return (
      <main className="l-main">
        <React.Fragment>
          <h1 className="t1">Collection</h1>
          <div className="l-cards">
            <CardConsumer>
              {(value) => {
                return value.collectionOfCards.map((card) => {
                  return (
                    <Card
                      key={card.id}
                      card={card}
                      hasAction={true}
                      inCollection={true}
                    />
                  );
                });
              }}
            </CardConsumer>
          </div>
        </React.Fragment>
      </main>
    );
  }
}
