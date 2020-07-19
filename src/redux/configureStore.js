import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit'

export default function(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    preloadedState
  })
  
  if(process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
  }
  return store
}