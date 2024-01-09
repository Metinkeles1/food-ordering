import Head from "next/head";
import Input from "../components/form/Input";
import Header from "../components/layout/Header";
import Home from "./home";
import axios from "axios";

export default function Index({ categoryList, productList, campaignList }) {
  return (
    <div className=''>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
      </Head>
      <Home
        categoryList={categoryList}
        productList={productList}
        campaignList={campaignList}
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const categoryRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`
    );
    const productRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products`
    );
    const campaignRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/campaigns`
    );

    return {
      props: {
        categoryList: categoryRes.data ? categoryRes.data : [],
        productList: productRes.data ? productRes.data : [],
        campaignList: campaignRes.data ? campaignRes.data : [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        categoryList: [],
        productList: [],
        campaignList: [],
      },
    };
  }
};
