import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InviteCode } from "../../types/types";
import { TripService } from "../../services/trip.service";

interface EnterInviteCodeModalProps {
  show: boolean;
  handleClose: () => void;
  handleJoin: (inviteCodeData: InviteCode) => void;
  fetchTrips: () => void;
}

const EnterInviteCodeModal: React.FC<EnterInviteCodeModalProps> = ({
  show,
  handleClose,
  handleJoin,
  fetchTrips
}) => {
  const formik = useFormik({
    initialValues: {
      inviteCode: "",
    },
    validationSchema: Yup.object({
      inviteCode: Yup.string().required("Код приглашения обязателен"),
    }),
    onSubmit: async (values: InviteCode) => {
      try {
        await TripService.loginByCode(values);
        handleJoin(values);
        formik.resetForm();
        handleClose();
        fetchTrips();
      } catch (error) {
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
            <h5 className="modal-title">Войти по коду</h5>
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
                <label htmlFor="inviteCode" className="form-label">
                  Код приглашения
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inviteCode"
                  name="inviteCode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.inviteCode}
                />
                {formik.touched.inviteCode && formik.errors.inviteCode ? (
                  <div className="text-danger">{formik.errors.inviteCode}</div>
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
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterInviteCodeModal;
