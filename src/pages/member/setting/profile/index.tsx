import { useContext } from "react";
import MemberLayout from "../../../../components/layouts/MemberLayout";
import { Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <MemberLayout>
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
          {"Profile"}
        </Text>
      </Flex>
      <Flex flexDir={"column"} px={5} w={"full"} gap={5}>
        <FormControl>
          <FormLabel fontSize={"14px"}>Nama Lengkap</FormLabel>
          <Input
            type="text"
            variant={"flushed"}
            readOnly
            value={user?.firstname + " " + user?.lastname}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"14px"}>Alamat Email</FormLabel>
          <Input
            type="email"
            variant={"flushed"}
            readOnly
            value={user?.email}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"14px"}>Nomor HP</FormLabel>
          <Input
            type="tel"
            variant={"flushed"}
            readOnly
            value={user?.telepon}
          />
        </FormControl>
      </Flex>
    </MemberLayout>
  );
};

export default ProfilePage;
