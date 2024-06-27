import {Form, InputGroup} from 'react-bootstrap';

export interface ICheckPoint {
    id: string;
    checklistId: string;
    text: string;
    numberOfItems: number;
    isChecked: boolean
}

const CheckPoint = ({checkpoint}: { checkpoint: ICheckPoint }) => {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Checkbox aria-label="Checkbox for following text input" checked={checkpoint.isChecked}/>
            <Form.Control placeholder="Предмет" value={checkpoint.text}/>
            <Form.Control type="number" placeholder="Количество" value={checkpoint.numberOfItems}/>
        </InputGroup>
    );
};

export default CheckPoint;