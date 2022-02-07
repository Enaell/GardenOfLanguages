import React, { useEffect, useMemo, useState } from 'react';
import { Button, TextField, Typography, Switch, FormControlLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import translate from 'counterpart';
import { DeckType } from '../../app/types/word';
import { Column, Row } from '../common/Flexbox';
import { subjects, visibilities } from '../../app/constants';
import { useAppSelector } from '../../app/redux/hooks';
import { userState } from '../../app/redux/userSlice';

const styles = {
  title: {width: '80%', maxWidth: '800px'},
  row: {width: '80%', maxWidth: '800px'},
  column: {width: '44%'},
  width100: { width: '100%'},
  formInput: { width: '100%', minWidth: '130px', paddingBottom: '15px'},
  commentsRow: { width: '80%', maxWidth: '800px', minWidth: '130px', paddingTop: '25px'},
  button: { marginTop: '30px' }
}

const localListForm = 'dictionaryPage.deck';

type DeckFormProps = {
  deck?: DeckType, 
  create?: boolean,
  onSave: (deck: DeckType, deckOldName?: string ) => Promise<void>,
};

export const DeckForm = ({ 
  deck=undefined,
  create=false,
  onSave,
}: DeckFormProps) =>
{

  const {fields, errors, canSave, checkError, setCheckError, setFields } = useWordListFormFields(deck)

  const { role, username, language, targetLanguage } = useAppSelector(userState);

  const [canModify, setCanModify] = useState(role === 'Admin' || role === 'Moderator' || deck?.owner === username)
  const [isAdmin, setIsAdmin] = useState(role === 'Admin' || role === 'Moderator')
  
  useEffect(()=> {
    setCanModify(role === 'Admin' || role === 'Moderator' || deck?.owner === username);
    setIsAdmin(role === 'Admin' || role === 'Moderator');
  }, [role, username])

  return (
    <form style={styles.width100}>
      <Column horizontal='center' style={styles.width100}>
        <div style={styles.title}>
          <Typography variant={'h5'}>{fields.name || translate('dictionaryPage.wordListPanel.newList')}</Typography>
        </div>
        <Row horizontal='space-between' style={styles.row}>
          <Column horizontal='center' style={styles.column}>
            <TextField
              disabled={!(create || canModify)}
              style={styles.formInput}
              label={translate(`${localListForm}.name`)} 
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setFields('name', event.target.value as string);
                }}
              value={fields.name}
              error={(create || canModify) && checkError && errors.name}
            />
            <div style={styles.formInput}>
            <Autocomplete
              disabled={!(create || canModify)}
              multiple
              limitTags={8}
              options={subjects}
              getOptionLabel={(subject: string) => translate(`subjects.${subject}`)}
              value={fields.subject}
              filterSelectedOptions
              disableCloseOnSelect
              onChange={(_event, values) => {setFields('subject', values)}}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  variant="standard"
                  label={translate(`${localListForm}.subject`)}
                  placeholder={translate(`${localListForm}.subject`)}
                  error={(create || canModify) && checkError && errors.subject}
                />
              )}
            />
            </div>
          </Column>
          <Column horizontal='center' style={styles.column}>
            <TextField
              disabled={!(create || canModify )}
              style={styles.formInput}
              type='number'
              inputProps={{ min: "0", max: "6", step: "1" }} 
              label={translate(`${localListForm}.level`)}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setFields('level', event.target.value as number);
              }}
              value={fields.level}
              error={(create || canModify)  && checkError && errors.level}
            />
            <TextField
              disabled={!(create || canModify )}
              style={styles.formInput}
              type='number'
              inputProps={{ min: "0", max: "9", step: "1" }} 
              label={translate(`${localListForm}.rank`)}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setFields( 'rank', event.target.value as number);
              }}
              value={fields.rank}
              error={(create || canModify) && checkError && errors.rank}
            />
            { (create || canModify) &&
            <div style={styles.formInput}>
              <Autocomplete
                disabled={!(create || canModify )}
                options={visibilities}
                getOptionLabel={(visibility: string) => translate(`visibility.${visibility}`)}
                value={fields.visibility}
                filterSelectedOptions
                openOnFocus
                onChange={(_event: React.ChangeEvent<{}>, value) => setFields('visibility', value)}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={translate(`${localListForm}.visibility`)}
                    placeholder={translate(`${localListForm}.visibility`)}
                    error={(create || canModify) && checkError && errors.visibility}
                  />
                )}
              />
            </div>}
            {!create && <FormControlLabel
              style={styles.formInput}
              control={
                <Switch
                  disabled={!isAdmin}
                  checked={fields.validated}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFields('validated', event.target.checked)}
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label={translate(`${localListForm}.validation`)}
            />}
          </Column>
        </Row>
        <TextField
          disabled={!(create || canModify )}
          style={styles.commentsRow} 
          multiline
          rowsMax={4}
          label={translate(`${localListForm}.comments`)}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setFields( 'comments', event.target.value as string);
          }}
          value={fields.comments}
        />
        { (create || canModify) &&
        <Button
          style={styles.button}
          color="primary"
          onClick={(e)=> {
            e.preventDefault();
            setCheckError(true);
            if (canSave)
              onSave({
                ...fields,
                id: deck?.id,
                owner: deck?.owner,
                words: deck?.words || {},
                language,
                targetLanguage
              }, deck?.name)
          }}
        >
          { create ? translate(`dictionaryPage.wordListPanel.add`) : translate(`dictionaryPage.wordListPanel.save`)}
        </Button>}
      </Column>
    </form>
  );
}

function useWordListFormFields(deck: DeckType | undefined): { fields: any; errors: any; canSave: any; checkError: any; setCheckError: any; setFields: any; } {
  throw new Error('Function not implemented.');
}
