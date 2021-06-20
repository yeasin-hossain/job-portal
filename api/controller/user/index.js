const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../modal/user');

module.exports.login = async (req, res) => {
  res.status(200).json({ message: 'welcome to login route' });
};

module.exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const { email, name, role, createdAt, companyName, paid } = savedUser;
    const payload = {
      email,
      name,
      role,
      createdAt,
      companyName,
      paid,
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
