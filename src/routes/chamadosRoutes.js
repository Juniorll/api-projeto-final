import { Router } from 'express';
import { excluir, atualizar, criar, listarChamados, buscarChamadoPorId } from '../controllers/chamadosController.js';

const router = Router();

router.get('/', listarChamados);
router.get('/:id', buscarChamadoPorId);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', excluir);

export default router;