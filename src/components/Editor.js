import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Actions as articlesActions} from '../store/data/articles';
import {Actions as editorActions} from '../store/ui/editor';

class Editor extends Component {
   constructor(props) {
      super(props);

      this._onSubmitClick = this._onSubmitClick.bind(this);
      this._onChange = this._onChange.bind(this);
   }

   _onChange(evt) {
      const {
         setEditorContext
      } = this.props;

      setEditorContext(evt.target.value);
   }

   _onSubmitClick() {
      const {
         list,
         editor,
         updateArticle,
         addArticle,
         hideEditor
      } = this.props;

      if( list[editor.indexOfList] )
         updateArticle(editor.indexOfList, editor.context);
      else
         addArticle(editor.context);

      hideEditor();
   }

   render() {
      const {
         editor
      } = this.props;

      if( !editor.visibility )
         return null;

      return (
         <div style={ styles.root }>
            <input
               type='text'
               value={ editor.context }
               style={ styles.input }
               ref='input'
               onChange={ this._onChange }
            />
            <button
               style={ styles.button }
               onClick={ this._onSubmitClick }
            >
               Submit
            </button>
         </div>
      );
   }
}

const styles = {
   root: {
      width: '100%',
      paddingTop: 50,
      textAlign: 'right'
   },
   input: {
      width: '100%'
   },
   button: {
      marginTop: 10
   }
};

export default connect(
   state => ({
      list: state.data.articles.list,
      editor: state.ui.editor
   }),
   dispatch => ({
      addArticle: context => dispatch(articlesActions.add(context)),
      updateArticle: (index, context) => dispatch(articlesActions.update(index, context)),
      hideEditor: () => dispatch(editorActions.setVisibility(false)),
      setEditorContext: context => dispatch(editorActions.setContext(context))
   })
)(Editor);
