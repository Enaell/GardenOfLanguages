import { Accordion, AccordionDetails, AccordionSummary, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core"
import { Add, ExpandMore } from "@material-ui/icons"
import { WordType } from "../../app/types/word"
import { translationsToString } from "../../app/utils/dictionary"

export const CollapseWordList = ({
  style, 
  listTitle, 
  wordList,
  onActionClick
}: {
  style: any,
  listTitle: string, 
  wordList: WordType[],
  onActionClick: (word: WordType) => void
}) => {
  return (
    <div style={{...style}}>
      <Accordion elevation={0}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>{listTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{paddingTop: '0', paddingBottom: '0'}}>
          <List style={{paddingTop: '0', width: '100%', paddingLeft: '20px', paddingRight: '20px'}} >
            {wordList.map((word) => (
            <div key={word.id || word.name} >
              <ListItem style={{minWidth: '350px'}} role={undefined} button onClick={() => {}}>
                <ListItemText
                  style={{paddingRight: '15px'}} 
                  primary= { word.name === word.internationalName ? `${word.name}` : `${word.name} - ${word.internationalName}`}
                  primaryTypographyProps={{variant:'body1'}}
                  secondary={`${translationsToString(word.translations)}`} 
                />
                <ListItemSecondaryAction >
                  <IconButton aria-label="addWord" onClick={() => onActionClick(word)}>
                    <Add />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </div>))}
          </List >
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
