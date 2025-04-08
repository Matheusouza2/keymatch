import { useEffect, useState } from "react";
import InputValidation from "./InputValidation";
import { InputMask as Mask, useMask } from "@react-input/mask";

export default function InputMask({ ...props }) {

    const [mask, setMask] = useState("");
    const [replacement, setReplacement] = useState({ _: /\d/ });

    useEffect(() => {
        switch (props.mask) {
            case "cpf":
                setMask("___.___.___-__");
                break;
            case "cep":
                setMask("__.___-___");
                break;
            case "tel":
                setMask("(__) _____-____");
                break;
            case "titulo":
                setMask("____ ____ ____");
                break;
            default:
                setMask("____");
                break;
        }
    }, [false]);

    const inputRef = useMask({ mask: mask, replacement: replacement });

    return (
        <InputValidation
            ref={inputRef}
            {...props}
        />
    );

}
