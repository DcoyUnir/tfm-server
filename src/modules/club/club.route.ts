import express from 'express';
import { Club } from '../../db/entities/club.entity';
import { dataSource } from '../../db/datasource';


const router = express.Router();

router.post('/', async (req, res) => {
  const clubRepository = dataSource.getRepository(Club);
  const club = clubRepository.create(req.body);
  const result = await clubRepository.save(club);
  res.json(result);
});

router.get('/', async (req, res) => {
  const clubRepository = dataSource.getRepository(Club);
  const club = await clubRepository.find();
  res.json(club);
});

router.get('/:id', async (req, res) => {
  const clubRepository = dataSource.getRepository(Club);
  const id = parseInt(req.params.id, 10);
  const club = await clubRepository.findOne({ where: { id }});
  res.json(club);
});

router.get('/nombre/:name', async (req, res) => {
  const clubRepository = dataSource.getRepository(Club);
  const club = await clubRepository.findOne({ where: { name: req.params.name } });
  res.json(club);
});

router.put('/:id', async (req, res) => {
  const clubRepository = dataSource.getRepository(Club);
  const id = parseInt(req.params.id, 10);
  const club = await clubRepository.findOne({ where: { id }});
  if (club) {
    clubRepository.merge(club, req.body);
    const result = await clubRepository.save(club);
    res.json(result);
  } else {
    res.status(404).json({ error: 'Club no encontrado' });
  }
});

router.delete('/:id', async (req, res) => {
  const clubRepository = dataSource.getRepository(Club);
  const result = await clubRepository.delete(req.params.id);
  res.json(result);
});


export default router;
