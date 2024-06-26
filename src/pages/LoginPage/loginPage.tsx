import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { setTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { login } from "../../store/user/userSlice";
import { Container, Row, Col, Card, CardTitle } from "react-bootstrap";
import { UserLoginData } from "../../types/types";
import LoginForm from "../../components/LoginPage/loginForm";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: UserLoginData) => {
    try {
      const data = await AuthService.login(values);
      if (data) {
        setTokenFromLocalStorage("token", data.token);
        localStorage.setItem("email", values.email);
        dispatch(login());
        navigate("/");
      }
    } catch (err) {
      toast.error("Ошибка при авторизации, проверьте свои данные еще раз!");
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center mt-3"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <Card className="p-4" style={{ borderRadius: "8px" }}>
            <Card.Body className="justify-content-center">
              <CardTitle className="mb-3 ">Авторизация</CardTitle>
              <LoginForm onSubmit={onSubmit} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
