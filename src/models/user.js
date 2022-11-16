const Pool = require("../config/db");
const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users WHERE email='${email}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};
const create = (data) => {
  const { id, email, passwordHash, fullname, roles } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO users(id, email,password,fullname,roles) VALUES('${id}','${email}','${passwordHash}','${fullname}','${roles}')`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const updateProfile = (data) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      "UPDATE users SET fullname = COALESCE($1,fullname), email = COALESCE($2,email) WHERE id = $3",
      [data.fullname, data.email, data.id],
      (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

module.exports = {
  findEmail,
  create,
  updateProfile,
};
