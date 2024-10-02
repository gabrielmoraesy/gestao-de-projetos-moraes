// React
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import { useAuth } from "./hooks/useAuth";

// Context
import { UserProvider } from "./contexts/userContext";

// Components
import { Navbar } from "./components/Navbar/index";
import { MenuMobile } from "./components/MenuMobile/index";

// Pages
import { Home } from "./pages/Home/index";
import { Account } from "./pages/Account/index";
import { About } from "./pages/About/index";
import { Login } from "./pages/Login/index";
import { CreateProject } from "./pages/CreateProject/index";
import { Dashboard } from "./pages/Dashboard/index";
import { ProjectDetails } from "./pages/ProjectDetails/index";
import { TaskDetails } from "./pages/TaskDetails/index";
import { EditProject } from "./pages/EditProject/index";
import { EditTask } from "./pages/EditTask/index";
import { ThemeProvider } from "./contexts/themeContext";

import { useTheme } from "./contexts/themeContext";

function App() {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();

  const [menuIsVisible, setMenuIsVisible] = useState(false);

  return (
    <div className="App">
      <ThemeProvider theme={{ mode: isDarkMode ? "dark" : "light" }}>
        <BrowserRouter>
          <UserProvider>
            <Navbar setMenuIsVisible={setMenuIsVisible} />
            <MenuMobile
              menuIsVisible={menuIsVisible}
              setMenuIsVisible={setMenuIsVisible}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/account"
                element={user ? <Account /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/" />}
              />
              <Route
                path="/projects/create"
                element={user ? <CreateProject /> : <Navigate to="/" />}
              />
              <Route
                path="/projects/edit/:id"
                element={user ? <EditProject /> : <Navigate to="/" />}
              />
              <Route
                path="/tasks/edit/:idProject/:idTask"
                element={user ? <EditTask /> : <Navigate to="/" />}
              />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route
                path="/tasks/:idProject/:idTask"
                element={user ? <TaskDetails /> : <Navigate to="/" />}
              />
              <Route path="/about" element={<About />} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
