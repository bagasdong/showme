import MemberLayout from "../../../components/layouts/MemberLayout";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";
import electric from "@iconify/icons-mdi/lightning-bolt-outline";
import power from "@iconify/icons-mdi/power";
import { Color } from "../../../helpers/color";
import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alat, ResponseAlat } from "../../../models/ResponseAlat";
import axios from "axios";
import { BASE_API_URL } from "../../../helpers/url";
import Cookies from "js-cookie";

const AlatPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [alats, setAlats] = useState<Alat[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const getAlats = () => {
      axios
        .get(BASE_API_URL + "/alat", {
          headers: { Authorization: `Bearer ${Cookies.get("userToken")}` },
        })
        .then((res) => {
          const response: ResponseAlat = res.data;
          setAlats(response.data ?? []);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    };
    getAlats();
  }, []);

  return (
    <MemberLayout title="Alat">
      <Flex justifyContent={"center"} pt={3}>
        <Text
          position={"absolute"}
          left={5}
          top={4}
          onClick={() => {
            navigate("/member");
          }}
          _hover={{ cursor: "pointer" }}
        >
          <Icon icon={back} />
        </Text>
        <Text fontSize={"16px"} fontWeight={"bold"}>
          {"Alat"}
        </Text>
      </Flex>
      {isLoading ? (
        <Spinner mt={5} color={Color.primary} />
      ) : (
        <VStack gap={3} w={"full"} px={5} mt={5}>
          {alats.map((alat, index) => {
            return (
              <AlatCard
                key={index}
                lokasi={alat.lokasi}
                tegangan={alat.tegangan}
                updated_at={alat.updated_at}
                onClick={() => navigate("" + alat.id)}
                _hover={{ cursor: "pointer" }}
              />
            );
          })}
        </VStack>
      )}
    </MemberLayout>
  );
};

interface AlatCardProps extends FlexProps {
  lokasi?: string;
  tegangan?: number;
  updated_at?: string;
}

export const AlatCard = ({
  lokasi,
  tegangan,
  updated_at,
  ...rest
}: AlatCardProps) => {
  return (
    <Flex
      flexDir={"column"}
      gap={5}
      bgColor={"white"}
      px={7}
      py={4}
      w={"full"}
      borderRadius={10}
      shadow={"sm"}
      {...rest}
    >
      <HStack justifyContent={"space-between"}>
        <Text fontSize={"16px"} fontWeight={"bold"}>
          {lokasi}
        </Text>
        <Text fontSize={"14px"}>
          {new Date(updated_at ?? "").toLocaleDateString()}
        </Text>
      </HStack>
      <HStack justifyContent={"space-between"}>
        <HStack alignItems={"center"} gap={3}>
          <Box padding={"1"} backgroundColor={"#7DBDBD"} borderRadius={"100px"}>
            <Icon icon={electric} color="white" />
          </Box>
          <VStack alignItems={"start"}>
            <Text fontSize={"14px"} color={"#8D8D8D"} mb={-2}>
              Tegangan
            </Text>
            <Text fontSize={"18px"} fontWeight={"bold"}>
              {tegangan}V
            </Text>
          </VStack>
        </HStack>
        <HStack alignItems={"center"} gap={3}>
          <Box padding={"1"} backgroundColor={"#FF6897"} borderRadius={"100px"}>
            <Icon icon={power} color="white" />
          </Box>
          <VStack alignItems={"start"}>
            <Text fontSize={"14px"} color={"#8D8D8D"} mb={-2}>
              Status
            </Text>
            <Text fontSize={"18px"} fontWeight={"bold"}>
              Off
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default AlatPage;
