export function getValueOf(object: any, prop: string) {
    return object[prop];
  }
  
  export function enumToArray<T>(enumObject: any): Array<T[keyof T]> {
    return Object.values(enumObject);
  }
  