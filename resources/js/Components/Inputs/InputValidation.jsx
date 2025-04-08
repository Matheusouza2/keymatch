import { Label, TextInput, HelperText } from "flowbite-react";
import { useEffect, useState } from "react";


export default function InputValidation({ setData, errors, ...props }) {
    const [error, setError] = useState({ status: false, message: '' });

    const removeError = (field) => {
        setError({ status: false });

    };

    useEffect(() => {
        if (errors) {
            Object.keys(errors).forEach((key) => {
                if (key == props.name) {
                    setError({ status: true, message: errors[key] });
                }
            });
        }
    }, [errors]);


    return (
        <>
            <Label>{props.label}</Label>
            <TextInput
                type="text"
                onChange={e => {
                    removeError(props.name);
                    setData(props.name, e.target.value)
                }}
                {...props}
                color={`${error.status ? 'failure' : ''}`}
            />
            <HelperText
                color={`${error.status ? 'failure' : ''}`}
                className="text-sm">
                {error.status ? error.message : props.helperText}
            </HelperText>
        </>
    )
}
