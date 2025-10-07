import pool from "../config/db.js";

export const getAllReservesService = async () => {
  const query = "SELECT * FROM reserves r WHERE r.status = 'a';";
  const res = await pool.query(query);
  return res.rows;
};

export const getReserveByIdService = async (reserveId) => {
  const query = `
    SELECT * FROM reserves r
    WHERE r.status = 'a' AND r.reserve_id = $1;
  `;
  const res = await pool.query(query, [reserveId]);
  return res.rows[0];
};

export const getReserveByUserService = async (UserId) => {
  const query = `
    SELECT * FROM reserves r
    WHERE r.status = 'a' AND r.user = $1;
  `;
  const res = await pool.query(query, [UserId]);
  return res.rows;
};

export const createReserveService = async (userId, tableId, date) => {
  const query = `
    INSERT INTO reserves (user, table, date, status) VALUES ($1, $2, $3, 'a')
    RETURNING *;
  `;
  const res = await pool.query(query, [userId, tableId, date]);
  return res.rows[0];
};

export const updateReserveService = async (
  reserveId,
  userId,
  tableId,
  date,
) => {
  const query = `
    UPDATE reserves SET user = $1, table = $2, date = $3
    WHERE reserve_id = $4 RETURNING *;
  `;
  const res = await pool.query(query, [userId, tableId, date, reserveId]);
  return res.rows[0];
};

export const getAvailableTablesService = async (date) => {
  const query = `
    SELECT t.* FROM tables t
    WHERE t.status = 'a'
    AND t.table_id NOT IN (
      SELECT r.table FROM reserves r
      WHERE r.date = $1 AND r.status = 'a'
    )
    ORDER BY t.capacity, t.number;
  `;
  const res = await pool.query(query, [date]);
  return res.rows;
};

export const deleteReserveService = async (reserveId) => {
  const query = `
    UPDATE reserves SET status = 'i' WHERE reserve_id = $1 RETURNING *;
  `;
  const res = await pool.query(query, [reserveId]);
  return res.rows[0];
};
