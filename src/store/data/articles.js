const namespace = 'data/articles';

export const DEFAULT_STATE = {
   list: []
};

const ACTION_TYPES = {
   add: `${namespace}/ADD`,
   remove: `${namespace}/REMOVE`,
   update: `${namespace}/UPDATE`
};

export function reducer(state = DEFAULT_STATE, action) {
   const newList = state.list.slice();

   switch(action.type) {
   case ACTION_TYPES.add:
      newList.push(action.context);
      break;
   case ACTION_TYPES.remove:
      newList.splice(action.index, 1);
      break;
   case ACTION_TYPES.update:
      newList[action.index] = action.context;
      break;
   default:
      return state;
   }

   return Object.assign({}, state, { list: newList });
}

export const Actions = {
   add: context => ({
      type: ACTION_TYPES.add,
      context
   }),
   remove: index => ({
      type: ACTION_TYPES.remove,
      index
   }),
   update: (index, context) => ({
      type: ACTION_TYPES.update,
      index,
      context
   })
};
