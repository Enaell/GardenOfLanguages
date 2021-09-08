import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import CloseIcon from '@material-ui/icons/Close';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { Select, MenuItem } from '@material-ui/core';
import { Column } from '../common/Flexbox';


const SideButton = ({children, onClick, squareSide}: {children: React.ReactNode, onClick: () => void, squareSide: number}) => {
  const buttonStyle = { 
    border: '#a8c1a3 solid 2px', 
    width: `${squareSide}px`, 
    height: `${squareSide}px`, 
    marginLeft:'20px',
    marginBottom: '10px',
    borderRadius:'20px', 
    cursor:'pointer'
  };  
  
  return (
  <div onClick={()=>{onClick()}} style={buttonStyle}>
    <Column
    horizontal={'center'} 
    vertical={'center'} 
    style={{width: '100%', height: '100%'}}
    >
      {children}
    </Column>
  </div>
)};

export const ModifyPanel = ({
  squareSide,
  onModify,
  setOnModify,
  saveModules,
  cancelModification,
  addOptions,
  handleAddSelect,
}: {
  squareSide: number; 
  onModify: boolean;
  setOnModify: React.Dispatch<React.SetStateAction<boolean>>;
  saveModules: () => void;
  cancelModification: () => void;
  addOptions: string[];
  handleAddSelect: (moduleToAdd: string) => void;
}) => {
  const [opacity, setOpacity] = useState({opacity: 0.2} as {opacity: 0.2} | {})

  return (
    <div
      style={!onModify ? {
        ...opacity,
        height:'100%',
        transitionProperty: 'opacity',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease-in-out'
      } : { height:'100%'}}
      onMouseOver={()=>{setOpacity({})}}
      onMouseLeave={()=>{setOpacity({opacity: 0.2})}}
    >
      <SideButton squareSide={squareSide} onClick={() => {}}>
        <Column vertical={'center'} horizontal='center' style={{width: '100%', height:'100%'}}>
          <AddIcon
            htmlColor={'#6b8268'} 
            titleAccess={'Add'} 
            style={{
              position: 'absolute',
              zIndex: -1,
              width: `${squareSide * 0.8}px`,
              height: `${squareSide * 0.8}px`
            }}
          />
          <Select
            disableUnderline
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value=''
            onChange={(event: React.ChangeEvent<{ value: unknown }>)=> handleAddSelect(event.target.value as string)}
            SelectDisplayProps={{style: {height: squareSide, border: 0, backgroundColor:'transparent'}}}
            inputProps={{style:{border:0, backgroundColor:'transparent'}}}
            style={{width: squareSide, height: squareSide, border: 0, zIndex:20}}
            IconComponent={()=><></>}
          >
            {addOptions.map(option =><MenuItem key={option} value={option}>{option}</MenuItem>)}
          </Select>
        </Column>
      </SideButton>
      { onModify ?
      <>
        <SideButton squareSide={squareSide} onClick={()=>{saveModules()}}>
          <SaveAltOutlinedIcon 
            htmlColor={'#6b8268'} 
            titleAccess={'Save'} 
            style={{zIndex: 50, width: '60%', height: '60%'}}
          />
        </SideButton>
        <SideButton squareSide={squareSide} onClick={()=>{cancelModification()}}>
          <CloseIcon 
            htmlColor={'#6b8268'} 
            titleAccess={'Cancel'} 
            style={{zIndex: 50, width: '60%', height: '60%'}}
          />
        </SideButton>
      </> :
      <SideButton squareSide={squareSide} onClick={() => setOnModify(true)}>
        <CreateOutlinedIcon 
          htmlColor={'#6b8268'} 
          titleAccess={'Modify'} 
          style={{zIndex: 50, width: '60%', height: '60%'}}
        />
      </SideButton>
      }
    </div>
  )
}