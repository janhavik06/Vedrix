const ThumbnailList = ({ images, selectedImage, setSelectedImage }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => setSelectedImage(image)}
          className={`
            rounded-2xl
            overflow-hidden
            border-2
            transition

            ${selectedImage === image ? "border-black" : "border-transparent"}
          `}
        >
          <img
            src={image}
            alt="Thumbnail"
            className="
              h-24
              w-full
              object-cover
            "
          />
        </button>
      ))}
    </div>
  );
};

export default ThumbnailList;
