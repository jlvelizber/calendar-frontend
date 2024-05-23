import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CalendarInterface, CalendarSliceInterface } from "../../interfaces/CalendarInterface";

const initialState: CalendarSliceInterface = {
  events: [],
  activeEvent: null,
  isLoadingEvents: true,
};

export const CalendarSlice = createSlice({
  name: "calnedar",
  initialState,
  reducers: {
    saveEvents: (state, { payload }: PayloadAction<CalendarInterface[]>) => {
      state.events = payload;
    },
    onSetActiveEvent: (
      state,
      { payload }: PayloadAction<CalendarInterface | null>
    ) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }: PayloadAction<CalendarInterface>) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }: PayloadAction<CalendarInterface>) => {
      const newEvents = state.events.map((event) => {
        if (event._id === payload._id) {
          return payload;
        }
      });

      state.events = newEvents as CalendarInterface[];
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent?._id
        );
        state.activeEvent = null;
      }
    },

    onLoadEvents: (state, { payload }: PayloadAction<CalendarInterface[]>) => {
      state.isLoadingEvents = false;
      // state.events = payload
      payload.forEach((event: CalendarInterface) => {
        const exists = state.events.some(
          (dbEvent: CalendarInterface) => dbEvent._id === event._id
        );

        if (!exists) state.events.push(event);
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});
export const {
  saveEvents,
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = CalendarSlice.actions;
