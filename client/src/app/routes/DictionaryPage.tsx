import React from 'react';
import { Route } from 'react-router-dom';
import { Row } from '../../features/common/Flexbox';
import { DecksPanel } from '../../features/decks/DecksPanel';


export const DictionaryPage = () => {
  return(
      <Row horizontal='center'>
        <Route
          key={'dictionary_wordlists'}
          path={'/dictionary/wordlists'}
          render={() => <DecksPanel />}
        />
        {/* <Route
          key={'dictionary'}
          path={'/dictionary/words'}
          render={ props => <Dictionary {...props} />}
        /> */}
      </Row>
    );
}

