import { Center, Flex, Text } from "@chakra-ui/react";
import { MdPowerSettingsNew } from "@react-icons/all-files/md/MdPowerSettingsNew";
import GetActiveIndicator from "./GetActiveIndicator";
import { Color } from "../helpers/color";
import { useState } from "react";

const GetActiveMenu = () => {
  const [isActive, setIsActive] = useState(false);
  // const isActive = false;
  return (
    <Flex
      onClick={() => setIsActive(!isActive)}
      w={{ base: "90%" }}
      h={{ base: "200px" }}
      bgColor={isActive ? Color.primary : "white"}
      px={{ base: "25px" }}
      py={{ base: "30px" }}
      borderRadius={"20"}
      border={"1px solid #CDCDCD"}
      flexDir={"column"}
      justifyContent={"space-between"}
      cursor={"pointer"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text
          fontSize={"24px"}
          fontWeight={"bold"}
          color={isActive ? "white" : "black"}
        >
          Get Active
        </Text>
        <Center
          h={"50px"}
          w={"50px"}
          bgColor={isActive ? "rgba(255,255,255,0.2)" : "#E0EBF3"}
          borderRadius={"12"}
        >
          <MdPowerSettingsNew
            size={"32px"}
            color={isActive ? "white" : "black"}
          />
        </Center>
      </Flex>
      <GetActiveIndicator isActive={isActive} />
    </Flex>
  );
};

export default GetActiveMenu;
