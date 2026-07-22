import { AlertCircle, CheckCircle, Clock, MoreHorizontal, Plus, Timer } from 'lucide-react'
import React from 'react'
import { Badge, Button, Card } from '../../ui/Components'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'

const ServiceTickets = () => {

      const serviceTickets = [
    {
      id: 1,
      property: 'Hoofdstraat 45',
      issue: 'Heating not working',
      priority: 'high',
      status: 'open',
      assignedTo: 'TechFix B.V.',
      created: '2024-01-15',
      description: 'Tenant reports heating system not functioning properly'
    },
    {
      id: 2,
      property: 'Keizersgracht 123',
      issue: 'Leaky faucet',
      priority: 'low',
      status: 'in-progress',
      assignedTo: 'PlumbPro',
      created: '2024-01-12',
      description: 'Kitchen faucet has a persistent drip'
    }
  ];

  return (
     <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Service Tickets</h2>
                  <Button className="bg-[green] hover:bg-[green]">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Ticket
                  </Button>
                </div>

                {/* Service Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Open Tickets</p>
                          <p className="text-2xl font-bold text-red-600">12</p>
                        </div>
                        <AlertCircle className="h-8 w-8 text-red-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">In Progress</p>
                          <p className="text-2xl font-bold text-yellow-600">8</p>
                        </div>
                        <Timer className="h-8 w-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Resolved</p>
                          <p className="text-2xl font-bold text-green-600">89</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Avg Resolution</p>
                          <p className="text-2xl font-bold">2.3 days</p>
                        </div>
                        <Clock className="h-8 w-8 text-[#0285FF]" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tickets List */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className='font-medium text-md'>Recent Service Tickets</CardTitle>
                    <CardDescription className='mb-2'>Track maintenance requests and service issues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {serviceTickets.map((ticket) => (
                        <div key={ticket.id} className="flex items-center justify-between p-4 border border-black/10 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${
                              ticket.priority === 'high' ? 'bg-red-500' :
                              ticket.priority === 'medium' ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`} />
                            <div>
                              <h4 className="font-medium">{ticket.issue}</h4>
                              <p className="text-sm text-gray-600">{ticket.property}</p>
                              <p className="text-sm text-gray-500">{ticket.description}</p>
                              <p className="text-xs text-gray-400 mt-1">Created: {ticket.created}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-right">
                            <div>
                              <p className="text-sm text-gray-600">Assigned to</p>
                              <p className="font-medium text-sm">{ticket.assignedTo}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Priority</p>
                              <Badge className={`${
                                ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                                ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {ticket.priority}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Status</p>
                              <Badge className={`${
                                ticket.status === 'open' ? 'bg-red-100 text-red-800' :
                                ticket.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {ticket.status}
                              </Badge>
                            </div>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
  )
}

export default ServiceTickets