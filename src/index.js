import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import AppLayout from './App';
import reportWebVitals from './reportWebVitals';

//Components
import Error from "./components/Error";
import { ShimmerBlock } from "./components/Shimmer";

//Lazy loading components and pages
const Body = lazy(() => import("./components/Body"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const RestaurantDetails = lazy(() => import("./components/RestaurantDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSummary = lazy(() => import("./pages/OrderSummary"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<ShimmerBlock />}>
            <Body />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<ShimmerBlock />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<ShimmerBlock />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: (
          <Suspense fallback={<ShimmerBlock />}>
            <RestaurantDetails />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<ShimmerBlock />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<ShimmerBlock />}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: "/order-summary",
        element: (
          <Suspense fallback={<ShimmerBlock />}>
            <OrderSummary />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
