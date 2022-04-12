export const remainingTime = (startedAt) => {
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

    let remaining = `End in `
    if (time.days > 0) {
        remaining += `${time.days}j `
    }
    if (time.hours > 0) {
        remaining += `${time.hours}h `
    }
    if (time.minutes >= 0) {
        remaining += `${time.minutes}m `
    }
    if (time.seconds >= 0) {
        remaining += `${time.seconds}s`
    }
    // setRemaining(remaining);
    return remaining
}