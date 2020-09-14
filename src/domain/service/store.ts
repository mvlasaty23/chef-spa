import { v4 as uuidv4 } from 'uuid';

export type Storage<T> = {
  readAll(): T[];
  read(id: string): T | null;
  save(entity: Persistable<T>): void;
  delete(id: string): void;
};

export interface Persistable<T> {
  id?: string;
  read(): T;
  save(): T;
  delete(): void;
}

export type Entity<T> = T & Persistable<T>;

export function getStoreInstance<T>(prefix: string, loadFn: (e: Entity<T>) => Entity<T>): Storage<Entity<T>> {
  return {
    delete: deleteByPrefix(prefix),
    read: readByPrefix(prefix, loadFn),
    readAll: readAllByPrefix(prefix, loadFn),
    save: saveByPrefix(prefix),
  };
}

export function readAllByPrefix<T>(prefix: string, loadFn: (obj: T) => T): () => T[] {
  return () =>
    Object.keys(localStorage)
      .filter(key => key.startsWith(prefix))
      .map(key => localStorage.getItem(key))
      .filter(value => !!value)
      .map(value => loadFn(JSON.parse(value as string)));
}

export function readByPrefix<T>(prefix: string, loadFn: (obj: T) => T): (id: string) => T | null {
  return (id: string) => {
    const value = localStorage.getItem(prefixedId(prefix, id));
    return value ? loadFn(JSON.parse(value)) : null;
  };
}

export function saveByPrefix<T>(prefix: string) {
  return (entity: Persistable<T>) => {
    if (!entity.id) {
      entity.id = uuidv4();
    }
    localStorage.setItem(prefixedId(prefix, entity.id), JSON.stringify(entity));
  };
}

export function deleteByPrefix(prefix: string) {
  return (id: string) => localStorage.removeItem(prefixedId(prefix, id));
}

function prefixedId(prefix: string, id: string): string {
  return prefix + '-' + id;
}
