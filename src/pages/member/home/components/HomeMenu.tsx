import {
  Box,
  Flex,
  HStack,
  Text,
  WrapItem,
  WrapItemProps,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import grid from "@iconify/icons-ion/grid-outline";
import { Color } from "../../../../helpers/color";

interface HomeMenuProps extends WrapItemProps {
  title: string;
  to: string;
}

const HomeMenu: React.FC<HomeMenuProps> = ({ title, to, ...rest }) => {
  const navigate = useNavigate();
  return (
    <WrapItem
      {...rest}
      onClick={() => {
        navigate(to);
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

export default HomeMenu;
