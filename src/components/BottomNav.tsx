import { Box, Flex, Text } from "@chakra-ui/react";
import { MdHome } from "@react-icons/all-files/md/MdHome";
import { Color } from "../helpers/color";

interface BottomNavProps {
  isActive?: boolean;
}

const BottomNav = ({ isActive }: BottomNavProps) => {
  return (
    <Flex
      position={"fixed"}
      bottom={0}
      zIndex={100}
      minW={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      paddingY={"5"}
      backgroundColor={isActive ? "white" : "transparent"}
    >
      <Flex flexDir={"column"} alignItems={"center"} gap={"2"}>
        <Flex alignItems={"end"} gap={"1"}>
          <MdHome size={"26px"} color={Color.primary} />
          <Text color={Color.primary}>Home</Text>
        </Flex>
        <Box w={"30px"} h={"3px"} bgColor={Color.primary} borderRadius={"10"} />
      </Flex>
    </Flex>
  );
};

BottomNav.defaultProps = {
  isActive: false,
};

export default BottomNav;
