export function renameObjectKey(keysMap: {[key: string]: string}, obj: {[key: string]: any}){
  return Object.keys(obj).reduce((acc, key) => ({
    ...acc,
    ...{ [keysMap[key] || key]: obj[key]}
  }), {})
}
