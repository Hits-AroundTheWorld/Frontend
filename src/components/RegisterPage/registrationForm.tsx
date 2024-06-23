import { useFormik } from "formik";
import { UserRegisterData } from "../../types/types";
import { validationRegisterSchema } from "../../helpers/validation.schemas";
import { initialRegisterScheme } from "../InitialValues/initialValues";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface RegistrationFormProps {
  onSubmit: (values: UserRegisterData) => Promise<void>;
}

const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const formik = useFormik({
    initialValues: initialRegisterScheme,
    validationSchema: validationRegisterSchema,
    onSubmit: async (values) => {
      if (values) {
        const birthDate = new Date(values.birthDate);
        const birthDateTime = new Date(
          birthDate.getFullYear(),
          birthDate.getMonth(),
          birthDate.getDate(),
          0, 0, 0
        ).toISOString();

        const updatedValues = {
          ...values,
          birthDate: birthDateTime,
        };

        await onSubmit(updatedValues);
      } else {
        toast.error("Что-то пошло не так");
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col xs={12} className="mb-3">
          <Form.Group controlId="fullName">
            <Form.Label>ФИО</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите ФИО"
              {...formik.getFieldProps("fullName")}
              isInvalid={!!formik.touched.fullName && !!formik.errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.fullName && formik.errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} className="mb-3">
          <Form.Group controlId="birthDate">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              type="date"
              {...formik.getFieldProps("birthDate")}
              isInvalid={
                !!formik.touched.birthDate && !!formik.errors.birthDate
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.birthDate && formik.errors.birthDate}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} className="mb-3">
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введите email"
              {...formik.getFieldProps("email")}
              isInvalid={!!formik.touched.email && !!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.email && formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} className="mb-3">
          <Form.Group controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              {...formik.getFieldProps("password")}
              isInvalid={!!formik.touched.password && !!formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.password && formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} className="mb-3">
          <Form.Group controlId="aboutMe">
            <Form.Label>О себе</Form.Label>
            <Form.Control
              type="text"
              placeholder="Расскажите о себе"
              {...formik.getFieldProps("aboutMe")}
              isInvalid={!!formik.touched.aboutMe && !!formik.errors.aboutMe}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.aboutMe && formik.errors.aboutMe}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} className="mb-3">
          <Form.Group controlId="country">
            <Form.Label>Страна</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите вашу страну"
              {...formik.getFieldProps("country")}
              isInvalid={!!formik.touched.country && !!formik.errors.country}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.country && formik.errors.country}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} className="mb-3">
          <Form.Group controlId="phoneNumber">
            <Form.Label>Номер телефона</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите ваш номер телефона"
              {...formik.getFieldProps("phoneNumber")}
              isInvalid={
                !!formik.touched.phoneNumber && !!formik.errors.phoneNumber
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.phoneNumber && formik.errors.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} className="mb-3">
          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting}
          >
            Зарегистрироваться
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RegistrationForm;
