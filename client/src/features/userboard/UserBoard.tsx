import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { ModuleBlock } from './moduleBlocks/ModuleBlock';
import { Layout } from 'react-grid-layout';
import { ModifyPanel } from "./ModifyPanel";
import { gridLayouts } from "./defauldGridLayouts";
import { Column } from "../common/Flexbox";
import { ModuleNamesType, UserboardType } from "../../app/types/user";
import { BreakpointType, PositionType } from "./types";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks";
import { updateUserboard, userState } from "../../app/redux/userSlice";
import { userApi } from "../../app/apiClient/userApi";

const ResponsiveGridLayout = WidthProvider(Responsive);

function updateLayout(layout: Layout, newPos: PositionType, onModify: boolean) {
  const newLayout = {...layout};
  newLayout.x = newPos.x;
  newLayout.y = newPos.y;
  newLayout.w = newPos.w;
  newLayout.h = newPos.h;
  newLayout.isDraggable = onModify;
  newLayout.isResizable = onModify;
  return newLayout;
}

function getLayoutToAdd(
  userboard: UserboardType, 
  gridLayouts: {[bp in BreakpointType]: {[key: string]: Layout;};},
  breakPoint: BreakpointType
) {
  return Object.keys(gridLayouts[breakPoint]).filter((moduleName)=> {
    return !userboard[moduleName];
  })
}

function layoutsAreResizable(layouts: {lg: Layout[];md: Layout[];sm: Layout[];xs: Layout[];}, onModify: boolean) {
  return ({
    lg: layouts.lg.map((l: Layout)=> ({...l, isResizable: onModify, isDraggable: onModify })),
    md: layouts.md.map((l: Layout)=> ({...l, isResizable: onModify, isDraggable: onModify })),
    sm: layouts.sm.map((l: Layout)=> ({...l, isResizable: onModify, isDraggable: onModify })),
    xs: layouts.xs.map((l: Layout)=> ({...l, isResizable: onModify, isDraggable: onModify })),
  })
}

function getBlocksLayoutsFromModule(modules: UserboardType, onModify: boolean) {
  return {
    lg: Object.keys(modules).map(moduleName => updateLayout(gridLayouts.lg[moduleName], modules[moduleName].lg, onModify)),
    md: Object.keys(modules).map(moduleName => updateLayout(gridLayouts.md[moduleName], modules[moduleName].md, onModify)),
    sm: Object.keys(modules).map(moduleName => updateLayout(gridLayouts.sm[moduleName], modules[moduleName].sm, onModify)),
    xs: Object.keys(modules).map(moduleName => updateLayout(gridLayouts.xs[moduleName], modules[moduleName].xs, onModify))
  }
}

