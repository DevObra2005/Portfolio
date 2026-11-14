import SectionHeading from "@/components/SectionHeading";
import GalleryTrack from "@/components/GalleryTrack";
import { gallery } from "@/data/gallery";

export default function Gallery() {
  if (gallery.length === 0) return null;

  return (
    <section id="gallery" className="scroll-mt-4 py-20">
      <div className="mx-auto max-w-275 px-5">
        <SectionHeading
          number="04"
          label="GALLERY"
          title="Behind the"
          accent="Code"
          subtitle="Moments from school, events and projects in progress. Swipe, hover or tap to explore."
        />
      </div>

      <GalleryTrack />
    </section>
  );
}