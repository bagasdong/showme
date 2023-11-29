import { Flex, FlexProps, Text } from "@chakra-ui/react";
import MemberLayout from "../../../components/layouts/MemberLayout";
import { useState } from "react";

interface NavMenuProps extends FlexProps {
  title: string;
}

const NavMenu = ({ title, ...rest }: NavMenuProps) => {
  return (
    <Flex
      w={"full"}
      px={5}
      py={3}
      bgColor={"white"}
      borderRadius={5}
      shadow={"sm"}
      {...rest}
    >
      <Text fontSize={"16px"} fontWeight={"bold"}>
        {title}
      </Text>
    </Flex>
  );
};
const EventCategoryPage = () => {
  const [categories, setCategories] = useState();

  return (
    <MemberLayout>
      <Flex justifyContent={"center"} position={"relative"} w={"full"} py={3}>
        <Text position={"absolute"} left={5} top={3}>
          {"<"}
        </Text>
        <Text fontSize={"16px"} fontWeight={"bold"}>
          {"Category"}
        </Text>
      </Flex>
      <Flex flexDir={"column"} px={5} w={"full"} gap={3}>
        <NavMenu title={"oke"} onClick={() => {}} />
        <NavMenu title={"oke"} onClick={() => {}} />
        <NavMenu title={"oke"} onClick={() => {}} />
        <NavMenu title={"oke"} onClick={() => {}} />
        <NavMenu title={"oke"} onClick={() => {}} />
      </Flex>
    </MemberLayout>
  );
};

export default EventCategoryPage;
