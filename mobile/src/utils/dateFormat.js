import { format, parseISO } from 'date-fns';

export default function dateFormat(date) {
    const formatted = format(new Date(parseISO(date)), 'dd/MM/yyyy');

    return formatted;
}
