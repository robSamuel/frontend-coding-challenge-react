export interface RemoteItem {
  id: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface RemoteListState {
  items: RemoteItem[];
  loading: boolean;
  error: string | null;
}
