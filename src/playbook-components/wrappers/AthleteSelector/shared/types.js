// @flow

export type Athlete = {|
  key: string,
  id: number,
  name: string,
  firstname?: string,
  lastname?: string,
  position?: string,
  squadId?: string,
  squadName?: string,
  status?: string,
  avatarUrl?: string,
  tags?: string[],
|};

export type Group = {|
  key: string,
  title: string,
  subtitle?: string,
  athletes?: Athlete[],
  children: Group[],
|};

export type DataGrouping = {
  options: Array<{ label: string, value: string }>,
  current: string,
  setCurrent: (value: string) => void,
};

export type UseDataResult = {
  isLoading: boolean,
  groups: Group[],
  athletes: Athlete[],
  error: string | null,
  grouping?: DataGrouping,
};

export type AthleteSelectorVariant = 'dropdown' | 'drawer';

export type TriggerProps = {
  isOpen: boolean,
  isLoading: boolean,
  onOpen: () => void,
  onClose: () => void,
  athletes: Athlete[],
  selectedIds: Set<number>,
  setSelectedIds: (ids: Set<number>) => void,
};

export type SearchProps = {
  isLoading: boolean,
  onChange: (value: string) => void,
};

export type AthleteSelectorRootProps = {|
  initialIds?: Array<number>,
  variant: AthleteSelectorVariant,
  onDone?: (ids: number[]) => void,
  useData: (...params: Array<any>) => UseDataResult,
  Trigger?: (props: TriggerProps) => React$Element<any>,
  Search?: (props: SearchProps) => React$Element<any>,
  dropdownWidth?: number | 'auto',
|};
