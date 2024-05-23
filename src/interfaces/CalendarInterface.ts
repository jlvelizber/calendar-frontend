import { UserInterface } from ".";



export interface CalendarSliceInterface {
    events: CalendarInterface[];
    activeEvent: CalendarInterface | null;
    isLoadingEvents: boolean;
  }
  

export interface CalendarInterface {
    _id?: number,
    title: string,
    notes: string,
    start: Date| number,
    end: Date| number,
    user: UserInterface | null
}