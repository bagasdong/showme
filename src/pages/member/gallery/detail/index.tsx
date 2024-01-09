import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import LoadingPage from "../../../../components/Loading";
import MemberLayout from "../../../../components/layouts/MemberLayout";
import { Flex, Image, Text, VStack } from "@chakra-ui/react";
import { BASE_API_URL, BASE_URL } from "../../../../helpers/url";
import { Product } from "../../../../models/ResponseProduct";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";
import HTMLString from "react-html-string";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const DetailGalleryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(BASE_API_URL + "/gallery/" + id, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      })
      .then((res) => {
        setProduct(res.data.data);
        setIsLoading(false);
      });
  }, [id]);
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <MemberLayout title="Detail Gallery">
      <Flex justifyContent={"center"} alignItems={"center"} py={3}>
        <Text
          position={"absolute"}
          left={5}
          top={4}
          onClick={() => {
            navigate(-1);
          }}
          _hover={{ cursor: "pointer" }}
        >
          <Icon icon={back} />
        </Text>
        <Text fontSize={"16px"} fontWeight={"bold"}>
          {"Detail Gallery"}
        </Text>
      </Flex>
      <VStack px={3} mt={5} w={"full"}>
        {product?.images?.length ?? 0 > 1 ? (
          <Carousel swipeable emulateTouch showArrows={false}>
            {product!.images!.map((image, index) => {
              return (
                <Image
                  key={index}
                  src={
                    image
                      ? BASE_URL + image.filename
                      : "https://inkifi.com/pub/media/wysiwyg/instagram-photo-size/4.jpg"
                  }
                  w={"full"}
                  borderRadius={"10px"}
                />
              );
            })}
          </Carousel>
        ) : (
          <Image
            src={product?.images?.length == 1 ? product.images[0].name : ""}
            w={"full"}
            borderRadius={"10px"}
          />
        )}
        <Text
          fontSize={"21px"}
          fontWeight={"bold"}
          mb={-2}
          textAlign={"start"}
          w={"full"}
        >
          {product?.judul}
        </Text>

        <Text fontSize={"14px"} mt={3} mb={-2} textAlign={"start"} w={"full"}>
          <HTMLString html={product?.deskripsi ?? ""} />
        </Text>
      </VStack>
    </MemberLayout>
  );
};

export default DetailGalleryPage;
