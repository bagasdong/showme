import { HStack, Image, Text, Wrap } from "@chakra-ui/react";
import GuestLayout from "../../../components/layouts/GuestLayout";
import horn from "@iconify/icons-mdi/bullhorn";
import news from "@iconify/icons-mdi/newspaper";
import cart from "@iconify/icons-mdi/cart";
import gallery from "@iconify/icons-mdi/view-gallery-outline";
import login from "@iconify/icons-mdi/login";
import { useNavigate } from "react-router-dom";
import HomeMenu from "../../member/home/components/HomeMenu";

const GuestHomePage = () => {
  const navigate = useNavigate();

  return (
    <GuestLayout>
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
      </HStack>
      <Wrap justify={"space-between"} px={6} my={10}>
        <HomeMenu title="Event" icon={horn} to="event" />
        <HomeMenu title="Berita" icon={news} to="berita" />
        <HomeMenu title="Product" to="product" icon={cart} />
        <HomeMenu title="Gallery" to="gallery" icon={gallery} />
        <HomeMenu
          title="Login"
          icon={login}
          onClick={() => navigate("/login")}
        />
      </Wrap>
    </GuestLayout>
  );
};

export default GuestHomePage;
