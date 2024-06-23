import { useFormik } from "formik";
import { UserLoginData } from "../../types/types";
import { initialLoginValues } from "../InitialValues/initialValues";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface LoginFormProps {
  onSubmit: (values: UserLoginData) => Promise<void>;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const formik = useFormik({
    initialValues: initialLoginValues,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row className="mb-3">
        <Col xs={12}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введите email"
              {...formik.getFieldProps("email")}
              isInvalid={formik.touched.email && !!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.email && formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12}>
          <Form.Group controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              {...formik.getFieldProps("password")}
              isInvalid={formik.touched.password && !!formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.password && formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting}
            className="w-100"
          >
            Войти
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
