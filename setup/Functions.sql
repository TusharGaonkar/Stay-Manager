--  Author: Tushar Gaonkar (https://github.com/TusharGaonkar)

-- Get the total revenue generated given start and an end date
CREATE OR REPLACE FUNCTION get_total_revenue (start_date DATE , end_date DATE) 
RETURNS INT as $$
SELECT SUM("totalPrice") FROM bookings WHERE "startDate" >= start_date AND "startDate" <= end_date
$$ language sql;


-- Get the total number of people served given a start and an end date
CREATE OR REPLACE FUNCTION get_total_people_served(start_date DATE , end_date Date)
RETURNS INT AS $$
SELECT SUM("numGuests") FROM bookings WHERE "startDate" >= start_date AND "startDate" <= end_date;
$$ LANGUAGE sql;


-- Get the total check-ins given a start and an end date
CREATE OR REPLACE FUNCTION get_total_checkins(today DATE)
RETURNS INT AS $$
SELECT COUNT(*) FROM bookings WHERE "isPaid" = TRUE AND "startDate" <= today AND "endDate" >= today;
$$ LANGUAGE sql;


-- Get the average room rate given a start and end date
CREATE OR REPLACE FUNCTION get_average_room_rate(start_date DATE , end_date DATE)
RETURNS NUMERIC AS $$
SELECT AVG("roomPrice") FROM bookings WHERE "startDate" >= start_date AND "startDate" <= end_date;
$$ LANGUAGE sql;


-- Get the top rooms with a limit of 10 given a start and an end date
CREATE OR REPLACE FUNCTION get_top_rooms(start_date DATE, end_date DATE)
RETURNS TABLE (
 id int,
 name text,
 regularPrice numeric,
 description text,
 image text,
 bookingCount int
) AS $$
SELECT
*
FROM (
  SELECT
    rooms.id,
    rooms.name,
    rooms."regularPrice",
    rooms.description,
    rooms.image,
    count(*) AS bookingCount
  FROM
    rooms
    INNER JOIN bookings ON rooms.id = bookings."roomID"
    AND bookings."startDate" >= start_date
    AND bookings."endDate" <= end_date
  GROUP BY
    rooms.id,
    rooms.image,
    rooms.name
  ORDER BY
    bookingCount DESC
  LIMIT 10
) AS top_rooms;
$$ LANGUAGE sql;


-- Get all the available rooms given a start date , end date and the total people for booking, collisions handled!
CREATE OR REPLACE FUNCTION get_available_rooms(start_date DATE , end_date DATE , total_people int)
RETURNS TABLE (
    id int,
    regularPrice numeric,
    image text,
    maxCapacity int,
    discount numeric,
    name text,
    description text
) AS $$ 
SELECT "id" , "regularPrice" , "image" , "maxCapacity" , "discount" , "name" , "description" FROM 
rooms 
WHERE id NOT IN
(SELECT DISTINCT rooms.id as id
FROM rooms
JOIN bookings ON bookings."roomID" = rooms."id"
WHERE end_date >= bookings."startDate"  AND  start_date < bookings."endDate" ) 
AND "maxCapacity" >= total_people
$$ LANGUAGE sql;
