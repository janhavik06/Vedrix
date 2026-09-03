import { FiInstagram, FiHeart } from "react-icons/fi";

const likes = [342, 891, 215, 1204, 567, 743];

const GalleryCard = ({ item, index = 0 }) => {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-3xl shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
      <img
        src={item.image}
        alt="Vedrix Gallery"
        className="h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-110 lg:h-[340px]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100" />

      {/* Instagram icon — top right */}
      <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
        <FiInstagram size={16} />
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-5 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span className="text-xs font-bold uppercase tracking-widest text-white/80">
          @vedrixwear
        </span>
        <div className="flex items-center gap-1.5 text-white">
          <FiHeart size={14} className="fill-red-400 text-red-400" />
          <span className="text-sm font-bold">{likes[index % likes.length]}</span>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
