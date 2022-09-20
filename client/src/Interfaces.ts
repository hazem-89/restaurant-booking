
export interface BookingInterface {
  id: string;
  NOG: number;
  date: Date;
  time: string;
}
export interface ReservationsInterface {
  tableId?: string;
  date: string;
  time: string;
  NOG: number;
  phone: string;
  name: string;
}