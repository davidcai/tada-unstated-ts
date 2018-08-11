export function idify<T extends { id: string }>(
  items: T[] = []
): Record<string, T> {
  return items.reduce((acc: Record<string, T>, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
}

export function pick<T extends {}, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      if (key in obj) {
        acc[key] = obj[key];
      }

      return acc;
    },
    {} as T
  );
}
