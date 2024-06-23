import * as yup from 'yup';
export const validationLoginSchema = yup.object({
    email: yup.string().email('Некорректный email').required('Обязательное поле'),
    password: yup.string().required('Обязательное поле'),
});
export const validationRegisterSchema = yup.object({
    email: yup.string().email('Некорректный email').required('Обязательное поле'),
    password: yup.string().required('Обязательное поле'),
    fullName: yup.string().required('Обязательное поле'),
    birthDate: yup.string().required('Обязательное поле'),
    aboutMe: yup.string().required('Обязательное поле'),
    country: yup.string().required('Обязательное поле'),
    phoneNumber: yup.string().required('Обязательное поле'),
});