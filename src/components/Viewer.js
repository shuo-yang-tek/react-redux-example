import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Actions as articlesActions} from '../store/data/articles';
import {Actions as editorActions} from '../store/ui/editor';

class Viewer extends Component {
   constructor(props) {
      super(props);

      this._onRemoveClick = this._onRemoveClick.bind(this);
      this._onUpdateClick = this._onUpdateClick.bind(this);
      this._onAddClick = this._onAddClick.bind(this);
   }

   _onRemoveClick(index) {
      this.props.removeArticle(index);
   }

   _onUpdateClick(index) {
      const {
         list,
         showEditor,
         setEditorIndex,
         setEditorTitle,
         setEditorContext,
         setEditorCreateAt
      } = this.props;

      const article = list[index];

      setEditorIndex(index);
      setEditorTitle(article.title);
      setEditorContext(article.context);
      setEditorCreateAt(article.createAtJSON);
      showEditor();
   }

   _onAddClick() {
      const {
         showEditor,
         setEditorIndex,
         setEditorTitle,
         setEditorContext,
         setEditorCreateAt
      } = this.props;

      setEditorIndex(-1);
      setEditorTitle('');
      setEditorContext('');
      setEditorCreateAt((new Date()).toJSON());
      showEditor();
   }

   render() {
      const {
         list
      } = this.props;

      const items = list.map((article, index) => (
         <div
            style={ styles.itemBox }
            key={`item-${index}`}
         >
            <p>
               { (new Date(article.createAtJSON)).toString() }
            </p>
            <h1>
               { article.title }
            </h1>
            <h3>
               { article.context }
            </h3>
            <button
               style={ styles.itemButton }
               onClick={() => this._onUpdateClick(index)}
            >
               Update
            </button>
            <button
               style={ styles.itemButton }
               onClick={() => this._onRemoveClick(index)}
            >
               Remove
            </button>
            <hr />
         </div>
      ));

      if( items.length === 0 ) {
         items.push(
            <h3
               style={ styles.empty }
               key='items-empty'
            >
               Empty
            </h3>
         );
      }

      return (
         <div style={ styles.root }>
            { items }
            <button
               style={ styles.addButton }
               onClick={ this._onAddClick }
            >
               Add
            </button>
         </div>
      );
   }
}

const styles = {
   root: {
      width: '100%',
      boxSizing: 'border-box',
      border: '1px solid'
   },
   itemBox: {
      width: '100%',
   },
   itemButton: {
      width: '50%',
      display: 'inline-block'
   },
   addButton: {
      width: '100%'
   },
   empty: {
      width: '100%',
      textAlign: 'center'
   }
};

export default connect(
   state => ({
      list: state.data.articles.list
   }),
   dispatch => ({
      removeArticle: index => dispatch(articlesActions.remove(index)),
      showEditor: () => dispatch(editorActions.setVisibility(true)),
      setEditorIndex: indexOfList => dispatch(editorActions.setIndexOfList(indexOfList)),
      setEditorTitle: title => dispatch(editorActions.setTitle(title)),
      setEditorContext: context => dispatch(editorActions.setContext(context)),
      setEditorCreateAt: createAtJSON => dispatch(editorActions.setCreateAt(createAtJSON))
   })
)(Viewer);
