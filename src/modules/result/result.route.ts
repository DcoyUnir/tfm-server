import express from 'express';
import { Result } from '../../db/entities/result.entity';
import { Athlete } from '../../db/entities/athlete.entity';
import { Competition } from '../../db/entities/competition.entity';
import { Club } from '../../db/entities/club.entity';
import { dataSource } from '../../db/datasource';



const router = express.Router();

router.get('/competition/:id', async (req, res) => {
  const resultRepository = dataSource.getRepository(Result);
  const athleteRepository = dataSource.getRepository(Athlete);
  const results = await resultRepository.find({ where: { competition: { id: req.params.id } }, relations: ['athlete'] });
  
  // const athletes = results.map(result => result.athlete);
  res.json(results);
});

router.get('/competition/:competitionId/athlete/:athleteId', async (req, res) => {
  const athleteRepository = dataSource.getRepository(Athlete);
  const competitionRepository = dataSource.getRepository(Competition);
  
  const athleteId = parseInt(req.params.athleteId, 10);

  const competition = await competitionRepository.findOne({ where: { id: req.params.competitionId }});
  if (!competition) {
    res.status(404).json({ error: 'Competencia no encontrada' });
    return;
    }

  const athlete = await athleteRepository.findOne({ where: { id: athleteId }});
  if (!athlete) {
    res.status(404).json({ error: 'Atleta no encontrado' });
    return;
  }

  const resultRepository = dataSource.getRepository(Result);
  const results = await resultRepository.find({ where: { athlete, competition }, relations: ['competition', 'club', 'athlete'] });
  res.json(results[0]);
});


router.get('/athlete/:id', async (req, res) => {
  const athleteRepository = dataSource.getRepository(Athlete);
  const id = parseInt(req.params.id, 10);
  const athlete = await athleteRepository.findOne({ where: { id }});

  if (!athlete) {
    res.status(404).json({ error: 'Atleta no encontrado' });
    return;
  }

  const resultRepository = dataSource.getRepository(Result);
  const results = await resultRepository.find({ where: { athlete }, relations: ['competition', 'club', 'athlete'] });
  res.json(results);
});

// Get results by club (id or name)
router.get('/club/:id', async (req, res) => {
  const clubRepository = dataSource.getRepository(Club);
  const identifier = req.params.id;
  let club;
  if (isNaN(Number(identifier))) {
    club = await clubRepository.findOne({ where: { name: identifier }});
  } else {
    const id = parseInt(req.params.id, 10);
    club = await clubRepository.findOne({ where: { id }});
  }

  if (!club) {
    res.status(404).json({ error: 'Club no encontrado' });
    return;
  }

  const resultRepository = dataSource.getRepository(Result);
  const results = await resultRepository.find({ where: { club }, relations: ['competition', 'athlete'] });
  res.json(results);
});


export default router;
