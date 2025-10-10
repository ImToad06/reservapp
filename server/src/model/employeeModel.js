import pool from "../config/db.js";

export const createEmployeeService = async (
  name,
  lastName,
  type,
  email,
  password,
) => {
  const query = `
  INSERT INTO employees (name, last_name, type, email, password, status)
  VALUES ($1, $2, $3, $4, $5, 'a') RETURNING *;
  `;
  const result = await pool.query(query, [
    name,
    lastName,
    type,
    email,
    password,
  ]);
  return result.rows[0];
};

export const readAllEmployeesService = async () => {
  const query = `
  SELECT
    e.employee_id, e.name, e.last_name, t.type, e.email, e.password
  FROM employees e JOIN type_employees t on e.type = t.type_employee_id
  WHERE e.status = 'a';
  `;
  const result = await pool.query(query);
  return result.rows;
};

export const readEmployeeByIdService = async (employeeId) => {
  const query = `
  SELECT
    e.employee_id, e.name, e.last_name, t.type, e.email, e.password
  FROM employees e JOIN type_employees t on e.type = t.type_employee_id
  WHERE e.status = 'a' AND e.employee_id = $1;
  `;
  const result = await pool.query(query, [employeeId]);
  return result.rows[0];
};

export const readEmployeeByEmailService = async (email) => {
  const query = `
  SELECT
    e.employee_id, e.name, e.last_name, t.type, e.email, e.password
  FROM employees e JOIN type_employees t on e.type = t.type_employee_id
  WHERE e.status = 'a' AND e.email = $1;
  `;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

export const readEmployeeByTypeService = async (type) => {
  const query = `
  SELECT
    e.employee_id, e.name, e.last_name, t.type, e.email, e.password
  FROM employees e JOIN type_employees t on e.type = t.type_employee_id
  WHERE e.status = 'a' AND t.type = $1;
  `;
  const result = await pool.query(query, [type]);
  return result.rows[0];
};

export const readEmployeeTypeService = async (type) => {
  const query = `
    SELECT * FROM type_employees WHERE type = $1;
  `;
  const result = await pool.query(query, [type]);
  return result.rows[0];
};

export const updateEmployeeService = async (
  employeeId,
  name,
  lastName,
  type,
  email,
  password,
) => {
  const query = `
  UPDATE employees
  SET name = $1, last_name = $2, type = $3, email = $4,
      password = $5, status = 'a'
  WHERE employee_id = $6
  RETURNING *;
  `;
  const result = await pool.query(query, [
    name,
    lastName,
    type,
    email,
    password,
    employeeId,
  ]);
  return result.rows[0];
};

export const deleteEmployeeService = async (employeeId) => {
  const query = `
  UPDATE employees SET status = 'i' WHERE employee_id = $1 RETURNING *;
  `;
  const result = await pool.query(query, [employeeId]);
  return result.rows[0];
};
