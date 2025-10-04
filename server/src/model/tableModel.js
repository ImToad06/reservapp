import pool from "../config/db.js";

export const getAllTablesService = async () => {
  const query = "SELECT * FROM tables;";
  const res = await pool.query(query);
  return res.rows;
};

export const getTableByIdService = async (tableId) => {
  const query = "SELECT * FROM tables WHERE table_id = $1;";
  const res = await pool.query(query, [tableId]);
  return res.rows[0];
};

export const getTableByNumberService = async (tableNumber) => {
  const query = "SELECT * FROM tables WHERE number = $1;";
  const res = await pool.query(query, [tableNumber]);
  return res.rows[0];
};

export const createTableService = async (tableNumber, capacity) => {
  const query = `
    INSERT INTO tables (number, capacity, status) VALUES ($1, $2, 'a')
    RETURNING *;
  `;
  const res = await pool.query(query, [tableNumber, capacity]);
  return res.rows[0];
};

export const updateTableService = async (tableId, tableNumber, capacity) => {
  const query = `
    UPDATE tables SET number = $1, capacity = $2
    WHERE table_id = $3 RETURNING *;
  `;
  const res = await pool.query(query, [tableNumber, capacity, tableId]);
  return res.rows[0];
};

export const deleteTableService = async (tableId) => {
  const query = `
    UPDATE tables SET status = 'i' WHERE table_id = $1 RETURNING *;
  `;
  const res = await pool.query(query, [tableId]);
  return res.rows[0];
};
