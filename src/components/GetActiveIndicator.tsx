import { Box, Flex, Text } from "@chakra-ui/react";

interface GetActiveIndicatorProps {
  isActive: boolean;
}

const GetActiveIndicator = ({ isActive }: GetActiveIndicatorProps) => {
  return (
    <Flex
      w={"70px"}
      h={"40px"}
      bg={"transparent"}
      borderWidth={"2px"}
      borderStyle={"solid"}
      borderColor={isActive ? "rgba(255,255,255,0.5)" : "gray"}
      borderRadius={"20"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={"6px"}
      pos={"relative"}
      transition={"all 0.3s linear"}
    >
      <Text color={isActive ? "white" : "black"}>On</Text>
      <Text color={isActive ? "white" : "black"}>Off</Text>
      <Box
        w={"30px"}
        h={"30px"}
        bgColor={isActive ? "white" : "black"}
        borderRadius={"20"}
        pos={"absolute"}
        left={isActive ? "34px" : "2px"}
        transition={"all 0.3s linear"}
      />
    </Flex>
  );
};

GetActiveIndicator.defaultProps = {
  isActive: false,
};

export default GetActiveIndicator;
