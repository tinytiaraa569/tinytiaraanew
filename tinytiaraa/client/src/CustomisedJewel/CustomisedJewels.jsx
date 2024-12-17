import React, { useEffect } from 'react'
import Customisedsec1 from './customisedsec1/Customisedsec1'
import Customised from './Customisedsec2/Customised'
import Customisedsec3 from './customisedsec3/Customisedsec3'
import Customisedsec4 from './customised4/Customisedsec4'
import Customisednew from './customisednew/Customisednew'
import { Helmet } from 'react-helmet-async'
import Customsample from './Customsample/Customsample'

function CustomisedJewels() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div>
      

      <Helmet>
        <title>Design Your Own Masterpiece for you infant and Kids</title>
        <meta name="description" content="Experience our online custom jewellery design platform at Tiny Tiaraa | Choose from high-quality metals & gemstones to create your unique piece | Expert artisans bring your vision to life | Quality assurance guaranteed | Fast, secure 14-day delivery" />
        <meta name="keywords" content="Infants jewellery kids jewellery children's jewellery infant jewellery gold jewellery for kids silver jewellery for kids Diamond Jewellery for kids and infants natural diamond jewellery for kids CZ diamond jewellery for kids jewellery for kids jewellery for children jewellery for infants fine jewellery for kids dainty jewellery for kids Princess jewellery for kids Birthday jewellery for kids Holiday jewellery for kids Gift jewellery for kids Gift Cards Gold Saving plans" />
        <link rel="canonical" href="/personalised-prosperity" />
      </Helmet>
      <Customisedsec1 />
      <Customisedsec4 />
      <Customsample />
      <Customisednew />
      {/* <Customised /> */}
      <Customisedsec3 />
    </div>
  )
}

export default CustomisedJewels
