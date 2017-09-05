import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store/store';

import Viewer from './components/Viewer';
import Editor from './components/Editor';

export default class App extends Component {
   render() {
      return (
         <Provider store={ store }>
            <div style={ styles.root }>
               <Viewer />
               <Editor />
            </div>
         </Provider>
      );
   }
}

const styles = {
   root: {
      width: '100%',
      maxWidth: 600,
      minWidth: 200
   }
};
