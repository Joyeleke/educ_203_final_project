import { Link } from "@nextui-org/react";

// Code to display ResourcesCard component
export default function ResourcesCard({
  imageUrl,
  title,
  url,
}: {
  imageUrl: string;
  title: string;
  url: string;
}) {
  return (
    <div>
      <figure className="w-[24rem] h-[24rem]">
        <img src={imageUrl} alt="" className="w-full h-full rounded-md" />
      </figure>
      <h3 className="font-bold text-xl mt-6">{title}</h3>
      <Link href={url} className="underline my-4 text-red-800 text-center" target="_blank">
        Explore Resource
      </Link>
    </div>
  );
}
