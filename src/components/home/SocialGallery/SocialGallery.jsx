import GalleryCard from "./GalleryCard";
import FollowBanner from "./FollowBanner";
import gallery from "./GalleryData";

const SocialGallery = () => {
  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-gray-500">Community</p>

          <h2 className="text-5xl font-black mt-4">Styled By Vedrix</h2>

          <p className="text-gray-500 mt-6 max-w-2xl mx-auto leading-8">
            Discover how our community styles Vedrix every day.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

        <FollowBanner />
      </div>
    </section>
  );
};

export default SocialGallery;
