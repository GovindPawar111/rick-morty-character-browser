import { useNavigate, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchCharacter } from '../../api/rickMortyApi'
import './CharacterDetail.css'

export function CharacterDetail() {
    const { id } = useParams({ from: '/character/$id' })
    const navigate = useNavigate({ from: '/character/$id' })

    const {
        data: character,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['character', id],
        queryFn: () => fetchCharacter(id),
    })

    if (isLoading) {
        return <div className="loading">Loading character details...</div>
    }

    if (isError) {
        return (
            <div className="error">
                Error:{' '}
                {error instanceof Error ? error.message : 'Unknown error'}
            </div>
        )
    }

    if (!character) {
        return <div className="error">Character not found</div>
    }

    return (
        <div className="character-detail-container">
            <button
                onClick={() =>
                    navigate({ to: '/characters', search: { page: 1 } })
                }
                className="btn btn-back"
            >
                ← Back to List
            </button>

            <div className="character-detail-content">
                <img
                    src={character.image}
                    alt={character.name}
                    className="character-detail-image"
                />
                <div className="character-detail-info">
                    <h1 className="character-name">{character.name}</h1>

                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Status:</span>
                            <span
                                className={`status status-${character.status.toLowerCase()}`}
                            >
                                {character.status}
                            </span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">Species:</span>
                            <span className="info-value">
                                {character.species}
                            </span>
                        </div>

                        {character.type && (
                            <div className="info-item">
                                <span className="info-label">Type:</span>
                                <span className="info-value">
                                    {character.type}
                                </span>
                            </div>
                        )}

                        <div className="info-item">
                            <span className="info-label">Gender:</span>
                            <span className="info-value">
                                {character.gender}
                            </span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">Origin:</span>
                            <span className="info-value">
                                {character.origin.name}
                            </span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">
                                Last known location:
                            </span>
                            <span className="info-value">
                                {character.location.name}
                            </span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">
                                Number of episodes:
                            </span>
                            <span className="info-value">
                                {character.episode.length}
                            </span>
                        </div>

                        <div className="info-item info-date">
                            <span className="info-label">Created:</span>
                            <span className="info-value">
                                {new Date(
                                    character.created
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
