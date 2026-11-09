// app.js: monta a aplicação Express (rotas, middlewares).
// Quem liga o servidor é o server.js. Separar os dois facilita testes e o deploy.
import express from 'express';

const app = express();

// Permite receber JSON no corpo das requisições (usaremos no próximo encontro)
app.use(express.json());

// Rota de saúde: usada por serviços de nuvem para saber se a API está viva
app.get('/health', (req, res) => {
  res.json({ status: 'ok', horario: new Date().toISOString() });
});

// Rota raiz: apresenta a API
app.get('/', (req, res) => {
  res.json({
    nome: 'Aqui eu vou colocar o nome',
    versao: '0.1.0',
    rotas: ['GET /health'],
  });
});


const clientes = [
  {id: 1, nome: 'junior', email: 'junior@gmail.com'},
  {id: 2, nome: 'joao', email: 'joao@gmail.com'},
  {id: 3, nome: 'maria', email: 'maria@gmail.com'}
];

const usuarios = [
  {}
]

app.get('/api/clientes', (req, res) => {
  res.json(clientes);
});

app.get('/api/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientes.find(c => c.id === id);
  if (cliente) {
    return res.json(cliente);
  } else {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
})



export default app;