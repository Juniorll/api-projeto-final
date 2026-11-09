import { Router } from 'express';
import { listarChamados, buscarChamadoPorId } from '../controllers/chamadosController.js';

const router = Router();

router.get('/chamados', listarChamados);
router.get('/chamados/:id', buscarChamadoPorId);

export default router;