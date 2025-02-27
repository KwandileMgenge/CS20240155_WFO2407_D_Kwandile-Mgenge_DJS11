import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Layout from "./components/Layout"
import Previews from "./components/Previews"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import PodcastDetails from "./components/PodcastDetails"
import SeasonDetails from "./components/SeasonDetails"

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>

          <Route path="/previews" element={<Layout/>}>
            <Route index element={<Previews/>}/>
            <Route path="podcast/:id" element={<PodcastDetails/>}/>
            <Route path="podcast/:id/:season" element={<SeasonDetails/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    
  )
}

export default App
