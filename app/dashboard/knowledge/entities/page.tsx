"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type Item = {
  id: string;
  name: string;
  items?: Item[];
};

const EntityItem = ({ item, level = 0 }: { item: Item; level?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  useEffect(() => {
    setIsMounted(true);
    setIsExpanded(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
    if (isExpanded && item.items) {
      // Close all child items recursively
      const closeChildren = (items: Item[]) => {
        items.forEach((childItem) => {
          const element = document.querySelector(`[data-id="${childItem.id}"]`);
          if (element) {
            (element as any).setExpanded?.(false);
          }
          if (childItem.items) {
            closeChildren(childItem.items);
          }
        });
      };
      closeChildren(item.items);
    }
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="block rounded-lg"
      data-id={item.id}
    >
      <div className="flex items-start gap-2 rounded-lg p-2">
        <div className="flex-none">
          {item.items?.length ? (
            <button
              className="hover:bg-accent p-1 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleExpand();
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          ) : (
            <div className="w-[34px]" /> // Placeholder for alignment
          )}
        </div>
        <div
          {...attributes}
          {...listeners}
          className={cn(
            "flex-1 rounded-lg p-2",
            isDragging && "bg-accent shadow-lg",
            !isDragging && "hover:bg-muted/50"
          )}
        >
          <span className="font-medium">{item.name}</span>
        </div>
      </div>
          {isExpanded && item.items && item.items?.length > 0 && (
            <ul className="pl-6 border-l border-muted min-h-[30px] rounded-lg mt-2">
              <SortableContext
                items={item.items.map((i) => i.id)}
                strategy={verticalListSortingStrategy}
              >
                {item.items?.map((childItem: Item) => (
                  <EntityItem
                    key={childItem.id}
                    item={childItem}
                    level={level + 1}
                  />
                ))}
              </SortableContext>
            </ul>
          )}
        </li>
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedItemId = active.id as string;
    const overId = over.id as string;

    // If the item was dropped over itself, do nothing
    if (draggedItemId === overId) {
      return;
    }

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
            list[i].items = removeItem(list[i].items!);
          }
        }
        return list;
      };

      // Find the target parent
      const findTargetParent = (list: Item[]): Item[] | null => {
        for (const item of list) {
          if (item.id === overId) {
            return list;
          }
          if (item.items) {
            const result = findTargetParent(item.items);
            if (result) return result;
          }
        }
        return null;
      };

      // Handle the move
      let newItems = [...items];
      newItems = removeItem(newItems);

      // Find target parent list
      const targetParent = findTargetParent(newItems) || newItems;
      
      if (draggedItem) {
        // Find the position to insert
        const overIndex = targetParent.findIndex(item => item.id === overId);
        if (overIndex !== -1) {
          // Insert at the found position
          targetParent.splice(overIndex, 0, draggedItem);
        } else {
          // If target not found, add to end of list
          targetParent.push(draggedItem);
        }
      }

      return newItems;
    };

    setItems(updateItems(items));
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-primary text-2xl font-bold mb-6">Entities</h1>
      <div className="text-secondary bg-background">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={items.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="min-h-[50px] rounded-lg space-y-2">
              {items.map((item) => (
                <EntityItem key={item.id} item={item} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
