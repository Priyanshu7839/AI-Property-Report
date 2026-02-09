import { ReactNode } from "react";

interface KanbanColumn {
  id: string;
  title: string;
  count: number;
  items: any[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  renderCard?: (item: any) => ReactNode;
  onCardClick?: (item: any) => void;
  onItemClick?: (item: any) => void;
}

export function KanbanBoard({
  columns,
  renderCard,
  onCardClick,
  onItemClick,
}: KanbanBoardProps) {
  const handleClick = onCardClick || onItemClick;

  // Default card renderer for leads
  const defaultRenderCard = (item: any) => (
    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">{item.id}</p>
          <p className="text-xs text-gray-600 mt-1">{item.type}</p>
        </div>
        <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
          {item.location}
        </span>
      </div>
      <div className="space-y-1 mt-3">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Value:</span>
          <span className="font-medium text-gray-900">{item.value}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Equity:</span>
          <span className="font-medium text-green-600">{item.equity}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Partner:</span>
          <span className="font-medium text-gray-900">{item.partner}</span>
        </div>
      </div>
    </div>
  );

  const cardRenderer = renderCard || defaultRenderCard;

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => (
        <div key={column.id} className="flex-shrink-0 w-80">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{column.title}</h3>
              <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-md border border-gray-200">
                {column.count}
              </span>
            </div>
            <div className="space-y-3">
              {column.items?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleClick?.(item)}
                  className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all ${
                    handleClick ? "cursor-pointer" : ""
                  }`}
                >
                  {cardRenderer(item)}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}