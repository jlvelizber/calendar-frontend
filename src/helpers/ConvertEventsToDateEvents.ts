import { parseISO } from "date-fns";
import { CalendarInterface } from "../interfaces";

export function convertEventsToDateEvents(events: CalendarInterface[]) {
    events.map((event: CalendarInterface) => {

        event.start = parseISO(event.start.toString());
        event.end = parseISO(event.end.toString());

        return event;

    } )

    return events;
}