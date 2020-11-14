import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Message = styled.p`
  background-color: rgb(127, 224, 237); 
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
`;


const ResultQuote = styled.div`
  text-align: center;
  padding: .5rem;
  border: 1px solid #26C6DA;
  background-color: rgb(127, 224, 237);
  margin-top: 1rem;
  position: relative;
`;


const TextQuote = styled.p`
  color: #00838F;
  padding: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
`;

const Result = ({ quote }) => {
  return (
    (quote === 0 ?
      <Message>Choose brand, year and type of insurance</Message>
      :
      (
        <ResultQuote>
          <TransitionGroup
            component="span"
            className="resultado"
          >
            <CSSTransition
              classNames="resultados"
              key={quote}
              timeout={{ enter: 500, exit: 500 }}
            >
              <TextQuote>The total is: <span>${quote}</span></TextQuote>
            </CSSTransition>
          </TransitionGroup>
        </ResultQuote>
      )
    )
  )
};


Result.propTypes = {
  quote: PropTypes.number
}

export default Result;