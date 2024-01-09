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
import { DetailBeritaPage as AlatDetailBerita } from "./member/alat/detail/berita/detail";
import { DetailEventPage as AlatDetailEvent } from "./member/alat/detail/event/detail";
import { Center, Text, VStack } from "@chakra-ui/react";
import { Color } from "../helpers/color";
import GalleryPage from "./member/gallery";
import DetailGalleryPage from "./member/gallery/detail";
interface RoutesProps {
  path: string;
  element: ReactNode;
}
const MemberRoutes: Array<RoutesProps> = [
  { path: "/member", element: <HomePage /> },
  { path: "/member/profile", element: <ProfilePage /> },
  { path: "/member/alat", element: <AlatPage /> },
  { path: "/member/alat/:id", element: <DetailAlatPage /> },
  { path: "/member/alat/:id/berita/:id_berita", element: <AlatDetailBerita /> },
  { path: "/member/alat/:id/event/:id_event", element: <AlatDetailEvent /> },
  { path: "/member/event", element: <EventPage /> },
  { path: "/member/event/:id", element: <DetailEventPage /> },
  { path: "/member/product", element: <ProductPage /> },
  { path: "/member/product/:id", element: <DetailProductPage /> },
  { path: "/member/berita", element: <BeritaPage /> },
  { path: "/member/berita/:id", element: <DetailBeritaPage /> },
  { path: "/member/gallery", element: <GalleryPage /> },
  { path: "/member/gallery/:id", element: <DetailGalleryPage /> },
];

const GuestRoutes: Array<RoutesProps> = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/guest", element: <GuestHomePage /> },
  { path: "/guest/event", element: <EventPage /> },
  { path: "/guest/event/:id", element: <DetailEventPage /> },
  { path: "/guest/product", element: <ProductPage /> },
  { path: "/guest/product/:id", element: <DetailProductPage /> },
  { path: "/guest/berita", element: <BeritaPage /> },
  { path: "/guest/berita/:id", element: <DetailBeritaPage /> },
  { path: "/guest/gallery", element: <GalleryPage /> },
  { path: "/guest/gallery/:id", element: <DetailGalleryPage /> },
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
        <Route path="*" element={<PageNotFound />} />.
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
        <Route path="*" element={<PageNotFound />} />.
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
      <Route path="*" element={<PageNotFound />} />.
    </Routes>
  );
};

const PageNotFound = () => {
  return (
    <Center w={"100vw"} h={"100vh"}>
      <VStack>
        <Text fontSize={72} fontWeight={"bold"} color={Color.primary} mb={-3}>
          404
        </Text>
        <Text fontSize={20} color={"gray"}>
          Page Not Found
        </Text>
      </VStack>
    </Center>
  );
};
export default Navigation;
