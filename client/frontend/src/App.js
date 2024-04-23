import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import  Home  from "./pages/Home";
import  Asking  from "./pages/Asking";
import  MainLayout  from "./layouts/MainLayout";
import  Help  from "./pages/Help";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "ask", element: <Asking /> },
      { path: "help", element: <Help /> },

      // {
      //   path: 'help',
      //   element: <HelpLayout/>,
      //   children: [
      //     { path: 'faq', element: <Faq/>}
      //   ]
      // }
    ],
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
