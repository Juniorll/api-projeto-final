// Controller: as regras de cada operação de chamados. Os dados vêm do banco (Prisma).
import { prisma } from '../lib/prisma.js';

// GET /api/chamados
export async function listarChamados(req, res) {
  const chamados = await prisma.chamado.findMany({ orderBy: { id: 'asc' } });
  res.json(chamados);
}

// GET /api/chamados/:id
export async function buscarChamadoPorId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ erro: 'O id precisa ser um número' });
  }
  const chamado = await prisma.chamado.findUnique({ where: { id } });
  if (!chamado) {
    return res.status(404).json({ erro: 'Chamado não encontrado' });
  }
  res.json(chamado);
}

// POST /api/chamados
export async function criar(req, res) {
  // req.body vem vazio (undefined) se o cliente não enviar JSON; ?? {} evita o erro
  const { titulo, descricao, prioridade, status, categoriaId } = req.body ?? {};
  if (!titulo) {
    return res.status(400).json({ erro: 'O campo titulo é obrigatório' });
  }
  if (!categoriaId) {
    return res.status(400).json({ erro: 'O campo categoriaId é obrigatório' });
  }
  const categoria = await prisma.categoria.findUnique({ where: { id: Number(categoriaId) } });
  if (!categoria) {
    return res.status(400).json({ erro: 'categoriaId não existe' });
  }
  // campos que não chegaram ficam undefined: o banco usa o valor padrão ou deixa vazio
  const novo = await prisma.chamado.create({
    data: {
      titulo,
      descricao,
      prioridade,
      status,
      categoriaId: categoria.id,
    },
  });
  res.status(201).json(novo);
}

// PUT /api/chamados/:id
export async function atualizar(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ erro: 'O id precisa ser um número' });
  }
  const existe = await prisma.chamado.findUnique({ where: { id } });
  if (!existe) {
    return res.status(404).json({ erro: 'Chamado não encontrado' });
  }
  const dados = req.body ?? {};
  if (dados.titulo === '') {
    return res.status(400).json({ erro: 'O campo titulo não pode ficar vazio' });
  }
  // campos que não chegaram ficam undefined, e o Prisma não os altera
  const atualizado = await prisma.chamado.update({
    where: { id },
    data: {
      titulo: dados.titulo,
      descricao: dados.descricao,
      prioridade: dados.prioridade,
      status: dados.status,
    },
  });
  res.json(atualizado);
}

// DELETE /api/chamados/:id
export async function excluir(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ erro: 'O id precisa ser um número' });
  }
  const existe = await prisma.chamado.findUnique({ where: { id } });
  if (!existe) {
    return res.status(404).json({ erro: 'Chamado não encontrado' });
  }
  await prisma.chamado.delete({ where: { id } });
  res.status(204).send();
}