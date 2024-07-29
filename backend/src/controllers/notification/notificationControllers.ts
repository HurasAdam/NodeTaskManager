import { Request, Response } from "express";
import Notification from "../../models/Notification";

export const getNotifications = async (req: Request, res: Response) => {
    try {
      const notifications = await Notification.find({}).sort({ _id: -1 });
  
      if (!notifications) {
        return res.status(200).json([]);
      }
      res.status(200).json(notifications);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "An unexpected error has occured" });
    }
  };
  