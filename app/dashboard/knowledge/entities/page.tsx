const items = [
  { name: "House", items: [{ name: "Bedroom" }, { name: "Kitchens" }] },
];
export default function EntitiesPage() {
  return (
    <div className="mx-auto p-6">
      <h1 className="text-primary text-2xl font-bold mb-6">Entities</h1>
      <div>
        <ul></ul>
      </div>
    </div>
  );
}
