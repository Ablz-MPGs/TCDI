import { useEffect, useMemo, useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import GalleryPage from "./pages/GalleryPage"
import TasksPage from "./pages/TasksPage"
import StatusPage from "./pages/StatusPage"

function readRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "")
  const [page = "inicio", target = ""] = hash.split("/")
  return { page: page || "inicio", target }
}

export default function App() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute())
    window.addEventListener("hashchange", onHashChange)

    if (!window.location.hash) {
      window.history.replaceState(null, "", "#/inicio")
    }

    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  const page = useMemo(() => {
    if (route.page === "galeria") return <GalleryPage key={route.target || "galeria"} targetId={route.target} />
    if (route.page === "tasks") return <TasksPage />
    if (route.page === "status") return <StatusPage key={route.target || "status"} targetId={route.target} />
    return <HomePage />
  }, [route])

  return (
    <>
      <Header activePage={route.page} />
      <main>{page}</main>
      <Footer />
    </>
  )
}
