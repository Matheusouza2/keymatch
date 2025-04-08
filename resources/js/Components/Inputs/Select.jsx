import { Label } from "flowbite-react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';

export default function SelectComponent({ setData, ...props }) {
    return (
        <>
            <Label>{props.label}</Label>
            {
                !props.hasOwnProperty('async') ? <Select
                    placeholder="Selecione..."
                    noOptionsMessage={() => 'Nenhum resultado encontrado'}
                    {...props}
                    styles={selectStyles}
                    onChange={e => setData(props.name, e.value)}
                /> : <AsyncSelect cacheOptions defaultOptions {...props} placeholder="Selecione..."
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        ...selectStyles
                    }}
                    noOptionsMessage={() => 'Nenhum resultado encontrado'} onChange={e => setData(props.name, e.value)}
                    loadingMessage={() => "Buscando ..."} />
            }
        </>
    );
}

const selectStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        zIndex: 9999,
        borderRadius: '0.5rem',
        width: '100%',
        borderWidth: '1px',
        borderColor: state.isFocused ? '#4B5563' : '#4B5563',
        backgroundColor: '#F9FAFB',
        color: '#111827',
        padding: '0.150rem',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        '&:hover': {
            borderColor: '#4B5563',
        },
    })
}
