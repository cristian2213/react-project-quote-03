import React from 'react';
import PropTypes from 'prop-types';
// styled components
import styled from '@emotion/styled';

// component to add styles
const ContentHeader = styled.header`
  background-color: #25c6da;
  padding: 10px;
  font-weight: bold;
  color: #ffffff;
`;

const TextHeader = styled.h1`
  font-size: 2rem;
  margin: 0;
  font-family: 'Slabo 27px';
  text-align: center;
`;

const Header = ({ title }) => {
  return (
    <ContentHeader>
      <TextHeader>{title}</TextHeader>
    </ContentHeader>
  );
};

Header.propTypes = { title: PropTypes.string };

export default Header;
