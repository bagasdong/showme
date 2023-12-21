import { useState } from "react";
import MemberLayout from "../../../../components/layouts/MemberLayout";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { BASE_API_URL } from "../../../../helpers/url";
import Cookies from "js-cookie";
import LoadingPage from "../../../../components/Loading";
import { Alat } from "../../../../models/ResponseAlat";
import { AlatCard } from "..";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";

const DetailAlatPage = () => {
  const mapRef = useRef(null);
  const [alat, setAlat] = useState<Alat>();
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const lastSegment = pathname.split("/").pop();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(BASE_API_URL + "/alat/" + lastSegment, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      })
      .then((res: AxiosResponse) => {
        setAlat(res.data.data);
        setIsLoading(false);
      });
  }, [lastSegment]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <MemberLayout title="Detail Alat">
      <MapContainer
        center={[
          parseFloat(alat!.latitude ?? "0"),
          parseFloat(alat!.longitude ?? "0"),
        ]}
        zoom={13}
        ref={mapRef}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[
            parseFloat(alat!.latitude ?? "0"),
            parseFloat(alat!.longitude ?? "0"),
          ]}
        ></Marker>

        {/* Additional map layers or components can be added here */}
      </MapContainer>
      <Flex
        position={"absolute"}
        zIndex={"1000"}
        top={"80px"}
        w={"full"}
        px={5}
      >
        <AlatCard
          lokasi={alat!.lokasi}
          tegangan={alat!.tegangan}
          updated_at={alat!.updated_at}
          backgroundColor={"rgba(255,255,255,0.5)"}
          backdropFilter={"blur(15px)"}
          border={"1px solid rgba(255, 255, 255, 0.5)"}
          shadow={"md"}
        />
      </Flex>
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
            navigate("/member/alat");
          }}
          _hover={{ cursor: "pointer" }}
        >
          <Icon icon={back} />
        </Text>
      </Flex>
    </MemberLayout>
  );
};

export default DetailAlatPage;
