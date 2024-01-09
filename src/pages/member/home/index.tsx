import { Box, HStack, Image, Text, Wrap } from "@chakra-ui/react";
import GetActiveMenu from "../../../components/GetActiveMenu";
import MemberLayout from "../../../components/layouts/MemberLayout";
import HomeMenu from "./components/HomeMenu";
import { Icon } from "@iconify/react";
import person from "@iconify/icons-ion/person-outline";
import horn from "@iconify/icons-mdi/bullhorn";
import news from "@iconify/icons-mdi/newspaper";
import map from "@iconify/icons-mdi/map-marker-radius";
import cart from "@iconify/icons-mdi/cart";
import gallery from "@iconify/icons-mdi/view-gallery-outline";
import logoutIcon from "@iconify/icons-mdi/logout";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useGeolocated } from "react-geolocated";

const HomePage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const handleToAlatPage = () => {
    if (!isGeolocationAvailable) {
      alert("Your browser does not support Geolocation");
    } else if (!isGeolocationEnabled) {
      alert("GPS is not enabled");
    } else if (coords) {
      navigate("alat");
    } else {
      alert("Please click get location first");
    }
  };

  return (
    <MemberLayout>
      <HStack
        w={"full"}
        p={5}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={5}
      >
        <HStack alignItems={"center"} justifyContent={"start"}>
          <Image
            src={"https://admin.voiceconvert.id/assets/images/logo.png"}
            bgColor={"black"}
            w={{ base: "30px" }}
            h={{ base: "30px" }}
            p={1}
            borderRadius={"15"}
          />
          <Text fontSize={"10px"} fontWeight={"bold"}>
            SMART TRANSLATOR <br /> TUNANETRA
          </Text>
        </HStack>
        <Box
          p={2}
          bgColor={"#E0EBF3"}
          borderRadius={20}
          cursor={"pointer"}
          onClick={() => navigate("profile")}
        >
          <Icon icon={person} />
        </Box>
      </HStack>
      <GetActiveMenu />
      <Wrap justify={"space-between"} px={6} my={10}>
        <HomeMenu title="Lokasi Alat" icon={map} onClick={handleToAlatPage} />
        <HomeMenu title="Event" icon={horn} to="event" />
        <HomeMenu title="Berita" icon={news} to="berita" />
        <HomeMenu title="Product" to="product" icon={cart} />
        <HomeMenu title="Gallery" to="gallery" icon={gallery} />
        <HomeMenu title="Logout" icon={logoutIcon} onClick={() => logout()} />
      </Wrap>
    </MemberLayout>
  );
};

export default HomePage;
