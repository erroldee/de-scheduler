import {Injectable} from "@angular/core";
import {DATA_HOLIDAYS} from "../../data/data-holidays";
import {CardInfo} from "../interface/card-info.interface";

@Injectable()
export class CreateScheduleService {
    getDates(startDate) {
        let endDate = (new Date().getMonth() < 9)
                ? new Date(new Date().getFullYear(), 11, 31)
                : new Date(new Date().getFullYear() + 1, 6, 30),
            dates = [],
            currentDate = startDate,
            addDays = function(days) {
                let date = new Date(this.valueOf());

                date.setDate(date.getDate() + days);

                return date;
            };

        while (currentDate <= endDate) {
            dates.push(currentDate);
            currentDate = addDays.call(currentDate, 1);
        }

        return dates;
    }

    getSchedule(startDate, empList, limit): CardInfo[] {
        let schedule: CardInfo[] = [],
            arrayOfDates1 = this.getDates(startDate),
            arrayOfDates = this.getDates(startDate),
            currentDate = new Date(),
            counter = 0;

        for (let i = 0; i < arrayOfDates.length; i++) {
            let holidayChecker = false,
                isToday = false,
                month, day, year;

            for (let x = 0; x < DATA_HOLIDAYS.length; x++) {
                let d = new Date(arrayOfDates1[i]);

                month = '' + (d.getMonth() + 1);
                day = '' + d.getDate();
                year = d.getFullYear();

                if (month.length < 2) {
                    month = '0' + month;
                }

                if (day.length < 2) {
                    day = '0' + day;
                }

                arrayOfDates1[i] = [year, month, day].join('-');

                if (arrayOfDates1[i] == DATA_HOLIDAYS[x]) {
                    holidayChecker = true;
                }
            }

            if ((arrayOfDates[i].getDay()) !== 0 && (arrayOfDates[i].getDay()) !== 3 && (arrayOfDates[i].getDay()) !== 6 && (holidayChecker != true)) {
                if (arrayOfDates[i].toDateString().valueOf() == currentDate.toDateString().valueOf()) {
                    isToday = true;
                }


                for (let k = 0; k < limit; k++) {
                    if (isToday || (!isToday && (arrayOfDates[i] > currentDate))) {
						arrayOfDates[i].setHours(10);
                        arrayOfDates[i].setMinutes(1);

                        schedule.push({
                            today: isToday,
                            dayToday: arrayOfDates[i],
                            id: empList[counter].id,
                            img: empList[counter].img,
                            name: empList[counter].name
                        });
                    }

                    counter++;

                    if (counter >= empList.length) {
                        counter = 0;
                    }
                }
            }
        }

        return schedule;
    }
}
