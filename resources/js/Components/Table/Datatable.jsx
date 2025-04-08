import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Pagination, TextInput, Spinner } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { InputTextTheme } from "@Themes/InputText";


export default function Datatable({ apiRoute, columns, actions }) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Buscar dados da API com base nos parâmetros
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`api/${apiRoute}`, {
                params: { search, page },
                headers: { Accept: "application/json" },
            });

            setData(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [search, page]);

    return (
        <div className="p-6">
            {/* Campo de Pesquisa */}
            <div className="w-full max-w-md mb-4">
                <TextInput
                    theme={InputTextTheme}
                    icon={FaSearch}
                    type="text"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Tabela Genérica */}
            {loading ? (
                <div className="flex justify-center py-10">
                    <Spinner size="xl" />
                </div>
            ) : (
                <Table hoverable>
                    <Table.Head>
                        {actions && <Table.HeadCell key="0">Ações</Table.HeadCell>}
                        {columns.map((col) => (
                            <Table.HeadCell key={col.key}>{col.label}</Table.HeadCell>
                        ))}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {data?.length > 0 ? (
                            data.map((item) => (
                                <Table.Row key={item.id} className="bg-white">
                                    {actions && (
                                        <Table.Cell key={item.id}>
                                            <div className="flex gap-2">
                                                {actions.map((ActionButton, index) => (
                                                    <ActionButton key={index} item={item} />
                                                ))}
                                            </div>
                                        </Table.Cell>
                                    )}

                                    {columns.map((col) => (
                                        <Table.Cell key={col.key} className="font-medium text-gray-900">
                                            {item[col.key]}
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell colSpan={columns.length + 1} className="py-4 text-center">
                                    Nenhum registro encontrado.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            )}

            {/* Paginação */}
            <div className="flex justify-center mt-4">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    previousLabel="Anterior"
                    nextLabel="Próximo"
                />
            </div>
        </div>
    );
};
