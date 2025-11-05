import React from 'react'
import { Link, Outlet } from '@tanstack/react-router'
import './Layout.css'

export function Layout() {
    return (
        <div className="layout">
            <header className="layout-header">
                <Link
                    to="/characters"
                    search={{ page: 1 }}
                    className="layout-header-link"
                >
                    <img
                        src="/icons-rick-and-morty-400.svg"
                        alt="Rick & Morty Logo"
                        className="layout-logo"
                    />
                    <div className="layout-text">Rick & Morty API Browser</div>
                </Link>
            </header>
            <main className="layout-main">
                <React.Suspense
                    fallback={<div className="loading">Loading...</div>}
                >
                    <Outlet />
                </React.Suspense>
            </main>
        </div>
    )
}
