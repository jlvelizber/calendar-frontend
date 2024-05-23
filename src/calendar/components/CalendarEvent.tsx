import { EventProps } from "react-big-calendar";
import { CalendarInterface } from "../../interfaces";

export const CalendarEvent = ({event}: EventProps<CalendarInterface>) => {
  const { title, user, } = event;

  return (
    <div>
      <strong> {title}</strong> <span>{user?.name}</span>
    </div>
  );
};
