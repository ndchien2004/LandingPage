import Image from "next/image";
import type { Craft } from "@/data/crafts";
import { site } from "@/data/site";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const img = cloudinaryAssets.crafts.quat;

/**
 * Trang chi tiết Nghề Quạt — nghề chủ đạo của làng Chàng Sơn.
 * Bố cục biên tập giàu hình ảnh & video, hạn chế dùng card cho ảnh.
 */
export function QuatStory({ craft }: { craft: Craft }) {

  return (
    <>
      {/* Hero — video nền tràn màn hình */}
      <section className="relative h-[calc(100svh-4rem)] min-h-[580px] overflow-hidden bg-ink sm:h-[calc(100svh-5rem)]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={img.thuyDinh.src}
          aria-hidden="true"
        >
          <source src={img.videoHero.src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,12,6,0.30)_0%,rgba(20,12,6,0.18)_40%,rgba(20,12,6,0.80)_100%)]" />
        <Container className="relative z-10 flex h-full flex-col justify-end pb-20 sm:pb-24">
          <Reveal stagger className="max-w-3xl">
            <p
              className="eyebrow mb-4"
              style={{ color: "rgba(246,241,231,0.82)" }}
            >
              Chương {craft.order} — {craft.kicker}
            </p>
            <h1 className="font-display text-4xl leading-[1.04] text-paper drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-7xl">
              {craft.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/90">
              {craft.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="/san-pham"
                variant="primary"
                className="bg-son-deep text-paper shadow-[0_18px_38px_-18px_rgba(0,0,0,0.8)] hover:bg-son"
              >
                Xem sản phẩm
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Câu chuyện làng nghề — đình làng + tư liệu di tích */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={img.dinhLang.src}
                alt={img.dinhLang.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal stagger>
            <SectionHeading eyebrow="Lịch sử" title="Câu chuyện nghề quạt" />
            <div className="mt-6 space-y-5">
              {craft.intro.map((p, i) => (
                <p key={i} className="text-base leading-8 text-ink-soft">
                  {p}
                </p>
              ))}
            </div>

            {/* Tư liệu di tích — hai khung ảnh ghép, không phải card sản phẩm */}
            <figure className="mt-9 grid grid-cols-[1.5fr_1fr] gap-3 border-l-2 border-son/50 pl-5">
              <div className="relative aspect-[3/2] overflow-hidden bg-paper-2 shadow-[var(--shadow-soft)]">
                <Image
                  src={img.biaDenVanVo.src}
                  alt={img.biaDenVanVo.alt}
                  fill
                  sizes="(min-width: 1024px) 22rem, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/2] overflow-hidden bg-paper-2 shadow-[var(--shadow-soft)]">
                <Image
                  src={img.biaDiTich.src}
                  alt={img.biaDiTich.alt}
                  fill
                  sizes="(min-width: 1024px) 15rem, 40vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="col-span-2 mt-1 text-sm leading-6 text-muted">
                Đền Văn - Võ Chàng Sơn thờ 25 vị danh nhân, trong đó có tổ sư
                nghề mộc — minh chứng cho truyền thống thủ công lâu đời của vùng
                đất này.
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* Tinh hoa trên mặt quạt — feature tối, ảnh quạt vẽ cảnh làng quê */}
      <section className="relative overflow-hidden bg-ink py-20 text-paper sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <div className="relative aspect-[3/2] w-full overflow-hidden shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
              <Image
                src={img.quatTranhLangQue.src}
                alt={img.quatTranhLangQue.alt}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal stagger>
            <p
              className="eyebrow mb-3 flex items-center gap-3"
              style={{ color: "rgba(246,241,231,0.7)" }}
            >
              <span className="inline-block h-px w-8 bg-son" />
              Nghệ thuật
            </p>
            <h2 className="font-display text-3xl leading-tight text-paper sm:text-4xl">
              Tinh hoa trên mặt quạt
            </h2>
            <p className="mt-5 text-base leading-8 text-paper/80">
              Khi cánh quạt bung mở, mặt quạt trở thành một bức tranh thu nhỏ:
              cảnh làng quê, tích cổ, thư pháp hay hình rồng phượng được người thợ
              thổi hồn lên từng nếp gấp.
            </p>
            <p className="mt-4 text-base leading-8 text-paper/80">
              Mỗi chiếc quạt vì thế không chỉ để quạt mát, mà là một tác phẩm
              trưng bày — nơi hội họa dân gian gặp gỡ đôi tay khéo léo của làng
              Chàng Sơn.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Giá trị — danh sách đánh số trên nền giấy, ảnh nan xuyên sáng */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal className="lg:order-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={img.quatNanXuyenSang.src}
                alt={img.quatNanXuyenSang.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:order-1">
            <Reveal>
              <SectionHeading eyebrow="Giá trị" title="Điều làm nên nghề" />
            </Reveal>
            <Reveal stagger className="mt-9 space-y-7">
              {craft.values.map((v, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[auto_1fr] gap-5 border-t border-line pt-6"
                >
                  <span
                    className="font-display text-3xl leading-none"
                    style={{ color: craft.accent }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-ink">{v.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Quy trình — timeline kèm ghép ảnh công đoạn */}
      <section className="border-y border-line bg-paper-2/40 py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Phương thức · Công đoạn"
              title="Từ nan tre đến cánh quạt"
              description="Mỗi bước đều đòi hỏi sự kiên nhẫn và bàn tay quen nghề của người Chàng Sơn."
            />
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <Reveal stagger className="space-y-7">
              {craft.process.map((step) => (
                <div key={step.step} className="relative border-l border-line pl-6">
                  <span
                    className="absolute -left-px top-0 h-6 w-px"
                    style={{ background: craft.accent }}
                  />
                  <span
                    className="font-display text-2xl"
                    style={{ color: craft.accent }}
                  >
                    {step.step}
                  </span>
                  <h3 className="mt-1 font-display text-lg text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-7 text-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </Reveal>
            <Reveal className="grid grid-cols-2 grid-rows-2 gap-3">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden">
                <Image
                  src={img.phoiNanQuat.src}
                  alt={img.phoiNanQuat.alt}
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={img.xuongSanXuat.src}
                  alt={img.xuongSanXuat.alt}
                  fill
                  sizes="(min-width: 1024px) 23vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={img.quatBayPhoi.src}
                  alt={img.quatBayPhoi.alt}
                  fill
                  sizes="(min-width: 1024px) 23vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Thước phim từ làng — video phóng sự */}
      <section className="bg-ink py-20 text-paper sm:py-28">
        <Container>
          <Reveal>
            <p
              className="eyebrow mb-3 flex items-center gap-3"
              style={{ color: "rgba(246,241,231,0.7)" }}
            >
              <span className="inline-block h-px w-8 bg-son" />
              Thước phim từ làng
            </p>
            <h2 className="max-w-2xl font-display text-3xl leading-tight text-paper sm:text-4xl">
              Một ngày bên những cánh quạt Chàng Sơn
            </h2>
          </Reveal>
          <Reveal className="mt-10">
            <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-black shadow-[0_50px_120px_-50px_rgba(0,0,0,0.9)]">
              <video
                className="h-full w-full"
                controls
                preload="none"
                playsInline
                poster={img.videoFeature.poster}
              >
                <source src={img.videoFeature.src} type="video/mp4" />
              </video>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Con người — ảnh người dân làm quạt + lời kể */}
      <section
        className="border-y border-line py-20 sm:py-28"
        style={{ background: `${craft.accent}0a` }}
      >
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden shadow-[var(--shadow-card)]">
              <Image
                src={img.nguoiDanLamQuat.src}
                alt={img.nguoiDanLamQuat.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal stagger>
            <blockquote className="font-display text-2xl leading-snug text-ink sm:text-3xl">
              <span style={{ color: craft.accent }}>“</span>
              {craft.people.quote}
              <span style={{ color: craft.accent }}>”</span>
            </blockquote>
            <p className="mt-5 text-sm uppercase tracking-[0.16em] text-muted">
              {craft.people.author} · {craft.people.role}
            </p>
            <div className="mt-7 space-y-5">
              {craft.people.body.map((p, i) => (
                <p key={i} className="text-base leading-8 text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Tác phẩm tiêu biểu — ghép ảnh bất đối xứng, không dùng card */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Tác phẩm tiêu biểu"
              title="Muôn sắc cánh quạt"
              description="Từ quạt vẽ tích cổ, quạt rồng đến quạt giấy dó xuyên sáng — mỗi chiếc là một nét riêng của làng."
            />
          </Reveal>

          <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(300px,1fr)]">
            <figure className="group relative aspect-[3/4] overflow-hidden sm:row-span-2 lg:col-span-5 lg:row-span-2 lg:min-h-[620px] lg:aspect-auto">
              <Image
                src={img.quatVeNhanVat.src}
                alt={img.quatVeNhanVat.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(20,12,6,0.78))] p-5 font-display text-lg text-paper">
                Quạt vẽ nhân vật
              </figcaption>
            </figure>
            <figure className="group relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:min-h-[300px] lg:aspect-auto">
              <Image
                src={img.quatVeTichCo.src}
                alt={img.quatVeTichCo.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(20,12,6,0.78))] p-5 font-display text-lg text-paper">
                Quạt vẽ tích cổ
              </figcaption>
            </figure>
            <figure className="group relative aspect-[4/3] overflow-hidden lg:col-span-4 lg:min-h-[300px] lg:aspect-auto">
              <Image
                src={img.quatRong.src}
                alt={img.quatRong.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(20,12,6,0.78))] p-5 font-display text-lg text-paper">
                Quạt nan vẽ rồng
              </figcaption>
            </figure>
            <figure className="group relative aspect-[3/4] overflow-hidden lg:col-span-3 lg:min-h-[300px] lg:aspect-auto">
              <Image
                src={img.quatTheBong.src}
                alt={img.quatTheBong.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(20,12,6,0.78))] p-5 font-display text-lg text-paper">
                Quạt giấy dó xuyên sáng
              </figcaption>
            </figure>
          </Reveal>

          {/* Danh mục sản phẩm — nhãn chữ, không card ảnh */}
          <Reveal stagger className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8">
            {craft.products.map((p) => (
              <span key={p.name} className="text-sm text-ink-soft">
                <span className="font-display text-base text-ink">{p.name}</span>
                <span className="text-muted"> — {p.note}</span>
              </span>
            ))}
          </Reveal>
          <div className="mt-10">
            <Button href="/san-pham" variant="outline">
              Xem tất cả sản phẩm
            </Button>
          </div>
        </Container>
      </section>

      {/* Vị trí — chỉ chữ */}
      <section className="border-t border-line bg-paper-2/40 py-16 sm:py-20">
        <Container className="grid gap-8 sm:grid-cols-[1.4fr_1fr] sm:items-end">
          <Reveal>
            <SectionHeading eyebrow="Vị trí" title="Nơi nghề được sinh ra" />
            <p className="mt-5 max-w-xl text-base leading-8 text-ink-soft">
              Nghề quạt gắn bó với làng nghề Chàng Sơn — vùng đất giàu truyền
              thống thủ công của xứ Đoài, nơi nghề được hình thành, gìn giữ và
              tiếp nối qua nhiều thế hệ người thợ.
            </p>
          </Reveal>
          <Reveal>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              Địa chỉ
            </p>
            <p className="mt-1.5 font-display text-lg text-ink">{site.address}</p>
          </Reveal>
        </Container>
      </section>

    </>
  );
}
