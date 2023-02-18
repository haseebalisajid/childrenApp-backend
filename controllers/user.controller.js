import User from "../mongodb/models/user.js";
import Bcrypt from "bcryptjs";
import { generateJwt } from "../utils/utils.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(409).json({ message: "Email Already registered" });

    const encryptedPassword = await Bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    const token=generateJwt(newUser.id,newUser.email);

    res.status(200).json({user:{id:newUser.id,email:newUser.email,name:newUser.email},token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      const passwordCheck = await Bcrypt.compare(password, userExists.password);
      if (passwordCheck) {
        const token = generateJwt(userExists.id, userExists.email);
        return res
          .status(200)
          .json({
            user: {
              email: userExists.email,
              name: userExists.name,
              id: userExists.id,
            },
            token,
          });
      }
      return res.status(401).json({ message: "Incorrect password" });
    }
    res.status(404).json({ message: "email not registered" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createUser, login };
