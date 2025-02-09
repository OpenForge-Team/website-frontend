"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type Item = {
  id: string;
  name: string;
  items?: Item[];
};

const EntityItem = ({
  item,
  index,
  level = 0,
}: {
  item: Item;
  index: number;
  level?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="space-y-2"
        >
          <div className="flex items-start gap-2">
            <button
              className="hover:bg-accent p-1 rounded-lg"
              onClick={toggleExpand}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            <span className="font-medium">{item.name}</span>
          </div>
          {isExpanded && item.items && item.items.length > 0 && (
            <Droppable droppableId={item.id} type={`list-${level}`}>
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="pl-6 border-l border-muted"
                >
                  {item.items.map((childItem: Item, childIndex: number) => (
                    <EntityItem
                      key={childItem.id}
                      item={childItem}
                      index={childIndex}
                      level={level + 1}
                    />
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          )}
        </li>
      )}
    </Draggable>
  );
};

export default function EntitiesPage() {
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      name: "House",
      items: [
        {
          id: "2",
          name: "Bedroom",
          items: [
            { id: "4", name: "Bed" },
            { id: "5", name: "Wardrobe" },
          ],
        },
        {
          id: "3",
          name: "Kitchen",
          items: [
            { id: "6", name: "Stove" },
            { id: "7", name: "Refrigerator" },
          ],
        },
      ],
    },
  ]);

  const findItemById = (
    items: Item[],
    id: string
  ): [Item | null, Item[] | null] => {
    for (const item of items) {
      if (item.id === id) {
        return [item, items];
      }
      if (item.items) {
        const [found, parent] = findItemById(item.items, id);
        if (found) {
          return [found, parent];
        }
      }
    }
    return [null, null];
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceId = result.source.droppableId;
    const destId = result.destination.droppableId;

    const updateItems = (items: Item[]): Item[] => {
      const [sourceItem, sourceParent] = findItemById(items, sourceId);
      const [destItem, destParent] = findItemById(items, destId);

      if (!sourceItem || !sourceParent || !destParent) return items;

      // Remove the item from its original position
      sourceParent.splice(sourceParent.indexOf(sourceItem), 1);

      if (sourceId === destId) {
        // Reorder within the same list
        sourceParent.splice(result.destination.index, 0, sourceItem);
      } else {
        // Move to a different list
        if (!destItem) return items; // This shouldn't happen, but TypeScript doesn't know that
        if (!destItem.items) destItem.items = [];
        destItem.items.splice(result.destination.index, 0, sourceItem);
      }

      return [...items];
    };

    setItems(updateItems(items));
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-primary text-2xl font-bold mb-6">Entities</h1>
      <div className="text-secondary bg-background">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="root" type="list-0">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {items.map((item, index) => (
                  <EntityItem key={item.id} item={item} index={index} />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
