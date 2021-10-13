import React from 'react';
import { Typography, Button } from '@material-ui/core';
import translate from 'counterpart';
import { SortableContainer } from 'react-sortable-hoc';
import { WordTile } from './WordTile';
import { Column } from '../common/Flexbox';
import { WordType } from '../../app/types/word';

const height= {
  minHeight: 'calc(100vh - 350px)',
  maxHeight: 'calc(100vh - 285px)',
  height: '100%',
  overflow: 'auto'
}

type WordsProps = {
  words: {[key: string]: WordType};
  path: string;
  title?: string;
  labelBtnAdd?: string;
  disabledBtnAdd?: boolean;
  onAddWord: () => void;
  onDeleteWord: (wordlistId: string) => void;
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void;
}

export const Words = ({
  words,
  path = '/dictionary/wordlists',
  title = translate('dictionaryPage.wordListPanel.words'),
  labelBtnAdd = translate('dictionaryPage.wordListPanel.add'),
  disabledBtnAdd = false,
  onAddWord,
  onDeleteWord,
  onSortEnd,
}: WordsProps) => {
  return (
    <Column>
      <div style={{ marginBottom: '10px', marginRight: '5px', width: '275px' }}>
        <>
          <Typography variant={'h5'}>{title}</Typography>
          <Button variant='outlined' onClick={onAddWord} disabled={disabledBtnAdd}>
            {labelBtnAdd}
          </Button>
        </>
        <WordsContainer
          useDragHandle
          words={words}
          path={path}
          onDeleteWord={onDeleteWord}
          onSortEnd={onSortEnd}
        />
      </div>
    </Column>
  )
}

const WordsContainer = SortableContainer(({ words, path, onDeleteWord }: {words: {[key: string]: WordType}, path: string, onDeleteWord: (name: string) => void }) => (
  <div style={{ marginTop: '12px', ...height }}>
  {Object.keys(words).map((wordName: string, index: number) => (
    <WordTile
      key={words[wordName].id || wordName}
      index={index}
      word={words[wordName]}
      path={path}
      onDeleteWord={onDeleteWord}
    />
    ))}
  </div>
));