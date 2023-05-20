import React from "react";
import Image from "next/image";
import Link from "next/link";

const imageStyle = {
  width: "300px",
  height: "300px",
  objectFit: "cover",
};

const Card = ({ id, title, description, image, author }) => {
  return (
    // <div className="bg-white p-1 rounded col-span-1 shadow-lg shadow-slate-800">
    //   <Image width={500} height={500} src={image} alt="image" />

    //   <div className="py-1">
    //     <p className="text-slate-700 font-semibold text-lg">{title}</p>
    //     <p className="text-slate-600 text-sm">{description}</p>
    //   </div>
    // </div>

    <Link href={`/recipes/${id}`}>
      <div className="rounded-lg bg-amber-400/60 shadow shadow-slate-600/30 flex relative">
        <div className="p-2 w-1/2">
          <Image
            width={300}
            height={300}
            src={image || "/images/image.png"}
            alt={title}
            style={imageStyle}
            className="rounded-lg"
          />
        </div>
        <div className="p-2 w-1/2">
          <h5 className="mb-2 text-xl font-medium leading-tight text-slate-700/90">
            {title}
          </h5>
          <p className="mb-4 text-sm text-slate-600 dark:text-neutral-200">
            {description}
          </p>
        </div>
        <p className="absolute bottom-2 text-xs text-slate-500 right-2">
          By {author}
        </p>
      </div>
    </Link>
  );
};

export default Card;
