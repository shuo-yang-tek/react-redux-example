import {
   createStore,
   combineReducers
} from 'redux';

import * as dataArticle from './data/articles';
import * as uiEditor from './ui/editor';

const DEFAULT_STATE = {
   data: {
      articles: dataArticle.DEFAULT_STATE
   },
   ui: {
      editor: uiEditor.DEFAULT_STATE
   }
};

const dataReducer = combineReducers({
   articles: dataArticle.reducer
});

const uiReducer = combineReducers({
   editor: uiEditor.reducer
});

const reducer = combineReducers({
   data: dataReducer,
   ui: uiReducer
});

export default createStore(
   reducer,
   DEFAULT_STATE
);
