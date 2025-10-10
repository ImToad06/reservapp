import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createEmployeeService,
  deleteEmployeeService,
  readAllEmployeesService,
  readEmployeeByEmailService,
  readEmployeeByIdService,
  readEmployeeByTypeService,
  readEmployeeTypeService,
  updateEmployeeService,
} from "../model/employeeModel.js";

export const getAllEmployees = async (req, res) => {
  const users = await readAllEmployeesService();
  res.status(200).json(users);
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  const user = await readEmployeeByIdService(id);
  res.status(200).json(user);
};

export const getEmployeeByEmail = async (req, res) => {
  const { email } = req.params;
  const user = await readEmployeeByEmailService(email);
  res.status(200).json(user);
};

export const getEmployeeByType = async (req, res) => {
  const { type } = req.params;
  const user = await readEmployeeByTypeService(type);
  res.status(200).json(user);
};
export const registerEmployee = async (req, res) => {
  const { name, lastName, type, email, password } = req.body;
  const typeData = await readEmployeeTypeService(type);
  if (!typeData) return res.status(400).json({ message: "Invalid Rol" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const employee = await createEmployeeService(
    name,
    lastName,
    typeData?.type_employee_id,
    email,
    hashedPassword,
  );
  res.status(201).json({
    message: "Employee created successfully",
    employee,
  });
};

export const loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  const employee = await readEmployeeByEmailService(email);
  if (!employee) return res.status(404).json({ message: "User not found" });
  const isMatch = await bcrypt.compare(password, employee.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });
  const token = jwt.sign(
    { id: employee.employee_id, role: employee.type },
    process.env.JWT_SECRET,
    { expiresIn: "12h" },
  );
  res.status(200).json({
    message: "Successfull login",
    token,
  });
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, type, email, password: rawPassword } = req.body;
  const password = rawPassword
    ? await bcrypt.hash(rawPassword, 10)
    : rawPassword;
  const typeData = await readEmployeeTypeService(type);
  const employee = await updateEmployeeService(
    id,
    name,
    lastName,
    typeData?.type_employee_id,
    email,
    password,
  );
  res.status(200).json({
    message: "User updated successfully",
    employee,
  });
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = deleteEmployeeService(id);
  res.status(200).json({
    message: "User deleted successfully",
    employee,
  });
};
