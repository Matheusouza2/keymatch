import { Label } from "flowbite-react";
import AsyncCreatableSelect from 'react-select/async-creatable';

export default function CreatableSelectComponent({ setData, ...props }) {
    return (
        <>
            <Label>{props.label}</Label>
            <AsyncCreatableSelect cacheOptions defaultOptions {...props} styles={selectStyles} placeholder="Selecione..."
                noOptionsMessage={() => 'Nenhum resultado encontrado'} formatCreateLabel={(e) => `Criar categoria "${e}"`} onChange={e => setData(props.name, e)} loadingMessage={() => "Buscando ..."} />
        </>
    )
}

const selectStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderRadius: '0.5rem',
        width: '100%',
        borderWidth: '1px',
        borderColor: state.isFocused ? '#ff8a4c' : '#fdba8c',
        backgroundColor: '#F9FAFB',
        color: '#111827',
        padding: '0.150rem',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        '&:hover': {
            borderColor: '#fdba8c',
        },
    })
}
