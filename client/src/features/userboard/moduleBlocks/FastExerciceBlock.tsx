// import React, { useState } from 'react';
// import { WordCard } from '../../../common/CardsComponents'
// import { WordType, TranslationType, LanguageType } from '../../../common/types';
// import { Row } from '../../../common/Flexbox';
// import {sample} from 'underscore';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Typography from '@material-ui/core/Typography';

import { LanguageType } from "../../../app/types/language"
import { Row } from "../../common/Flexbox"


//const tempWords: WordType[] = [{
const tempWords: any[] = [{
    name: '家',
    internationalName: 'jia',
    language: 'Cn',
    subject: ['general'],
    level: 0,
    translations: [{name: 'Famille', internationalName: 'Famille', language: 'Fr', sentences: [{sentence: '我想我的家', translatedSentence: 'Ma famille me manque'}], rank: 0}],
    comments: '',
    validated: true, //(this field is to differenciate cards validated by admin from others)
    visibility: 'visitor', //(rank of visibility wanted by the card owner)
}, {
    name: '茶',
    internationalName: 'cha',
    language: 'Cn',
    subject: ['general'],
    level: 0,
    translations: [{name: 'Thé', internationalName: 'Thé', language: 'Fr', sentences: [{sentence: '我喜欢喝茶', translatedSentence: 'Jaime boire du thé'}], rank: 0}],
    comments: '',
    validated: true, //(this field is to differenciate cards validated by admin from others)
    visibility: 'visitor', //(rank of visibility wanted by the card owner)
}, {
    name: '月',
    internationalName: 'yue',
    language: 'Cn',
    subject: ['general'],
    level: 0,
    translations: [{name: 'Mois', internationalName: 'Mois', language: 'Fr', sentences: [{sentence: '月', translatedSentence: 'Mois'}], rank: 0}],
    comments: '',
    validated: true, //(this field is to differenciate cards validated by admin from others)
    visibility: 'visitor', //(rank of visibility wanted by the card owner)
}, {
    name: '太阳',
    internationalName: 'tai yang',
    language: 'Cn',
    subject: ['general'],
    level: 0,
    translations: [{name: 'Soleil', internationalName: 'Soleil', language: 'Fr', sentences: [{sentence: '太阳', translatedSentence: 'Soleil'}], rank: 0}],
    comments: '',
    validated: true, //(this field is to differenciate cards validated by admin from others)
    visibility: 'visitor', //(rank of visibility wanted by the card owner)
}, {
  name: '天',
  internationalName: 'tian',
  language: 'Cn',
  subject: ['general'],
  level: 0,
  translations: [{name: 'Ciel', internationalName: 'Ciel', language: 'Fr', sentences: [{sentence: 'ciel', translatedSentence: 'Ciel'}], rank: 0}],
  comments: '',
  validated: true, //(this field is to differenciate cards validated by admin from others)
  visibility: 'visitor', //(rank of visibility wanted by the card owner)
}]

// const Translation = ({translation, selectAnswer}:
//   {
//     translation: TranslationType,
//     selectAnswer: (t: TranslationType) => boolean
//   }) => {
    
//     const [bgColor, setBgColor] = useState(undefined as string | undefined); 
    
//     const onSelectAnswer = (translation: TranslationType) => {
//       selectAnswer(translation) ? setBgColor('green'): setBgColor('red');
//     }

//     return (
//       <ListItem style={bgColor ? {backgroundColor: bgColor} : {} } button onClick={() => onSelectAnswer(translation)}> 
//         <ListItemText primary={<Typography variant="h5">{translation.name}</Typography>}  />
//       </ListItem>
//     );
//   }


// const TranslationList = ({translations, scoreMax, answer, onAnswer, style}: 
//   {
//       translations: TranslationType[],
//       scoreMax: number,
//       answer: WordType,
//       onAnswer: (answerScore: number) => void,
//       style?: any
//   }) => {

//   const selectAnswer = (answerSelected: TranslationType) => {
//     const score = isCorrect(answerSelected.name, answer) ? 1 : 0;
//     onAnswer(score)
//     return score === 1;
//   }
      
//   return (
//       <List style={style} component="nav">
//         {translations.map((tr) => <Translation key={`${tr.internationalName}${scoreMax}`} translation={tr} selectAnswer={selectAnswer} />
//         )}
//       </List>
//   );
// }


// function getResponses(words: WordType[], lastAnswer: WordType | undefined){
//   const responses = words.filter((word => word.name !== lastAnswer?.name));  
//   return sample(responses, 4) as WordType[];
// }

// function getNewAnswer(words: WordType[], oldWordName = undefined as WordType | undefined) {
//   let answer = sample(words, 1)[0];
//   while (answer === oldWordName)
//     answer = sample(words, 1)[0];
//   return answer as WordType;
// }

// function getTranslation(word: WordType, maxRank: number){
//   const translations = word.translations.filter(translation => translation.rank <= maxRank)
//   return sample(translations, 1)[0] as TranslationType;
// }

// function isCorrect(answer: string, word: WordType){
//   return word.translations.some(translation => translation.name === answer);
// }

// export const FastExerciceBlock = ({
//   style = {},
//   words = tempWords,
//   rank = 5,
//   targetLanguage
// }: {
//   style?: any,
//   words?: WordType[],
//   rank?: number,
//   targetLanguage: LanguageType,
// }) => {

//     const [responses, setResponses] = useState(getResponses(words, undefined));
//     const [translations, setTranslations] = useState(responses.map(response => getTranslation(response, rank)))
//     const [answer, setAnswer] = useState(getNewAnswer(responses))
//     const [score, setScore] = useState(0);
//     const [scoreMax, setScoreMax] = useState(0)

//     const nextWord = (answerScore: number) => {
//       const newResponses = getResponses(words, answer);
//       const newAnswer = getNewAnswer(newResponses, answer);
//       const newTranslations = newResponses.map(response => getTranslation(response, rank));

//       setTimeout(()=>{
//         setResponses(newResponses);
//         setTranslations(newTranslations);
//         setAnswer(newAnswer);
//         setScore(score + answerScore)
//         setScoreMax(scoreMax + 1)
//       }, 500);
//     }

//     return (
//         <Row wrap horizontal='center' style={ { width:'100%' ,...style} }>
//             <WordCard style={{ width: '40%', minWidth: '244px' }} word={answer} align={'center'} wordDetailAlign={'center'} targetLanguage={targetLanguage}/>
//             <TranslationList style={{ width: '40%', minWidth: '244px', marginLeft: '25px' }} scoreMax={scoreMax} translations={translations} answer={answer} onAnswer={nextWord}/>
//         </Row>
//     )
// }

export const FastExerciceBlock = ({
  style = {},
  words = tempWords,
  rank = 5,
  targetLanguage
}: {
  style?: any,
  words?: any[],
  rank?: number,
  targetLanguage: LanguageType,
}) => {

    return (
        <Row wrap horizontal='center' style={ { width:'100%' ,...style} }>
          {tempWords[0].name}
        </Row>
    )
}