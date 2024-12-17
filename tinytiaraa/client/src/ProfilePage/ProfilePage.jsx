import React, { useEffect, useState } from 'react'
import styles from '../Styles/styles'
import ProfileSidebar from './ProfileSidebar'
import ProfileContent from './ProfileContent'

function ProfilePage() {
  const [active, setActive] = useState(1)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className=' bg-[#f5f5f5]' >
      <div className={`${styles.section} flex py-10`}>
        <div className="w-[335px]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} setActive={setActive} />

      </div>

    </div>
  )
}

export default ProfilePage
