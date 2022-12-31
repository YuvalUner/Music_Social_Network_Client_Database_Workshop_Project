/***
 * Converts from milliseconds to minutes and seconds human readable string
 * @param millis number of milliseconds
 */
function millisToMinutesAndSeconds(millis: number): string {
    let minutes: number = Math.floor(millis / 60000);
    let seconds: number = parseFloat(((millis % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

/***
 * Converts from minutes and seconds to miliseconds
 * @param minutes
 * @param seconds
 */
function minutesAndSecondsToMillis(minutes: number, seconds: number): number {
    return minutes * 60000 + seconds * 1000;
}

export { minutesAndSecondsToMillis, millisToMinutesAndSeconds };