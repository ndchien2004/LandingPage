import Image from "next/image";
import type { Craft } from "@/data/crafts";
import { site } from "@/data/site";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const img = cloudinaryAssets.crafts.moc;

/**
 * Trang chi tiết Nghề Mộc — bố cục biên tập với ảnh thật của làng,
 * ưu tiên ảnh tràn viền và ghép ảnh thay vì các thẻ (card).
 */
export function MocStory({ craft }: { craft: Craft }) {

  return (
    <>
      {/* Hero — ảnh tràn màn hình */}
      <section className="relative h-[calc(100svh-4rem)] min-h-[560px] overflow-hidden bg-ink sm:h-[calc(100svh-5rem)]">
        <Image
          src={img.banTay.src}
          alt={img.banTay.alt}
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[52%_42%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,12,6,0.18)_0%,rgba(20,12,6,0.18)_38%,rgba(20,12,6,0.74)_100%)]" />
        <Container className="relative z-10 flex h-full flex-col justify-end pb-20 sm:pb-24">
          <Reveal stagger className="max-w-3xl">
            <p
              className="eyebrow mb-4"
              style={{ color: "rgba(246,241,231,0.82)" }}
            >
              Chương {craft.order} — Làng nghề Chàng Sơn
            </p>
            <h1 className="font-display text-4xl leading-[1.06] text-paper drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
              {craft.hero.title}
            </h1>
            {/* text-balance: chia 2 dòng cân nhau → cụm cuối không bị gãy giữa chừng */}
            <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-paper/90">
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

      {/* Câu chuyện nghề — ảnh không gian nhà gỗ + tư liệu cổ */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={img.khongGianNhaGo.src}
                alt={img.khongGianNhaGo.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal stagger>
            <SectionHeading
              eyebrow="Lịch sử"
              title="Câu chuyện nghề mộc"
            />
            <div className="mt-6 space-y-5">
              {craft.intro.map((p, i) => (
                <p key={i} className="text-base leading-8 text-ink-soft">
                  {p}
                </p>
              ))}
            </div>

            {/* Tư liệu cổ — trình bày như trang sách quét, không phải card sản phẩm */}
            <figure className="mt-9 border-l-2 border-son/50 pl-5">
              <div className="relative aspect-[3/2] w-full max-w-md overflow-hidden bg-paper-2 shadow-[var(--shadow-soft)]">
                <Image
                  src={img.tuLieuNonTan.src}
                  alt={img.tuLieuNonTan.alt}
                  fill
                  sizes="(min-width: 1024px) 28rem, 100vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-3 max-w-md text-sm leading-6 text-muted">
                Tư liệu <span className="italic">“Trên đỉnh Non Tản”</span> ghi
                lại: làng Chàng Thôn, tổng Kim Quan, huyện Thạch Thất — nơi hai
                phần ba dân làng làm nghề thợ mộc.
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* Giá trị — dải tối, ảnh chi tiết chạm tràn nửa màn, giá trị xếp dạng danh sách */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[340px] lg:min-h-full">
            <Image
              src={img.chiTietCham.src}
              alt={img.chiTietCham.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
            <Reveal>
              <p
                className="eyebrow mb-3 flex items-center gap-3"
                style={{ color: "rgba(246,241,231,0.7)" }}
              >
                <span className="inline-block h-px w-8 bg-son" />
                Giá trị
              </p>
              <h2 className="font-display text-3xl leading-tight text-paper sm:text-4xl">
                Điều làm nên nghề
              </h2>
            </Reveal>
            <Reveal stagger className="mt-10 space-y-8">
              {craft.values.map((v, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[auto_1fr] gap-5 border-t border-paper/15 pt-6"
                >
                  <span
                    className="font-display text-3xl leading-none"
                    style={{ color: craft.accent }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-paper">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-paper/70">
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quy trình — timeline văn bản kèm hai ảnh tạo tác */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Phương thức · Công đoạn"
              title="Từ nguyên liệu đến tác phẩm"
              description="Mỗi bước đều đòi hỏi sự tỉ mỉ và bàn tay lành nghề."
            />
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={img.taoTac.src}
                  alt={img.taoTac.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-[3/4] overflow-hidden">
                <Image
                  src={img.chamHoaVan.src}
                  alt={img.chamHoaVan.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
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
                  {/* max-w-xl + text-pretty: mô tả gọn 1 dòng khi đủ chỗ, không rơi chữ lẻ */}
                  <p className="mt-2 max-w-xl text-pretty text-sm leading-7 text-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Con người — ảnh nghệ nhân + lời kể */}
      <section
        className="border-y border-line py-20 sm:py-28"
        style={{ background: `${craft.accent}0a` }}
      >
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <Reveal>
            <div className="relative aspect-[5/4] w-full overflow-hidden shadow-[var(--shadow-card)]">
              <Image
                src={img.ngheNhan.src}
                alt={img.ngheNhan.alt}
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
              title="Tinh hoa nghề mộc"
              description="Từ cửa võng, nội thất đến đồ thờ — dấu ấn của người thợ Chàng Sơn hiện lên trong từng đường chạm."
            />
          </Reveal>

          <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(300px,1fr)]">
            <figure className="group relative aspect-[4/3] overflow-hidden sm:col-span-2 lg:col-span-7 lg:row-span-2 lg:min-h-[620px] lg:aspect-auto">
              <Image
                src={img.cuaVong.src}
                alt={img.cuaVong.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(20,12,6,0.78))] p-5 font-display text-lg text-paper">
                Cửa võng &amp; vách chạm thủng
              </figcaption>
            </figure>
            <figure className="group relative aspect-[3/4] overflow-hidden lg:col-span-5 lg:min-h-[300px] lg:aspect-auto">
              <Image
                src={img.lapDung.src}
                alt={img.lapDung.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(20,12,6,0.78))] p-5 font-display text-lg text-paper">
                Nội thất gỗ tại công trình
              </figcaption>
            </figure>
            <figure className="group relative aspect-[3/4] overflow-hidden lg:col-span-5 lg:min-h-[300px] lg:aspect-auto">
              <Image
                src={img.xuongMoc.src}
                alt={img.xuongMoc.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(20,12,6,0.78))] p-5 font-display text-lg text-paper">
                Xưởng mộc Chàng Sơn
              </figcaption>
            </figure>
          </Reveal>

          {/* Danh mục sản phẩm — dạng nhãn chữ, không card ảnh */}
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

      {/* Vị trí — chỉ chữ, không placeholder bản đồ */}
      <section className="border-t border-line bg-paper-2/40 py-16 sm:py-20">
        <Container className="grid gap-8 sm:grid-cols-[1.4fr_1fr] sm:items-end">
          <Reveal>
            <SectionHeading eyebrow="Vị trí" title="Nơi nghề được sinh ra" />
            <p className="mt-5 max-w-xl text-base leading-8 text-ink-soft">
              Nghề mộc gắn bó với làng nghề Chàng Sơn — vùng đất giàu truyền
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
