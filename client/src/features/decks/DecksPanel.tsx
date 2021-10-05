import React from 'react';
import { Switch as RouterSwitch, useHistory, useRouteMatch } from 'react-router-dom'
import { Typography } from '@material-ui/core';
import translate from 'counterpart';
import { Route } from 'react-router-dom';
import { Decks } from './decks';
import { Words } from './words';
import { useDecks } from '../../app/hooks/deckHook';
import { DecksForm } from './wordLists/DecksForm';
import { WordForm } from './words/WordForm';
import { FindWordPanel } from './words/FindWordPanel';
import { DeckType, WordType } from '../../app/types/word';
import { Column, Row } from '../common/Flexbox';

const height = {
  minHeight: 'calc(100vh - 300px)',
  maxHeight: 'calc(100vh - 200px)',
  height: '100%'
}

export const DecksPanel = () => {
  const { 
    url,
    decks, 
    createDeck,
    updateDeck,
    deleteDeck,
    removeWordFromDeck,
    addWordToDeck,
  } = useDecks();

  const {
    words,
    createWord,
    updateWord
  } = useWords();

  async function createDeckAndUpdatePath(newDecks: DeckType) {
    const newWlStatus = await createDecks(newDecks);
    return newWlStatus;
  }

  async function updateWlAndPath(newDecks: DeckType, wordListOldName?: string | undefined) {
    const newWlStatus = await updateDecks(newDecks, wordListOldName);
    history.replace(`${url}/${newDecks.name}`)
    return newWlStatus;
  }

  async function deleteWl(wordList: DeckType){
    const newWlStatus = await deleteDecks(wordList);
    history.replace(`${url}/`);
    return newWlStatus;
  }

  async function updateWordAndPath (newWord: WordType, wordListName: string, wordName: string) {
    const newWStatus = await updateWord(newWord, wordListName, wordName);
    history.replace(`${url}/${wordListName}/words/${newWord.name}`);
    return newWStatus;
  }

  return(
    <Column horizontal='center' style={ {width:'100%'} }>
      <div style={{ width:'80%', maxWidth: '1800px'}}>
        <Typography variant='h4'>{translate('dictionaryPage.wordListPanel.title')}</Typography>
        <Row style={height}>
          <Decks
            path={url && `${url}`}
            wordLists={wordLists}
            onAddDecks={() => history.replace(`${url}/create`)}
            onDeleteDecks={deleteWl}
            onSortEnd={()=>{}}
          />
          <RouterSwitch>
            <Route
              exact
              path={`${url}/create`}
              render={() => {
                return (
                  <DecksForm
                    create
                    onSave={createDeckAndUpdatePath}
                  />)
              }}
            />
            <Route
              path={`${url}/:wordlistname`}
              render={({ match: {params: {wordlistname}} }) => {
                if (wordLists && wordLists[wordlistname])
                  return (
                    <Words
                      path={`${url}/${wordlistname}/words`}
                      words={wordLists && wordLists[wordlistname] && wordLists[wordlistname].words}
                      onAddWord={() => history.replace(`${url}/${wordlistname}/words/addToList`)}
                      onDeleteWord={(name: string) => {
                        removeWordFromDecks(name, wordlistname);
                        if (history.location.pathname.split('/').pop() === name)
                          history.replace(`${url}/${wordlistname}`);
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
              path={`${url}/:wordlistname/words/addToList`}
              render={({ match }) => {
                const wordListName = String(match.params.wordlistname);
                if (user.role !== 'Visitor' && wordLists && wordLists[wordListName])
                  return <FindWordPanel 
                      path={`${url}/${wordListName}/words/createAndAdd`}  
                      level={user.levels?.find(level => level.language === user.targetLanguage)?.rank} 
                      words={words}
                      wordListWordsName={Object.keys(wordLists[wordListName].words)}
                      addWord={(word: WordType) => addWordToDecks(word, wordListName)}
                    />;
                return <div></div>
              }}
            />
            <Route 
              exact
              path={`${url}/:wordlistname/words/createAndAdd`}
              render={({ match }) => {
                const wordListName = String(match.params.wordlistname);
                if (user.role !== 'Visitor' && wordLists && wordLists[wordListName]){
                  return (
                    <WordForm
                      isAdmin={user.role === 'Admin' || user.role==='Moderator'}
                      isOwner={true}
                      word={undefined}
                      create
                      onSave={(newWord) => createWordInDecks(newWord, wordListName)}
                      language={user.language}
                      targetLanguage={user.targetLanguage}
                    />
                  )
                }
                return <div></div>
              }}
            />
            <Route
              path={`${url}/:wordlistname/words/:wordname`}
              render={({ match }) => {
                const wordName = String(match.params.wordname);
                const wordListName = String(match.params.wordlistname);
                if (wordLists && wordLists[wordListName]) {
                  const word = wordLists[wordListName].words && wordLists[wordListName].words[wordName];
                  if (word)
                    return <WordForm
                      isAdmin={user.role === 'Admin' || user.role==='Moderator'}
                      isOwner={user.username === word.owner}
                      word={word}
                      create={false}
                      onSave={(newWord) => updateWordAndPath(newWord, wordListName, wordName) } 
                      language={user.language}
                      targetLanguage={user.targetLanguage}
                    />
                }
                return (<div></div>)
              }}
            />
            <Route
              exact
              path={`${url}/:wordlistname`}
              render={({ match: {params: {wordlistname}} }) => {
                if (wordLists && wordLists[wordlistname]) {
                  return ( 
                    <DecksForm
                      adminRole={user.role === 'Admin' || user.role === 'Moderator'}
                      wordList={wordLists[wordlistname]}
                      canModify={user.role === 'Admin' || user.role === 'Moderator' || wordLists[wordlistname].owner === user.username}
                      onSave={updateWlAndPath}
                      language={user.language}
                      targetLanguage={user.targetLanguage}
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
