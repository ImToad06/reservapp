import pool from "../config/db.js";

export const getAllProductsService = async () => {
  const query = `
    SELECT
      p.product_id, p.name, pt.type, p.price, p.status
    FROM products p
    JOIN product_types pt ON p.type=pt.product_type_id
    WHERE p.status='a';
  `;
  const res = await pool.query(query);
  return res.rows;
};

export const getProductByIdService = async (productId) => {
  const query = `
  SELECT
    p.product_id, p.name, pt.type, p.price, p.status
  FROM products p
  JOIN product_types pt ON p.type=pt.product_type_id
  WHERE p.status='a' AND p.product_id = $1;
  `;
  const res = await pool.query(query, [productId]);
  return res.rows[0];
};

export const getProductByNameService = async (productName) => {
  const query = `
  SELECT
    p.product_id, p.name, pt.type, p.price, p.status
  FROM products p
  JOIN product_types pt ON p.type=pt.product_type_id
  WHERE p.status='a' AND p.name = $1;
  `;
  const res = await pool.query(query, [productName]);
  return res.rows[0];
};

export const getTypeService = async (type) => {
  const query = "SELECT * FROM product_types where product_type_id = $1";
  const result = await pool.query(query, [type]);
  return result.rows[0];
};

export const createProductService = async (name, type, price) => {
  const query = `
    INSERT INTO products (name, type, price, status) VALUES ($1, $2, $3, 'a')
    RETURNING *;
  `;
  const res = await pool.query(query, [name, type, price]);
  return res.rows[0];
};

export const updateProductService = async (productId, name, type, price) => {
  const query = `
    UPDATE products SET name = $1, type = $2, price = $3
    WHERE product_id = $4 RETURNING *;
  `;
  const res = await pool.query(query, [name, type, price, productId]);
  return res.rows[0];
};

export const deleteProductService = async (productId) => {
  const query = `
    UPDATE products SET status = 'i' WHERE product_id = $1 RETURNING *;
  `;
  const res = await pool.query(query, [productId]);
  return res.rows[0];
};
