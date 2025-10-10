import pool from "../config/db.js";

export const createReserveService = async (
  name,
  lastName,
  nPersons,
  table,
  date,
) => {
  const query = `
    INSERT INTO reserves (name, last_name, persons, table, date, status)
    VALUES ($1, $2, $3, $4, $5, 'a')
    RETURNING *;
  `;
  const result = await pool.query(query, [
    name,
    lastName,
    nPersons,
    table,
    date,
  ]);
  return result.rows[0];
};

export const getAllReservesService = async () => {
  const query = "SELECT * FROM reserves r WHERE r.status = 'a';";
  const result = await pool.query(query);
  return result.rows;
};

export const getReserveByIdService = async (reserveId) => {
  const query = `
    SELECT * FROM reserves r
    WHERE r.status = 'a' AND r.reserve_id = $1;
  `;
  const result = await pool.query(query, [reserveId]);
  return result.rows[0];
};

export const getReserveByUserService = async (lastName) => {
  const query = `
    SELECT * FROM reserves r
    WHERE r.status = 'a' AND r.last_name = $1;
  `;
  const result = await pool.query(query, [lastName]);
  return result.rows;
};

export const getReserveByDateService = async (date) => {
  const query = `
    SELECT * FROM reserves r
    WHERE r.status = 'a' AND r.date = $1;
  `;
  const result = await pool.query(query, [date]);
  return result.rows;
};

export const updateReserveService = async (
  reserveId,
  name,
  lastName,
  nPersons,
  table,
  date,
) => {
  const query = `
    UPDATE reserves SET name = $1, last_name = $2, persons = $3, table = $4
           date = $5, status = 'a'
    WHERE status = 'a' AND reserve_id = $6 RETURNING *;
  `;
  const result = await pool.query(query, [
    name,
    lastName,
    nPersons,
    table,
    date,
    reserveId,
  ]);
  return result.rows[0];
};

export const deleteReserveService = async (reserveId) => {
  const query = `
    UPDATE reserves SET status = 'i' WHERE reserve_id = $1 RETURNING *;
  `;
  const result = await pool.query(query, [reserveId]);
  return result.rows[0];
};
