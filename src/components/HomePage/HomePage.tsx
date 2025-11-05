import { useEffect } from "react"
import {
    useNavigate,
} from '@tanstack/react-router'
import './HomePage.css'

export const HomePage = () => {
	const navigate = useNavigate({ from: '/' })
	useEffect(() => {
		navigate({ to: '/characters', search: { page: 1 } })
	}, [navigate])
	return <div className="loading">Redirecting...</div>
}
