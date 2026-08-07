import prisma from "../config/prisma";
import { LeadStatus } from "@prisma/client";
export const createLead = async (
  data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  },
  createdById: string
) => {
  const lead = await prisma.lead.create({
    data: {
      ...data,
      createdById,
    },
  });

  await prisma.activityLog.create({
    data: {
      leadId: lead.id,
      userId: createdById,
      action: "Lead Created",
    },
  });

  return lead;
};


export const getAllLeads = async (
  page = 1,
  limit = 10,
  status?: LeadStatus,
  search?: string
) => {
  const skip = (page - 1) * limit;

  const where: Prisma.LeadWhereInput = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        company: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      skip,
      take: limit,
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.lead.count({
      where,
    }),
  ]);

  return {
    total,
    page,
    limit,
    data: leads,
  };
};
export const getLeadById = async (id: string) => {
  return prisma.lead.findUnique({
    where: { id },
    include: {
      assignedTo: true,
      createdBy: true,
      notes: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      activities: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};
import { Prisma } from "@prisma/client";
export const updateLead = async (
  id: string,
  data: Prisma.LeadUpdateInput,
  userId: string
) => {
  const lead = await prisma.lead.update({
    where: { id },
    data,
  });

  await prisma.activityLog.create({
    data: {
      leadId: id,
      userId,
      action: "Lead Updated",
    },
  });

  return lead;
};

export const assignLead = async (
  leadId: string,
  assignedToId: string,
  userId: string
) => {
  const lead = await prisma.lead.update({
    where: {
      id: leadId,
    },
    data: {
      assignedToId,
    },
  });

  await prisma.activityLog.create({
    data: {
      leadId,
      userId,
      action: "Lead Assigned",
    },
  });

  return lead;
};

export const changeStatus = async (
  leadId: string,
  status: LeadStatus,
  userId: string
) => {
  const lead = await prisma.lead.update({
    where: {
      id: leadId,
    },
    data: {
      status,
    },
  });

  await prisma.activityLog.create({
    data: {
      leadId,
      userId,
      action: `Status changed to ${status}`,
    },
  });

  return lead;
};

export const addNote = async (
  leadId: string,
  userId: string,
  message: string
) => {
  const note = await prisma.leadNote.create({
    data: {
      leadId,
      userId,
      message,
    },
  });

  await prisma.activityLog.create({
    data: {
      leadId,
      userId,
      action: "Note Added",
    },
  });

  return note;
};

export const deleteLead = async (
  id: string,
  userId: string
) => {
  await prisma.activityLog.create({
    data: {
      leadId: id,
      userId,
      action: "Lead Deleted",
    },
  });

  return prisma.lead.delete({
    where: {
      id,
    },
  });
};

export const getDashboardStats = async () => {
  const [
    total,
    newLeads,
    contacted,
    qualified,
    won,
    lost,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.lead.count({ where: { status: "CONTACTED" } }),
    prisma.lead.count({ where: { status: "QUALIFIED" } }),
    prisma.lead.count({ where: { status: "WON" } }),
    prisma.lead.count({ where: { status: "LOST" } }),
  ]);

  return {
    total,
    newLeads,
    contacted,
    qualified,
    won,
    lost,
  };
};
export const getActivity = async (leadId: string) => {
  return prisma.activityLog.findMany({
    where: {
      leadId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};