export default function ElectionsSelect({
  options,
}: {
  options: { name: string; value: string }[];
}) {
  return (
    <div>
      <select className="px-6">
        <option value={undefined}> Select an election</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>

      <button type="submit" className="px-2">
        Test
      </button>
    </div>
  );
}
