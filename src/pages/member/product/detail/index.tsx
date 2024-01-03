import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import LoadingPage from "../../../../components/Loading";
import MemberLayout from "../../../../components/layouts/MemberLayout";
import { Flex, Image, Text, VStack } from "@chakra-ui/react";
import { BASE_API_URL, BASE_URL } from "../../../../helpers/url";
import { Product } from "../../../../models/ResponseProduct";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";
import waIcon from "@iconify/icons-ion/logo-whatsapp-outline";
import { Color } from "../../../../helpers/color";
import HTMLString from "react-html-string";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const DetailProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const rupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(BASE_API_URL + "/product/" + id, {
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
    <MemberLayout title="Detail Product">
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
          {"Detail Product"}
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
                      ? BASE_URL + image.name
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
        <Text
          fontSize={"18px"}
          fontWeight={"bold"}
          textAlign={"start"}
          w={"full"}
          color={Color.primary}
        >
          {rupiah(parseInt(product?.harga ?? "0"))}
        </Text>

        <Text fontSize={"14px"} mt={3} mb={-2} textAlign={"start"} w={"full"}>
          <HTMLString html={product?.deskripsi ?? ""} />
        </Text>
      </VStack>
      <Flex
        w={"full"}
        position={"absolute"}
        justifyContent={"center"}
        alignItems={"center"}
        bottom={5}
      >
        <Link
          to={
            "https://api.whatsapp.com/send/?phone=628112651934&text=Halo+Showme%2C+saya+tertarik+dengan+produk+%2A" +
            product?.judul +
            "%2A%2C+apakah+bisa+dibantu%3F&type=phone_number&app_absent=0"
          }
        >
          <Flex
            w={"180px"}
            h={"40px"}
            bgColor={"#25D366"}
            color={"white"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"5px"}
            gap={3}
          >
            <Icon icon={waIcon} fontSize={24} />
            <Text>Pesan Sekarang</Text>
          </Flex>
        </Link>
      </Flex>
    </MemberLayout>
  );
};

export default DetailProductPage;
