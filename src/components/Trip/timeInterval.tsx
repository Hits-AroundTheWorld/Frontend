import {Card, Col} from "react-bootstrap";

export interface ITripInterval {
    id: string;
    title: string;
    intervalStart: string;
    intervalEnd: string;
    text: string;
    tripId: string;
}

const TimeInterval = ({interval}: { interval: ITripInterval }) => {
    return (
        <Col xs={12} sm={12} md={12} xl={6} xxl={6} className="mt-2">
            <Card>
                <Card.Body>
                    <Card.Title>{interval.title}</Card.Title>
                    <Card.Text className="mb-2 text-muted">{new Date(interval.intervalStart).toLocaleDateString()} - {new Date(interval.intervalEnd).toLocaleDateString()}</Card.Text>
                    <Card.Text>
                        {interval.text}
                    </Card.Text>
                </Card.Body></Card>
        </Col>
    );
};

export default TimeInterval;