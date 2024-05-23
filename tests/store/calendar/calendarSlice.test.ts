import {
    calendarWithActiveEventsState,
  calendarWithEventsState,
  events,
  initialStateCalendar,
} from "../../fixtures/CalendarState";
import {
  CalendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from "./../../../src/store/calendar/CalendarSlice";

describe("Caldendar slice", () => {
  test("Validar el estado inicial", () => {
    const state = CalendarSlice.getInitialState();

    expect(state).toEqual(initialStateCalendar);
  });

  test("onSetactiveEvent debe activar el event", () => {
    const state = CalendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );

    expect(state.activeEvent).toEqual(events[0]);
  });

  test("onAddNewEvent debe agregar un nuevo evento", () => {
    const newEvent = {
      _id: 1,
      title: "Cumpleanos de la Samy",
      notes: "alguna nota para la samy",
      start: new Date("2022-01-01 13:00:00"),
      end: new Date("2022-01-01 15:00:00"),
      user: {
        name: "Karen",
        _id: 1,
        email: "jorgeconsalvacion@gmail.com",
      },
    };

    const state = CalendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );

    expect(state.events).toEqual([...events, newEvent]);
  });

  test("onUpdateNewEvent debe agregar un nuevo evento", () => {
    const newEvent = {
      _id: 1,
      title: "Cumpleanos de la Samy",
      notes: "alguna nota para la samy",
      start: new Date("2022-01-01 13:00:00"),
      end: new Date("2022-01-01 15:00:00"),
      user: {
        name: "Karen",
        _id: 1,
        email: "jorgeconsalvacion@gmail.com",
      },
    };

    const state = CalendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(newEvent)
    );

    expect(state.events).toContain(newEvent);
  });

  test("onDeleteEvent", () => {


    const state = CalendarSlice.reducer(calendarWithActiveEventsState, onDeleteEvent());

    expect(state.activeEvent).toBe(null);



  });

  test("onLoadEvents", () => {

    const state = CalendarSlice.reducer(initialStateCalendar,onLoadEvents(events));

    expect(state.isLoadingEvents).toBe(false);
    expect(state.events).toEqual(events);


  });

  test("onLogoutCalendar", () => {

    const state = CalendarSlice.reducer(calendarWithActiveEventsState, onLogoutCalendar())

 

    expect(state).toEqual(initialStateCalendar)

  });
});
