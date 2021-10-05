import { useState, useEffect, useMemo } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { dictionaryApi } from '../apiClient/dictionaryApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { opensnackbar } from '../redux/snackbarSlice';
import { userState } from '../redux/userSlice';
import { DeckType, WordType } from '../types/word';
import { renameObjectKey } from '../utils/object';

export function useDecks() {

  const { token, language, targetLanguage  } = useAppSelector(userState);

  const history = useHistory();
  const { url } = useRouteMatch();

  const dispatch = useAppDispatch();

  const [decks, setDecks] = useState({} as {[key: string]: DeckType});

  useEffect(() => {
    dictionaryApi.getAllDecks(language, targetLanguage, token).then(res =>
      res.success ? 
        setDecks(res.message as {[key: string]: DeckType})
        : dispatch(opensnackbar('error', res.message as string))
    );
  }, [token, language, targetLanguage]);


  function createDeck( deck: DeckType){
    setDecks({...decks, [deck.name]: deck});
    history.replace(`${url}/${deck.name}`);
    if (token)
      dictionaryApi.createDecks([deck], token).then(res=>{
        res.success && dispatch(opensnackbar('error', res.message as string));
      });
  };
  
  async function updateDeck(deck: DeckType, wordListOldName?: string){
    if (!token)
      return {success: false, message: 'User not logged'};

      setDecks(wordListOldName && wordListOldName !== deck.name
      ? {...renameObjectKey({[wordListOldName]: deck.name}, decks), [deck.name]: deck}
      : {...decks, [deck.name]: deck});
    return await dictionaryApi.updateDeck(deck, token);
  };

  async function deleteDeck(deck: DeckType){
    let wls = {...decks}
    if (!token)
      return {success: false, message: 'User not logged'};
    if (!deck.id)
      return {success: false, message: 'No deck Id'};
    const statusDeleteWl = await dictionaryApi.deleteDeck(deck.id, token);
    if (statusDeleteWl.success) {
      delete wls[deck.name];
      setDecks({...wls});
    }
    return statusDeleteWl;
  }

  async function removeWordFromDeck(wordName: string, wordListName: string){
    if (!token)
      return {success: false, message: 'User not logged'};
    let wls = {...decks};
    delete wls[wordListName].words[wordName];
    setDecks({...wls})
    return await dictionaryApi.updateDeck(decks[wordListName], token);
  }

  async function addWordToDeck(word: WordType, wordListName: string) {
    if ( !token)
      return {success: false, message: 'User not logged'};

      const wordListUpdated = {
        ...decks[wordListName], 
        words: { ...decks[wordListName].words, [word.name]: word }
      };

    setDecks({
      ...decks,
      [wordListName]: wordListUpdated
    });

    return await dictionaryApi.updateDeck(wordListUpdated, token)
  }

  return {
    url,
    decks,
    createDeck,
    updateDeck,
    deleteDeck,
    removeWordFromDeck,
    addWordToDeck,
  };
}