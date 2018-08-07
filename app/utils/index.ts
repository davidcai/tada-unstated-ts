export function idify<T extends { id: string }>(
  items: T[] = []
): Record<string, T> {
  return items.reduce((acc: Record<string, T>, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
}
