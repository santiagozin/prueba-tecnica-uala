interface SelectFilterProps {
  items: { id: string; name: string }[];
  onItemSelect: (item: string) => void;
  selectedItems: string[];
}

const SelectFilter = ({
  selectedItems,
  onItemSelect,
  items,
}: SelectFilterProps) => {
  return (
    <div className="flex space-y-2 mt-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={`mb-2 border border-primary flex items-center space-x-2 flex-wrap rounded-full px-4 py-2 mx-2 cursor-pointer hover:bg-gray-50 ${
            selectedItems.includes(item.id) ? "bg-primary/5" : ""
          }`}
          onClick={() => onItemSelect(item.id)}
        >
          <div className="flex flex-col">
            <span
              className={`text-sm font-medium ${
                selectedItems.includes(item.id)
                  ? "text-primary font-medium"
                  : "text-gray-700"
              }`}
            >
              {item.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectFilter;
