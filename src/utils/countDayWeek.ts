 const countDayWeek = (inputDate:any) => {
    // Проверяем входную дату
    if (typeof inputDate !== 'string') {
        console.error('Input date is not a string.');
        return null;
    }

    const parts = inputDate.split('.');
    if (parts.length !== 3) {
        console.error('Incorrect date format. Please use day.month.year format.');
        return null;
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months in JavaScript are zero-based
    const year = parseInt(parts[2], 10);

    const inputDateObj = new Date(year, month, day);
    const currentDate = new Date();
    //@ts-ignore
    const diffInMilliseconds = currentDate - inputDateObj;
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)); // Difference in days

    return diffInDays;
}
export default countDayWeek
