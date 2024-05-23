import { useUiHooks } from "../../hooks";
import { useCalendarHook } from "../../hooks/useCalendarHook";
import { addHours } from "date-fns";

export const FabAddNew = () => {
  const { openDateModal } = useUiHooks();
  const { setActiveEvent } = useCalendarHook();

  const handleNewEvent = () => {
    setActiveEvent({
      title: "Titulo",
      notes: "Hola mundo",
      start: new Date(),
      end: addHours(new Date(), 1),
      user: {
        _id: 1235,
        name: "Jorge",
        email: "jorge@gmail.com"
      },
    });
    openDateModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={handleNewEvent}>
      <i className="fa fa-plus" />
    </button>
  );
};
