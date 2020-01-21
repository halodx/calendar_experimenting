import { formatNumber } from '@angular/common'

export class CalendarSlot {
    startTime: Date
    endTime: Date
    subject: string
    description: string
    backgroundColor: string
    fontColor: string

    constructor(startTime: Date, endTime: Date, subject: string, description: string,
        backgroundColor: string, fontColor: string) {

        this.startTime = startTime;
        this.endTime = endTime;
        this.subject = subject;
        this.description = description;
        this.backgroundColor = backgroundColor;
        this.fontColor = fontColor;
    }
}