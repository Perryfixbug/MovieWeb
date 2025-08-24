export function toTitleCase(input: string){
  return input.split(' ').map((word: string)=>(
    word[0].toUpperCase() + word.substring(1).toLowerCase()
  )).join(' ')
}