import { Container } from 'react-bootstrap';
import TripCard from './TripCard';
import { PublicTrip, TripModel } from '../../types/types';

interface TripsListProps {
  tripsData: PublicTrip;
}

const TripsList = ({ tripsData }: TripsListProps) => {
  return (
    <Container>
      {tripsData.trips.map((trip: TripModel) => (
        <TripCard key={trip.tripId} trip={trip} />
      ))}
    </Container>
  );
};

export default TripsList;
