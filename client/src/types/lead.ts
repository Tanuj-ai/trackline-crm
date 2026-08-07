export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  status:
    | "NEW"
    | "CONTACTED"
    | "QUALIFIED"
    | "WON"
    | "LOST";
  assignedToId: string | null;
  createdAt: string;
}

export interface CreateLeadDto {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}