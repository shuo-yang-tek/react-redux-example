const namespace='ui/editor';

export const DEFAULT_STATE = {
   visibility: false,
   indexOfList: -1,
   context: ''
};

const ACTION_TYPES = {
   setVisibility: `${namespace}/SET_VISIBILITY`,
   setIndexOfList: `${namespace}/SET_INDEX_OF_LIST`,
   setContext: `${namespace}/SET_CONTEXT`
};

export function reducer(state = DEFAULT_STATE, action) {
   switch(action.type) {
   case ACTION_TYPES.setVisibility:
      return Object.assign({}, state, { visibility: action.visibility });
   case ACTION_TYPES.setIndexOfList:
      return Object.assign({}, state, { indexOfList: action.indexOfList });
   case ACTION_TYPES.setContext:
      return Object.assign({}, state, { context: action.context });
   default:
      return state;
   }
}

export const Actions = {
   setVisibility: visibility => ({
      type: ACTION_TYPES.setVisibility,
      visibility
   }),
   setIndexOfList: indexOfList => ({
      type: ACTION_TYPES.setIndexOfList,
      indexOfList
   }),
   setContext: context => ({
      type: ACTION_TYPES.setContext,
      context
   })
};
