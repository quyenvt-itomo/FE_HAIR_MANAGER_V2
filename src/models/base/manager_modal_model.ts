export interface ManagerModalProps<T> {
  open: boolean;
  loading?: boolean;
  selectedValue?: number;
  dataSource: T[];
  label: string;
  dataType?: "string" | "number";
  onClose: () => void;
  onAdd: (data: T) => void;
  onEdit: (data: T) => void;
  onDelete: (data: T) => void;
  onSelect: (data: T) => void;
}

export interface AddModalProps<T> {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onAdd: (data: T) => void;
}
