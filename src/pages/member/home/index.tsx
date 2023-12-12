import { Box, HStack, Image, Text, Wrap } from "@chakra-ui/react";
import GetActiveMenu from "../../../components/GetActiveMenu";
import MemberLayout from "../../../components/layouts/MemberLayout";
import HomeMenu from "./components/HomeMenu";
import { Icon } from "@iconify/react";
import person from "@iconify/icons-ion/person-outline";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
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
          onClick={() => navigate("setting")}
        >
          <Icon icon={person} />
        </Box>
      </HStack>
      <GetActiveMenu />
      <Wrap justify={"space-between"} px={6} my={5}>
        <HomeMenu title="Event" to="event" />
        <HomeMenu title="Lokasi Alat" to="alat" />
        <HomeMenu title="Product" to="product" />
      </Wrap>
    </MemberLayout>
  );
};

export default HomePage;
