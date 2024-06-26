import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { UserProfile } from "../../types/types";
import { AuthService } from "../../services/auth.service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const CurrentUserPage = () => {
  const initialGetUserData: UserProfile = {
    id: "",
    fullName: "",
    email: "",
    aboutMe: "",
    country: "",
    birthDate: "",
    phoneNumber: "",
    rating: 0,
  };
  const [getUserData, setGetUserData] =
    useState<UserProfile>(initialGetUserData);
  const { userId } = useParams<{ userId: string }>();

  const getProfileHandler = async (userId: string) => {
    try {
      const data = await AuthService.getUserProfile(userId);
      if (data) {
        data.birthDate = new Date(data.birthDate).toISOString().split("T")[0];
        setGetUserData(data);
      }
    } catch (error) {
      toast.error("Произошла ошибка при получении профиля");
    }
  };

  useEffect(() => {
    if (userId) {
      getProfileHandler(userId);
    }
  }, [userId]);

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <div className="border rounded p-4">
            <h4 className="mb-4">Профиль {getUserData.fullName}</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" value={getUserData.email} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>О человеке</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={getUserData.aboutMe}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Страна</Form.Label>
                <Form.Control
                  type="text"
                  value={getUserData.country}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Номер телефона</Form.Label>
                <Form.Control
                  type="text"
                  value={getUserData.phoneNumber}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control
                  type="date"
                  value={getUserData.birthDate}
                  required
                />
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CurrentUserPage;
