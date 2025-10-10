import {
  createReserveService,
  deleteReserveService,
  getAllReservesService,
  getReserveByUserService,
  updateReserveService,
} from "../model/reserveModel";

export const getAllReserves = async (req, res) => {
  const reserves = await getAllReservesService();
  res.status(200).json({ reserves });
};

export const getReserveById = async (req, res) => {
  const { id } = req.params;
  const reserve = await getReserveByIdServicey(id);
  res.status(200).json({ reserve });
};

export const getReserveByUser = async (req, res) => {
  const { lastName } = req.params;
  const reserve = await getReserveByUserService(lastName);
  res.status(200).json({ reserve });
};

export const getReserveByDate = async (req, res) => {
  const { date } = req.params;
  const reserve = await getReserveByDateService(date);
  res.status(200).json({ reserve });
};

export const createReserve = async (req, res) => {
  const { name, lastName, persons, table, date } = req.body;
  const reserve = await createReserveService(
    name,
    lastName,
    persons,
    table,
    date,
  );
  res.status(201).json({ reserve });
};

export const updateReserve = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, persons, table, date } = req.body;
  const reserve = await updateReserveService(
    id,
    name,
    lastName,
    persons,
    table,
    date,
  );
  res.status(200).json({ reserve });
};

export const deleteReserve = async (req, res) => {
  const { id } = req.params;
  const reserve = await deleteReserveService(id);
  res.status(200).json({ reserve });
};
