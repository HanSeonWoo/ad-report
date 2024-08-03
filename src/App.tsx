import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import YearlyPage from "./pages/yearly/YearlyPage";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import MonthlyPage from "./pages/monthly/MonthlyPage";
import Homepage from "./Homepage";
import TopPage from "./pages/top/TopPage";

function App() {
  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="yearly" element={<YearlyPage />} />
            <Route path="monthly" element={<MonthlyPage />} />
            <Route path="top" element={<TopPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReactQueryProvider>
  );
}

export default App;
