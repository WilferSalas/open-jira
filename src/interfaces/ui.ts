export interface UI {
  isAddingEntry: boolean;
  isDragging: boolean;
  onDragging: (isDragging: boolean) => void;
  onIsAddingEntry: (isAding: boolean) => void;
  onOpenSettingsMenu: () => void;
  openSettingsMenu: boolean;
}
