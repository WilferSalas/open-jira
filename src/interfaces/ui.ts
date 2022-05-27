export interface UI {
  isAddingEntry: boolean;
  onIsAddingEntry: (isAding: boolean) => void;
  onOpenSettingsMenu: () => void;
  openSettingsMenu: boolean;
}
