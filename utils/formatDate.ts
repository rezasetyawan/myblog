export const formatDate = (millisecondsTimestamp: string): string => {
    const dateObject = new Date(parseInt(millisecondsTimestamp));
    const options: object = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    };
    const formattedDate = dateObject.toLocaleString(undefined, options);
    return formattedDate;
}
