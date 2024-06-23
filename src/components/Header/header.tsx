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
        await AuthService.logout();
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
          Navbar with text
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <Link to="/">Mark Otto</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
