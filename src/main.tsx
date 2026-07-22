import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { GoogleSignIn } from "@capawesome/capacitor-google-sign-in";

import "./index.css";
import { Store } from "./Store/store.js";
import Routers from "./Routes/index.jsx";

async function bootstrap() {
  await GoogleSignIn.initialize({
    clientId:
      "421585524630-lv3d5q8fcfql898ptg5mj3a99q1adarn.apps.googleusercontent.com",
  });

  createRoot(document.getElementById("root")!).render(
    <Provider store={Store}>
      <Toaster position="top-right" richColors />
      <RouterProvider router={Routers} />
    </Provider>
  );
}

bootstrap();