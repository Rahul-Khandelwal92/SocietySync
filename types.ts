export type UserRole = 'RESIDENT' | 'PROVIDER' | 'ADMIN';

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';

export type TicketPriority = 'LOW' | 'HIGH';

export type ServiceCategory = 'PLUMBING' | 'ELECTRICIAN' | 'SECURITY' | 'SEWAGE';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  flatNumber?: string; // For residents
  trade?: ServiceCategory; // For providers
  isApproved: boolean;
}

export interface Ticket {
  id: string;
  userId: string; // Creator
  userName: string;
  category: ServiceCategory;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: number; // Timestamp
  updatedAt: number;
}
