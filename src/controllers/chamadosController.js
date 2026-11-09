import { chamados } from '../data/chamados.js';

// GET Chamados
export function listarChamados (req, res) {
  res.json(chamados);
}

export function buscarChamadoPorId (req, res) {
  const id = parseInt(req.params.id);
  const chamado = chamados.find(c => c.id === id);
  if (chamado) {
    return res.json(chamado);
  } else {
    return res.status(404).json({ error: 'Chamado não encontrado' });
  }
})
}