import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createEvent = async (req: Request, res: Response) => {
  const { title, desc, place, date, image, categoryId } = req.body;
  const userId = (req as any).userId;
console.log("Données reçues dans le body :", req.body);
console.log("UserId récupéré :", userId);

  try {
    const event = await prisma.event.create({
      data: {
        title,
        desc,
        place,
        date: new Date(date),
        image,
        categoryId: categoryId ? Number(categoryId) : null,
        creatorId: userId,
      },
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'événement", error });
  }
};


export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: { category: true, creator: true },
      orderBy: { date: "asc" },
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des événements", error });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: { category: true, creator: true },
    });
    if (!event) return res.status(404).json({ message: "Événement non trouvé" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'événement", error });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, desc, place, date, image, categoryId } = req.body;
  try {
    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        title,
        desc,
        place,
        date: new Date(date),
        image,
        categoryId: categoryId ? Number(categoryId) : null,
      },
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'événement", error });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.event.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Événement supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'événement", error });
  }
};

export const joinEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).userId;


  try {
    const participation = await prisma.participation.create({
      data: {
        userId,
        eventId: Number(id),
      },
    });
    res.status(201).json(participation);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription à l'événement", error });
  }
};

export const leaveEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).userId;


  try {
    await prisma.participation.deleteMany({
      where: {
        userId,
        eventId: Number(id),
      },
    });
    res.status(200).json({ message: "Désinscription réussie" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la désinscription", error });
  }
};
