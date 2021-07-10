export const getAllDatesOfMonth = (year,month) => {
    const monthIndex = month - 1; // 0..11 instead of 1..12
    const date = new Date(year, monthIndex, 1);
    const result = [];
    while (date.getMonth() == monthIndex) {
        result.push(date.getDate() + '-' + month + '-' + year);
        date.setDate(date.getDate() + 1);
    }
    return result;
}