import { Layout } from "react-grid-layout";
import { BreakpointType } from "./types";

export const gridLayouts : {[bp in BreakpointType]: {[key: string]: Layout;};} = { 
    lg: {
      news: {i: 'news', x: 0, y: 100, w: 4, h: 4, minW: 1, maxW: 4, minH: 1, maxH: 4, isResizable: false, isDraggable: false},
      fastExercice : {i: 'fastExercice', x: 0, y: 100, w: 6, h: 2, isResizable: false, isDraggable: false},
      wordOfTheDay: {i: 'wordOfTheDay', x: 0, y: 100, w: 3, h: 2, isResizable: false, isDraggable: false},
      culture: {i: 'culture', x: 0, y: 100, w: 3, h: 2, isResizable: false, isDraggable: false},
      manga: {i: 'manga', x: 0, y: 100, w: 3, h: 2, isResizable: false, isDraggable: false}
    },
    md: {
      news: {i: 'news', x: 0, y: 100, w: 4, h: 4, minW: 1, maxW: 4, minH: 1, maxH: 4, isResizable: false, isDraggable: false},
      fastExercice : {i: 'fastExercice', x: 0, y: 100, w: 6, h: 2, isResizable: false, isDraggable: false},
      wordOfTheDay: {i: 'wordOfTheDay', x: 0, y: 100, w: 3, h: 2, isResizable: false, isDraggable: false},
      culture: {i: 'culture', x: 0, y: 100, w: 3, h: 2, isResizable: false, isDraggable: false},
      manga: {i: 'manga', x: 0, y: 100, w: 3, h: 2, isResizable: false, isDraggable: false}
    }, 
    sm: {
      news: {i: 'news', x: 0, y: 100, w: 4, h: 4, minW: 1, maxW: 4, minH: 1, maxH: 4, isResizable: false, isDraggable: false},
      fastExercice : {i: 'fastExercice', x: 0, y: 100, w: 3, h: 4, isResizable: false, isDraggable: false},
      wordOfTheDay: {i: 'wordOfTheDay', x: 0, y: 100, w: 3, h: 2, isResizable: false, isDraggable: false},
      culture: {i: 'culture', x: 0, y: 100, w: 3, h: 2, isResizable: false, isDraggable: false},
      manga: {i: 'manga', x: 0, y: 100, w: 3, h: 2, isResizable: false, isDraggable: false}
    }, 
    xs: {
      news: {i: 'news', x: 0, y: 100, w: 4, h: 4, minW: 1, maxW: 4, minH: 1, maxH: 4, isResizable: false, isDraggable: false},
      fastExercice : {i: 'fastExercice', x: 0, y: 100, w: 3, h: 4, isResizable: false, isDraggable: false},
      wordOfTheDay: {i: 'wordOfTheDay', x: 0, y: 100, w: 3, h: 2, isResizable: false, isDraggable: false},
      culture: {i: 'culture', x: 0, y: 100, w: 3, h: 2, isResizable: false, isDraggable: false},
      manga: {i: 'manga', x: 0, y: 100, w: 3, h: 2, isResizable: false, isDraggable: false}  
    }
  }
  