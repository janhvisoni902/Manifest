import React, { createContext, useContext, useState, useEffect } from 'react';
import StrategyModal from '../components/mtm/StrategyModal';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__openBookingModal = openBooking;
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete window.__openBookingModal;
      }
    };
  }, []);

  return (
    <BookingContext.Provider value={{ isBookingOpen, openBooking, closeBooking }}>
      {children}
      <StrategyModal isOpen={isBookingOpen} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  return ctx;
}
