import { Flex } from "@chakra-ui/react";
import { Color } from "../../helpers/color";
import { ReactNode } from "react";
import { Helmet } from "react-helmet";
import BottomNav from "../BottomNav";

interface MemberLayoutProps {
  children?: ReactNode;
  title?: string;
}

const MemberLayout = ({ children, title }: MemberLayoutProps) => {
  const pathname = window.location.pathname;
  return (
    <Flex
      position={"absolute"}
      left={{ md: "50%" }}
      transform={{ md: "translateX(-50%)" }}
      minH={"100vh"}
      minW={{ md: "400px", base: "100%" }}
      w={{ md: "400px", base: "100%" }}
      justifyContent={"start"}
      alignItems={"center"}
      backgroundColor={Color.bg}
      overflowY={"scroll"}
      flexDir={"column"}
      pb={10}
    >
      <Helmet>
        <title>{title ?? "Member"}</title>
      </Helmet>
      {children}

      {pathname == "/member" ? <BottomNav isActive /> : ""}
    </Flex>
  );
};

export default MemberLayout;
