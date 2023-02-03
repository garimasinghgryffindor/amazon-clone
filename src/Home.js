import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://m.media-amazon.com/images/I/81pXJW9qztL.jpg"
          alt=""
        ></img>

        <div className="home__row">
          <Product 
            id="27436723"
            title="The Lean Startup: How Sonstant Innovation Creates Radically Successful Business Paperback"
            price={299.00}
            image="https://images-eu.ssl-images-amazon.com/images/I/51qNUVObwFL._SX342_SY445_QL70_ML2_.jpg"
            rating={5}
          />
          <Product 
            id="324678221"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={1599.00}
            rating={4}
            image="https://m.media-amazon.com/images/I/51ddU7z-xXL._SX425_.jpg"
          />
        </div>

        <div className="home__row">
            <Product 
              id="2931176372"
              title="Samsung LC4267237GH 49' Curved LED Gaming Monitor"
              price={29000.00}
              rating={3}
              image="https://m.media-amazon.com/images/I/71GPtU9f1XL._SL1500_.jpg"
            />
            <Product 
              id="09112234321"
              title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal fabric"
              price={16999.00}
              rating={5}
              image="https://www.reliancedigital.in/medias/Amazon-B07P9B3W1G-Computer-Speakers-491600506-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3wxODgzNHxpbWFnZS9qcGVnfGltYWdlcy9oYzMvaDgxLzkyMTY2NjQxNzQ2MjIuanBnfDQxNjE4MmM1ZDBjY2E5N2JhODk5MzAzNDE1MTQxY2E1NDU1ODUxOWQxNGQxNjAyN2NmYmZiZmEwYTMwNDAxM2M"
            />
            <Product 
              id="9011787812"
              title="New Apple iPad Pro (12.9-inch, WiFi, 128GB) - Silver (4th Generation)"
              price={78999.00}
              rating={4}
              image="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-12-select-wifi-spacegray-202104_GEO_IN_FMT_WHH?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1617923524000"
            />
        </div>

        <div className="home__row">
            <Product 
              id="788122043145"
              title="Okami Wolf GoPack 'City' Laptop Backpack with USB Fast Charging"
              price={2899.00}
              rating={4}
              image="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/914RVnB3FSL._UX679_.jpg"
            />
        </div>
      </div>
    </div>
  );
}

export default Home;
