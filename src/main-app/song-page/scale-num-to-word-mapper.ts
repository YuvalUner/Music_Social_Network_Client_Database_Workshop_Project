/**
 * Maps between the numerical values of the scales in the database and the letters used for them.
 * @param scaleNum
 */
function scaleNumToWordMapper(scaleNum: number): string {
    switch(scaleNum) {
        case 1:
            return 'C';
        case 2:
            return 'C#';
        case 3:
            return 'D';
        case 4:
            return 'D#';
        case 5:
            return 'E';
        case 6:
            return 'F';
        case 7:
            return 'F#';
        case 8:
            return 'G';
        case 9:
            return 'G#';
        case 10:
            return 'A';
        case 11:
            return 'A#';
        case 12:
            return 'B';
        default:
            return 'Error';
    }
}

export default scaleNumToWordMapper;