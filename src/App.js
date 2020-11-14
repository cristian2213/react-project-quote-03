import React, { useState, Fragment } from 'react';
import styled from '@emotion/styled';
import Header from './components/Header';
import Form from './components/Form';
import Summary from './components/Summary';
import Result from './components/Result';
import Spinner from './components/Spinner';

const Content = styled.div`
  max-width: 700px;
  margin: 1rem auto;
`;

const ContentForm = styled.div`
  background-color: #fff;
  padding: 2rem;
  box-sizing: border-box !important;
`;

function App() {
  const [summary, saveSummary] = useState({
    quote: 0,
    data: {
      brand: '',
      year: '',
      plan: '',
    }
  });
  const [spinner, saveSpinner] = useState(false);
  const { quote, data } = summary;

  return (
    <Content>
      <Header title="Quote your plan" />
      <ContentForm>
        <Form saveSummary={saveSummary} saveSpinner={saveSpinner} />

        {spinner ? <Spinner /> : null}

        {!spinner ? (
          <Fragment>
            <Summary data={data} />
            <Result quote={quote} />
          </Fragment>
        ) : null}
      </ContentForm>
    </Content>
  );
}

export default App;
