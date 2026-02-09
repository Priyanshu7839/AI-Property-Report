
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router';
import Routers from "./Routes/index.jsx";
import { Toaster } from "sonner";
import { StrictMode } from "react";


  createRoot(document.getElementById("root")!).render(
    <StrictMode>
          <Toaster position="top-right" richColors />
    
   <RouterProvider router={Routers} />
   </StrictMode>
  );
  