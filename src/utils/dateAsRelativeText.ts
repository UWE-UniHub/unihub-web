import {Dayjs} from "dayjs";
import dayjs from "dayjs";

export const dateAsRelativeText = (date: Dayjs) => {
    if(date.isSame(dayjs(), 'day')) {
        return `Today at ${date.format('hh:mm A')}`;
    }
    if(date.isSame(dayjs().subtract(1, 'day'), 'day')) {
        return `Yesterday at ${date.format('hh:mm A')}`;
    }
    if(date.isSame(dayjs(), 'week')) {
        return date.format('dddd [at] hh:mm A');
    }
    return date.format('DD.MM.YYYY [at] hh:mm A');
}