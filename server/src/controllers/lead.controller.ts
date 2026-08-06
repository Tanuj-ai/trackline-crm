import { Request, Response } from "express";
import { LeadStatus } from "@prisma/client";
import * as leadService from "../services/lead.service";
import {
  createLeadSchema,
  updateLeadSchema,
} from "../validations/lead.validation";
import prisma from "../config/prisma";

export const createPublicLead = async (
  req: Request,
  res: Response
) => {
  try {
    const data = createLeadSchema.parse(req.body);

    const admin = await prisma.user.findUnique({
      where: {
        email: "admin@trackline.com",
      },
    });

    if (!admin) {
      return res.status(500).json({
        success: false,
        message: "Default admin not found",
      });
    }

    const lead = await leadService.createLead(data, admin.id);

    return res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      lead,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const data = createLeadSchema.parse(req.body);

    const lead = await leadService.createLead(
      data,
      req.user!.userId
    );

    return res.status(201).json({
      success: true,
      lead,
    });

  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const status = req.query.status as LeadStatus | undefined;

    const result = await leadService.getAllLeads(
      page,
      limit,
      status
    );

    return res.json({
      success: true,
      ...result,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLead = async (
  req: Request,
  res: Response
) => {
  try {

    const lead = await leadService.getLeadById(
      String(req.params.id)
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.json({
      success: true,
      lead,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {

    const data = updateLeadSchema.parse(req.body);

    const lead = await leadService.updateLead(
      String(req.params.id),
      data,
      req.user!.userId
    );

    return res.json({
      success: true,
      lead,
    });

  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const assignLead = async (
  req: Request,
  res: Response
) => {
  try {

    const { userId } = req.body;

    const lead = await leadService.assignLead(
      String(req.params.id),
      userId,
      req.user!.userId
    );

    return res.json({
      success: true,
      lead,
    });

  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const changeLeadStatus = async (
  req: Request,
  res: Response
) => {
  try {

    const lead = await leadService.changeStatus(
      String(req.params.id),
      req.body.status,
      req.user!.userId
    );

    return res.json({
      success: true,
      lead,
    });

  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addLeadNote = async (
  req: Request,
  res: Response
) => {
  try {

    const note = await leadService.addNote(
      String(req.params.id),
      req.user!.userId,
      req.body.message
    );

    return res.status(201).json({
      success: true,
      note,
    });

  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {

    await leadService.deleteLead(
      String(req.params.id),
      req.user!.userId
    );

    return res.json({
      success: true,
      message: "Lead deleted successfully",
    });

  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {

  const stats = await leadService.getDashboardStats();

  return res.json({
    success: true,
    stats,
  });

};

export const getActivity = async (
  req: Request,
  res: Response
) => {
  try {
    const activity = await leadService.getActivity(
      String(req.params.id)
    );

    return res.json({
      success: true,
      activity,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

