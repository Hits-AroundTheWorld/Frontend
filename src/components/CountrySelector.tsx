import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {AuthService} from "../services/auth.service";
import {Country} from "../types/types";


const CountrySelector = () => {
    const [countries, setCountries] = useState<Country[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        setCountries(AuthService.getCountries())
        
        setIsLoading(false)
    }, [])

    return (
        <>
            {isLoading ? (<>
                <Form.Select aria-label="Default select example">
                    <option>Загрузка</option>
                </Form.Select>
            </>) : (<>
                <Form.Select aria-label="Default select example">
                    {countries && countries.map((country, index) => (
                        <option key={index} value={country.ru}>{country.ru}</option>
                    ))}
                </Form.Select>
            </>)}
        </>
    );
};

export default CountrySelector;