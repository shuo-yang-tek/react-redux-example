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
      newList.push({
         title: action.title,
         context: action.context,
         createAtJSON: action.createAtJSON
      });
      break;
   case ACTION_TYPES.remove:
      newList.splice(action.index, 1);
      break;
   case ACTION_TYPES.update:
      newList[action.index] = Object.assign({}, newList[action.index], {
         title: action.title,
         context: action.context
      });
      break;
   default:
      return state;
   }

   return Object.assign({}, state, { list: newList });
}

export const Actions = {
   add: (title, context, createAtJSON) => ({
      type: ACTION_TYPES.add,
      title,
      context,
      createAtJSON
   }),
   remove: index => ({
      type: ACTION_TYPES.remove,
      index
   }),
   update: (index, title, context) => ({
      type: ACTION_TYPES.update,
      index,
      title,
      context
   })
};
