const namespace='ui/editor';

export const DEFAULT_STATE = {
   visibility: false,
   indexOfList: -1,
   title: '',
   context: '',
   createAtJSON: (new Date()).toJSON()
};

const ACTION_TYPES = {
   setVisibility: `${namespace}/SET_VISIBILITY`,
   setIndexOfList: `${namespace}/SET_INDEX_OF_LIST`,
   setTitle: `${namespace}/SET_TITLE`,
   setContext: `${namespace}/SET_CONTEXT`,
   setCreateAt: `${namespace}/SET_CREATE_AT`
};

export function reducer(state = DEFAULT_STATE, action) {
   switch(action.type) {
   case ACTION_TYPES.setVisibility:
      return Object.assign({}, state, { visibility: action.visibility });
   case ACTION_TYPES.setIndexOfList:
      return Object.assign({}, state, { indexOfList: action.indexOfList });
   case ACTION_TYPES.setTitle:
      return Object.assign({}, state, { title: action.title });
   case ACTION_TYPES.setContext:
      return Object.assign({}, state, { context: action.context });
   case ACTION_TYPES.setCreateAt:
      return Object.assign({}, state, { createAtJSON: action.createAtJSON });
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
   setTitle: title => ({
      type: ACTION_TYPES.setTitle,
      title
   }),
   setContext: context => ({
      type: ACTION_TYPES.setContext,
      context
   }),
   setCreateAt: createAtJSON => ({
      type: ACTION_TYPES.setCreateAt,
      createAtJSON
   })
};
