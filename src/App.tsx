import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { DestinationsPage } from "./pages/destinations/DestinationsPage";
import { DestinationDetailPage } from "./pages/destinations/DestinationDetailPage";
import { PenginapanPage } from "./pages/layanan/penginapan/PenginapanPage";
import { InformationsPage } from "./pages/informations/InformationsPage";
import { DetailInformations } from "./pages/informations/DetailInformations";
import { AgendaPage } from "./pages/agenda/AgendaPage";
import { AgendaDetail } from "./pages/agenda/AgendaDetail";
import { StrollPage } from "./pages/stroll/StrollPage";
import { StrollDetailPage } from "./pages/stroll/StrollDetailPage";
import { AboutUs } from "./pages/aboutus/AboutUs";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:id" element={<DestinationDetailPage />} />
          <Route path="/layanan/penginapan" element={<PenginapanPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/informations" element={<InformationsPage />} />
          <Route path="/informations/:id" element={<DetailInformations />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/agenda/:id" element={<AgendaDetail />} />
          <Route path="/stroll" element={<StrollPage />} />
          <Route path="/stroll/:id" element={<StrollDetailPage />} />
          <Route path="/about" element={<AboutUs />} />  
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
