"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { cn } from "@/lib/utils";

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
          className="space-y-2 rounded-lg p-2"
        >
          <div
            className={cn(
              "flex items-start gap-2 rounded-lg p-2",
              provided.isDragging && "bg-accent shadow-lg",
              !provided.isDragging && "hover:bg-muted/50"
            )}
          >
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
                  className={cn(
                    "pl-6 border-l border-muted min-h-[30px] rounded-lg",
                    provided.isDraggingOver &&
                      "bg-accent/30 border-2 border-dashed border-primary/20"
                  )}
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
    const draggedItemId = result.draggableId;

    const updateItems = (items: Item[]): Item[] => {
      let draggedItem: Item | null = null;
      let sourceParent: Item[] | null = null;

      // Find and remove the dragged item
      const removeItem = (list: Item[]): Item[] => {
        for (let i = 0; i < list.length; i++) {
          if (list[i].id === draggedItemId) {
            draggedItem = list[i];
            sourceParent = list;
            list.splice(i, 1);
            return list;
          }
          if (list[i].items) {
            list[i].items = removeItem(list[i].items);
          }
        }
        return list;
      };

      // Add the item to its new location
      const addItem = (list: Item[]): boolean => {
        if (!draggedItem) return false;

        if (destId === "root" && sourceId !== "root") {
          items.splice(result.destination.index, 0, draggedItem);
          return true;
        }

        for (const item of list) {
          if (item.id === destId) {
            if (!item.items) item.items = [];
            item.items.splice(result.destination.index, 0, draggedItem);
            return true;
          }
          if (item.items && addItem(item.items)) {
            return true;
          }
        }
        return false;
      };

      // Handle the move
      let newItems = [...items];
      newItems = removeItem(newItems);

      if (sourceId === destId) {
        // Reorder within the same list
        if (sourceParent) {
          sourceParent.splice(result.destination.index, 0, draggedItem!);
        }
      } else {
        // Move to a different list
        addItem(newItems);
      }

      return newItems;
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
                className={cn(
                  "space-y-4 min-h-[50px] rounded-lg",
                  provided.isDraggingOver &&
                    "border-2 border-dashed border-primary/20"
                )}
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
