const express = require('express');
const { dbQueryWithData } = require('../../helper');
const fs = require('fs').promises;

const htmlRouter = express.Router();

htmlRouter.get('/nav', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  const htmlContent = await fs.readFile('src/components/header.html', 'utf-8');
  console.log('htmlContent ===', htmlContent);
  res.send(htmlContent);
});
htmlRouter.get('/nav-logged', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  const htmlContent = await fs.readFile(
    'src/components/header-logged.html',
    'utf-8'
  );
  console.log('htmlContent ===', htmlContent);
  res.send(htmlContent);
});

htmlRouter.get('/footer', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  const htmlContent = await fs.readFile('src/components/footer.html', 'utf-8');
  res.send(htmlContent);
});
htmlRouter.get('/footer-logged', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  const htmlContent = await fs.readFile(
    'src/components/footer-logged.html',
    'utf-8'
  );
  console.log('htmlContent ===', htmlContent);
  res.send(htmlContent);
});

htmlRouter.get('/footer', (req, res) => {});
module.exports = htmlRouter;
