//import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {useAppDispatch} from "../../store/hooks";
import {logout} from "../../store/user/userSlice";
import {toast} from "react-toastify";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";

const Header = () => {
    const isAuth = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const emailUser = localStorage.getItem("email");
//    const [userData, setUserData] = useState<string | null>(emailUser || null);

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

//    useEffect(() => {
//        setUserData(emailUser);
//    }, [emailUser]);

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Navbar.Brand as={Link} to="/">🌎Around the world</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    {isAuth ? (
                        <Nav>
                            <NavDropdown title={emailUser} id="collapsible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/profile">Профиль</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/myRides">Мои поездки</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={logoutHandler}>Выйти</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link as={Link} to="/login">Войти</Nav.Link>
                            <Nav.Link as={Link} to="/register">Зарегистрироваться</Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
