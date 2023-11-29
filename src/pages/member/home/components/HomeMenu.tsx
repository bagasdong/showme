import { Box, Flex, Text, WrapItem, WrapItemProps } from "@chakra-ui/react";

interface HomeMenuProps extends WrapItemProps {
  title: string;
}

const HomeMenu: React.FC<HomeMenuProps> = ({ title, ...rest }) => {
  return (
    <WrapItem {...rest}>
      <Box
        w={"160px"}
        h={"160px"}
        bgColor={"white"}
        shadow={"md"}
        borderRadius={"15px"}
        mb={3}
        p={5}
      >
        <Flex
          flexDir={"column"}
          justifyContent={"space-between"}
          w={"full"}
          h={"full"}
        >
          <Text w={"full"} textAlign={"end"}>
            O
          </Text>
          <Text fontSize={"20px"} fontWeight={"bold"}>
            {title}
          </Text>
        </Flex>
      </Box>
    </WrapItem>
  );
};

export default HomeMenu;
