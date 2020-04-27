export interface IListItem {
  id: string;
  name: string;
  images: Record<string, any>;
  album: IListItem;
}
