import { ChevronRight } from "lucide-react";

const items = [
  { name: "House", items: [{ name: "Bedroom" }, { name: "Kitchens" }] },
];

const EntityItem = ({ item, level = 0 }: { item: typeof items[number], level?: number }) => (
  <li className="space-y-2">
    <div className="flex items-start gap-2">
      <button className="hover:bg-accent p-1 rounded-lg">
        <ChevronRight className="h-4 w-4" />
      </button>
      <span className="font-medium">{item.name}</span>
    </div>
    {item.items && item.items.length > 0 && (
      <ul className="pl-6 border-l border-muted">
        {item.items.map((childItem, index) => (
          <EntityItem key={index} item={childItem} level={level + 1} />
        ))}
      </ul>
    )}
  </li>
);
export default function EntitiesPage() {
  return (
    <div className="mx-auto p-6">
      <h1 className="text-primary text-2xl font-bold mb-6">Entities</h1>
      <div>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <EntityItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
