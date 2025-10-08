import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import MapView from './MapView'
import DataInsertionComponent from './DataInsertionComponent'
import CommunityDetails from './CommunityDetails'
import HandleConflicts from './HandleConflicts'
import Dashboard from './Dashboard'
import mapIcon from "./assets/map-outline.svg"
import analyticsIcon from "./assets/analytics-outline.svg"
import buildIcon from "./assets/build-outline.svg"

function App() {
  return (
    <BrowserRouter>
      <div className="app__shell">
        <nav className="app__nav">
          <div className="app__nav__header">
            <div className="app__nav__logo">
              LineCheck
              <span className="app__nav__logo-badge">PRO</span>
            </div>
          </div>
          <ul>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                <img src={analyticsIcon} alt="" className="nav-icon" /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                <img src={mapIcon} alt="" className="nav-icon" /> Map
              </NavLink>
            </li>
            <li>
              <NavLink to="/handle-conflicts" className={({ isActive }) => isActive ? 'active' : ''}>
                <img src={buildIcon} alt="" className="nav-icon" /> Handle Conflicts
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <main className="app__content app__content--fullscreen">
              <MapView />
            </main>
          } />
          <Route path="/community/:id" element={
            <main className="app__content app__content--padded">
              <CommunityDetails />
            </main>
          } />
          <Route path="/handle-conflicts" element={
            <main className="app__content app__content--padded">
              <HandleConflicts />
            </main>
          } />
          <Route path="/dashboard" element={
            <main className="app__content app__content--padded">
              <Dashboard />
            </main>
          } />
          <Route path="/admin" element={
            <main className="app__content app__content--padded">
              <DataInsertionComponent />
            </main>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
