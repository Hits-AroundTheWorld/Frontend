import React, {useEffect, useState} from 'react';
import TimeInterval, {ITripInterval} from './timeInterval';
import {Button, Col, Container, Modal, Row, Spinner} from "react-bootstrap";
import {instance} from "../../api/axios.api.ts";
import CheckPoint, { ICheckPoint } from './CheckPoint.tsx';

export interface ICreateInterval {
    title: string;
    text: string;
    startDay: string;
    endDay: string;
    tripId: string;
}

export interface ICheckList {
    id: string;
    title: string;
    text: string;
    updatedTime: string;
    parentId: string;
}

const IntervalComponent = ({tripId}: { tripId: string }) => {

    const [intervals, setIntervals] = useState<ITripInterval[]>([]);
    const [checkLists, setCheckLists] = useState<ICheckList[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchIntervals = async () => {
        const response = await instance.get(`/api/timeInterval/${tripId}`);
        setIntervals(response.data);
    };
    
    const fetchCheckLists = async () => {
        const response = await instance.get(`/api/checklist/checklist/${tripId}?parentId=${tripId}`)
        setCheckLists(response.data)
    }
    
    useEffect(() => {
        fetchIntervals();
        fetchCheckLists()
        setIsLoading(false)
    }, [tripId]);
    
    const CheckPoints = ({id}: {id: string}) => {
        const [checkPoints, setCheckPoints] = useState<ICheckPoint[]>([]);
        const [checkPoinstLoading, setCheckPointsLoading] = useState<boolean>(true)
        
        const fetchCheckPoints = async () => {
            const response = await instance.get(`/api/checklist/checkpointst/${id}?checklistId=${id}`)
            setCheckPoints(response.data)
            setCheckPointsLoading(false)
        }
        
        useEffect(() => {
            fetchCheckPoints()
        }, [])
        
        return (
            <Row className="align-items-center">
                {checkPoinstLoading ? (
                    <Spinner animation="border"/>
                ) : (
                    checkPoints.length > 0 ? (
                        checkPoints.map((checkpoint, index) => (
                                <CheckPoint key={index} checkpoint={checkpoint}/>
                        ))
                    ) : (
                        <Col>
                            <></>
                        </Col>
                    )
                )}
            </Row>
        )
    }

    return (
        <>
            <Button className="mt-3" onClick={handleShow} variant="primary">Добавить интервал</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание интервала</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
            </Modal>
            
            <h3>Расписание</h3>
            <Row className="align-items-center">
                {isLoading ? (
                    <Spinner animation="border"/>
                ) : (
                    intervals.length > 0 ? (
                        intervals.map((interval, index) => (
                                <TimeInterval key={index} interval={interval}/>
                        ))
                    ) : (
                        <Col>
                            <h2>Нет интервалов</h2>
                        </Col>
                    )
                )}
            </Row>
            
            <h3 className="mb-1 mt-3">Чеклист</h3>
            <Row className="align-items-center">
                {isLoading ? (
                    <Spinner animation="border"/>
                ) : (
                    checkLists.length > 0 ? (
                        checkLists.map((checkList, index) => (
                                <Container key={index}>
                                    <CheckPoints id={checkList.id}/>
                                </Container>
                        ))
                    ) : (
                        <Col>
                            <h2>Нет чеклистов</h2>
                        </Col>
                    )
                )}
            </Row>
        </>
    );
};

export default IntervalComponent;
