import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  //start
  const existingUser = await User.findOne({ email: req.body.email });
  if(existingUser){
    console.log('Email found')
    res.status(401).send({ message: 'Email ID already registered with us. Please login using your Email Id or use Different Email to register another account with us.' });
  }
  //end
  const newUser = new User(
    {
      name:req.body.name, 
      email:req.body.email, 
      password: bcrypt.hashSync(req.body.password), 
      isAdmin:false 
    });
  const user = await newUser.save();
  await db.disconnect();
  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export default handler;