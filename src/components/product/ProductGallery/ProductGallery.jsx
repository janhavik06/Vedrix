import { useState } from "react";
import ThumbnailList from "./ThumbnailList";

const ProductGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  return (
    <div className="space-y-5">
      <div
        className="
          bg-gray-100
          rounded-3xl
          overflow-hidden
          aspect-square
        "
      >
        <img
          src={selectedImage}
          alt="Product"
          className="
            w-full
            h-full
            object-cover
            hover:scale-110
            duration-700
            transition
          "
        />
      </div>

      <ThumbnailList
        images={images}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default ProductGallery;
