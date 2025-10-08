import Joi from "joi";
import { createReserveService } from "../model/reserveModel.js";
import { createOrderService } from "../model/orderModel.js";

export const reservationSchema = Joi.object({
  userId: Joi.number().required(),
  tableId: Joi.number().required(),
  date: Joi.date().min("now").max(Joi.ref("$maxDate")).required().messages({
    "date.min": "Reservation date cannot be in the past",
    "date.max": "Reservation date cannot be more than 30 days ahead",
  }),
});

export const reserve = async (req, res) => {
  const { userId, tableId, date } = req.body;
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const { error, value } = reservationSchema.validate(req.body, {
    context: { maxDate },
  });
  if (error) {
    return res.status(400).json({
      message: "Date not valid",
      error: error.details[0].message,
    });
  }
  try {
    const availableTables = await getAvailableTablesService(date);
    const isTableAvailable = availableTables.some(
      (table) => table.table_id === tableId,
    );
    if (!isTableAvailable) {
      return res.status(409).json({
        message: "Table is not available for the selected date",
        availableTables: availableTables,
      });
    }
    const reserve = await createReserveService(userId, tableId, date);
    const order = await createOrderService(reserve.reserve_id);
    return res.status(201).json({
      message: "Reservation created successfully",
      reserve,
      order,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating reservation",
      error: err.message,
    });
  }
};
