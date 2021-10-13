import React from 'react';
import { Switch as RouterSwitch, useHistory, useRouteMatch } from 'react-router-dom'
import { Typography } from '@material-ui/core';
import translate from 'counterpart';
import { Route } from 'react-router-dom';
import { useDecks } from '../../app/hooks/deckHook';
import { DeckType, WordType } from '../../app/types/word';
import { Column, Row } from '../common/Flexbox';
import { useWords } from '../../app/hooks/wordHook';
import { renameObjectKey } from '../../app/utils/object';
import { Decks } from './Decks';
import { DeckForm } from './DeckForm';
import { Words } from '../words/Words';
import { WordForm } from '../words/WordForm';
import { FindWordPanel } from '../dictionary/DictionaryPanel';

const height = {
  minHeight: 'calc(100vh - 300px)',
  maxHeight: 'calc(100vh - 200px)',
  height: '100%'
}

export const DecksPanel = () => {
  const { 
    decks,
    createDeck,
    updateDeck,
    deleteDeck,
    removeWordFromDeck,
    createWordInDeck,
    addWordToDeck,
  } = useDecks();

  const {
    words,
    createWord,
    addWord,
    updateWord
  } = useWords();

  const history = useHistory();
  const { url } = useRouteMatch();

  async function createDeckAndUpdatePath(newDeck: DeckType) {
    createDeck(newDeck);
    history.replace(`${url}/${newDeck.name}`);
  }

  async function updateDeckAndPath(newDeck: DeckType, deckOldName?: string) {
    updateDeck(newDeck, deckOldName);
    history.replace(`${url}/${newDeck.name}`)
  }

  async function deleteDeckAndUpdatePath(deck: DeckType){
    deleteDeck(deck);
    history.replace(`${url}/`);
  }

  async function updateWordAndPath (newWord: WordType, deckName: string, oldWordName: string) {
    const cleanWord = await updateWord(newWord);
    const newDeck = newWord.name === oldWordName ? { 
      ...decks[deckName], words: {...decks[deckName].words, [newWord.name]: cleanWord}
    } : {
      ...decks[deckName], words: renameObjectKey({[oldWordName]: cleanWord.name}, decks[deckName].words)
    };
    updateDeck(newDeck);
    history.replace(`${url}/${deckName}/words/${newWord.name}`);
  }

  async function createWordInDeckAndUpdatePath(newWord: WordType, deckName: string) {
    const deck = await createWordInDeck(newWord, deckName);
    addWord(deck.words[newWord.name]);
    history.replace(`${url}/${deckName}/words/${newWord.name}`);
  }

  return(
    <Column horizontal='center' style={ {width:'100%'} }>
      <div style={{ width:'80%', maxWidth: '1800px'}}>
        <Typography variant='h4'>{translate('dictionaryPage.wordListPanel.title')}</Typography>
        <Row style={height}>
          <Decks
            path={url && `${url}`}
            decks={decks}
            onAddDeck={() => history.replace(`${url}/create`)}
            onDeleteDeck={deleteDeckAndUpdatePath}
            onSortEnd={()=>{}}
          />
          <RouterSwitch>
            <Route
              exact
              path={`${url}/create`}
              render={() => {
                return (
                  <DeckForm
                    create
                    onSave={createDeckAndUpdatePath}
                  />)
              }}
            />
            <Route
              path={`${url}/:deckName`}
              render={({ match: {params: {deckName}} }) => {
                if (decks && decks[deckName])
                  return (
                    <Words
                      path={`${url}/${deckName}/words`}
                      words={decks && decks[deckName] && decks[deckName].words}
                      onAddWord={() => history.replace(`${url}/${deckName}/words/addToDeck`)}
                      onDeleteWord={(deckName: string) => {
                        removeWordFromDeck(deckName, deckName);
                        if (history.location.pathname.split('/').pop() === deckName)
                          history.replace(`${url}/${deckName}`);
                      }}
                      onSortEnd={() => {}}
                    />
                  );
                return (<div></div>)
              }}
            />
          </RouterSwitch>
          <RouterSwitch>
            <Route
              exact
              path={`${url}/:deckName/words/addToDeck`}
              render={({ match }) => {
                const deckName = String(match.params.deckName);
                return (
                  <FindWordPanel 
                    path={`${url}/${deckName}/words/createAndAdd`}  
                    words={words}
                    deckWordsNames={Object.keys(decks[deckName].words)}
                    addWord={(word: WordType) => addWordToDeck(word, deckName)}
                  />
                );
              }}
            />
            <Route 
              exact
              path={`${url}/:deckName/words/createAndAdd`}
              render={({ match }) => {
                const wordListName = String(match.params.deckName);
                   return <WordForm
                      create
                      onSave={(newWord) => createWordInDeckAndUpdatePath(newWord, wordListName)}
                    />
                }
              }
            />
            <Route
              path={`${url}/:deckName/words/:wordname`}
              render={({ match }) => {
                const wordName = String(match.params.wordname);
                const wordListName = String(match.params.deckName);
                if (decks && decks[wordListName]) {
                  const word = decks[wordListName].words && decks[wordListName].words[wordName];
                  if (word)
                    return <WordForm
                      word={word}
                      onSave={(newWord) => updateWordAndPath(newWord, wordListName, wordName) } 
                    />
                }
                return (<div></div>)
              }}
            />
            <Route
              exact
              path={`${url}/:deckName`}
              render={({ match: {params: {deckName}} }) => {
                if (decks && decks[deckName]) {
                  return ( 
                    <DeckForm
                      deck={decks[deckName]}
                      onSave={updateDeckAndPath}
                    />
                  );
                } 
                return <div></div>
              }}
            />
          </RouterSwitch>
        </Row>
      </div>
    </Column>
  )
}
