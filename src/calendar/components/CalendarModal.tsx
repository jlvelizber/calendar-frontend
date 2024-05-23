import {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import Modal from "react-modal";
import "./CalendarModal.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { differenceInSeconds } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useUiHooks } from "../../hooks";
import { useCalendarHook } from "../../hooks/useCalendarHook";
import { CalendarInterface } from "../../interfaces";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

registerLocale("es", es);

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isOPenDateModal, closeDateModal } = useUiHooks();
  const { activeEvent, startSavingEvent } = useCalendarHook();
  const [formSubmited, setFormSubmited] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<CalendarInterface>({
    title: "",
    end: new Date().getTime(),
    notes: "",
    start: new Date().getTime(),
    user: null,
  });

  const titleClass = useMemo(() => {
    if (!formSubmited) return "";
    return formValues?.title?.length > 0 ? "is-valid" : "is-invalid";
  }, [formValues?.title, formSubmited]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues(activeEvent);
    }
  }, [activeEvent]);

  const onCLoseModal = () => {
    closeDateModal();
  };

  const onInputChange = ({
    target,
  }:
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>): void => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (valueDate: Date, changin: string) => {
    setFormValues({
      ...formValues,
      [changin]: valueDate,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setFormSubmited(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference < 0) {
      console.log("Error de fechas");
      Swal.fire(
        "Revisar las fechas",
        "la fecha de fin debe ser mayor a la fecha de inicio"
      );
    }

    if (formValues.title.length <= 0) {
      Swal.fire(
        "Revisar las fechas",
        "la fecha de fin debe ser mayor a la fecha de inicio"
      );
    }

    console.log(formValues);

    await startSavingEvent(formValues);
    closeDateModal();
  };

  return (
    <Modal
      isOpen={isOPenDateModal}
      style={customStyles}
      onRequestClose={onCLoseModal}
      className={"modal"}
      overlayClassName={"modal-fondo"}
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            locale="es"
            className="form-control"
            selected={formValues.start as Date}
            onChange={(date: Date) => onDateChanged(date, "start")}
            dateFormat="Pp"
            showTimeSelect
            timeCaption={"Hora"}
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            locale="es"
            className="form-control"
            selected={formValues.end as Date}
            onChange={(date: Date) => onDateChanged(date, "end")}
            dateFormat="Pp"
            showTimeSelect
            timeCaption={"Hora"}
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            onChange={onInputChange}
            value={formValues.notes}
          />
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
          onClick={handleSubmit}
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
