
export function names(...names: string[]) {
  return names.join(' ')
}
  
export function check(result: boolean, className: string): string {
  return result ? className : ''
}