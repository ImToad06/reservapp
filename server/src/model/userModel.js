import pool from "../config/db.js";

export const getUserByIdService = async (user_id) => {
  const result = await pool.query(
    `
    SELECT
      u.user_id, u.name, u.last_name, u.birthdate, u.email, u.password,
      u.pfp_url, r.role
    FROM users u
    JOIN roles r on u.role = r.role_id
    WHERE u.user_id = $1 AND u.status = 'a';
  `,
    [user_id],
  );
  return result.rows[0];
};

export const getUserByEmailService = async (email) => {
  const result = await pool.query(
    `
    SELECT
      u.user_id, u.name, u.last_name, u.birthdate, u.email, u.password,
      u.pfp_url, r.role
    FROM users u
    JOIN roles r on u.role = r.role_id
    WHERE u.email = $1 AND u.status = 'a';
  `,
    [email],
  );
  return result.rows[0];
};

export const createUserService = async (
  name,
  lastName,
  birthdate,
  email,
  password,
  role = 3,
) => {
  const result = await pool.query(
    `
    INSERT INTO users (name, last_name, birthdate, email, password, role, status)
    VALUES ($1, $2, $3, $4, $5, $6, 'a') RETURNING *;
  `,
    [name, lastName, birthdate, email, password, role],
  );
  return result.rows[0];
};

export const updateUserService = async (
  name,
  lastName,
  birthdate,
  email,
  password,
  pfpUrl,
  role = 3,
  userId,
) => {
  const result = await pool.query(
    `
    UPDATE users SET name=$1, last_name=$2, birthdate=$3, email=$4, 
    password=$5, pfp_url=$6, role=$7 WHERE user_id=$8 RETURNING *;
  `,
    [name, lastName, birthdate, email, password, pfpUrl, role, userId],
  );
  return result.rows[0];
};

export const deleteUserService = async (userId) => {
  const result = await pool.query(
    `
    UPDATE users SET status='i' WHERE user_id=$1 RETURNING *;
`,
    [userId],
  );
};
