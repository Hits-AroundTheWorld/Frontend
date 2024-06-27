import {useState, useEffect} from "react";
import {Placemark, YMaps, Map, ZoomControl} from "@pbe/react-yandex-maps";
import {v4 as uuidv4} from 'uuid';
import {Modal, Button, Form, Row, Col} from "react-bootstrap";
import {useFormik} from "formik";
import {instance} from "../../api/axios.api.ts";

export type Coords = [number, number];

export interface IPlaceMark {
    pointId: string;
    xCoordinate: number;
    yCoordinate: number;
    title: string;
    description: string;
    parentId: string;
}

interface newPlacemarks {
    mapPoints: IPlaceMark[],
    parentId: string
}

const MapComponent = ({placemarks, parentId} : {placemarks: IPlaceMark[], parentId: string}) => {
    const [mapPoints, setMapPoints] = useState<IPlaceMark[]>(placemarks);
    const [show, setShow] = useState<boolean>(false);
    const [currentPlacemark, setCurrentPlacemark] = useState<IPlaceMark | undefined>();

    const formik = useFormik({
        initialValues: {
            title: '',
            desription: ''
        },
        onSubmit: (values) => {
            if (currentPlacemark) {
                const updatedPlacemarks = mapPoints.map(mark =>
                    mark.pointId === currentPlacemark.pointId
                        ? {...mark, title: values.title, desription: values.desription}
                        : mark
                );
                setMapPoints(updatedPlacemarks);
            }
            handleClose();
        }
    });

    useEffect(() => {
        if (currentPlacemark) {
            formik.resetForm({
                values: {
                    title: currentPlacemark.title,
                    desription: currentPlacemark.description
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
            description: '',
            title: '',
            parentId: parentId.toString()
        };
        setMapPoints([...mapPoints, newMark]);
        setCurrentPlacemark(newMark);
        handleShow();
    };

    const handlePlacemarkClick = (placemark: IPlaceMark) => {
        setCurrentPlacemark(placemark);
        handleShow();
    };

    const deletePlacemark = () => {
        setMapPoints(mapPoints.filter(mark => mark.pointId !== currentPlacemark?.pointId));
        handleClose();
    };
    
    const saveAllMarks = async () => {
        const data: newPlacemarks = {mapPoints, parentId}
        console.log(data)
        await instance.post('/api/timeInterval/points-actions', data)
        console.log('asdasd')
    }

    return (
        <>
        <Col xs={12} sm={12} md={12} xl={12} xxl={12}>
            <YMaps>
                <Map
                    defaultState={{center: mapPoints.length > 0 ? [mapPoints[0].xCoordinate, mapPoints[0].yCoordinate] : [55.75, 37.57], zoom: 9}}
                    width="100%"
                    height="400px"
                    onClick={handleMapClick}
                >
                    {mapPoints.map((mark) => (
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
            <Button className="mt-2" variant="primary" size="sm" onClick={saveAllMarks}>Сохранить выбранные точки</Button>
        </Col>
        </>
    );
};

export default MapComponent;
                