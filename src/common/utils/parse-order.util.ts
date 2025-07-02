export function parseOrder(orderStr?: string): [string, 'ASC' | 'DESC'][] | undefined {
  if (!orderStr) return undefined;

  return orderStr.split(',').map(part => {
    const [field, dir] = part.split(':');
    const direction = dir?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    return [field.trim(), direction] as [string, 'ASC' | 'DESC'];
  });
}
