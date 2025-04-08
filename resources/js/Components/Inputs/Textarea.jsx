import { Label, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";

export default function TextareaComponent({ setData, errors, ...props }) {
    const [error, setError] = useState({ status: false, message: '' });

    useEffect(() => {
        Object.keys(errors).forEach((key) => {
            if (key == props.name) {
                setError({ status: true, message: errors[key] });
            } else {
                setError({ status: false });
            }
        });
    }, [errors]);

    return (
        <>
            <Label>{props.label}</Label>
            <Textarea
                className="text-gray-900 border-orange-300 bg-gray-50 focus:border-orange-400 focus:ring-orange-400"
                onChange={e => setData(props.name, e.target.value)}
                {...props}
                {
                ...error.status && {
                    color: "failure",
                    helperText: error.message
                }
                }
            />
        </>
    );
}
