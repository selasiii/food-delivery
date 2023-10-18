import React/* , { lazy, Suspense } */ from "react";

//Redux
import { Provider } from "react-redux";
import store from "./utils/store";

//Routing
import {
/*   createBrowserRouter,
  RouterProvider, */
  Outlet,
  ScrollRestoration,
} from "react-router-dom";

//Components
import Header from "./components/Header";
import Footer from "./components/Footer";
/* import Error from "./components/Error";
import { ShimmerBlock } from "./components/Shimmer";
 */
//lazy loading pages
/* const Body = lazy(() => import("./components/Body"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSummary = lazy(() => import("./pages/OrderSummary")); */

const AppLayout = () => {
  return (
    <Provider store={store}>
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
    </Provider>
  );
};

export default AppLayout;
