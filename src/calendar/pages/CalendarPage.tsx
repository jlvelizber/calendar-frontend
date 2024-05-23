import { Calendar, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  CalendarEvent,
  CalendarModal,
  FaBDelete,
  FabAddNew,
  Navbar,
} from "../components";
import { localizer, getMessagesES } from "../../helpers";
import { useEffect } from "react";
import { useUiHooks } from "../../hooks";
import { useCalendarHook } from "../../hooks/useCalendarHook";
import { useAuthStore } from "../../hooks/useAuthStore";
import { CalendarInterface } from "../../interfaces";

export const CalendarPage = () => {
  const { openDateModal } = useUiHooks();
  const { user } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarHook();

  const lastView: View | undefined =
    (localStorage.getItem("lastView") as View) || ("month" as View);

  const eventStyleGetter = (event: CalendarInterface) => {
    const isMyEvent =
      user._id === event.user?._id || user._id === event.user?._id;

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      color: "#fff",
      border: "1px solid #000",
      padding: "5px",
      margin: "5px",
    };

    return { style };
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = (event: CalendarInterface) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event: View) => {
    localStorage.setItem("lastView", event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 88px)" }}
        culture="es"
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        defaultView={lastView}
        messages={getMessagesES()}
      />

      <CalendarModal />
      <FabAddNew />
      <FaBDelete />
    </>
  );
};
