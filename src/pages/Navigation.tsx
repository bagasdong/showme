import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./member/home";
import LoginPage from "./login";
import LoadingPage from "../components/Loading";
import RegisterPage from "./register";
import OtpVerification from "./register/OtpVerification";
import EventPage from "./member/event";
import DetailEventPage from "./member/event/detail";
import ProfilePage from "./member/setting/profile";
import ProductPage from "./member/product";
import DetailProductPage from "./member/product/detail";
import AlatPage from "./member/alat";
import GuestHomePage from "./guest/home";
import DetailAlatPage from "./member/alat/detail";
import BeritaPage from "./member/berita";
import DetailBeritaPage from "./member/berita/detail";
interface RoutesProps {
  path: string;
  element: ReactNode;
}
const MemberRoutes: Array<RoutesProps> = [
  { path: "/member", element: <HomePage /> },
  { path: "/member/event", element: <EventPage /> },
  { path: "/member/event/:id", element: <DetailEventPage /> },
  { path: "/member/product", element: <ProductPage /> },
  { path: "/member/product/:id", element: <DetailProductPage /> },
  { path: "/member/alat", element: <AlatPage /> },
  { path: "/member/alat/:id", element: <DetailAlatPage /> },
  { path: "/member/profile", element: <ProfilePage /> },
  { path: "/member/berita", element: <BeritaPage /> },
  { path: "/member/berita/:id", element: <DetailBeritaPage /> },
];

const GuestRoutes: Array<RoutesProps> = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/guest",
    element: <GuestHomePage />,
  },
];

const Navigation = () => {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  return isLoading ? (
    <LoadingPage />
  ) : isLoggedIn ? (
    user?.email_verified_at == null ? (
      <Routes>
        <Route
          path="/member"
          element={<Navigate to={"/otp-email-verification"} />}
        />
        <Route path="/otp-email-verification" element={<OtpVerification />} />
        {GuestRoutes.map((data, index) => {
          return (
            <Route
              key={index}
              path={data.path}
              element={<Navigate to={"/otp-email-verification"} />}
            />
          );
        })}
      </Routes>
    ) : (
      <Routes>
        <Route
          path="/otp-email-verification"
          element={<Navigate to={"/member"} />}
        />
        <Route path="/" element={<Navigate to={"/member"} />} />
        {MemberRoutes.map((data, index) => {
          return <Route key={index} path={data.path} element={data.element} />;
        })}
        {GuestRoutes.map((data, index) => {
          return (
            <Route
              key={index}
              path={data.path}
              element={<Navigate to={"/member"} />}
            />
          );
        })}
      </Routes>
    )
  ) : (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} />} />
      {GuestRoutes.map((data, index) => {
        return <Route key={index} path={data.path} element={data.element} />;
      })}
      {MemberRoutes.map((data, index) => {
        return (
          <Route
            key={index}
            path={data.path}
            element={<Navigate to={"/login"} />}
          />
        );
      })}
    </Routes>
  );
};

export default Navigation;
