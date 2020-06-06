import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';

export default function formatDate(date) {
    return format(parseISO(date), 'dd/MM/yyyy - HH:mm');
}
