import React, { useState } from 'react';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
const SortComp = (props) => {
  const [top, setTop] = useState(null);

  const handleClick = (arrow) => {
    if (arrow === 'top') {
      setTop('top');
      if (props.handleDesc) {
        props.handleDesc('top');
      } else if (props.handleSts) {
        props.handleSts('top');
      } else if (props.handleUser) {
        props.handleUser('top');
      } else if (props.handleStart) {
        props.handleStart('top');
      } else if (props.handleEnd) {
        props.handleEnd('top');
      }
    } else {
      setTop('bottom');
      if (props.handleDesc) {
        props.handleDesc('bottom');
      } else if (props.handleSts) {
        props.handleSts('bottom');
      } else if (props.handleUser) {
        props.handleUser('bottom');
      } else if (props.handleStart) {
        props.handleStart('bottom');
      } else if (props.handleEnd) {
        props.handleEnd('bottom');
      }
    }
  };

  return (
    <div className="sortComp">
      <button
        className={top === 'top' ? 'active' : null}
        onClick={() => handleClick('top')}
      >
        <BiUpArrow />
      </button>
      <button
        className={top === 'bottom' ? 'active' : null}
        onClick={() => handleClick('bottom')}
      >
        <BiDownArrow />
      </button>
    </div>
  );
};

export default SortComp;
