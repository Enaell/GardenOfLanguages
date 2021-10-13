import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import translate from 'counterpart';
import { Typography, Button } from '@material-ui/core';
import { Column } from '../common/Flexbox';
import { DeckType } from '../../app/types/word';
import { DeckTile } from './WordListTile';

const height= {
  minHeight: 'calc(100vh - 350px)',
  maxHeight: 'calc(100vh - 285px)',
  height: '100%',
  overflow: 'auto',
}

type DeckProps = {
  style?: any,
  userConnected?: boolean,
  decks: {[key: string]: DeckType};
  path?: string;
  title?: string;
  labelBtnAdd?: string;
  disabledBtnAdd?: boolean;
  onAddDeck: () => void;
  onDeleteDeck: (wordList: DeckType) => Promise<void>
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void;
}

export const Decks = ({
  style={},
  decks,
  path = '/dictionary/wordlists',
  title = translate('dictionaryPage.wordListPanel.decks'),
  labelBtnAdd = translate('dictionaryPage.wordListPanel.add'),
  disabledBtnAdd = false,
  onAddDeck,
  onDeleteDeck,
  onSortEnd,
}: DeckProps) => {
  return (
    <Column style={{...style}}>
      <div style={{ marginBottom: '10px', marginRight: '5px', width: '275px' }}>
        <Typography variant={'h5'}>{title}</Typography>
        <Button variant='outlined' onClick={onAddDeck} disabled={disabledBtnAdd}>
          {labelBtnAdd}
        </Button>
        <DeckContainer
          useDragHandle
          wordlists={decks}
          path={path}
          onDeleteDeck={onDeleteDeck}
          onSortEnd={onSortEnd}
        />
      </div>
    </Column>
  );
}


const DeckContainer = SortableContainer(({ wordlists, path, onDeleteDeck }: {
  wordlists: {[key: string]: DeckType},
  path: string,
  onDeleteDeck: (wordList: DeckType) => Promise<void>
}) => (
  <div style={{ marginTop: '12px', overflowY: 'auto', ...height }}>
  {wordlists && Object.keys(wordlists).map((wordlistname: string, index: number) => {
    return (
      <DeckTile
        key={wordlists[wordlistname].id || wordlistname}
        index={index}
        wordlist={wordlists[wordlistname]}
        path={path}
        onDeleteDeck={onDeleteDeck}
      />
      )
    })}
  </div>
));
