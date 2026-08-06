export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status:
    | "NEW"
    | "CONTACTED"
    | "QUALIFIED"
    | "WON"
    | "LOST";
  assignedToId: string | null;
  createdAt: string;
}