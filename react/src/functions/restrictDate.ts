export function restrictDate(date: string) {

    return date.includes('-') ? date.split('-').reverse().join('.') : date
    
}