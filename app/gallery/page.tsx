import fs from "fs/promises"
import path from "path"
import Link from "next/link"
import MasonryGallery from "@/components/masonry-gallery"

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFrom(dir: string) {
  const abs = path.join(process.cwd(), "public", dir)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile())
      .map((e) => `/${dir}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
      .sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const galleryImages = await getImagesFrom("gallery")
  const images = galleryImages.map((src) => ({ src, category: "gallery" as const }))

  return (
    <main 
      className="min-h-screen bg-[#9B4719] relative overflow-hidden"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.03) 0px,
            transparent 1px,
            transparent 2px,
            rgba(0, 0, 0, 0.03) 3px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.05) 0px,
            transparent 1px,
            transparent 2px,
            rgba(255, 255, 255, 0.02) 3px,
            transparent 4px,
            rgba(0, 0, 0, 0.03) 5px
          ),
          linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.1) 0%,
            transparent 20%,
            transparent 80%,
            rgba(0, 0, 0, 0.1) 100%
          )
        `,
        backgroundSize: '100% 4px, 8px 100%, 100% 100%',
        backgroundPosition: '0 0, 0 0, 0 0',
      }}
    >
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#EFD2AA] to-transparent" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal text-[#EFD2AA] mb-4 sm:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] elegant-text-shadow">
            Gallery
          </h1>
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#EFD2AA] to-transparent" />
          </div>
          <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#EFD2AA]/80 font-light max-w-xl mx-auto leading-relaxed tracking-wide px-2">
            A collection from our favorite moments
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-[#EFD2AA]/80">
            <p className="text-sm sm:text-base font-[family-name:var(--font-crimson)]">No images found. Add files to <code className="px-2 py-1 bg-[#EFD2AA]/80 rounded border border-[#EFD2AA]/30 text-[#9B4719]">public/gallery</code>.</p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}

        {/* CTA Section - Compact */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#gallery"
              className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 md:px-12 lg:px-14 py-3 sm:py-3.5 md:py-4 lg:py-4.5 font-[family-name:var(--font-crimson)] font-semibold text-sm sm:text-base md:text-lg text-[#9B4719] bg-[#EFD2AA] hover:bg-[#EFD2AA]/90 transition-all duration-300 tracking-wider uppercase border-2 border-[#EFD2AA] hover:border-[#EFD2AA]/80 hover:scale-105 hover:shadow-[0_10px_30px_rgba(239,210,170,0.25)] hover:brightness-105 active:scale-100 premium-shadow rounded-sm relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
              <span className="relative z-10">Back to Gallery Section</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}


