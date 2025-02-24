export const IsDoneCounter = (data) => data.filter(task => task.done === true);

export const IsPendingCounter = (data) => data.filter(task => task.done === false);
