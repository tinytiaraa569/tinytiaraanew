import React, { useEffect } from 'react'
import Contactsec1 from './Contactsec1/Contactsec1'
import Contactsec2 from './Contactsec2/Contactsec2'
import Contactsec3 from './Contactsec3/Contactsec3'
import { Helmet } from 'react-helmet-async'

function Conatct() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
       <Helmet>
        <title>Contact Us | Kids Jewellery | Mumbai</title>
        <meta name="description" content="Shop gold & silver kids' jewellery at Tiny Tiaraa Ru-Brama Retail Private Limited. Contact us at care@tinytiaraa.com." />
        <meta name="keywords" content="Infants jewellery kids jewellery children's jewellery infant jewellery gold jewellery for kids silver jewellery for kids Diamond Jewellery for kids and infants natural diamond jewellery for kids CZ diamond jewellery for kids jewellery for kids jewellery for children jewellery for infants fine jewellery for kids dainty jewellery for kids Princess jewellery for kids Birthday jewellery for kids Holiday jewellery for kids Gift jewellery for kids Gift Cards Gold Saving plans" />
        <link rel="canonical" href="/contacts" />

      </Helmet>
      <Contactsec1 />
      <Contactsec2 />
      <Contactsec3 />
    </div>
  )
}

export default Conatct
