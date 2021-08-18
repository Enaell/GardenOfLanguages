import React from 'react';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined';

import { Typography, Button } from '@material-ui/core';
import { Row } from '../../common/Flexbox';

export const ModuleBlockHeader = ({displayed, prettyName, onModify,  setOnModify, deleteModule, saveModules, cancelModification, goToModulePage} : 
{
    displayed: boolean; 
    prettyName: string
    onModify: boolean;
    setOnModify: React.Dispatch<React.SetStateAction<boolean>>;
    deleteModule: () => void;
    saveModules: () => void;
    cancelModification: () => void;
    goToModulePage:() => void;
}) => {
  return (
      <Row horizontal={'space-between'} vertical={'center'} style={{width: 'calc(100% + 4px)', height:'50px', position: 'absolute', zIndex: 100}}>
        <Typography style={{ paddingLeft: '20px' }} variant='h6' color={'initial'}>{prettyName}</Typography>
        { displayed &&
        <div style={{paddingRight: '10px'}}>
          { !onModify ?
          <>
            <Button onClick={() => setOnModify(true)}>
              <CreateOutlinedIcon color='action' titleAccess={'Modify'}/>
            </Button>
            <Button onClick={() => goToModulePage()}>
              <DoubleArrowOutlinedIcon color='action' titleAccess={'Modify'}/>
            </Button>
          </>
          : 
          <>
            <Button>
              <SaveAltOutlinedIcon onClick={() => saveModules()} color='action' titleAccess={'Save'}/>
            </Button>
            <Button>
              <DeleteOutlinedIcon onClick={() => deleteModule()}  color='action' titleAccess={'Delete'}/>
            </Button>
            <Button>
              <CloseIcon onClick={() => cancelModification()} color='action' titleAccess={'Cancel'}/>
            </Button>
          </>}
        </div>}
      </Row>
  );
};