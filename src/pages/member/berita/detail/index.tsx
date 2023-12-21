import { useEffect, useState } from "react";
import MemberLayout from "../../../../components/layouts/MemberLayout";
import { Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_API_URL, BASE_IMAGE_URL } from "../../../../helpers/url";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingPage from "../../../../components/Loading";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";
import { Berita } from "../../../../models/ResponseBerita";

const DetailBeritaPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [berita, setBerita] = useState<Berita>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(BASE_API_URL + "/berita/" + id, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      })
      .then((res) => {
        setBerita(res.data.data);
        setIsLoading(false);
      });
  }, [id]);
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <MemberLayout title="Detail Berita">
      <Flex justifyContent={"center"} alignItems={"center"} py={3}>
        <Text
          position={"absolute"}
          left={5}
          top={4}
          onClick={() => {
            navigate("/member/berita");
          }}
        >
          <Icon icon={back} />
        </Text>
        <Text fontSize={"16px"} fontWeight={"bold"}>
          {"Detail Berita"}
        </Text>
      </Flex>
      <VStack mt={5} w={"full"} px={3}>
        <Image
          src={
            berita?.gambar
              ? BASE_IMAGE_URL + berita.gambar
              : "https://inkifi.com/pub/media/wysiwyg/instagram-photo-size/4.jpg"
          }
          w={"full"}
          borderRadius={"10px"}
        />
        <Text fontSize={"18px"} fontWeight={"bold"} mt={3} mb={-2}>
          {berita?.judul}
        </Text>
        <Text fontSize={"12px"} color={"#333333"} fontStyle={"italic"}>
          {new Date(berita?.created_at ?? "").toLocaleString()}
        </Text>
        <Text fontSize={"16px"} mt={3} textAlign={"justify"}>
          {berita?.deskripsi}
        </Text>
        <Text></Text>
      </VStack>
    </MemberLayout>
  );
};

export default DetailBeritaPage;
