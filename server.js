const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configuração do proxy
app.use('/proxy', createProxyMiddleware({
  target: 'http://cdn-br.in', // Alvo original (HTTP)
  changeOrigin: true,
  pathRewrite: {
    '^/proxy': '', // Remove /proxy do caminho da URL
  },
  secure: false, // Como o alvo é HTTP
  onProxyReq: (proxyReq, req, res) => {
    // Opcional: Adicione cabeçalhos personalizados, se necessário
  },
  onError: (err, req, res) => {
    console.error('Erro no proxy:', err);
    res.status(500).send('Erro ao acessar o recurso.');
  }
}));

// Rota raiz para verificar se o servidor está ativo
app.get('/', (req, res) => {
  res.send('Servidor Proxy está rodando!');
});

// Definir a porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});