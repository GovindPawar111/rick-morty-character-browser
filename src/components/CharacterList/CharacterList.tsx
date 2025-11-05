import React from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import { fetchCharacters } from '../../api/rickMortyApi'
import type { Character } from '../../types/character'
import './CharacterList.css'

export function CharacterList() {
    const navigate = useNavigate({ from: '/characters' })
    const search = useSearch({ from: '/characters' })
    const page = search.page || 1

    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ['characters', page],
        queryFn: () => fetchCharacters(page),
    })

    const columnHelper = createColumnHelper<Character>()

    const columns = React.useMemo(
        () => [
            columnHelper.accessor('image', {
                header: 'Image',
                cell: (info) => (
                    <img
                        src={info.getValue()}
                        alt={info.row.original.name}
                        className="character-image"
                    />
                ),
            }),
            columnHelper.accessor('name', {
                header: 'Name',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('status', {
                header: 'Status',
                cell: (info) => (
                    <span
                        className={`status status-${info
                            .getValue()
                            .toLowerCase()}`}
                    >
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('species', {
                header: 'Species',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('gender', {
                header: 'Gender',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('location.name', {
                header: 'Location',
                cell: (info) => info.getValue(),
            }),
        ],
        [columnHelper]
    )

    const table = useReactTable({
        data: data?.results || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const handlePageChange = (newPage: number) => {
        navigate({ to: '/characters', search: { page: newPage } })
    }

    const handleRowClick = (characterId: number) => {
        navigate({
            to: '/character/$id',
            params: { id: characterId.toString() },
        })
    }

    if (isLoading) {
        return <div className="loading">Loading characters...</div>
    }

    if (isError) {
        return (
            <div className="error">
                Error:{' '}
                {error instanceof Error ? error.message : 'Unknown error'}
            </div>
        )
    }

    return (
        <div className="character-list-container">
            <div className="character-list-header">
                <h1>Rick & Morty Characters</h1>
                <button
                    onClick={() => refetch()}
                    disabled={isFetching}
                    className={`btn btn-refresh ${
                        isFetching ? 'btn-disabled' : ''
                    }`}
                >
                    {isFetching ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            <div className="pagination">
                <div className="pagination-info">
                    Page {page} of {data?.info.pages}
                </div>
                <div className="pagination-buttons">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={`btn btn-primary ${
                            page === 1 ? 'btn-disabled' : ''
                        }`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === data?.info.pages}
                        className={`btn btn-primary ${
                            page === data?.info.pages ? 'btn-disabled' : ''
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="character-table">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                onClick={() => handleRowClick(row.original.id)}
                                className="character-row"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {data?.results && data.results.length > 8 && (
                <div className="pagination">
                    <div className="pagination-info">
                        Page {page} of {data?.info.pages}
                    </div>
                    <div className="pagination-buttons">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className={`btn btn-primary ${
                                page === 1 ? 'btn-disabled' : ''
                            }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === data?.info.pages}
                            className={`btn btn-primary ${
                                page === data?.info.pages ? 'btn-disabled' : ''
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
