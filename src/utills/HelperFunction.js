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

export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('appointments');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
};

export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('appointments', serializedState);
    } catch {
      // ignore write errors
    }
};

export const compare = (a,b) => {
  const time1 = parseInt(a.time.replace(':',''));
  const time2 = parseInt(b.time.replace(':',''));
  if (time1 < time2) return -1;
  if (time1 > time2) return 1;
  return 0;
} 