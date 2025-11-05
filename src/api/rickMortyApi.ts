import type {
    CharactersPaginationResponse,
    Character,
} from '../types/character'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchCharacters = async (
    page: number
): Promise<CharactersPaginationResponse> => {
    const response = await fetch(`${BASE_URL}/character?page=${page}`)
    if (!response.ok) {
        throw new Error('Failed to fetch characters')
    }
    return response.json()
}

export const fetchCharacter = async (id: string): Promise<Character> => {
    const response = await fetch(`${BASE_URL}/character/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch character')
    }
    return response.json()
}
