import {
  Box,
  Flex,
  HStack,
  Image,
  Text,
  Wrap,
  WrapItem,
  WrapItemProps,
} from "@chakra-ui/react";
import GuestLayout from "../../../components/layouts/GuestLayout";
import { Icon } from "@iconify/react";
import grid from "@iconify/icons-ion/grid-outline";
import { Color } from "../../../helpers/color";
import { useContext } from "react";
import { GuestContext } from "../../../context/GuestContext";
import { useNavigate } from "react-router-dom";

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
      <Wrap justify={"space-between"} px={6} my={5}>
        <HomeMenu title="Event" />
        <HomeMenu title="Lokasi Alat" />
        <HomeMenu title="Product" />
        <WrapItem onClick={() => navigate("/login")}>
          <Box
            w={"150px"}
            h={"150px"}
            bgColor={"white"}
            shadow={"md"}
            borderRadius={"15px"}
            mb={3}
            p={5}
            cursor={"pointer"}
            transition={"all 0.3s"}
            _hover={{ bgColor: Color.primary, color: "white" }}
          >
            <Flex
              flexDir={"column"}
              justifyContent={"space-between"}
              w={"full"}
              h={"full"}
            >
              <HStack w={"full"} justifyContent={"end"}>
                <Box shadow={"md"}>
                  <Icon icon={grid} />
                </Box>
              </HStack>
              <Text fontSize={"20px"} fontWeight={"500"}>
                Login
              </Text>
            </Flex>
          </Box>
        </WrapItem>
      </Wrap>
    </GuestLayout>
  );
};
interface HomeMenuProps extends WrapItemProps {
  title: string;
}

const HomeMenu: React.FC<HomeMenuProps> = ({ title, ...rest }) => {
  const { showToast } = useContext(GuestContext);
  return (
    <WrapItem
      {...rest}
      onClick={() => {
        showToast(
          "warning",
          "",
          "Silahkan login terlebih dahulu, sebelum dapat mengakses menu ini."
        );
      }}
    >
      <Box
        w={"150px"}
        h={"150px"}
        bgColor={"white"}
        shadow={"md"}
        borderRadius={"15px"}
        mb={3}
        p={5}
        cursor={"pointer"}
        transition={"all 0.3s"}
        _hover={{ bgColor: Color.primary, color: "white" }}
      >
        <Flex
          flexDir={"column"}
          justifyContent={"space-between"}
          w={"full"}
          h={"full"}
        >
          <HStack w={"full"} justifyContent={"end"}>
            <Box shadow={"md"}>
              <Icon icon={grid} />
            </Box>
          </HStack>
          <Text fontSize={"20px"} fontWeight={"500"}>
            {title}
          </Text>
        </Flex>
      </Box>
    </WrapItem>
  );
};

export default GuestHomePage;
