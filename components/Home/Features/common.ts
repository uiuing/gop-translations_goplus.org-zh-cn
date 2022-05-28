/** Get anchor ID from title */
export function getAnchorId(title: string) {
  return title
    .split(/[^\u4e00-\u9fa5\w\d\s]/, 1)[0]
    .trim()
    .split(/\s+/)
    .map(word => encodeURI(word.toLocaleLowerCase()))
    .join('-')
}