export const UserBoard = () => {

  const dispatch = useAppDispatch();  

  const { language, targetLanguage, userboard, username, token} = useAppSelector(userState)

  const [onModify, setOnModify] = useState(false);

  const [newUserboard, setNewUserboard] = useState({...userboard});

  const [layouts, setLayouts] = useState(getBlocksLayoutsFromModule({...userboard}, onModify))

  const [breakPoint, setBreakPoint] = useState('lg' as BreakpointType);

  const [addingModule, setAddingModule] = useState(false);

  const [marginWidth, setMarginWidth] = useState(150);

  const onLayoutChange = (layout: Layout[]) => {
    let newBoard = {...newUserboard};
    layout.forEach(element => {
        newBoard[element.i] = {...newBoard[element.i]}
        newBoard[element.i][breakPoint] = {x: element.x, y: element.y, w: element.w, h:element.h}
    });
    setNewUserboard(newBoard);
  }

  function handleBreakpointChange(bp: BreakpointType){
    if (bp === 'lg')
      setMarginWidth(110);
    if (bp === 'md')
      setMarginWidth(90);
    if (bp === 'sm')
      setMarginWidth(70);
    if (bp === 'xs')
      setMarginWidth(50);
  }

  const saveUserBoard = async () => {
      dispatch(updateUserboard(newUserboard));
      userApi.update({username, userboard: newUserboard, token, language, targetLanguage});
      // await userApi.update({username, userboard: newUserboard, token, language, targetLanguage});
      setAddingModule(false);
      setOnModify(false);
  }  
  const deleteModule = (moduleName: string ) => {
    let newModules = {...newUserboard};
    delete newModules[moduleName];
    setNewUserboard(newModules);
  }

  const addModule = async (moduleToAdd: string, gridLayouts: {[bp in BreakpointType]: {[key: string]: Layout;};}) => {
    let newModules: UserboardType = {...newUserboard};
    let newUserBoardModules: UserboardType = {...userboard};
    const modules = {
      lg:{x: gridLayouts.lg[moduleToAdd].x, y: gridLayouts.lg[moduleToAdd].y, w: gridLayouts.lg[moduleToAdd].w, h: gridLayouts.lg[moduleToAdd].h},
      md:{x: gridLayouts.md[moduleToAdd].x, y: gridLayouts.md[moduleToAdd].y, w: gridLayouts.md[moduleToAdd].w, h: gridLayouts.md[moduleToAdd].h},
      sm:{x: gridLayouts.sm[moduleToAdd].x, y: gridLayouts.sm[moduleToAdd].y, w: gridLayouts.sm[moduleToAdd].w, h: gridLayouts.sm[moduleToAdd].h},
      xs:{x: gridLayouts.xs[moduleToAdd].x, y: gridLayouts.xs[moduleToAdd].y, w: gridLayouts.xs[moduleToAdd].w, h: gridLayouts.xs[moduleToAdd].h},
    }
    newModules[moduleToAdd] = modules;
    newUserBoardModules[moduleToAdd] = modules;
    
    dispatch(updateUserboard(newUserboard));
    userApi.update({username, userboard: newUserboard, token, language, targetLanguage});
    //await userApi.update({username, userboard: newUserboard, token, language, targetLanguage});
    setNewUserboard(newModules);
    setAddingModule(true);
    setOnModify(true);
  }

  useEffect(()=> {
    setLayouts(getBlocksLayoutsFromModule({...userboard}, onModify));
    setNewUserboard({...userboard});
  }, [userboard])
  // useEffect(()=> {
  //   setLayouts(getBlocksLayoutsFromModule({...userModules}, onModify));
  //   setnewUserboard(userModules);
  // }, [userModules, onModify])

  useEffect(() => {
    setLayouts(layoutsAreResizable(layouts, onModify));
  }, [onModify]);
  // useEffect(() => {
  //   setLayouts(layoutsAreResizable(layouts, onModify));
  // }, [onModify, layouts]);

  useEffect(() => {
    handleBreakpointChange(breakPoint);
  }, [breakPoint]);

  console.log('---------------------')
  console.log(userboard);
  
  return (
    <>
      <ResponsiveGridLayout 
        onLayoutChange={(layout)=>onLayoutChange(layout)}
        onBreakpointChange={(newBreakpoint: BreakpointType, _newCols: number) => { setBreakPoint(newBreakpoint)}}
        style={{ width:'80%', maxWidth:'1300px', marginLeft: `${marginWidth}px`}} 
        className="layout" 
        layouts={layouts}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4}}
        rowHeight={150}
        width={1300}>
          {userboard && (Object.keys(userboard) as ModuleNamesType[]).map((m) => {
            return ( 
              <Column width='100%' key={m}>
                <ModuleBlock 
                  onModify={onModify} 
                  setOnModify={setOnModify} 
                  name={ m }
                  language={language}
                  targetLanguage={targetLanguage}
                  deleteModule={deleteModule} 
                  saveModules={saveUserBoard}
                  cancelModification={()=>{userboard && setNewUserboard(userboard); setOnModify(false);}}
                /> 
              </Column>
            )}
          )}
      </ResponsiveGridLayout>
      <ModifyPanel
        squareSide={marginWidth} 
        onModify={onModify}
        setOnModify={setOnModify}
        saveModules={saveUserBoard}
        cancelModification={() => {userboard && setNewUserboard(userboard); setOnModify(false)}}
        addOptions={getLayoutToAdd(newUserboard, gridLayouts, breakPoint)}
        handleAddSelect={moduleName => addModule(moduleName, gridLayouts)}
        addingModule={addingModule}
      />
    </>
  )
}