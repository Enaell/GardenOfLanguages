import { Card, CardContent, FormControlLabel, PropTypes, Switch, TextField, Typography } from "@material-ui/core";
import { LanguageType } from "../../app/types/language";
import { VisibilityType, WordType } from "../../app/types/word";
import translate from 'counterpart';
import { Autocomplete } from "@material-ui/lab";
import { subjects, visibilities } from "../../app/constants";
import { Row } from "../common/Flexbox";

const styles = {
  marginTop15: {marginTop: '15px'}
}

export const WordCard = ({
  isAdmin=false,
  word= {} as WordType, 
  setWord = ()=> {},
  wordErrors = {
    name: false,
    internationalName: false,
    level: false,
    translations: false,
    subject: false,
    visibility: false
  },
  modify= false,
  elevation,
  variant= 'h1',
  wordDetailVariant='h6',
  align='center', 
  wordDetailAlign='center',
  targetLanguage,
  style
  }: {
  isAdmin?: boolean,
  word?: WordType,
  setWord?: (wordUpdated: WordType) => void,
  wordErrors?: {
    name: boolean;
    internationalName: boolean;
    level: boolean;
    translations: boolean;
    subject: boolean;
    visibility: boolean;
  }
  modify?: boolean,
  elevation?: number,
  align: PropTypes.Alignment,
  variant?: "inherit" | "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | "srOnly" | undefined,
  wordDetailVariant?: "inherit" | "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | "srOnly" | undefined,
  wordDetailAlign: PropTypes.Alignment,
  targetLanguage: LanguageType,
  style?: any 
}) => {

  const localeWord = 'dictionaryPage.word';

  return (
    <Card elevation={ elevation || 1 } style={style}>
      <CardContent>
      {modify 
      ? <TextField
        error= {wordErrors.name}
        fullWidth
        label="Caractère"
        margin="normal"
        variant="standard"
        value={word?.name}
        onChange={(e) => {
          setWord({
            ...word,
            name: e.target.value,
            internationalName: word.language !== 'Cn' ? e.target.value: word.internationalName 
          })
        }}
        name="character"
        required
      />
      : <Typography align={ align } color="textSecondary" gutterBottom>
        {translate(`${localeWord}.name.${targetLanguage}`)}
      </Typography>}
      <Typography align={ align } component="h2" variant={variant} gutterBottom>
        { word?.name || ''}
      </Typography>
      {word.language === 'Cn' && 
      <>
        {modify
        ? <TextField
          error={wordErrors.internationalName}
          fullWidth
          label="Caractère"
          margin="normal"
          variant="standard"
          value={word?.internationalName}
          onChange={(e) => {setWord({...word, internationalName: e.target.value})}}
          name="character"
          required
        />
        : <Typography align={ align } color="textSecondary" gutterBottom>
          {translate(`${localeWord}.internationalName.${targetLanguage}`)}
        </Typography>} 
      </>}
      <Typography align={ wordDetailAlign || align } variant={wordDetailVariant} gutterBottom>
        { word?.internationalName || '' }
      </Typography>
      {modify &&
      <>
        <TextField
          error={wordErrors.level}
          style={styles.marginTop15}
          fullWidth
          type='number'
          inputProps={{ min: "0", max: "6", step: "1" }} 
          label={translate(`${localeWord}.level`)}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setWord({...word, level: event.target.value as number});
          }}
          value={word?.level}
        />
        <Autocomplete
          style={styles.marginTop15}
          multiple
          limitTags={8}
          options={subjects}
          getOptionLabel={(subject: string) => translate(`subjects.${subject}`)}
          value={word?.subject}
          filterSelectedOptions
          disableCloseOnSelect
          onChange={(_event, values) => {setWord({...word, subject: values})}}
          renderInput={(params: any) => (
            <TextField
              {...params}
              error={wordErrors.subject}
              variant="standard"
              label={translate(`${localeWord}.subject`)}
              placeholder={translate(`${localeWord}.subject`)}
            />
          )}
        />
        <Autocomplete
          style={styles.marginTop15}
          options={visibilities}
          getOptionLabel={(visibility: string) => translate(`visibility.${visibility}`)}
          value={word?.visibility}
          filterSelectedOptions
          openOnFocus
          onChange={(_event: React.ChangeEvent<{}>, value: string | null) => setWord({...word, visibility: value as VisibilityType})}
          renderInput={(params: any) => (
            <TextField
              {...params}
              variant="standard"
              label={translate(`${localeWord}.visibility`)}
              placeholder={translate(`${localeWord}.visibility`)}
              error={wordErrors.visibility}
            />
          )}
        />
        <Row horizontal='end' style={styles.marginTop15}>
          <FormControlLabel
            control={
              <Switch
                disabled={!isAdmin}
                checked={word?.validated}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setWord( {...word, validated:  event.target.checked})}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label={translate(`${localeWord}.validation`)}
          />
        </Row>
      </>
      }
      </CardContent>
    </Card>
  );
}