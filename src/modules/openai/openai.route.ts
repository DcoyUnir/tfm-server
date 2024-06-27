import express from 'express';
import { handleChat, reviewPerformance } from './services/openai.service';
const router = express.Router();

router.post('/ask', async (req, res) => {
    const { performanceData, message } = req.body;
	console.log('-------------------')
	console.log(req.body)
	console.log('-------------------')
    try {
        const response = await handleChat(performanceData, message);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/review', async (req, res) => {
    const { performanceData } = req.body;
	console.log('-------------------')
	console.log(req.body)
	console.log('-------------------')
    try {
        const response = await reviewPerformance(performanceData);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
