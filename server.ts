import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import AppServer from './src/AppServer'; 
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

const renderApp = (url: string) => {
  return ReactDOMServer.renderToString(<AppServer url={url} />);
};

app.get('*', (req, res) => {
  const reactDom = renderApp(req.url);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My React App</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div id="root">${reactDom}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
