import PageContainer from "@/components/PageContainer";
import { NextPage } from "next";
import PageMeta from "@/components/PageMeta";
import NavBar from "@/components/Nav/NavBar";
import Banner from "@/components/HomePage/Banner";
import Card from "@/components/HomePage/Card";

const HomePage: NextPage = () => {
  return (
    <PageContainer>
      <PageMeta title="Netflix - Home Page" description={"Nhung Nguyen"} />

      <NavBar username="fjdkf" />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />
      <Card />
    </PageContainer>
  );
};

export default HomePage;
