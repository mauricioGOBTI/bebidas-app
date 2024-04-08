import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./views/IndexPage";
import Layout from "./layouts/Layout";
const FavoritesPage = lazy(() => import('./views/FavoritesPage'))

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route index path="/" element={<IndexPage />} />
                <Route path="/favorites" element={
                  <Suspense fallback={"Cargando ..."}>
                    <FavoritesPage />
                  </Suspense>
                } />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
