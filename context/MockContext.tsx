import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Ticket, User, TicketStatus, UserRole } from '../types';

interface MockContextType {
  currentUser: User | null;
  tickets: Ticket[];
  users: User[];
  login: (role: UserRole) => void;
  logout: () => void;
  addTicket: (category: any, description: string, priority: any) => void;
  updateTicketStatus: (ticketId: string, status: TicketStatus) => void;
  approveUser: (userId: string) => void;
}

const MockContext = createContext<MockContextType | undefined>(undefined);

const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Rahul', role: 'RESIDENT', flatNumber: '101', isApproved: true },
  { id: 'u2', name: 'Ramesh', role: 'PROVIDER', trade: 'PLUMBING', isApproved: true },
  { id: 'u3', name: 'Secretary', role: 'ADMIN', isApproved: true },
  { id: 'u4', name: 'New Guy', role: 'RESIDENT', flatNumber: '202', isApproved: false },
];

const INITIAL_TICKETS: Ticket[] = [
  {
    id: 't1',
    userId: 'u1',
    userName: 'Rahul',
    category: 'PLUMBING',
    description: 'Kitchen sink is leaking.',
    priority: 'HIGH',
    status: 'OPEN',
    createdAt: Date.now() - 1000 * 60 * 30, // 30 mins ago
    updatedAt: Date.now(),
  },
  {
    id: 't2',
    userId: 'u1',
    userName: 'Rahul',
    category: 'ELECTRICIAN',
    description: 'Fan not working in bedroom.',
    priority: 'LOW',
    status: 'IN_PROGRESS',
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    updatedAt: Date.now(),
  },
  {
    id: 't3',
    userId: 'u1',
    userName: 'Rahul',
    category: 'SEWAGE',
    description: 'Bad smell coming from the drain.',
    priority: 'HIGH',
    status: 'OPEN',
    createdAt: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago (SLA BREACH)
    updatedAt: Date.now(),
  },
];

export const MockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  const login = (role: UserRole) => {
    const user = users.find(u => u.role === role);
    if (user) setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addTicket = (category: any, description: string, priority: any) => {
    if (!currentUser) return;
    const newTicket: Ticket = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      userName: currentUser.name,
      category,
      description,
      priority,
      status: 'OPEN',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const updateTicketStatus = (ticketId: string, status: TicketStatus) => {
    setTickets(prev => prev.map(t => 
      t.id === ticketId ? { ...t, status, updatedAt: Date.now() } : t
    ));
  };

  const approveUser = (userId: string) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, isApproved: true } : u
    ));
  };

  return (
    <MockContext.Provider value={{
      currentUser,
      tickets,
      users,
      login,
      logout,
      addTicket,
      updateTicketStatus,
      approveUser
    }}>
      {children}
    </MockContext.Provider>
  );
};

export const useMock = () => {
  const context = useContext(MockContext);
  if (!context) throw new Error('useMock must be used within a MockProvider');
  return context;
};
