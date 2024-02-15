import Home from "./pages/Home.js"
import ErrorPage from "./pages/ErrorPage.js"
import Admin from "./pages/Admin.js"
import Rack from "./pages/Rack.js"
import Racquet from "./pages/Racquet.js";

const routes = [
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "rack",
    element: <Rack></Rack>
  },
  {
    path: "racquet",
    element: <Racquet></Racquet>
  },
  {
    path: "admin",
    element: <Admin></Admin>
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  }
];

export default routes;