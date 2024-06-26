import {useState, useEffect} from "react";
import {Placemark, YMaps, Map, ZoomControl} from "@pbe/react-yandex-maps";
import {v4 as uuidv4} from 'uuid';
import {Modal, Button, Form, Row, Col} from "react-bootstrap";
import {useFormik} from "formik";

export type Coords = [number, number];

export interface IPlaceMark {
    pointId: string;
    xCoordinate: number;
    yCoordinate: number;
    title: string;
    desription: string;
}

const testValue: IPlaceMark = {
    pointId: 'string',
    xCoordinate: 55.751574,
    yCoordinate: 37.573856,
    title: 'Заголовок',
    desription: 'Описание'
}

const MapComponent = () => {
    const [placemarks, setPlacemarks] = useState<IPlaceMark[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [currentPlacemark, setCurrentPlacemark] = useState<IPlaceMark | undefined>();

    const formik = useFormik({
        initialValues: {
            title: '',
            desription: ''
        },
        onSubmit: (values) => {
            if (currentPlacemark) {
                const updatedPlacemarks = placemarks.map(mark =>
                    mark.pointId === currentPlacemark.pointId
                        ? {...mark, title: values.title, desription: values.desription}
                        : mark
                );
                setPlacemarks(updatedPlacemarks);
            }
            handleClose();
        }
    });

    useEffect(() => {
        if (currentPlacemark) {
            formik.resetForm({
                values: {
                    title: currentPlacemark.title,
                    desription: currentPlacemark.desription
                }
            });
        }
    }, [currentPlacemark]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleMapClick = (event: any) => {
        const coords: Coords = event.get('coords');
        const newMark: IPlaceMark = {
            pointId: uuidv4(),
            xCoordinate: coords[0],
            yCoordinate: coords[1],
            desription: '',
            title: ''
        };
        setPlacemarks([...placemarks, newMark]);
        setCurrentPlacemark(newMark);
        handleShow();
    };

    const handlePlacemarkClick = (placemark: IPlaceMark) => {
        setCurrentPlacemark(placemark);
        handleShow();
    };

    const deletePlacemark = () => {
        setPlacemarks(placemarks.filter(mark => mark.pointId !== currentPlacemark?.pointId));
        handleClose();
    };
    
    const saveAllMarks = () => {
        console.log(placemarks)
    }

    return (
        <Col xs={12} sm={12} md={12} xl={12} xxl={12}>
            <YMaps>
                <Map
                    defaultState={{center: placemarks.length > 0 ? [placemarks[0].xCoordinate, placemarks[0].yCoordinate] : [55.75, 37.57], zoom: 9}}
                    width="100%"
                    height="400px"
                    onClick={handleMapClick}
                >
                    {placemarks.map((mark) => (
                        <Placemark
                            key={mark.pointId}
                            geometry={[mark.xCoordinate, mark.yCoordinate]}
                            onClick={() => handlePlacemarkClick(mark)}
                        />
                    ))}
                    <ZoomControl options={{float: "right"}}/>
                </Map>
            </YMaps>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-2" controlId="formTitle">
                            <Form.Label>Заголовок</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                        </Form.Group>
                        <Form.Group className="mb-1">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="desription"
                                onChange={formik.handleChange}
                                value={formik.values.desription}
                            />
                        </Form.Group>
                        <Modal.Footer className="p-0">
                            <Row className="justify-content-between w-100">
                                <Row className="ml-1">
                                    <Button variant="primary" className="mr-1" type="submit">
                                        Сохранить
                                    </Button>
                                    <Button variant="danger" onClick={deletePlacemark}>
                                        Удалить
                                    </Button>
                                </Row>
                                <Button variant="secondary" onClick={handleClose}>
                                    Закрыть
                                </Button>
                            </Row>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
            <Button className="mt-2" variant="primary" onClick={saveAllMarks}>Сохранить выбранные точки</Button>
        </Col>
    );
};

export default MapComponent;
                