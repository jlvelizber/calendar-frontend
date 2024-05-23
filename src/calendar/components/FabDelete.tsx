import { useCalendarHook } from "../../hooks/useCalendarHook";

export const FaBDelete = () => {
  const { statDeleteEvent, hasActiveEvent } = useCalendarHook();

  const handleDeleteEvent = () => {
    statDeleteEvent();
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDeleteEvent}
      style={{
        display: hasActiveEvent ? "block" : "none",
      }}
    >
      <i className="fa fa-trash" />
    </button>
  );
};
