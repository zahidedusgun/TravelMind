import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import  Home  from "./pages/Home";
import  Chating  from "./pages/Chating";
import  Help  from "./pages/Help";
import  MainLayout  from "./layouts/MainLayout";
import  LogIn  from "./pages/LogIn";
import  SignUp  from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/", element: <Home /> },
      { path: "/chat", element: <Chating /> },
      { path: "/help", element: <Help /> },
      { path: "/login", element: <LogIn />},
      {path: "/signup", element: <SignUp />},

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
