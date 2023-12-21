import { ReactElement, useContext } from "react";
import MemberLayout from "../../../components/layouts/MemberLayout";
import { Flex, FlexProps, HStack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";
import chevron from "@iconify/icons-ion/chevron-right";
import person from "@iconify/icons-ion/person-outline";
import contact from "@iconify/icons-ion/id-card-outline";
import about from "@iconify/icons-ion/information-circle-outline";
import logoutIcon from "@iconify/icons-ion/log-out-outline";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const SettingPage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <MemberLayout title="Setting">
      <Flex justifyContent={"center"} p={5}>
        <Text
          position={"absolute"}
          left={5}
          top={6}
          onClick={() => {
            navigate("/member");
          }}
        >
          <Icon icon={back} />
        </Text>
        <Text fontSize={"16px"} fontWeight={"bold"}>
          {"User"}
        </Text>
      </Flex>
      <Flex flexDir={"column"} px={5} w={"full"} gap={3} mt={5}>
        <NavMenu
          title="Profile"
          icon={<Icon icon={person} />}
          onClick={() => navigate("profile")}
        />
        <NavMenu title="Contact" icon={<Icon icon={contact} />} />
        <NavMenu title="About" icon={<Icon icon={about} />} />
        <NavMenu
          title="Logout"
          icon={<Icon icon={logoutIcon} />}
          onClick={() => logout()}
        />
      </Flex>
    </MemberLayout>
  );
};

interface NavMenuProps extends FlexProps {
  title: string;
  icon: ReactElement;
}

const NavMenu = ({ title, icon, ...rest }: NavMenuProps) => {
  return (
    <Flex
      w={"full"}
      px={5}
      py={3}
      bgColor={"white"}
      borderRadius={5}
      shadow={"sm"}
      justifyContent={"space-between"}
      alignItems={"center"}
      cursor={"pointer"}
      {...rest}
    >
      <HStack gap={3}>
        {icon}
        <Text fontSize={"16px"}>{title}</Text>
      </HStack>
      <Icon icon={chevron} />
    </Flex>
  );
};
export default SettingPage;
