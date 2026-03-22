import React from 'react';
import { useMock } from '../context/MockContext';
import { Card, Button, Badge } from '../components/UI';
import { TicketStatus } from '../types';
import { CheckCircle, PlayCircle, Clock } from 'lucide-react';

const ProviderDashboard: React.FC = () => {
  const { tickets, updateTicketStatus, currentUser } = useMock();

  // In a real app, filter by currentUser.trade. For Mock, we show all relevant or open tasks.
  // We'll show tasks that match the provider's trade OR are open if trade is generic.
  const myTasks = tickets.filter(t => 
    (t.category === currentUser?.trade) && t.status !== 'RESOLVED'
  ).sort((a, b) => b.priority === 'HIGH' ? 1 : -1);

  const completedTasks = tickets.filter(t => 
    (t.category === currentUser?.trade) && t.status === 'RESOLVED'
  );

  const handleStatusChange = (id: string, newStatus: TicketStatus) => {
    updateTicketStatus(id, newStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h2 className="text-xl font-bold text-gray-900">Active Tasks</h2>
         <Badge color="bg-blue-100 text-blue-800">{myTasks.length} Pending</Badge>
      </div>
      
      <div className="space-y-4">
        {myTasks.length === 0 ? (
           <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
             <p className="text-gray-500">No active tasks for your trade.</p>
           </div>
        ) : (
          myTasks.map(ticket => (
            <Card key={ticket.id} className="border-l-4 border-l-primary">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-lg text-gray-900">{ticket.userName}</span>
                    <span className="text-sm text-gray-500">- Flat {ticket.userId === 'u1' ? '101' : 'Unknown'}</span>
                    {ticket.priority === 'HIGH' && (
                       <Badge color="bg-red-100 text-red-700 flex items-center gap-1">
                         High Priority
                       </Badge>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{ticket.description}</p>
                  <p className="text-xs text-gray-400">Created: {new Date(ticket.createdAt).toLocaleString()}</p>
                </div>

                <div className="flex gap-2">
                  {ticket.status === 'OPEN' && (
                    <Button onClick={() => handleStatusChange(ticket.id, 'IN_PROGRESS')} variant="secondary" className="w-full md:w-auto">
                      <PlayCircle size={18} /> Accept Job
                    </Button>
                  )}
                  {ticket.status === 'IN_PROGRESS' && (
                    <Button onClick={() => handleStatusChange(ticket.id, 'RESOLVED')} variant="primary" className="w-full md:w-auto">
                      <CheckCircle size={18} /> Mark Done
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="pt-8 opacity-60">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Completed Today</h3>
        {completedTasks.map(ticket => (
             <div key={ticket.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 line-through">{ticket.description}</span>
                <span className="text-green-600 text-sm font-medium">Done</span>
             </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderDashboard;
