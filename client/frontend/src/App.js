import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import  Home  from "./pages/Home";
import  Chating  from "./pages/Chating";
import  MainLayout  from "./layouts/MainLayout";
import  Help  from "./pages/Help";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/", element: <Home /> },
      { path: "/chat", element: <Chating /> },
      { path: "/help", element: <Help /> },

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
