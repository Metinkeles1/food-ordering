import React from "react";
import About from "../../components/About";
import Campaigns from "../../components/Campaigns";
import Carousel from "../../components/Carousel";
import Customers from "../../components/customers/Customers";
import Footer from "../../components/layout/Footer";
import MenuWrapper from "../../components/product/MenuWrapper";
import Reservation from "../../components/Reservation";

function Index({ categoryList }) {
  console.log(categoryList);
  return (
    <React.Fragment>
      <Carousel />
      <Campaigns />
      <MenuWrapper categoryList={categoryList} />
      <About />
      <Reservation />
      <Customers />
    </React.Fragment>
  );
}

export default Index;
