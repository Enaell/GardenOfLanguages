import { useState, useEffect } from 'react';
import { dictionaryApi } from '../apiClient/dictionaryApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { opensnackbar } from '../redux/snackbarSlice';
import { userState } from '../redux/userSlice';
import { DeckType, WordType } from '../types/word';
import { cleanTranslations } from '../utils/dictionary';
import { renameObjectKey } from '../utils/object';

export function useDecks() {

  const { token, language, targetLanguage  } = useAppSelector(userState);

  const dispatch = useAppDispatch();

  const [decks, setDecks] = useState({} as {[key: string]: DeckType});

  useEffect(() => {
    dictionaryApi.getAllDecks(language, targetLanguage, token).then(res =>
      res.success ? 
        setDecks(res.message as {[key: string]: DeckType})
        : dispatch(opensnackbar('error', res.message as string))
    );
  }, [token, language, targetLanguage]);


  async function createDeck( deck: DeckType){
    const newDecks = {...decks, [deck.name]: deck}
    if (token) {
      const res = await dictionaryApi.createDecks([deck], token);
      if (res.success) {
        setDecks({...decks, [deck.name]: res.message[0]});
        return res.message[0];
      }
      dispatch(opensnackbar('error', res.message as string))
    }
    setDecks(newDecks);
    return 
  };
  
  async function updateDeck(deck: DeckType, wordListOldName?: string){
    setDecks(wordListOldName && wordListOldName !== deck.name
      ? {...renameObjectKey({[wordListOldName]: deck.name}, decks), [deck.name]: deck}
      : {...decks, [deck.name]: deck});
    if (token)
      dictionaryApi.updateDeck(deck, token).then(res=> 
        !res.success && dispatch(opensnackbar('error', res.message as string))
      );
  };

  async function deleteDeck(deck: DeckType){
    let newDecks = {...decks}
    delete newDecks[deck.name];
    setDecks({...newDecks});
    if (deck.id && token){
      const res = await dictionaryApi.deleteDeck(deck.id, token);
      if (!res.success)
        dispatch(opensnackbar('error', res.message as string))
    } 
    return newDecks
  }

  async function removeWordFromDeck(wordName: string, deckName: string) {
    let newDecks = {...decks};
    delete newDecks[deckName].words[wordName];
    setDecks({...newDecks})
    if(token) {
      const res = await dictionaryApi.updateDeck(decks[deckName], token); 
      if (res.success)
        return res.message;
      dispatch(opensnackbar('error', res.message as string))
    }
  }

  async function addWordToDeck(word: WordType, deckName: string): Promise<DeckType> {
    const deckUpdated: DeckType = {
      ...decks[deckName], 
      words: { ...decks[deckName].words, [word.name]: word }
    };

    setDecks({
      ...decks,
      [deckName]: deckUpdated
    });

    if (token) {
      const res = await dictionaryApi.updateDeck(deckUpdated, token);
      if (res.success)
        return res.message;
      dispatch(opensnackbar('error', res.message as string));
    }
    
    return deckUpdated;
  }

  async function createWordInDeck(word: WordType, deckName: string): Promise<DeckType> {
    const deckId = decks[deckName].id;
    const cleanWord = cleanTranslations(word);

    if (deckId && token) {
      const res = await dictionaryApi.createWordsInDeck(deckId, [cleanWord], token)
      if (res.success) {
        setDecks({...decks, [deckName]: res.message});
        return res.message;
      }
      dispatch(opensnackbar('error', res.message as string));
    }

    const deckUpdated: DeckType = { 
      ...decks[deckName], 
      words: { ...decks[deckName].words, [cleanWord.name]: {...cleanWord, id: cleanWord.name} }
    };

    setDecks({
      ...decks,
      [deckName]: deckUpdated
    });
    return deckUpdated
  }

  return {
    decks,
    createDeck,
    updateDeck,
    deleteDeck,
    removeWordFromDeck,
    createWordInDeck,
    addWordToDeck,
  };
}