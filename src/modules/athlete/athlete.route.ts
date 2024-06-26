import express from 'express';
import { Athlete } from '../../db/entities/athlete.entity';

import { dataSource } from '../../db/datasource';


const router = express.Router();

router.post('/', async (req, res) => {
  const athleteRepository = dataSource.getRepository(Athlete);
  const athlete = athleteRepository.create(req.body);
  const result = await athleteRepository.save(athlete);
  res.json(result);
});

router.get('/', async (req, res) => {
  const athleteRepository = dataSource.getRepository(Athlete);
  const athlete = await athleteRepository.find();
  res.json(athlete);
});

router.get('/:id', async (req, res) => {
  const athleteRepository = dataSource.getRepository(Athlete);
  const id = parseInt(req.params.id, 10);
  const athlete = await athleteRepository.findOne({ where: { id: id }});
  res.json(athlete);
});

router.get('/nombre/:name', async (req, res) => {
  const athleteRepository = dataSource.getRepository(Athlete);
  const athlete = await athleteRepository.findOne({ where: { name: req.params.name }});
  res.json(athlete);
});

router.put('/:id', async (req, res) => {
  const athleteRepository = dataSource.getRepository(Athlete);
  const id = parseInt(req.params.id, 10);
  const athlete = await athleteRepository.findOne({ where: { id }});
  if (athlete) {
    athleteRepository.merge(athlete, req.body);
    const result = await athleteRepository.save(athlete);
    res.json(result);
  } else {
    res.status(404).json({ error: 'Atleta no encontrado' });
  }
});

router.delete('/:id', async (req, res) => {
  const athleteRepository = dataSource.getRepository(Athlete);
  const result = await athleteRepository.delete(req.params.id);
  res.json(result);
});


export default router;
