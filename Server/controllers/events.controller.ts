import Express, { Request, Response, NextFunction } from "express";
import * as EventService from "../services/events.service";

interface IEventRequest extends Request {
  params: { userId: string };
  query: {
    start: string;
    end: string;
  };
  body: {
    start?: string;
    end?: string;
    attendees?: string[];
    isAllDay?: boolean;
    title: string;
    description: string;
  };
}

export const getUserEvents = async (req: IEventRequest, res: Response) => {
  const { userId } = req.params;
  const { start, end } = req.query;
  try {
    const events = await EventService.getUserEvents(userId, { start, end });
    return res.status(200).json(events);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const createEvent = async (req: IEventRequest, res: Response) => {
  const { userId } = req.params;
  const { start, end, attendees, title, description, isAllDay } = req.body;

  if (start == null || end == null) {
    res.status(400).json({ message: "start & end cannot be empty" });
    return;
  }

  try {
    const newEvent = await EventService.createEvent(userId, {
      start,
      end,
      attendees,
      title,
      description,
      isAllDay,
    });
    res.status(201).json(newEvent);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const { userId } = req.params;
  const { start, end, attendees, title, description, isAllDay } = req.body;

  if (start == null || end == null) {
    throw new Error("start & end cannot be empty");
  }

  try {
    const events = await EventService.updateEvent(userId, eventId, {
      start,
      end,
      attendees,
      title,
      description,
      isAllDay,
    });
    return res.status(200).json({
      events,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const getUserEvent = async (req: Request, res: Response) => {
  const { userId, eventId } = req.params;
  try {
    const userEvent = await EventService.getUserEvent(userId, eventId);
    return res.status(200).json(userEvent);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const listAttendingEvents = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const attendingEvents = await EventService.getAttendingEvents(userId);
    return res.status(200).json(attendingEvents);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { eventId, userId } = req.params;
  try {
    const events = await EventService.deleteEvent(eventId, userId);
    return res.status(200).json(events);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};
