import React, { useEffect } from 'react'
import Shopscetion1 from './Shopsections/Shopscetion1'
import Categories from '@/MainSection/Categories'
import FeatureProduct from '@/MainSection/FeatureProduct/FeatureProduct'
import { Helmet } from 'react-helmet-async'

function Shop() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

 

  return (
    <div>

    <Helmet>
      <title>Tiny Tiaraa: The Best , stylish and safe Natural Diamond Jewellery for infants and kids</title>
      <meta name="description" content="Tiny Tiaraa is a fine Natural Diamond jewellery boutique specialising in jewellery for kids of all ages. We offer various gold, silver, natural diamond, and CZ diamond jewellery, including necklaces, bracelets, earrings, rings, pendants, accessories and more. Our jewellery is perfect for special occasions, everyday wear, or to make a little one feel special." />
      <meta name="keywords" content="Infants jewellery kids jewellery children's jewellery infant jewellery gold jewellery for kids silver jewellery for kids Diamond Jewellery for kids and infants natural diamond jewellery for kids CZ diamond jewellery for kids jewellery for kids jewellery for children jewellery for infants fine jewellery for kids dainty jewellery for kids Princess jewellery for kids Birthday jewellery for kids Holiday jewellery for kids Gift jewellery for kids Gift Cards Gold Saving plans" />
      <link rel="canonical" href="/shop" />

      </Helmet>
      <Shopscetion1 />
      <Categories />
      <FeatureProduct />
    </div>
  )
}

export default Shop
