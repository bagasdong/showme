import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./member/home";
import LoginPage from "./login";
import LoadingPage from "../components/Loading";
import RegisterPage from "./register";
import OtpVerification from "./register/OtpVerification";
import EventCategoryPage from "./member/event-category";
interface RoutesProps {
  path: string;
  element: ReactNode;
}
const MemberRoutes: Array<RoutesProps> = [
  { path: "/member", element: <HomePage /> },
  { path: "/event-category/", element: <EventCategoryPage /> },
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
