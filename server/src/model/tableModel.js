import pool from "../config/db.js";

export const createTableService = async (capacity) => {
  const query = `
    INSERT INTO tables (capacity, status) VALUES ($1, 'a') RETURNING *;
  `;
  const result = await pool.query(query, [capacity]);
  return result.rows[0];
};

export const readAllTablesService = async () => {
  const query = "SELECT * FROM tables WHERE status = 'a';";
  const result = await pool.query(query);
  return result.rows;
};

export const readAvailableTablesService = async (date) => {
  const query = `
    SELECT t.* FROM tables t
    WHERE t.status = 'a'
    AND t.table_id NOT IN (
      SELECT r.table FROM reserves r
      WHERE r.date = $1 AND r.status = 'a'
    )
    ORDER BY t.capacity;
  `;
  const result = await pool.query(query, [date]);
  return result.rows;
};
export const readTableByIdService = async (tableId) => {
  const query = "SELECT * FROM tables WHERE table_id = $1 AND status = 'a';";
  const res = await pool.query(query, [tableId]);
  return res.rows[0];
};

export const updateTableService = async (tableId, capacity) => {
  const query = `
    UPDATE tables SET capacity = $1, status = 'a'
    WHERE table_id = $2 RETURNING *;
  `;
  const result = await pool.query(query, [capacity, tableId]);
  return result.rows[0];
};

export const deleteTableService = async (tableId) => {
  const query = `
    UPDATE tables SET status = 'i' WHERE table_id = $1 RETURNING *;
  `;
  const result = await pool.query(query, [tableId]);
  return result.rows[0];
};
