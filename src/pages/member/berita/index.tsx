import { useNavigate } from "react-router-dom";
import MemberLayout from "../../../components/layouts/MemberLayout";
import {
  Flex,
  FlexProps,
  HStack,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_API_URL } from "../../../helpers/url";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";
import sort from "@iconify/icons-ion/funnel-outline";
import { Color } from "../../../helpers/color";
import { Berita, ResponseBerita } from "../../../models/ResponseBerita";
import { Alat } from "../../../models/ResponseAlat";

interface BeritaCardProps extends FlexProps {
  title?: string | undefined;
  desc?: string | undefined;
  location?: string | undefined;
  date?: string | undefined;
}

const BeritaCard = ({ title, desc, date, id }: BeritaCardProps) => {
  const navigate = useNavigate();
  const tgl = new Date(date ?? "");
  return (
    <Flex
      bgColor={"white"}
      w={"full"}
      px={5}
      py={3}
      shadow={"md"}
      borderRadius={"10px"}
      gap={3}
      alignItems={"center"}
      onClick={() => navigate("" + id)}
      _hover={{ cursor: "pointer" }}
    >
      <Flex flexDir={"column"} w={"full"} gap={1}>
        <Text fontSize={"14px"} fontWeight={"bold"}>
          {title}
        </Text>
        <Text fontSize={"12px"} noOfLines={3}>
          {desc}
        </Text>
        <Text fontSize={"10px"} color={"#333333"} fontStyle={"italic"} mt={3}>
          {tgl.toLocaleString()}{" "}
        </Text>
      </Flex>
    </Flex>
  );
};

const BeritaPage = () => {
  const [beritas, setBeritas] = useState<Berita[] | undefined>([]);
  const [alats, setAlats] = useState<Alat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [idAlat, setIdAlat] = useState<string | null>("");
  const [sortTerm, setSortTerm] = useState<string | null>("");
  const navigate = useNavigate();

  const handleSort = (e: string) => {
    setSortTerm(e);
  };

  const handleCategory = (e: string) => {
    setIdAlat(e);
  };

  useEffect(() => {
    const getAlats = () => {
      axios
        .get(BASE_API_URL + "/alat", {
          headers: { Authorization: `Bearer ${Cookies.get("userToken")}` },
        })
        .then((res) => {
          setAlats(res.data.data);
          getBeritas();
        })
        .catch(() => {
          setIsLoading(false);
        });
    };

    const getBeritas = () => {
      axios
        .get(BASE_API_URL + "/berita?id_alat=" + idAlat + "&sort=" + sortTerm, {
          headers: { Authorization: `Bearer ${Cookies.get("userToken")}` },
        })
        .then((res) => {
          const response: ResponseBerita = res.data;
          setBeritas(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    };

    setIsLoading(true);
    getAlats();
  }, [idAlat, sortTerm]);
  return (
    <MemberLayout title="Berita">
      <Flex justifyContent={"center"} pt={3}>
        <Text
          position={"absolute"}
          left={5}
          top={4}
          onClick={() => {
            navigate("/member");
          }}
        >
          <Icon icon={back} />
        </Text>
        <Text fontSize={"16px"} fontWeight={"bold"}>
          {"Berita"}
        </Text>
      </Flex>
      <HStack w={"full"} my={5} px={5} gap={5}>
        <Select
          placeholder="Lokasi Alat"
          bgColor={"white"}
          icon={<Icon icon={sort} />}
          iconColor="#666"
          onChange={(e) => handleCategory(e.target.value)}
        >
          {alats.map((alat, index) => {
            return (
              <option key={index} value={alat.id}>
                {alat.lokasi}
              </option>
            );
          })}
        </Select>
        <Select
          placeholder="Urutkan"
          bgColor={"white"}
          icon={<Icon icon={sort} />}
          iconColor="#666"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="latest">Terbaru</option>
          <option value="oldest">Terlama</option>
        </Select>
      </HStack>
      {isLoading ? (
        <Spinner mt={5} color={Color.primary} />
      ) : (
        <Flex
          flexDir={"column"}
          gap={3}
          px={5}
          w={"full"}
          position={"relative"}
        >
          {beritas?.map((berita, index) => {
            return (
              <BeritaCard
                key={index}
                id={"" + berita.id}
                title={berita.judul}
                desc={berita.deskripsi}
                date={berita.created_at}
              />
            );
          })}
        </Flex>
      )}
    </MemberLayout>
  );
};

export default BeritaPage;
