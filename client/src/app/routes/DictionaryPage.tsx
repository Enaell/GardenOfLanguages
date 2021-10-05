import React from 'react';
import { Route } from 'react-router-dom';
import { Row } from '../../features/common/Flexbox';


export const DictionaryPage = () => {
  return(
      <Row horizontal='center'>
        <Route
          key={'dictionary_wordlists'}
          path={'/dictionary/wordlists'}
          render={props => <DecksPanel {...props} />}
        />
        <Route
          key={'dictionary'}
          path={'/dictionary/words'}
          render={ props => <Dictionary {...props} />}
        />
      </Row>
    );
}

