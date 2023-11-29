import { Wrap } from "@chakra-ui/react";
import GetActiveMenu from "../../../components/GetActiveMenu";
import MemberLayout from "../../../components/layouts/MemberLayout";
import HomeMenu from "./components/HomeMenu";

const HomePage = () => {
  return (
    <MemberLayout>
      <GetActiveMenu />
      <Wrap justify={"space-between"} px={6} my={5}>
        <HomeMenu title="Event" />
        <HomeMenu title="Product" />
        <HomeMenu title="Product" />
      </Wrap>
    </MemberLayout>
  );
};

export default HomePage;
