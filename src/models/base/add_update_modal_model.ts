export interface AddUpdateModalProps<T> {
  open?: boolean;
  editData?: T;
  loading?: boolean;
  type?: string;
  onEdit?: (data: T) => void;
  onAdd?: (data: T) => void;
  onClose?: () => void;
}
