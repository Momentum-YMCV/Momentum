import UserCheckIn from '..models/userCheckInModel.js';
import OpenAI from 'openai';

const OPEN_AI_KEY =
  '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';

const openAi = new OpenAI({ apiKey: OPEN_AI_KEY });

export const checkInForm = async (req, res, next) => {
  try {
    const { mood, goal, challenge } = req.body;
    const userInput = await UserInput.create({ mood, goal, challenge });
    res.locals.userInput = userInput;
    return next();
  } catch (error) {
    console.error('Error capturing daily check-in:', error);
    return next(error);
  }
};

export const aiDailyPlan = async (req, res, next) => {
  try {
    const { userInput } = res.locals;
    const response = await openAi.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            "You are a AI career coach. Given a user's mood, goal, and challenge, provide 3-5 personalized and actionable steps they can take for skill development and job search, as well as a short motivational note.",
        },
        {
          role: 'user',
          content: `Energy Level ${userInput.mood}
										Top Goal ${userInput.goal}
										Current Challenge ${userInput.challenge}
										
										Please structure your response like this 
										- Step 1: ...
										- Step 2: ...
										...
										Motivational note: ...
										`,
        },
      ],
    });

		res.locals.response = response.choices[0].message.content

		//const dailyPlan = await dailyPlan.create({
			//user: req.user.id,
			//mood,
			//goal,
			//challenge,
			//planText: response.choices[0].message.content
		//})
		
  } catch (error) {}
};
