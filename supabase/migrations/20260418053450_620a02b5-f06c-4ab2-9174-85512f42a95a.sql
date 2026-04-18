
ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_name_len CHECK (char_length(customer_name) BETWEEN 1 AND 100),
  ADD CONSTRAINT bookings_phone_len CHECK (char_length(customer_phone) BETWEEN 7 AND 20),
  ADD CONSTRAINT bookings_service_len CHECK (char_length(service) BETWEEN 1 AND 100),
  ADD CONSTRAINT bookings_notes_len CHECK (notes IS NULL OR char_length(notes) <= 500),
  ADD CONSTRAINT bookings_time_len CHECK (char_length(booking_time) BETWEEN 1 AND 10),
  ADD CONSTRAINT bookings_date_future CHECK (booking_date >= CURRENT_DATE - 1);
