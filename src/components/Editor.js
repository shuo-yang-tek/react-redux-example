import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Actions as articlesActions} from '../store/data/articles';
import {Actions as editorActions} from '../store/ui/editor';

class Editor extends Component {
   constructor(props) {
      super(props);

      this._onSubmitClick = this._onSubmitClick.bind(this);
      this._onTitleChange = this._onTitleChange.bind(this);
      this._onContextChange = this._onContextChange.bind(this);
   }

   _onTitleChange(evt) {
      const {
         setEditorTitle
      } = this.props;

      setEditorTitle(evt.target.value);
   }

   _onContextChange(evt) {
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
         updateArticle(editor.indexOfList, editor.title, editor.context);
      else
         addArticle(editor.title, editor.context, editor.createAtJSON);

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
            <p>
               { (new Date(editor.createAtJSON)).toString() }
            </p>
            <input
               type='text'
               value={ editor.title }
               placeholder='Title'
               style={ styles.input }
               onChange={ this._onTitleChange }
            />
            <input
               type='text'
               value={ editor.context }
               placeholder='Context'
               style={ styles.input }
               onChange={ this._onContextChange }
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
      marginTop: 50,
      textAlign: 'right',
      boxSizing: 'border-box',
      border: '1px solid'
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
      addArticle: (title, context, createAtJSON) => dispatch(articlesActions.add(title, context, createAtJSON)),
      updateArticle: (index, title, context) => dispatch(articlesActions.update(index, title, context)),
      hideEditor: () => dispatch(editorActions.setVisibility(false)),
      setEditorTitle: title => dispatch(editorActions.setTitle(title)),
      setEditorContext: context => dispatch(editorActions.setContext(context))
   })
)(Editor);
