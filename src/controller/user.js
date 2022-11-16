const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { findEmail, create, updateProfile } = require("../models/user");
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");

const userController = {
  registrasi: async (req, res, next) => {
    try {
      const { email, password, fullname, roles } = req.body;
      const { rowCount } = await findEmail(email);
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      if (rowCount) {
        return next(createError(403, "Email is already used"));
      }
      const data = {
        id: uuidv4(),
        email,
        passwordHash,
        fullname,
        roles,
      };
      create(data)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            201,
            "Account has been created"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [user],
      } = await findEmail(email);
      if (!user) {
        return commonHelper.response(res, null, 403, "Email is invalid");
      }
      const isValidPassword = bcrypt.compareSync(password, user.password);
      console.log(isValidPassword);

      if (!isValidPassword) {
        return commonHelper.response(res, null, 403, "Password is invalid");
      }
      delete user.password;
      const payload = {
        email: user.email,
        roles: user.roles,
      };
      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.generateRefreshToken(payload);

      commonHelper.response(res, user, 201, "Login is successful");
    } catch (error) {
      console.log(error);
    }
  },
  profile: async (req, res, next) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },
  updateProfile: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
      const idUser = decoded.id;
      // console.log(req.file)
      const data = {
        fullname: req.body.fullname,
        email: req.body.email,
        id: idUser,
      };
      updateProfile(data)
        .then(() => {
          commonHelper.response(res, data, 201, "Update data is successful");
        })
        .catch((error) => {
          console.log(error);
          next(createError);
        });
    } catch (error) {
      console.log(error);
      next(createError);
    }
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT);
    const payload = {
      email: decoded.email,
      roles: decoded.roles,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 200, "Token Refreshed");
  },
};

module.exports = userController;
