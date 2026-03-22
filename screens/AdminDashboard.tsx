import React from 'react';
import { useMock } from '../context/MockContext';
import { Card, Button, Badge } from '../components/UI';
import { AlertTriangle, Check, X, User } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { tickets, users, approveUser } = useMock();

  // SLA Logic: Status != RESOLVED AND TimeElapsed > 4 hours
  const isSlaBreached = (ticket: any) => {
    const timeElapsed = Date.now() - ticket.createdAt;
    const hoursElapsed = timeElapsed / (1000 * 60 * 60);
    return ticket.status !== 'RESOLVED' && hoursElapsed > 4;
  };

  const slaBreachedTickets = tickets.filter(isSlaBreached);
  const normalTickets = tickets.filter(t => !isSlaBreached(t));
  const pendingUsers = users.filter(u => !u.isApproved);

  return (
    <div className="space-y-8">
      
      {/* SLA Monitor Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-gray-900">SLA Monitor</h2>
          {slaBreachedTickets.length > 0 && (
             <Badge color="bg-red-600 text-white animate-pulse">
               {slaBreachedTickets.length} Breaches Detected
             </Badge>
          )}
        </div>

        <div className="space-y-4">
          {slaBreachedTickets.map(ticket => (
            <Card key={ticket.id} className="border border-red-200 bg-red-50/50">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                   <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-red-700 flex items-center gap-1">
                        <AlertTriangle size={16} /> SLA BREACH
                      </span>
                      <span className="text-sm text-gray-600">ID: #{ticket.id}</span>
                   </div>
                   <p className="font-medium text-gray-900">{ticket.category} - {ticket.userName}</p>
                   <p className="text-gray-600 text-sm mb-2">{ticket.description}</p>
                   <p className="text-xs text-red-600 font-mono">
                     Open for {Math.floor((Date.now() - ticket.createdAt) / (1000 * 60 * 60))} hours
                   </p>
                </div>
                <div className="flex items-center">
                  <Badge color="bg-white text-gray-800 border border-gray-200">{ticket.status}</Badge>
                </div>
              </div>
            </Card>
          ))}
          
          {slaBreachedTickets.length === 0 && (
            <div className="p-4 bg-green-50 border border-green-100 rounded-lg text-green-700 text-sm">
              All systems normal. No SLA breaches.
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">All Tickets</h2>
         <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
           <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
               <tr>
                 <th className="p-4 font-medium">User</th>
                 <th className="p-4 font-medium">Category</th>
                 <th className="p-4 font-medium">Status</th>
                 <th className="p-4 font-medium">Priority</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {normalTickets.map(t => (
                 <tr key={t.id} className="hover:bg-gray-50">
                   <td className="p-4">{t.userName}</td>
                   <td className="p-4">{t.category}</td>
                   <td className="p-4">
                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                       t.status === 'OPEN' ? 'bg-blue-100 text-blue-700' : 
                       t.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                     }`}>
                       {t.status}
                     </span>
                   </td>
                   <td className="p-4">{t.priority}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </section>

      {/* User Management Section */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">User Approvals</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {pendingUsers.length === 0 ? (
            <p className="text-gray-500 text-sm col-span-2">No new users waiting for approval.</p>
          ) : (
            pendingUsers.map(user => (
              <Card key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <User size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role} {user.flatNumber ? `- ${user.flatNumber}` : ''}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <X size={20} />
                  </button>
                  <button 
                    onClick={() => approveUser(user.id)}
                    className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Check size={20} />
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
