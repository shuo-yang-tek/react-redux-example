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
         setEditorContext
      } = this.props;

      setEditorIndex(index);
      setEditorContext(list[index]);
      showEditor();
   }

   _onAddClick() {
      const {
         showEditor,
         setEditorIndex,
         setEditorContext
      } = this.props;

      setEditorIndex(-1);
      setEditorContext('');
      showEditor();
   }

   render() {
      const {
         list
      } = this.props;

      const items = list.map((context, index) => (
         <div
            style={ styles.itemBox }
            key={`item-${index}`}
         >
            <p style={ styles.itemContext }>
               { context }
            </p>
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
      width: '100%'
   },
   itemBox: {
      width: '100%',
      paddingBottom: 20
   },
   itemContext: {
      width: '50%',
      display: 'inline-block'
   },
   itemButton: {
      width: '25%',
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
      setEditorContext: context => dispatch(editorActions.setContext(context))
   })
)(Viewer);
