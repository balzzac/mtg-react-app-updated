/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import axios from 'axios';

import Loader from '../Loader/Loader';
import Card from '../Main/Cards/Card/Card';
import Cards from '../Main/Cards/Cards';

import {CardContext} from '../App/Context';
import './Details.css';
/**
 * React Details component
 */
export class Details extends Component {
  state = {
    card: null,
    similarCards: [],
  };

  /**
   * Mounts component
   */
  componentDidMount() {
    this._mounted = true;
    this._myContext = this.context;
    this.getCard();
  }

  /**
   * After component did update -> fetch new data
   * @param {object} prevProps
   */
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getCard();
    }
    if (
      this._myContext.collectionOfCards.length !==
      this.context.collectionOfCards.length
    ) {
      const card = this.state.card;
      card.inCollection = !card.inCollection;
      this.setState({card});
      this._myContext = this.context;
    }
  }

  /**
   * Cancel fetch on unmount
   */
  componentWillUnmount() {
    this._mounted = false;
    if (this.axiosCancelSource) {
      this.axiosCancelSource.cancel('Component unmounted.');
    }
    if (this.axiosSimilarCardsCancelSource) {
      this.axiosSimilarCardsCancelSource.cancel('Component unmounted.');
    }
  }

  /**
   * Gets card data
   */
  getCard() {
    if (this._mounted) {
      this.setState({card: null, similarCards: []});
      this.axiosCancelSource = axios.CancelToken.source();
      axios
          .get(
              `https://api.magicthegathering.io/v1/cards?type=creature&&id=${
                this.props.match.params.id
              }`,
              {cancelToken: this.axiosCancelSource.token}
          )
          .then((res) => {
            const card = res.data.cards[0];
            const cardsInCollection = [...this.context.collectionOfCards];
            cardsInCollection.forEach((cardInCollection) => {
              if (card.id === cardInCollection.id) {
                card.inCollection = true;
              }
            });
            this.getSimilarCards(card);
            if (this._mounted) {
              this.setState({card});
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }

  /**
   * Fetches similar cards
   * @param {object} card
   */
  getSimilarCards(card) {
    if (this._mounted) {
      this.axiosSimilarCardsCancelSource = axios.CancelToken.source();
      axios
          .get(
              `https://api.magicthegathering.io/v1/cards?type=creature&&rarity=${
                card.rarity
              }&&type=${card.type}&&contains=imageUrl&&power=${
                card.power
              }&&toughness=${card.toughness}`,
              {cancelToken: this.axiosSimilarCardsCancelSource.token}
          )
          .then((res) => {
            if (this._mounted) {
              this.setState({
                similarCards: res.data.cards.filter(
                    (item) => item.id !== card.id
                ),
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }

  /**
   * Renders React component
   * @return {string} HTML for React component
   */
  render() {
    const {card, similarCards} = this.state;
    return (
      <main className="l-main">
        {card === null && <Loader />}
        {card !== null && (
          <React.Fragment>
            <h1 className="t1">{card.name}</h1>
            <section className="l-details">
              <Card card={card} hasAction={false} />
              <div className="l-details--description">
                <h2 className="t2">Details</h2>
                {card.setName && (
                  <p className="t0">{`Set Name: ${card.setName}`}</p>
                )}
                {card.artist && (
                  <p className="t0">{`Artist: ${card.artist}`}</p>
                )}
                {card.type && <p className="t0">{`Type: ${card.type}`}</p>}
                {card.rarity && (
                  <p className="t0">{`Rarity: ${card.rarity}`}</p>
                )}
                {card.toughness && (
                  <p className="t0">{`Toughness: ${card.toughness}`}</p>
                )}
                {card.power && <p className="t0">{`Power: ${card.power}`}</p>}
                {card.loyalty && (
                  <p className="t0">{`Loyalty: ${card.loyalty}`}</p>
                )}
                {card.text && (
                  <p className="t0">{`Description: ${card.text}`}</p>
                )}
                {card.legality && (
                  <p className="t0">{`Legality: ${card.legality}`}</p>
                )}
              </div>
            </section>
            {card.inCollection && (
              <button
                data-card={JSON.stringify(card)}
                onClick={this.context.removeCardFromCollectionOfCards}
                className="l-button a-button is-secondary t0"
              >
                Remove from collection
              </button>
            )}
            {!card.inCollection && (
              <button
                data-card={JSON.stringify(card)}
                onClick={this.context.addToCollectionOfCards}
                className="l-button a-button is-primary t0"
              >
                Add to collection
              </button>
            )}
          </React.Fragment>
        )}
        {similarCards.length !== 0 && (
          <React.Fragment>
            <h2 className="t2">Similar Cards</h2>
            <Cards cards={similarCards} />
          </React.Fragment>
        )}
      </main>
    );
  }
}

Details.contextType = CardContext;

export default Details;
