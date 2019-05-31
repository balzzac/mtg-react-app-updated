import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Card from './Card/Card';
import {CardContext} from '../../App/Context';

import './Cards.css';

/**
 * Cards react component
 */
export default class Cards extends Component {
  state = {
    cards: [],
  };

  /**
   * Mounts component
   */
  componentDidMount() {
    this.assignIfInCollection();
  }

  /**
   * Sets "inCollection" property on passed cards from the context
   */
  assignIfInCollection() {
    const originalCards = [...this.props.cards];
    const cardsInCollection = [...this.context.collectionOfCards];
    originalCards.forEach((card) => {
      card.inCollection = false;
      cardsInCollection.forEach((cardInCollection) => {
        if (card.id === cardInCollection.id) {
          card.inCollection = true;
        }
      });
    });
    const cards = originalCards;
    this.setState({cards});
  }

  /**
   * Updates component
   * @param {object} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.cards.length !== this.props.cards.length) {
      this.assignIfInCollection();
    }
  }
  /**
   * Renders react component
   * @method
   * @return {jsx}
   */
  render() {
    return (
      <div className="l-cards">
        {this.state.cards.map((card) => {
          return (
            <Card
              key={card.id}
              card={card}
              hasAction={true}
              inCollection={card.inCollection}
            />
          );
        })}
      </div>
    );
  }
}

Cards.contextType = CardContext;
Cards.propTypes = {
  card: PropTypes.object,
  cards: PropTypes.array,
};
