export type AnyType = {
  [key: string]: unknown,
};
export type CellConfigType = Partial<{
  unit: string,
  filter: (val: string) => string
}>
/**
 * 从对象中取值
 * @param {object} row 目标对象
 * @param {string} column 目标key，支持链式取值
 * @param {object} config 相关配置
 * @param {boolean} disableTravel 禁用链式取值
 * @returns string
 */
export function getValue(row: AnyType, column: string, config: CellConfigType = {}, disableTravel?: boolean): string | unknown {
  const emptyText = '';
  if (disableTravel) {
    return row[column] || emptyText;
  }
  function getPathValue(data: AnyType, keys: string[], index: number): AnyType | unknown {
    const key = keys[index];
    if (data[key] instanceof Object && !Array.isArray(data[key])) {
      return getPathValue(data[key] as AnyType, keys, index + 1);
    } else {
      return data[key];
    }
  }
  const path = column.split('.');
  let res = '';
  res = getPathValue(row, path, 0) as string;
  if (Array.isArray(res) && res.length === 0) {
    res = '';
  }
  if (res !== '' && res != null) {
    res = res as string + (config.unit || '');
    return filterValue(res, config.filter);
  }
  return filterValue(emptyText, config.filter);
}
function filterValue(val: any, filter: Record<string, any> | ((val: any) => any) | undefined) {
  if (!filter) {
    return val;
  }
  if (typeof filter === 'function') {
    return filter(val)
  } else {
    return filter[val]
  }
}

export function setValue(row: AnyType, property: string, value: unknown): void {
  const path = property.split('.');
  const lastKey = path[path.length - 1];
  const parent = getParent(row, path, 0);
  (parent as Record<string, unknown>)[lastKey] = value;
  function getParent(data: AnyType, keys: string[], index: number): AnyType {
    const key = keys[index];
    if (data[key] instanceof Object && !Array.isArray(data[key])) {
      return getParent(data[key] as AnyType, keys, index + 1);
    } else {
      return data;
    }
  }
}

export function copyText(text: string) {
  return new Promise((resolve, reject) => {
    try {
      navigator.clipboard.writeText(text).then(() => {
        resolve(true);
      })
    } catch (err) {
      console.error(err);
      reject(err)
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.style.display = 'none';
      document.body.removeChild(input);
      resolve(true);
    }
  })
}

export function extractObject(
  obj: Record<string, any>,
  keys: string[],
  action: 'include' | 'exclude' = 'include',
): Record<string, any> {
  const res = {};
  for (const key in obj) {
    if (action === 'include') {
      res[key] = obj[key];
    }
    if (action === 'exclude') {
      if (keys.includes(key)) {
        continue;
      } else {
        res[key] = obj[key]
      }
    }
  }
  return res;
}

export function toCamel(name: string): string {
  const token = name.split('-');
  return token.map((item, index) => {
    if (index === 0) {
      return item;
    }
    return item.replace(/(.)/, letter => letter.toUpperCase())
  }).join('')
}
