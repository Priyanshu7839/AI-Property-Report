
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router';
import Routers from "./Routes/index.jsx";
import { Toaster } from "sonner";
import { StrictMode } from "react";
import { Store } from "./Store/store.js";
import { Provider } from "react-redux";



  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={Store}>
  <Toaster position="top-right" richColors />
    
   <RouterProvider router={Routers} />
      </Provider>
        
   </StrictMode>
  );
  