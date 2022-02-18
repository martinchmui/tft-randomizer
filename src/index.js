import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);



export const saveTacticiansState = () => {
  localStorage.setItem('tacticians', JSON.stringify(store.getState().companions.map(object => { return { id: object.id, currentLevel: object.currentLevel, selected: object.selected } })))
}

export const saveArenasState = () => {
  localStorage.setItem('arenas', JSON.stringify(store.getState().arenas.map(object => { return { id: object.id, selected: object.selected } })))
}

export const saveBoomsState = () => {
  localStorage.setItem('booms', JSON.stringify(store.getState().booms.map(object => { return { id: object.id, currentLevel: object.currentLevel, selected: object.selected } })))
}

export const clearTacticiansState = () => {
  localStorage.removeItem('tacticians')
}

export const clearArenasState = () => {
  localStorage.removeItem('arenas')
}

export const clearBoomsState = () => {
  localStorage.removeItem('booms')
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);