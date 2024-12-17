import React, { useEffect } from 'react'
import Aboutwho from './Aboutsections/Aboutwho/Aboutwho'
import Aboutsecion2 from './Aboutsection2/Aboutsecion2'
import Aboutsection3 from './Aboutsection3/Aboutsection3'
import AboutSection4 from './Aboutscetion4/AboutSection4'
import Aboutsection5 from './Aboutsection5/Aboutsection5'
import { Helmet } from 'react-helmet-async'

function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <Helmet>
        <title>About Us | infants and Kids natural diamond and Gold Jewellery | Tiny Tiaraa</title>
        <meta name="description" content="Welcome to Tiny Tiaraa, your enchanting destination for exquisitely crafted kids and Infant jewellery | Discover our story woven with love and imagination | Crafted with care and designed to captivate | Join us on a magical journey" />
        <meta name="keywords" content="Infants jewellery kids jewellery children's jewellery infant jewellery gold jewellery for kids silver jewellery for kids Diamond Jewellery for kids and infants natural diamond jewellery for kids CZ diamond jewellery for kids jewellery for kids jewellery for children jewellery for infants fine jewellery for kids dainty jewellery for kids Princess jewellery for kids Birthday jewellery for kids Holiday jewellery for kids Gift jewellery for kids Gift Cards Gold Saving plans" />
        <link rel="canonical" href="/about" />

      </Helmet>

    <Aboutwho />
    <Aboutsecion2 />
    <Aboutsection3 />
    <AboutSection4 />
    <Aboutsection5/>
      
    </div>
  )
}

export default About
