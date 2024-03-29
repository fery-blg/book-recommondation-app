import LoadingFallback from "./Loading";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("../auth/Login"));
const Register = lazy(() => import("../auth/Register"));
const Profile = lazy(() => import("../user/ProfileIndex"));
const Home = lazy(() => import("../home/Home"));
const Admin = lazy(() => import("../admin/AdminIndex"));
const AddBook = lazy(() => import("../Books/Addbook"));
const BookList = lazy(() => import("../Books/BookList"));
const Updatebook = lazy(() => import("../Books/Updatebook"));

function Body() {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Login />{" "}
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Register />{" "}
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Admin />
            </Suspense>
          }
        />
         <Route
          path="/books/bookList"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <BookList/>
            </Suspense>
          }
        />
        <Route
          path="admin/addbook"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <AddBook/>
            </Suspense>
          }/>
        <Route
          path="/profile"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Profile />
            </Suspense>
          }
          
        />
          <Route
          path="/Updatebook"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Updatebook/>
            </Suspense>
          }
          
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default Body;
