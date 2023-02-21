import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import PeoplePage from "./pages/PeoplePage";
import PersonPage from "./pages/PersonPage";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PeoplePage />} />
        <Route path="/person/:personId" element={<PersonPage />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
