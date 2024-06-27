import { Router } from 'express';
import { HealthController } from './health/health.controller';
// import { QueueRouter } from './queue/queue.controller';
import { TechnologyController } from './technology/technology.controller';

import competitionRouter from './competition/competition.route';
import athleteRouter from './athlete/athlete.route';
import clubRouter from './club/club.route';
import resultRouter from './result/result.route';
import openaiController from './openai/openai.route';

const router = Router();

router.use('/health', HealthController.router);
router.use('/technology', TechnologyController.router);

router.use('/competition', competitionRouter);
router.use('/athlete', athleteRouter);
router.use('/club', clubRouter);
router.use('/result', resultRouter);
router.use('/llm', openaiController);

// router.use('/queue', QueueRouter.router);

export const apiRouter = router;
