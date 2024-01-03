import { Center, Flex, Text } from "@chakra-ui/react";
import { MdPowerSettingsNew } from "@react-icons/all-files/md/MdPowerSettingsNew";
import GetActiveIndicator from "./GetActiveIndicator";
import { Color } from "../helpers/color";
import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";

const GetActiveMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const { getPosition, coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
    watchPosition: true,
  });

  const handleGetLocation = () => {
    getPosition;
    if (coords) {
      setIsActive(true);
    } else {
      setIsActive(false);
      alert("Please allow GPS");
    }
  };

  useEffect(() => {
    if (coords) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [coords]);

  return (
    <Flex
      onClick={handleGetLocation}
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
          Get Location
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
