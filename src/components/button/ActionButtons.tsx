import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
  return (
    <div
      className={`absolute right-2 top-1/2 -translate-y-1/2 flex gap-2 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 ease-in-out`}
    >
      {onEdit && (
        <button
          className="p-1 text-blue-600 hover:text-blue-800"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <PencilIcon className="w-5 h-5" />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          className="p-1 text-red-600 hover:text-red-800"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
