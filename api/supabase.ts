export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string;
          endDatte: string;
          extrasPrice: number | null;
          guestID: number | null;
          hasBreakfast: boolean | null;
          id: number;
          isPaid: boolean | null;
          numGuests: number | null;
          numNights: number | null;
          observations: string | null;
          roomID: number | null;
          roomPrice: number | null;
          startDate: string;
          status: string | null;
          totalPrice: number | null;
        };
        Insert: {
          created_at?: string;
          endDatte: string;
          extrasPrice?: number | null;
          guestID?: number | null;
          hasBreakfast?: boolean | null;
          id?: number;
          isPaid?: boolean | null;
          numGuests?: number | null;
          numNights?: number | null;
          observations?: string | null;
          roomID?: number | null;
          roomPrice?: number | null;
          startDate: string;
          status?: string | null;
          totalPrice?: number | null;
        };
        Update: {
          created_at?: string;
          endDatte?: string;
          extrasPrice?: number | null;
          guestID?: number | null;
          hasBreakfast?: boolean | null;
          id?: number;
          isPaid?: boolean | null;
          numGuests?: number | null;
          numNights?: number | null;
          observations?: string | null;
          roomID?: number | null;
          roomPrice?: number | null;
          startDate?: string;
          status?: string | null;
          totalPrice?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'bookings_guestID_fkey';
            columns: ['guestID'];
            referencedRelation: 'guests';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookings_roomID_fkey';
            columns: ['roomID'];
            referencedRelation: 'rooms';
            referencedColumns: ['id'];
          },
        ];
      };
      guests: {
        Row: {
          countryFlag: string | null;
          created_at: string;
          email: string | null;
          fullName: string;
          id: number;
          nationalID: string | null;
          nationality: string | null;
        };
        Insert: {
          countryFlag?: string | null;
          created_at?: string;
          email?: string | null;
          fullName: string;
          id?: number;
          nationalID?: string | null;
          nationality?: string | null;
        };
        Update: {
          countryFlag?: string | null;
          created_at?: string;
          email?: string | null;
          fullName?: string;
          id?: number;
          nationalID?: string | null;
          nationality?: string | null;
        };
        Relationships: [];
      };
      rooms: {
        Row: {
          created_at: string;
          description: string | null;
          discount: number | null;
          id: number;
          image: string | null;
          maxCapacity: number | null;
          name: string | null;
          regularPrice: number | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          discount?: number | null;
          id?: number;
          image?: string | null;
          maxCapacity?: number | null;
          name?: string | null;
          regularPrice?: number | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          discount?: number | null;
          id?: number;
          image?: string | null;
          maxCapacity?: number | null;
          name?: string | null;
          regularPrice?: number | null;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          breakfastPrice: number | null;
          created_at: string;
          id: number;
          maxBookingLength: number | null;
          maxGuestsPerBooking: number | null;
          minBookingLength: number | null;
        };
        Insert: {
          breakfastPrice?: number | null;
          created_at?: string;
          id?: number;
          maxBookingLength?: number | null;
          maxGuestsPerBooking?: number | null;
          minBookingLength?: number | null;
        };
        Update: {
          breakfastPrice?: number | null;
          created_at?: string;
          id?: number;
          maxBookingLength?: number | null;
          maxGuestsPerBooking?: number | null;
          minBookingLength?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
