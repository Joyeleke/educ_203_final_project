import { Link } from "@nextui-org/react";

type BlogPreviewProps = { imageUrl: string; title: string; id: number };

export default function BlogPreview({ imageUrl, title, id }: BlogPreviewProps) {
  return (
    <div className="text-center">
      <figure className="w-full h-full">
        <img src={imageUrl} alt="" className="rounded-md" />
      </figure>
      <h3 className="font-bold text-xl">{title}</h3>
      <Link href={`/blog/${id}`} className="underline my-4 text-black">
        Read More
      </Link>
    </div>
  );
}
