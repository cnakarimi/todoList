export function getCurrentDate() {
    const newDate = new Date().toLocaleDateString('default',{
        month:'long',
        day: 'numeric'
    });
    return newDate.split(' ')
}