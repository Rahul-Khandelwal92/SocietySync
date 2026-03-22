import React, { useState } from 'react';
import { useMock } from '../context/MockContext';
import { Card, Button, Badge, Input, Select } from '../components/UI';
import { Ticket, ServiceCategory } from '../types';
import { Plus, Clock, CheckCircle, AlertCircle, Droplets, Zap, Shield, Trash2, X, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const CATEGORIES: { id: ServiceCategory; label: string; icon: React.ReactNode }[] = [
  { id: 'PLUMBING', label: 'Plumbing', icon: <Droplets className="text-blue-500" /> },
  { id: 'ELECTRICIAN', label: 'Electrician', icon: <Zap className="text-yellow-500" /> },
  { id: 'SECURITY', label: 'Security', icon: <Shield className="text-green-500" /> },
  { id: 'SEWAGE', label: 'Sewage', icon: <Trash2 className="text-amber-700" /> },
];

const ResidentDashboard: React.FC = () => {
  const { tickets, currentUser, addTicket } = useMock();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'LOW' | 'HIGH'>('LOW');
  
  const [smartDescription, setSmartDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const myTickets = tickets.filter(t => t.userId === currentUser?.id).sort((a, b) => b.createdAt - a.createdAt);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory && description) {
      addTicket(selectedCategory, description, priority);
      setSelectedCategory(null);
      setDescription('');
      setPriority('LOW');
    }
  };

  const handleSmartSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smartDescription) return;
    
    setIsAnalyzing(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-preview",
        contents: `Analyze this resident complaint and categorize it. 
        Complaint: "${smartDescription}"`,
        config: {
          systemInstruction: "You are an AI assistant for a housing society. Categorize the user's complaint into one of these categories: PLUMBING, ELECTRICIAN, SECURITY, SEWAGE. Also determine the priority: LOW or HIGH. Return JSON.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: {
                type: Type.STRING,
                enum: ["PLUMBING", "ELECTRICIAN", "SECURITY", "SEWAGE"],
                description: "The category of the complaint"
              },
              priority: {
                type: Type.STRING,
                enum: ["LOW", "HIGH"],
                description: "The priority of the complaint"
              }
            },
            required: ["category", "priority"]
          }
        }
      });
      
      const result = JSON.parse(response.text || "{}");
      if (result.category && result.priority) {
        addTicket(result.category as ServiceCategory, smartDescription, result.priority as 'LOW' | 'HIGH');
        setSmartDescription('');
      } else {
        alert("Could not categorize the request. Please use manual selection.");
      }
    } catch (error) {
      console.error("Error analyzing request:", error);
      alert("Error analyzing request. Please try manual selection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <section>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-indigo-500" size={24} />
            <h2 className="text-xl font-bold text-gray-900">AI Smart Request</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">Just describe your issue, and our AI will automatically categorize and prioritize it for you.</p>
          <form onSubmit={handleSmartSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input 
              placeholder="e.g., 'There is a huge water leak in my kitchen sink!'" 
              value={smartDescription}
              onChange={(e) => setSmartDescription(e.target.value)}
              className="flex-1 bg-white"
              disabled={isAnalyzing}
            />
            <Button type="submit" disabled={isAnalyzing || !smartDescription} className="bg-indigo-600 hover:bg-indigo-700 text-white whitespace-nowrap">
              {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : 'Submit Smart Request'}
            </Button>
          </form>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Manual Request</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Card 
              key={cat.id} 
              onClick={() => setSelectedCategory(cat.id)}
              className="flex flex-col items-center justify-center p-6 hover:border-primary transition-colors gap-3"
            >
              <div className="p-3 bg-gray-50 rounded-full">{cat.icon}</div>
              <span className="font-medium text-gray-700">{cat.label}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* Complaint Form Modal Overlay */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-primary">New {CATEGORIES.find(c => c.id === selectedCategory)?.label} Request</h3>
              <button onClick={() => setSelectedCategory(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Input 
                  placeholder="Describe the issue..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="priority" 
                      checked={priority === 'LOW'} 
                      onChange={() => setPriority('LOW')}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm">Low</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="priority" 
                      checked={priority === 'HIGH'} 
                      onChange={() => setPriority('HIGH')}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-red-600">High</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" onClick={() => setSelectedCategory(null)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Submit Complaint
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">My History</h2>
        <div className="space-y-3">
          {myTickets.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No tickets yet.</p>
          ) : (
            myTickets.map(ticket => (
              <Card key={ticket.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">{CATEGORIES.find(c => c.id === ticket.category)?.label}</span>
                    <span className="text-xs text-gray-400">• {new Date(ticket.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{ticket.description}</p>
                </div>
                <div className="flex items-center gap-3">
                   {ticket.priority === 'HIGH' && <Badge color="bg-red-100 text-red-700">High Priority</Badge>}
                   <StatusBadge status={ticket.status} />
                </div>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

const StatusBadge: React.FC<{ status: Ticket['status'] }> = ({ status }) => {
  switch (status) {
    case 'OPEN': return <Badge color="bg-blue-100 text-blue-700">Open</Badge>;
    case 'IN_PROGRESS': return <Badge color="bg-secondary/20 text-amber-700">In Progress</Badge>;
    case 'RESOLVED': return <Badge color="bg-green-100 text-green-700">Resolved</Badge>;
    default: return null;
  }
};

export default ResidentDashboard;
