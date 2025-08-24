// src/controllers/contactController.ts
import { Request, Response } from "express";
import { identifyContact } from "../services/contactService";

export async function identify(req: Request, res: Response) {
  try {
    const { email, phoneNumber } = req.body;
    const response = await identifyContact(email, phoneNumber);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
