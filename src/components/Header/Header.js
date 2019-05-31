/* eslint-disable react/prop-types */
import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

/**
 * App header react component
 * @param {object} props
 * @return {jsx}
 */
export default function Header(props) {
  return (
    <div className="l-header a-header">
      <Link to="/">
        <img
          className="l-header--logo"
          src={require('../../images/minified/MTGlogo.png')}
          alt="App Logo"
        />
      </Link>
      <Link to={`/collection`}>
        <span className="t0 a-header--link l-header--link">
          {props.collectionOfCards.length} in Collection
        </span>
      </Link>
    </div>
  );
}
