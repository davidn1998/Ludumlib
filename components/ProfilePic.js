import Image from "next/image";

import styles from "./ProfilePic.module.scss";

const ProfilePic = ({ source, width, height }) => {
  return (
    <div
      className={styles.imgContainer}
      style={width && height ? { width: width, height: height } : {}}
    >
      <Image
        layout="fill"
        objectFit="cover"
        className={styles.img}
        src={source ? source : "/images/defaultpfp.png"}
        alt="avatar"
      />
    </div>
  );
};

export default ProfilePic;
