import ProfileSidebar from "@/ProfilePage/ProfileSidebar"
import { useEffect, useState } from "react"
import UserInbox from "./UserInbox"
import styles from "@/Styles/styles"


function UserInboxPage() {
  const [active, setActive] = useState(4)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className=' bg-[#ffffff]' >
      <div className={`${styles.section} flex py-10`}>
        <div className="w-[335px]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <UserInbox active={active} setActive={setActive} />

      </div>

    </div>
  )
}

export default UserInboxPage