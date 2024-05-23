import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  RootState,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import calendarAPI from "../api/calendarApi";
import { CalendarInterface } from "../interfaces/CalendarInterface";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

export const useCalendarHook = () => {
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent: CalendarInterface) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (event: CalendarInterface) => {
    // TODO:
    //  LLEGAR AL BACKEND
    try {
      if (event._id) {
        // todo
        await calendarAPI.put(`/events/${event._id}`, event);
        dispatch(onUpdateEvent({ ...event, user }));
      } else {
        const { data } = await calendarAPI.post("/events", event);

        console.log(data);

        dispatch(onAddNewEvent({ ...event, _id: data._id, user }));
      }
    } catch (error: any) {
      console.log(error);
      Swal.fire(`Error al guardar `, error.response?.data?.msg, "error");
    }
  };

  const statDeleteEvent = async () => {
    // TODO: LLEGAR AL BACKEND
    try {
      await calendarAPI.delete(`/events/${activeEvent?._id}`);
      dispatch(onDeleteEvent());
    } catch (error) {

      const errors = error as AxiosError;
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
       // @ts-expect-error 
      Swal.fire(`Error al eliminar `, errors?.response?.data?.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarAPI.get("/events");
      const eventos = convertEventsToDateEvents(data);
      dispatch(onLoadEvents(eventos));
    } catch (error) {
      console.log(error);
      console.log("Error loading events");
    }
  };

  return {
    activeEvent,
    hasActiveEvent: !!activeEvent,
    events,
    setActiveEvent,
    startSavingEvent,
    statDeleteEvent,
    startLoadingEvents,
  };
};
