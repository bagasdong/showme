import { Box, HStack, Image, Text, Wrap } from "@chakra-ui/react";
import GetActiveMenu from "../../../components/GetActiveMenu";
import MemberLayout from "../../../components/layouts/MemberLayout";
import HomeMenu from "./components/HomeMenu";
import { Icon } from "@iconify/react";
import person from "@iconify/icons-ion/person-outline";
import bullhorn from "@iconify/icons-mdi/bullhorn";
import map from "@iconify/icons-mdi/map-marker-radius";
import cart from "@iconify/icons-mdi/cart";
import news from "@iconify/icons-mdi/newspaper";
import logoutIcon from "@iconify/icons-mdi/logout";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const HomePage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
            src={"/src/assets/Logo.png"}
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
        <HomeMenu title="Event" to="event" icon={bullhorn} />
        <HomeMenu title="Lokasi Alat" to="alat" icon={map} />
        <HomeMenu title="Berita" to="berita" icon={news} />
        <HomeMenu title="Product" to="product" icon={cart} />
        <HomeMenu title="Logout" icon={logoutIcon} onClick={() => logout()} />
      </Wrap>
    </MemberLayout>
  );
};

export default HomePage;
