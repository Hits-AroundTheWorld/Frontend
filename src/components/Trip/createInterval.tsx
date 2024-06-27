import React from "react";
import { useFormik } from "formik";
import { TripService } from "../../services/trip.service.ts";
import { ICreateInterval } from "./IntervalComponent.tsx";
import {instance} from "../../api/axios.api.ts";

interface CreateIntervalModalProps {
    show: boolean;
    handleClose: () => void;
    handleSave: (tripData: ICreateInterval) => void;
    fetchTrips: () => void;
}
const CreateInterval: React.FC<CreateIntervalModalProps> = ({
    show,
    handleClose,
    handleSave,
    fetchTrips,
}) => {
    const formik = useFormik({
        initialValues: {
            title: "",
            text: "",
            startDay: "",
            endDay: "",
            tripId: ""
        },
        onSubmit: async (values: ICreateInterval) => {
            try {
                const startDay = new Date(values.startDay);
                const endDay = new Date(values.endDay);
                const updatedValues: CreateIntervalModalProps = {
                    ...values,
                    startDay: startDay.toISOString(),
                    endDay: endDay.toISOString(),
                };
                await instance.post('api/timeInterval/create', {}, updatedValues);
                handleSave(updatedValues);
                formik.resetForm();
                handleClose();
                fetchTrips();
            } catch (error) {
                console.error("Ошибка при создании поездки", error);
            }
        },
    });
    return (
        <div
            className={`modal ${show ? "show" : ""}`}
            style={{ display: show ? "block" : "none" }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Создать интервал</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={handleClose}
                        ></button>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Имя поездки
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}
                                />
                                {formik.touched.title && formik.errors.tripName ? (
                                    <div className="text-danger">{formik.errors.tripName}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tripMiniDescription" className="form-label">
                                    Краткое описание
                                </label>
                                <textarea
                                    className="form-control"
                                    id="tripMiniDescription"
                                    name="tripMiniDescription"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.tripMiniDescription}
                                />
                                {formik.touched.tripMiniDescription &&
                                formik.errors.tripMiniDescription ? (
                                    <div className="text-danger">
                                        {formik.errors.tripMiniDescription}
                                    </div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="startDate" className="form-label">
                                    Дата начала
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="startDate"
                                    name="startDate"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.startDate}
                                />
                                {formik.touched.startDate && formik.errors.startDate ? (
                                    <div className="text-danger">{formik.errors.startDate}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="endDate" className="form-label">
                                    Дата окончания
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="endDate"
                                    name="endDate"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.endDate}
                                />
                                {formik.touched.endDate && formik.errors.endDate ? (
                                    <div className="text-danger">{formik.errors.endDate}</div>
                                ) : null}
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isPublic"
                                    name="isPublic"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    checked={formik.values.isPublic}
                                />
                                <label className="form-check-label" htmlFor="isPublic">
                                    Публичная поездка
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="maxPeopleCount" className="form-label">
                                    Максимальное количество человек
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="maxPeopleCount"
                                    name="maxPeopleCount"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.maxPeopleCount}
                                />
                                {formik.touched.maxPeopleCount &&
                                formik.errors.maxPeopleCount ? (
                                    <div className="text-danger">
                                        {formik.errors.maxPeopleCount}
                                    </div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="maxBudget" className="form-label">
                                    Максимальный бюджет
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="maxBudget"
                                    name="maxBudget"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.maxBudget}
                                />
                                {formik.touched.maxBudget && formik.errors.maxBudget ? (
                                    <div className="text-danger">{formik.errors.maxBudget}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleClose}
                            >
                                Закрыть
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Создать
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateInterval;
