import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { UserProfile } from "../../types/types";
import { AuthService } from "../../services/auth.service";
import { toast } from "react-toastify";

const Profile = () => {
  const initialGetUserData: UserProfile = {
    fullName: "",
    email: "",
    aboutMe: "",
    country: "",
    rating: 0,
  };
  const [getUserData, setGetUserData] =
    useState<UserProfile>(initialGetUserData);

  const getProfileHandler = async () => {
    try {
        const data = await AuthService.getProfile();
        if (data) {
          setGetUserData(data);
        }
    } catch (error) {
      toast.error("Произошла ошибка при получении профиля");
    }
  };

  const editProfileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (token) {
        await AuthService.editProfile(getUserData);
        toast.success("Данные успешно поменялись");
      }
    } catch (error) {
      toast.error("Произошла ошибка при редактировании профиля");
    }
  };

  useEffect(() => {
    getProfileHandler();
  }, []);

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <div className="border rounded p-4">
            <h4 className="mb-4">Профиль</h4>
            <h6 className="mb-4">Ваш рейтинг: {getUserData.rating} </h6>
            <Form onSubmit={editProfileHandler}>
              <Form.Group className="mb-3">
                <Form.Label>ФИО</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите ФИО"
                  value={getUserData.fullName}
                  onChange={(e) =>
                    setGetUserData({ ...getUserData, fullName: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите Email"
                  value={getUserData.email}
                  onChange={(e) =>
                    setGetUserData({ ...getUserData, email: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Обо мне</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите информацию о себе"
                  value={getUserData.aboutMe}
                  onChange={(e) =>
                    setGetUserData({ ...getUserData, aboutMe: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Страна</Form.Label>
                {/*<CountrySelector/>*/}
                <Form.Control
                  type="text"
                  placeholder="Введите вашу страну"
                  value={getUserData.country}
                  onChange={(e) =>
                    setGetUserData({ ...getUserData, country: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Номер телефона</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите номер телефона"
                  value={getUserData.fullName}
                  onChange={(e) =>
                    setGetUserData({ ...getUserData, fullName: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите дату рождения"
                  value={getUserData.fullName}
                  onChange={(e) =>
                    setGetUserData({ ...getUserData, fullName: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Изменить
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
