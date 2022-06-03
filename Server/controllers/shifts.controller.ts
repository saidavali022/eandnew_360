import Express, { Request, Response, NextFunction } from "express";
import * as ShiftService from "../services/shifts.service";

interface IShiftRequest extends Request {
  params: {
    empId: string;
  };
  query: {
    date: string;
  };
  body: {
    shift_in: string;
    shift_out: string;
  };
}

export const getAllShifts = async (req: IShiftRequest, res: Response) => {
  try {
    const shifts = await ShiftService.getAllShifts();
    res.status(200).json(shifts);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};
export const getUserShift = async (req: IShiftRequest, res: Response) => {
  const { empId } = req.params;
  try {
    const userShift = await ShiftService.getUserShift(empId);
    res.status(200).json(userShift);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const getUserShifts = async (req: IShiftRequest, res: Response) => {
  const { empId } = req.params;
  const { date } = req.query;
  try {
    const userShifts = await ShiftService.getUserShifts(empId, date);

    res.status(200).json(userShifts);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const createUserShift = async (req: IShiftRequest, res: Response) => {
  const { empId } = req.params;
  const { shift_in, shift_out } = req.body;
  try {
    const newUserShift = await ShiftService.createUserShift(
      empId,
      shift_in,
      shift_out
    );
    res.status(201).json(newUserShift);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};
