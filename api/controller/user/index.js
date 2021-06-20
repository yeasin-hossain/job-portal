/* eslint-disable radix */
const { genSaltSync, hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../modal/user');

module.exports.login = async (req, res) => {
  try {
    const userCredentials = req.body;
    const { email, password } = userCredentials;
    // Get User From Server
    const singUser = await User.findOne({ email });
    if (!singUser) {
      return res.status(200).json({ message: 'User Not Found' });
    }

    // validate password
    const validatePassword = await compare(password, singUser.password);
    if (!validatePassword) {
      return res.status(200).json({ message: 'Email Or Password Not Match' });
    }

    const { name, role, createdAt, companyName, paid, _id } = singUser;
    const payload = {
      email,
      name,
      role,
      createdAt,
      companyName,
      paid,
      id: _id,
    };

    // Create Jwt Token
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1day',
    });

    return res.status(200).json({ ...payload, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

module.exports.register = async (req, res) => {
  try {
    const salt = genSaltSync(parseInt(process.env.SALT));
    const hashedPassword = await hash(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const { email, name, role, createdAt, companyName, paid, _id } = savedUser;
    const payload = {
      email,
      name,
      role,
      createdAt,
      companyName,
      paid,
      id: _id,
    };

    // Create Jwt Token
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1day',
    });

    res.status(200).send({ ...payload, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

module.exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const user = req.body;
  console.log(user);
  try {
    const updateUser = await User.findOneAndUpdate({ _id: userId }, user);

    if (updateUser) {
      const updatedUser = await User.findById(userId);
      // console.log(updatedUser);
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// eslint-disable-next-line consistent-return
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const orders = await User.find({});
    if (!orders) {
      return res.status(404).json({ message: 'No User Available' });
    }
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};
