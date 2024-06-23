import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/user/userSlice";
import { toast } from "react-toastify";
import { AuthService } from "../../services/auth.service";

const Header = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailUser = localStorage.getItem("email");
  const [userData, setUserData] = useState<string | null>(emailUser || null);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const toggleOffcanvas = (open: boolean) => () => {
    setIsOffcanvasOpen(open);
  };

  const logoutHandler = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        localStorage.clear();
        dispatch(logout());
        navigate("/login");
      }
    } catch (err: any) {
      toast.error("Ошибка при логауте");
    }
  };

  useEffect(() => {
    setUserData(emailUser);
  }, [emailUser]);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          AroundTheWorld
        </Navbar.Brand>
        <Navbar.Toggle />
        {isAuth ? (
          <>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text as={Link} to="/profile">
                {emailUser}
              </Navbar.Text>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text onClick={logoutHandler}>Выйти</Navbar.Text>
            </Navbar.Collapse>
          </>
        ) : (
          <>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text as={Link} to="/register">
                Регистрация
              </Navbar.Text>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text as={Link} to="/login">
                Вход
              </Navbar.Text>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
