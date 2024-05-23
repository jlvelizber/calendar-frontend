import { CalendarSliceInterface } from "../../src/interfaces";

export const events = [
  {
    _id: 1,
    title: "Cumpleanos de la mochita",
    notes: "alguna nota",
    start: new Date("2022-01-01 13:00:00"),
    end: new Date("2022-01-01 15:00:00"),
    user: {
      name: "Jorge",
      _id: 1,
      email: "jorgeconsalvacion@gmail.com",
    },
  },
  {
    _id: 2,
    title: "Cumpleanos de la Samy",
    notes: "alguna nota para la samy",
    start: new Date("2022-01-01 13:00:00"),
    end: new Date("2022-01-01 15:00:00"),
    user: {
      name: "Karen",
      _id: 1,
      email: "jorgeconsalvacion@gmail.com",
    },
  },
];

export const initialStateCalendar: CalendarSliceInterface = {
  activeEvent: null,
  events: [],
  isLoadingEvents: true,
};

export const calendarWithEventsState: CalendarSliceInterface = {
  activeEvent: null,
  events: [...events],
  isLoadingEvents: true,
};

export const calendarWithActiveEventsState: CalendarSliceInterface = {
  activeEvent: { ...events[0] },
  events: [...events],
  isLoadingEvents: true,
};
