import UserCheckIn from '../models/userCheckInModel.js';
import OpenAI from 'openai';

const OPEN_AI_KEY =
  '';

const openAi = new OpenAI({ apiKey: OPEN_AI_KEY });

export const checkInForm = async (req, res, next) => {
  try {
    const { mood, goal, challenge } = req.body;
    const userCheckIn = await UserCheckIn.create({ mood, goal, challenge });
    res.locals.userCheckIn = userCheckIn;
    return next();
  } catch (error) {
    console.error('Error capturing daily check-in:', error);
    return next(error);
  }
};

export const aiDailyPlan = async (req, res, next) => {
  try {
    const { userCheckIn } = res.locals;
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
          content: `Energy Level ${userCheckIn.mood}
										Top Goal ${userCheckIn.goal}
										Current Challenge ${userCheckIn.challenge}
										
										Please structure your response like this 
										- Step 1: ...
										- Step 2: ...
										...
										Motivational note: ...
										`,
        },
      ],
    });

		res.locals.response = [response.choices[0].message.content]
		return next();

  } catch (error) {
    console.log(error)
    return next(error)	
	}
};
