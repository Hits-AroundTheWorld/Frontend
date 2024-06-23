import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthService } from "../../services/auth.service";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/user/userSlice";
import { setTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { UserRegisterData } from "../../types/types";
import RegistrationForm from "../../components/RegisterPage/registrationForm";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: UserRegisterData) => {
    try {
      localStorage.clear();
      const data = await AuthService.registration(values);
      if (data) {
        setTokenFromLocalStorage("token", data.token);
        localStorage.setItem("email", values.email);
        dispatch(login());
        navigate("/");
      }
    } catch (err) {
      toast.error("Ошибка при регистрации");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "92vh" }}
    >
      <Row className="w-100">
        <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
          <Card className="p-4">
            <Card.Title className="text-center">
              Регистрация нового пользователя
            </Card.Title>
            <Card.Body>
              <RegistrationForm onSubmit={onSubmit} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
