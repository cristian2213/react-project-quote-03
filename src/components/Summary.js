import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { capitalLetter } from '../healper';

const ContentSummary = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838F;
  color: #fff;
  margin-top: 1rem;
`;

const ContentList = styled.ul`
  text-align: center;
  margin: 0 auto;
`;

const Summary = ({ data }) => {
  const { brand, year, plan } = data;

  // doesn't component return if don't exist data
  if (brand === '' || year === '' || plan === '') return null;

  return (
    <ContentSummary>
      <h2>Quote Summary</h2>
      <ContentList>
        <li>Brand: {capitalLetter(brand)}</li>
        <li>Year: {year}</li>
        <li>Plan: {capitalLetter(plan)}</li>
      </ContentList>
    </ContentSummary>
  );
}

Summary.propTypes = {
  data: PropTypes.object.isRequired
}

export default Summary;