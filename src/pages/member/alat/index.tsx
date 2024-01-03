import MemberLayout from "../../../components/layouts/MemberLayout";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";
import power from "@iconify/icons-mdi/power";
import { Color } from "../../../helpers/color";
import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Alat, ResponseAlat } from "../../../models/ResponseAlat";
import axios from "axios";
import { BASE_API_URL, BASE_IMAGE_URL } from "../../../helpers/url";
import Cookies from "js-cookie";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGeolocated } from "react-geolocated";
import { alatIcon } from "./map_icon";

const AlatPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [alats, setAlats] = useState<Alat[]>([]);
  const mapRef = useRef(null);
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    watchPosition: true,
    userDecisionTimeout: 5000,
  });

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
      {isLoading ? (
        <Spinner mt={5} color={Color.primary} />
      ) : (
        <MapContainer
          center={[coords?.latitude ?? 0, coords?.longitude ?? 0]}
          zoom={13}
          ref={mapRef}
          style={{ height: "100vh", width: "500px", maxWidth: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {alats.map((alat, index) => {
            return (
              <Marker
                key={index}
                position={[
                  parseFloat(alat!.latitude ?? "0"),
                  parseFloat(alat!.longitude ?? "0"),
                ]}
                icon={alatIcon}
                eventHandlers={{
                  click: () => navigate(alat.id ?? ""),
                }}
              ></Marker>
            );
          })}
          <Marker
            position={[coords?.latitude ?? 0, coords?.longitude ?? 0]}
          ></Marker>

          {/* Additional map layers or components can be added here */}
        </MapContainer>
      )}
      <Flex
        position={"absolute"}
        zIndex={"1000"}
        top={"40px"}
        w={"full"}
        px={5}
      >
        {" "}
        <Text
          left={5}
          top={4}
          onClick={() => {
            navigate("/member");
          }}
          _hover={{ cursor: "pointer" }}
        >
          <Icon icon={back} />
        </Text>
      </Flex>
      <Box w={"full"} position={"absolute"} zIndex={"1000"} top={"80px"} px={5}>
        <Flex
          flexDir={"column"}
          gap={5}
          bgColor={"white"}
          px={7}
          py={4}
          w={"full"}
          borderRadius={10}
          shadow={"sm"}
        >
          <HStack justifyContent={"space-between"}>
            <VStack alignItems={"start"}>
              <HStack alignItems={"center"} gap={1}>
                <Image src={BASE_IMAGE_URL + "/map_blue.png"} w={"25px"} />
                <Text>Your Location</Text>
              </HStack>
              <HStack alignItems={"center"} gap={1} ms={1}>
                <Image src={BASE_IMAGE_URL + "/map_green.png"} w={"15px"} />
                <Text ms={2}>Alat</Text>
              </HStack>
            </VStack>
          </HStack>
          <Text fontSize={12} color={"gray"}>
            *click on the map icon to see more
          </Text>
        </Flex>
      </Box>
    </MemberLayout>
  );
};

interface AlatCardProps extends FlexProps {
  lokasi?: string;
  tegangan?: number;
  updated_at?: string;
}

export const AlatCard = ({ lokasi, updated_at, ...rest }: AlatCardProps) => {
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
        <VStack>
          <HStack alignItems={"center"} gap={1}>
            <Image src={BASE_IMAGE_URL + "/map_yellow.png"} w={"25px"} />
            <Text>Event</Text>
          </HStack>
          <HStack alignItems={"center"} gap={1}>
            <Image src={BASE_IMAGE_URL + "/map_red.png"} w={"20px"} />
            <Text ms={1}>News</Text>
          </HStack>
        </VStack>
      </HStack>
      <Text fontSize={12} color={"gray"}>
        *click on the map icon to see more
      </Text>
    </Flex>
  );
};

export default AlatPage;
