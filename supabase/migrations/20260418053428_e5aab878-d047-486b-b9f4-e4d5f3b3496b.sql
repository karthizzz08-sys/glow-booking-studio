
-- Bookings table for the beauty parlour
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  service TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_slot UNIQUE (booking_date, booking_time)
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone (anon) can insert a booking (public booking form)
CREATE POLICY "Anyone can create a booking"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Public can read only date+time of existing bookings (to show availability)
-- We expose this via a security-definer function instead, so DENY direct selects.
-- No SELECT policy => no one can read rows directly.

-- Function to fetch booked time slots for a given date (no PII exposed)
CREATE OR REPLACE FUNCTION public.get_booked_slots(target_date DATE)
RETURNS TABLE(booking_time TEXT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT booking_time FROM public.bookings
  WHERE booking_date = target_date
    AND status <> 'cancelled';
$$;

GRANT EXECUTE ON FUNCTION public.get_booked_slots(DATE) TO anon, authenticated;

CREATE INDEX idx_bookings_date ON public.bookings(booking_date);
