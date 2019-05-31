import React, {Component} from 'react';
import axios from 'axios';

import Loader from '../Loader/Loader';
import Cards from './Cards/Cards';

import './Main.css';

/**
 * App main react component
 */
export default class Main extends Component {
  state = {
    cards: [],
    isFetching: false,
    page: 1,
    prevY: 0,
    sortValue: 'name',
    searchValue: '',
    prevSearchValue: '',
    numberLoaded: null,
  };

  /**
   * Initial data fetch
   * Per requirement:
   * - For this exercise, only display cards that are of type "creature".
   * - Initially, display the first 20 results returned by the API.
   * - Use the API to sort the results alphabetically by the card's name.
   */
  componentDidMount() {
    this.getCards(this.state.page);

    // Options
    const options = {
      root: null, // Page as root
      rootMargin: '0px',
      threshold: 1.0,
    };
    // Create an observer
    this.observer = new IntersectionObserver(
        this.handleObserver.bind(this), // callback
        options
    );
    // Observe the `loadingRef`
    this.observer.observe(this.loadingRef);
  }

  /**
   * Callback for Intersection Observer
   * @param {*} entities
   * @param {*} observer
   */
  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const curPage = this.state.page + 1;
      this.getCards(curPage, this.state.sortValue, this.state.searchValue);
      this.setState({page: curPage});
    }
    this.setState({prevY: y});
  }

  /**
   * Data fetch
   * @param {number} page
   * @param {string} sortValue
   * @param {string} searchValue
   */
  getCards(page, sortValue = 'name', searchValue = '') {
    const pageSize = 20;
    const filterQuery = searchValue ? `&&name=${searchValue}` : '';
    this.setState({isFetching: true});

    // cancel the previous request
    if (
      typeof this._source !== typeof undefined &&
      this.state.prevSearchValue !== searchValue
    ) {
      this._source.cancel('Operation canceled due to new request.');
    }

    this.setState({prevSearchValue: searchValue});

    // save the new request for cancellation
    this._source = axios.CancelToken.source();

    axios
        .get(
            `https://api.magicthegathering.io/v1/cards?type=creature&&page=${page}&&pageSize=${pageSize}&&orderBy=${sortValue}${filterQuery}`,
            {cancelToken: this._source.token}
        )
        .then((res) => {
        // removing duplicates that were sent via request with orderBy=name
          const cards = [...this.state.cards, ...res.data.cards];
          const uniqueCards = Array.from(new Set(cards.map((a) => a.id))).map(
              (id) => {
                return cards.find((card) => card.id === id);
              }
          );
          this.setState({cards: uniqueCards});
          this.setState({originalData: uniqueCards});
          this.setState({isFetching: false});
          this.setState({numberLoaded: uniqueCards.length});
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error);
          } else {
            console.log(error);
          }
        });
  }
  /**
   * Handles change on form controls
   * @param {object} e
   */
  handleChange(e) {
    switch (e.target.name) {
      case 'sort':
        this.setState({sortValue: e.target.value});
        this.setState({cards: []});
        this.setState({page: 1});
        this.setState({prevY: 0});
        this.setState({numberLoaded: null});
        this.getCards(1, e.target.value, this.state.searchValue);
        break;
      case 'search':
        this.setState({searchValue: e.target.value});
        this.setState({cards: []});
        this.setState({page: 1});
        this.setState({prevY: 0});
        this.setState({numberLoaded: null});
        this.getCards(1, this.state.sortValue, e.target.value);
        break;
      default:
        return;
    }
  }

  /**
   * Preventing default on form submitting
   * @param {object} e
   */
  handleSubmit = (e) => {
    e.preventDefault();
  };
  /**
   * Renders component
   * @method
   * @return {jsx}
   */
  render() {
    const loadingCSS = {
      height: '10px',
      marginTop: '0',
      width: '1px',
    };
    const {cards, isFetching, numberLoaded} = this.state;
    return (
      <main className="l-main">
        <h1 className="t1">
          MTG Creatures{numberLoaded && ` (${numberLoaded} loaded)`}
        </h1>
        {!isFetching && cards.length === 0 && (
          <p className="t0">No cards have been found</p>
        )}

        <form onSubmit={this.handleSubmit} className="l-controls">
          <label className="t0 l-input--label">
            Search by Name:
            <input
              type="text"
              className="t0 l-input a-input"
              value={this.state.searchValue}
              name="search"
              onChange={this.handleChange.bind(this)}
            />
          </label>
          <label className="t0 l-input--label">
            Sort:
            <select
              value={this.state.sortValue}
              name="sort"
              className="t0 l-input a-input"
              onChange={this.handleChange.bind(this)}
            >
              <option value="name">by Name (default)</option>
              <option value="artist">by Artist</option>
              <option value="setName">by Set</option>
            </select>
          </label>
        </form>

        {cards.length !== 0 && <Cards cards={cards} />}
        <div
          ref={(loadingRef) => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          {isFetching && <Loader />}
        </div>
      </main>
    );
  }
}
