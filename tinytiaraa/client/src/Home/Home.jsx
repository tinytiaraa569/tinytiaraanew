import React from 'react'
import MainSection from '../MainSection/MainSection'
import { useAuth } from '../Context/auth'
import { Helmet } from 'react-helmet-async'
function Home() {

  return (
    <div>
       <Helmet>
        <title>Safe, Certified and Registered Natural Diamond & Gold jewellery for infants and Kids</title>
        <meta name="description" content="Certified gold diamond & silver and CZ kid's jewellery at Tiny Tiaraa. Quality & safety-first pieces. Perfect fit for sensitive skin. Free shipping & 48-hour delivery*." />
        <meta name="keywords" content="Infants jewellery kids jewellery children's jewellery infant jewellery gold jewellery for kids silver jewellery for kids Diamond Jewellery for kids and infants natural diamond jewellery for kids CZ diamond jewellery for kids jewellery for kids jewellery for children jewellery for infants fine jewellery for kids dainty jewellery for kids Princess jewellery for kids Birthday jewellery for kids Holiday jewellery for kids Gift jewellery for kids Gift Cards Gold Saving plans" />
        <link rel="canonical" href="/" />

      </Helmet>

      <MainSection />

    </div>
  )
}

export default Home
