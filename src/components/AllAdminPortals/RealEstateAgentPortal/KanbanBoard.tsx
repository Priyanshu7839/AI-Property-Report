import React from 'react';
import { StatusChip } from './StatusChip';

interface KanbanCard {
  id: string;
  email: string;
  location: string;
  value: string;
  urgency: string;
  lastContact: string;
}

interface KanbanColumn {
  stage: string;
  cards: KanbanCard[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onCardClick?: (card: KanbanCard) => void;
}

export function KanbanBoard({ columns, onCardClick }: KanbanBoardProps) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="inline-flex gap-4 min-w-full">
        {columns.map((column) => (
          <div key={column.stage} className="flex-shrink-0 w-80">
            <div className="bg-gray-50 border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">{column.stage}</h3>
                  <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                    {column.cards.length}
                  </span>
                </div>
              </div>
              
              <div className="p-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                {column.cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => onCardClick?.(card)}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-600">{card.id}</span>
                      <StatusChip 
                        status={card.urgency} 
                        variant={card.urgency === '0-30d' ? 'danger' : 'warning'} 
                      />
                    </div>
                    <p className="text-sm text-gray-900 mb-1">{card.email}</p>
                    <p className="text-xs text-gray-600 mb-2">{card.location}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">{card.value}</span>
                      <span className="text-xs text-gray-500">{card.lastContact}</span>
                    </div>
                  </div>
                ))}
                
                {column.cards.length === 0 && (
                  <div className="text-center py-8 text-sm text-gray-500">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
