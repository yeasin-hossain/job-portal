/* eslint-disable consistent-return */
/* eslint-disable radix */
const { getReasonPhrase } = require('http-status-codes');

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
      return res.status(404).json({ message: 'User Not Found' });
    }

    // validate password
    const validatePassword = await compare(password, singUser.password);
    if (!validatePassword) {
      return res.status(404).json({
        message: 'Email Or Password Not Match',
        code: 404,
        status: getReasonPhrase(404),
        error: true,
        response: null,
      });
    }

    const { name, role, createdAt, companyName, paid, _id, service, postLimit } = singUser;
    const payload = {
      email,
      name,
      role,
      createdAt,
      companyName,
      paid,
      id: _id,
      service,
      postLimit,
    };

    // Create Jwt Token
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1day',
    });
    return res.status(200).json({
      message: 'success',
      code: 200,
      status: getReasonPhrase(200),
      error: false,
      response: { ...payload, token },
    });
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

    const { email, name, role, createdAt, companyName, paid, _id, service, postLimit } = savedUser;
    const payload = {
      email,
      name,
      role,
      createdAt,
      companyName,
      paid,
      id: _id,
      service,
      postLimit,
    };

    // Create Jwt Token
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1day',
    });
    return res.status(200).json({
      message: 'success',
      code: 200,
      status: getReasonPhrase(200),
      error: false,
      response: { ...payload, token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

module.exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const user = req.body;
  try {
    const updateUser = await User.findOneAndUpdate({ _id: userId }, user);

    if (updateUser) {
      const updatedUser = await User.findById(userId);
      const { email, name, role, createdAt, companyName, paid, _id, service, postLimit } =
        updatedUser;
      const payload = {
        email,
        name,
        role,
        createdAt,
        companyName,
        paid,
        id: _id,
        service,
        postLimit,
      };
      // Create Jwt Token
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1day',
      });
      return res.status(200).json({
        message: 'success',
        code: 200,
        status: getReasonPhrase(200),
        error: false,
        response: { ...payload, token },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// eslint-disable-next-line consistent-return
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({
        message: 'No User Available',
        code: 404,
        status: getReasonPhrase(404),
        error: true,
        response: null,
      });
    }
    return res.status(200).json({
      message: 'success',
      code: 200,
      status: getReasonPhrase(200),
      error: false,
      response: users,
    });
  } catch (err) {
    next(err);
  }
};
