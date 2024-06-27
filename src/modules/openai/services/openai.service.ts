

import OpenAI from 'openai';

const model = 'gpt-4o';
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});



export const handleChat = async (performanceData, message) => {
	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: "system",
				content: "Hello ChatGPT, please act as an expert in archery. I have a dataset containing the performance details of an archer over a season. Your task is to provide insights and analysis strictly related to archery based on the data. You should refuse to answer or ignore any non-archery-related questions or information."
			},
			{
				role: "system",
				content: `Here is the dataset: \`\`\`${performanceData}\`\`\`.`
			},
			{
				role: "system",
				content: "You are a helpful assistant."
			},
			{
				role: "system",
				content: "Please provide detailed archery-related insights and analysis for the following: Evaluate the archer's performance in each competition, considering the score, rank, and observations. Identify and discuss specific factors that influenced performance in each competition. Suggest targeted improvements to enhance the archer's performance in future competitions based on observed trends. Additionally, answer any user input questions related to archery performance, techniques, equipment, or strategies based on the provided dataset. Refuse to answer or ignore any questions not related to archery."
			},
			{
				role: "user",
				content: `${message}`
			}
		],
		model,
		temperature: 0.3,
	});
	console.log('-------------------------------')
	console.log(JSON.stringify(completion.choices[0].message))
	console.log('-------------------------------')
	return { response: completion.choices[0].message.content.trim() };
};

export const reviewPerformance = async (performanceData) => {
	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: "system",
				content: "Hello ChatGPT, I have a dataset containing the performance details of an archer over a season. The dataset includes scores, rankings, and observations from each competition. I would like you to analyze the data and provide a detailed report on the archer's performance in each competition. Additionally, please suggest general improvements that can be made based on the performance trends."
			},
			{
				role: "system",
				content: "Please analyze this data and answer the following: How did the archer's performance evolve from competition to competition? What specific factors influenced the performance in each competition? Based on the trends, what general improvements can be made to enhance the archer's performance in future competitions?"
			},
			
			{
				role: "user",
				content: `Archery performance review: \`\`\`${JSON.stringify(performanceData)}\`\`\`.`
			}
		],
		model,
		temperature: 0.3,
	});
	
	console.log('-------------------------------')
	console.log(JSON.stringify(completion.choices[0].message.content.trim()))
	console.log('-------------------------------')
	return { response: completion.choices[0].message.content.trim() };
};

module.exports = { handleChat, reviewPerformance };
