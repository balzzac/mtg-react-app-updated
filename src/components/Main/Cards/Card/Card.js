import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './Card.css';
/**
 * Card react component
 * @param {object} props
 * @return {jsx}
 */
export default function Card(props) {
  let {
    name,
    colors,
    artist,
    setName,
    originalType,
    imageUrl,
    id,
  } = props.card;
  const hasAction = props.hasAction;
  // const inCollection = props.inCollection;

  originalType = originalType ? originalType : 'Unknown original type';

  let bgClass = null;

  switch (colors[0]) {
    case 'Blue':
      bgClass = 'has-blue-bg';
      break;
    case 'Green':
      bgClass = 'has-green-bg';
      break;
    case 'White':
      bgClass = 'has-white-bg';
      break;
    case 'Red':
      bgClass = 'has-red-bg';
      break;
    case 'Black':
      bgClass = 'has-black-bg';
      break;
    default:
      break;
  }

  const cardJSX = (
    <div className={`l-card a-card ${bgClass}`}>
      <div>
        <div className="l-card--name a-card--name">
          <h3 className="t0">{name}</h3>
        </div>
        {imageUrl && (
          <img
            className="l-card--image"
            width="200"
            height="280"
            src={imageUrl}
            alt={`${name}`}
          />
        )}
        {!imageUrl && (
          <div className="l-card--image-sub">
            <span className="t0">No Image</span>
          </div>
        )}
      </div>
      <div className="l-card--original-type a-card--original-type">
        <span className="t0">{originalType}</span>
      </div>
      <div className="l-card--footer">
        <p className="s1">{artist}</p>
        <p className="s1 l-card--footer--set-name">{setName}</p>
      </div>
    </div>
  );
  return (
    <React.Fragment>
      {hasAction && <Link to={`/details/${id}`}>{cardJSX}</Link>}
      {!hasAction && cardJSX}
    </React.Fragment>
  );
}

Card.propTypes = {
  card: PropTypes.object,
  name: PropTypes.string,
  colors: PropTypes.string,
  artist: PropTypes.string,
  setName: PropTypes.string,
  originalType: PropTypes.string,
  imageUrl: PropTypes.string,
  hasAction: PropTypes.bool,
};
