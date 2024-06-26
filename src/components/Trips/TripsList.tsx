import { Container } from "react-bootstrap";
import TripCard from "./TripCard";
import { PublicTrip, TripModel } from "../../types/types";

interface TripsListProps {
  tripsData: PublicTrip;
  fetchTrips: () => void;
}

const TripsList = ({ tripsData, fetchTrips }: TripsListProps) => {
  return (
    <Container>
      {tripsData.trips.map((trip: TripModel) => (
        <TripCard key={trip.tripId} trip={trip} fetchTrips={fetchTrips} />
      ))}
    </Container>
  );
};

export default TripsList;
