import UserCheckIn from '../models/userCheckInModel.js';
import OpenAI from 'openai';

const OPEN_AI_KEY =
  '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';

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
										
                    Please provide your response in plain text format without any markdown formatting, bullet points, or special characters. Use simple paragraphs separated by line breaks.
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
