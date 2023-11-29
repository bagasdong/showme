import { Flex } from "@chakra-ui/react";
import { Color } from "../../helpers/color";
import { ReactNode, useEffect } from "react";
import BottomNav from "../BottomNav";

interface MemberLayoutProps {
  children?: ReactNode;
  title?: string;
}

const MemberLayout = ({ children, title }: MemberLayoutProps) => {
  useEffect(() => {
    document.title = title ?? "Member";
  }, [title]);
  return (
    <Flex
      position={"absolute"}
      minH={"100vh"}
      minW={"100%"}
      justifyContent={"start"}
      alignItems={"center"}
      backgroundColor={Color.bg}
      overflowY={"scroll"}
      flexDir={"column"}
      pb={10}
    >
      {children}
      <BottomNav isActive />
    </Flex>
  );
};

export default MemberLayout;
