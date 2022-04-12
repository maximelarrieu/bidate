export const currentDay = (startedAt) => {
    let now = new Date()
    let time = {}

    let tmp = new Date(startedAt) - now
    tmp = Math.floor(tmp/1000)
    time.seconds = tmp % 60

    tmp = Math.floor((tmp - time.seconds)/60)
    time.minutes = tmp % 60

    tmp = Math.floor((tmp - time.minutes)/60)
    time.hours = tmp % 24

    tmp = Math.floor((tmp - time.hours)/24)
    time.days = tmp

    let remaining = 0;

    switch (time.days) {
        case 5:
            remaining = 0;
            break;
        case 4:
            remaining = 1;
            break;
        case 3:
            remaining = 2;
            break;
        case 2:
            remaining = 3;
            break;
        case 1:
            remaining = 4;
            break;
        case 0:
            remaining = 5;
            break;
        default:
            remaining = 0;
    }

    return remaining
}