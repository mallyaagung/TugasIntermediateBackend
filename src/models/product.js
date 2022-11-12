const Pool = require("../config/db");
const selectAll = ({ limit, offset, sort, sortby, querySearch }) => {
  return Pool.query(
    `SELECT * FROM product ${querySearch} ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};
const selectProduct = (id) => {
  return Pool.query(`select * from product where id=${id}`);
};
const insertProduct = (
  id,
  productname,
  storename,
  sizeproduct,
  colorproduct,
  priceproduct,
  stockproduct,
  ratingproduct,
  id_category,
  id_seller,
  description,
  photo
) => {
  return Pool.query(
    `INSERT INTO product(id, productname, storename, sizeproduct, colorproduct, priceproduct, stockproduct, ratingproduct, id_category, id_seller,description, photo) VALUES(${id},'${productname}','${storename}','${sizeproduct}','${colorproduct}',${priceproduct},${stockproduct},${ratingproduct},${id_category},${id_seller},'${description}', '${photo}' );`
  );
};
const updateProduct = (
  id,
  productname,
  storename,
  sizeproduct,
  colorproduct,
  priceproduct,
  stockproduct,
  ratingproduct,
  id_category,
  id_seller,
  description,
  photo
) => {
  return Pool.query(
    `UPDATE product SET productname='${productname}',storename='${storename}',sizeproduct='${sizeproduct}',colorproduct='${colorproduct}',priceproduct=${priceproduct},stockproduct=${stockproduct}, ratingproduct=${ratingproduct},id_category=${id_category},id_seller=${id_seller},description='${description}', photo='${photo}' WHERE id='${id}';`
  );
};
const deleteProduct = (id) => {
  return Pool.query(`DELETE FROM product WHERE id=${id};`);
};

const countProduct = () => {
  return Pool.query("SELECT COUNT(*) FROM product");
};

const findId = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT id FROM product where id =${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = {
  selectAll,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countProduct,
  findId,
};
