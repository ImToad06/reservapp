import {
  createTableService,
  deleteTableService,
  readAllTablesService,
  readAvailableTablesService,
  readTableByIdService,
  updateTableService,
} from "../model/tableModel.js";

export const getAllTables = async (req, res) => {
  const tables = await readAllTablesService();
  res.status(200).json(tables);
};

export const getTableById = async (req, res) => {
  const { id } = req.params;
  const table = await readTableByIdService(id);
  res.status(200).json(table);
};

export const getAvaliableTables = async (req, res) => {
  const { date } = req.params;
  const table = await readAvailableTablesService(date);
  res.status(200).json(table);
};

export const createTable = async (req, res) => {
  const { capacity } = req.body;
  const table = await createTableService(capacity);
  res.status(201).json({ message: "Table created successfully", table });
};

export const updateTable = async (req, res) => {
  const { capacity } = req.body;
  const table = await updateTableService(capacity);
  res.status(200).json({ message: "Table updated successfully", table });
};

export const deleteTable = async (req, res) => {
  const { id } = req.params;
  const table = await deleteTableService(id);
  res.status(200).json({ message: "Table deleted successfully", table });
};
