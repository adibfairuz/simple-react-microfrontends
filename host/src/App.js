import React, {Suspense} from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { loadModule } from "./utils";
import "./index.scss";

const App1 = React.lazy(() =>
  loadModule(
    'http://localhost:3001/remoteEntry.js',
    'app1',
    './App',
  ),
);

const App2 = React.lazy(() =>
  loadModule(
    'http://localhost:3002/remoteEntry.js',
    'app2',
    './App',
  ),
);

const Home = () => <div>Home</div>

const routes = [
  {
    path: "/",
    label: "Home",
    Element: Home,
  },
  {
    path: "/app1",
    label: "App 1",
    Element: App1,
  },
  {
    path: "/app2",
    label: "App 2",
    Element: App2,
  },
]

const App = () => {
  const { pathname } = useLocation()
  return (
    <div>
      <div className="flex">
        <aside className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2 h-screen">
            {
              routes.map(({ path, label }) => (
                <Link key={path} to={path} className={`${ pathname === path ? 'bg-gray-100 text-blue-600' : '' } flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600`}>
                    <span>{label}</span>
                </Link>
              ))
            }
        </aside>
        <div className="w-full p-4">
          <Routes>
            {
              routes.map(({ path, Element }) => (
                <Route key={path} path={path} element={
                  <Suspense fallback={<>Loading...</>}>
                    <Element />
                  </Suspense>
                } />
                ))
              }
          </Routes>
        </div>
      </div>
    </div>)
}


export default App;
