import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {ModuleBlockHeader} from './ModuleBlockHeader'
import { FastExerciceBlock } from "./FastExerciceBlock";
import { NewsBlock } from "./NewsBlock";
import translate from 'counterpart';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { LanguageType } from '../../../app/types/language';
import { ModuleNames, ModuleNamesType } from '../../../app/types/user';
import { Column } from '../../common/Flexbox';
  
const getBlockFromModule = (moduleName: string, language: LanguageType, targetLanguage: LanguageType) => {
  switch(moduleName) {
    case 'fastExercice': 
      return <FastExerciceBlock targetLanguage={targetLanguage} />  
    case 'news':
      return <NewsBlock name={moduleName} />
  }
}

function getPageFromModuleName(name: ModuleNamesType) {
  return ModuleNames[name];
}

type ModuleBlockProps = {
  name: ModuleNamesType;
  language: LanguageType;
  targetLanguage: LanguageType;
  onModify: boolean; 
  setOnModify: React.Dispatch<React.SetStateAction<boolean>>;
  deleteModule: (moduleName: string) => void;
  saveModules: () => void;
  cancelModification: () => void;
}

export const ModuleBlock = ({ name, language, targetLanguage, onModify, setOnModify, deleteModule, saveModules, cancelModification } : ModuleBlockProps) => {

    const history = useHistory();


  const [onHover, setOnHover] = useState(false);

  const [deleted, setDeleted] = useState(undefined as {} | undefined)

  useEffect(()=> {
    if (!onModify)
      setDeleted(false);
  }, [onModify])

  const deleteModulePreview = () => {
    setDeleted({opacity: 0.4});
    deleteModule(name);
  }

  function goToPage (url: string) {
    history.push(url)
  }

  return (
      <>
        { deleted &&
        <DeleteOutlinedIcon 
          htmlColor={'#6b8268'} 
          titleAccess={'Deleted'} 
          style={{position: 'absolute', zIndex: 50, width: '100%', height: '100%'}}
        />}
        <div style={{ width: '100%', height: '100%', ...deleted }} onMouseOver={() => {setOnHover(true)}} onMouseLeave={()=>{setOnHover(false)}}>
          <ModuleBlockHeader
            prettyName={translate(`moduleBlock.${name}`)} 
            displayed={ onHover } 
            onModify= {onModify} 
            setOnModify={setOnModify} 
            deleteModule={deleteModulePreview} 
            saveModules={saveModules}
            cancelModification={cancelModification}
            goToModulePage={()=>goToPage(getPageFromModuleName(name))}
          />
          <Column 
            horizontal={'center'} 
            vertical={'center'} 
            style={{ border: '#a8c1a3 solid 2px', width: '100%', height: '100%'}} 
            key={name} 
          >
            {getBlockFromModule(name, language, targetLanguage)} 
          </Column>
        </div>
      </>
    )
}