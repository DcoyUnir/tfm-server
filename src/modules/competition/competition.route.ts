import express from 'express';
import { Competition } from '../../db/entities/competition.entity';
import { dataSource } from '../../db/datasource';


const router = express.Router();

router.get('/', async (req, res) => {
  const competitionRepository = dataSource.getRepository(Competition);
  const competition = await competitionRepository.find();
  res.json(competition);
});

router.get('/:id', async (req, res) => {
  const competitionRepository = dataSource.getRepository(Competition);
  const competition = await competitionRepository.findOne({ where: { id: req.params.id } });
  res.json(competition);
});

router.post('/', async (req, res) => {
  const competitionRepository = dataSource.getRepository(Competition);
  const competition = competitionRepository.create(req.body);
  const result = await competitionRepository.save(competition);
  res.json(result);
});

router.put('/:id', async (req, res) => {
  const competitionRepository = dataSource.getRepository(Competition);
  const competition = await competitionRepository.findOne({ where: { id: req.params.id } });
  if (competition) {
      competitionRepository.merge(competition, req.body);
      const result = await competitionRepository.save(competition);
      res.json(result);
  }
  else {
      res.status(404).json({ error: 'Competencia no encontrada' });
  }
});

router.delete('/:id', async (req, res) => {
  const competitionRepository = dataSource.getRepository(Competition);
  const result = await competitionRepository.delete(req.params.id);
  res.json(result);
});


export default router;
