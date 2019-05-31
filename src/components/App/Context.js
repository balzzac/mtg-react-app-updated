/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-invalid-this */
import React, {Component} from 'react';

const CardContext = React.createContext();
/**
 * Provider for Context API
 */
class CardProvider extends Component {
  state = {
    collectionOfCards: [],
  };

  /**
   * Adds card to a collection of cards
   * @param {object} e
   */
  addToCollectionOfCards = (e) => {
    const card = JSON.parse(e.target.dataset.card);
    this.setState({
      collectionOfCards: [...this.state.collectionOfCards, card],
    });
  };

  /**
   * Removes card from a collection of cards
   * @param {object} e
   */
  removeCardFromCollectionOfCards = (e) => {
    const card = JSON.parse(e.target.dataset.card);
    let collectionOfCards = [...this.state.collectionOfCards];
    collectionOfCards = collectionOfCards.filter((item) => item.id !== card.id);
    this.setState({collectionOfCards: [...collectionOfCards]});
  };

  /**
   * Clears collection of cards
   * @param {object} card
   */
  clearCollectionOfCards = () => {
    this.setState({collectionOfCards: []});
  };

  /**
   * Render method
   * @return {component}
   */
  render() {
    return (
      <CardContext.Provider
        value={{
          ...this.state,
          addToCollectionOfCards: this.addToCollectionOfCards,
          removeCardFromCollectionOfCards: this.removeCardFromCollectionOfCards,
          clearCollectionOfCards: this.clearCollectionOfCards,
        }}
      >
        {this.props.children}
      </CardContext.Provider>
    );
  }
}

const CardConsumer = CardContext.Consumer;

export {CardContext, CardProvider, CardConsumer};
