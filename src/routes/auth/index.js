import express from "express";
import httpStatus from 'http-status';
import basicDecode from 'basic-auth';
import _ from "lodash";
import md5  from "md5";

import userContainer from "../../services/database/userContainer/index.js";
import UserDTO from '../../dto/user/index.js';
import JwtService from '../../services/jwt/index.js';
import authMiddleware from '../../middlewares/authMiddleware.js';


const router = express.Router();
const userService = new userContainer();
const jwtService = new JwtService();

router.post("/signin", async (req, res) => {
  try {
    const { name, pass } = basicDecode(req);
    if (_.isNil(name) || _.isNil(pass)) {
      return res.status(400).json({
        success: false,
        message: `${httpStatus[400]}: Username or password missing`,
      });
    }
    const userData = await userService.getUserByCondition({
      username: name,
      password: md5(pass),
    });
    if (!userData) {
      return res.status(403).json({
        success: false,
        message: `${httpStatus[403]}: Bad username or password`,
      });
    }
    const userDataFormatted = new UserDTO(userData).build();

    const accessToken = jwtService.generateJwt(userDataFormatted);

    return res.status(200).json({
      success: true,
      expiresIn: 60 * 60,
      accessToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: `${httpStatus[500]}: Internal error`,
    });
  }
});

router.get('/test', authMiddleware, (req, res) => {
    res.status(200).json(req.user); 
});

export default router;
