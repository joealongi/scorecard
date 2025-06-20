import Image from "next/image";

export default function Logo() {
  return (
    <Image
      className="min-w-30px min-h-30px"
      src="/pinpointscore.svg"
      width={30}
      height={30}
      alt="Pin Point Score Logo"
    />
  );
}
