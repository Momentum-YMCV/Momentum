import User from '../models/userModel.js';

// Create middleware functions
export const addUserToDatabase = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const findUser = await User.findOne({ username });

    if (findUser) {
      res.status(200).json({ message: 'Username already exists' });
    }

    const user = await User.create({ email, username, password });
    res.locals.user = user;
    return next();
  } catch (error) {
    console.error('Error adding user to database:', error);
    res.status(500).json({ error: 'Failed to add user to database' });
  }
};

export const loggedInUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userInDatabase = await User.findOne({ username });

    if (!userInDatabase) {
      res.status(200).json({
        message: 'This user does not exist. Please create an account.',
      });
    }
    res.locals.userInDatabase = userInDatabase;
    return userInDatabase.password === password
      ? next()
      : res.status(200).json({
          message: 'This user does not exist. Please create an account.',
        });
  } catch (error) {
    console.log(error);
  }
};
