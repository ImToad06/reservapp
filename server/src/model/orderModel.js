import pool from "../config/db.js";

export const createOrderService = async (reserveId) => {
  const query = `
    INSERT INTO orders (reserve, status) VALUES ($1, 'a')
    RETURNING *;
  `;
  const res = await pool.query(query, [reserveId]);
  return res.rows[0];
};

export const getProductsOrderService = async (orderId) => {
  const query = `
    SELECT
      o.order_id, o.reserve, p.name, op.amount
    FROM orders o JOIN order_products op ON o.order_id = op.order
    JOIN products p ON op.product = p.product_id
    WHERE o.order_id = $1;
  `;
  const res = await pool.query(query, [orderId]);
  return res.rows;
};

export const addProductService = async (orderId, productId, amount) => {
  const query = `
  INSERT INTO order_products (order, product, amount)
  VALUES ($1, $2, $3) RETURNING *;
  `;
  const res = await pool.query(query, [orderId, productId, amount]);
  return res.rows[0];
};

export const updateProductAmountService = async (
  orderId,
  productId,
  amount,
) => {
  const query = `
  UPDATE order_products set amount = $1
  WHERE orderId = $2 AND productId = $3 RETURNING *;
  `;
  const res = await pool.query(query, [amount, orderId, productId]);
  return res.rows[0];
};
