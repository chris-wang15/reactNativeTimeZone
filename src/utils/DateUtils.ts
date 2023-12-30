export type DateInfo = {
    time: string,
    date: string
}

export async function getTimeByZoneName(timezone: string): Promise<DateInfo> {
    const date = new Date()
    const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }
    const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        weekday: 'long',
    }

    return {
        time: new Intl.DateTimeFormat('en-US', timeOptions).format(date),
        date: new Intl.DateTimeFormat('en-US', dateOptions).format(date)
    }
}