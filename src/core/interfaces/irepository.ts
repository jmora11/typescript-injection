export interface IRepository {
  get(id: string);
  insert(obj: unknown);
  update(obj: unknown);
  delete(id: string);
}
