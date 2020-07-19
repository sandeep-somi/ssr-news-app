import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/routes'
import { Provider } from 'react-redux';
import configureStore from '../src/redux/configureStore';


const app = express();


app.use('^/$', (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send("Something went wrong!")
    }

    const store = configureStore();
    const state = store.getState();

    return res.send(data.replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(<Provider store={store}><App /></Provider>)}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
      </script>
      `
    ))
  })
})

const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../', 'build')));

app.listen(port, () => {
  console.log(`App launched on ${port}`);
})