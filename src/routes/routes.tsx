import {
    createRouter,
    createRoute,
    createRootRoute,
} from '@tanstack/react-router'
import { Layout } from '../components/Layout/Layout'
import { CharacterList } from '../components/CharacterList/CharacterList'
import { CharacterDetail } from '../components/CharacterDetail/CharacterDetail'
import { HomePage } from '../components/HomePage/HomePage'

const rootRoute = createRootRoute({
    component: Layout,
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
})

const charactersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/characters',
    component: CharacterList,
    validateSearch: (search: Record<string, unknown>): { page: number } => {
        return {
            page: Number(search?.page) || 1,
        }
    },
})

const characterDetailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/character/$id',
    component: CharacterDetail,
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    charactersRoute,
    characterDetailRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
