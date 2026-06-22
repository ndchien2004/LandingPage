import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";

const img = cloudinaryAssets.gioiThieu;

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Về làng nghề Chàng Sơn — lịch sử, bản sắc, con người và giá trị văn hóa của một vùng đất giàu truyền thống thủ công.",
};

const identity = [
  {
    title: "Lịch sử lâu đời",
    body: "Chàng Sơn là một trong những làng nghề truyền thống lâu đời của xứ Đoài, nổi tiếng với nghề làm quạt, nghề mộc và nhiều nghề thủ công tinh xảo khác.",
  },
  {
    title: "Bản sắc thủ công",
    body: "Mỗi sản phẩm của làng đều mang dấu ấn của bàn tay người thợ — sự tỉ mỉ, kiên nhẫn và một gu thẩm mỹ được truyền lại qua nhiều thế hệ.",
  },
  {
    title: "Con người giữ nghề",
    body: "Đằng sau danh tiếng của làng là những nghệ nhân lặng lẽ, gắn bó cả đời với nghề và xem việc giữ nghề như giữ lấy cội rễ của mình.",
  },
];

const facts = [
  { label: "Vị trí", value: "Thạch Thất, Hà Nội" },
  { label: "Nghề tiêu biểu", value: "Quạt · Mộc · Sơn · Tre" },
  { label: "Tinh thần", value: "Thủ công truyền thống" },
];

const history = [
  {
    era: "Khởi nguồn",
    title: "Một làng nghề của xứ Đoài",
    body: "Chàng Sơn hình thành và phát triển nghề thủ công từ rất sớm, trở thành một trong những làng nghề truyền thống tiêu biểu của vùng xứ Đoài.",
  },
  {
    era: "Hưng thịnh",
    title: "Tiếng lành vượt lũy tre làng",
    body: "Quạt, đồ gỗ và các sản phẩm thủ công của làng được biết đến rộng rãi, gắn với đời sống, lễ hội và sinh hoạt của nhiều vùng.",
  },
  {
    era: "Hôm nay",
    title: "Gìn giữ và tiếp nối",
    body: "Trước nhịp sống hiện đại, người Chàng Sơn vẫn bền bỉ giữ nghề, đồng thời tìm cách đưa sản phẩm đến gần hơn với công chúng.",
  },
];

export default function GioiThieuPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Giới thiệu" }]}
        eyebrow="Giới thiệu về làng"
        title="Làng nghề Chàng Sơn"
        subtitle="Một vùng đất nơi nghề thủ công không chỉ là sinh kế, mà là bản sắc, là ký ức và là niềm tự hào được trao truyền qua bao thế hệ."
      />

      {/* Ảnh chính — thủy đình, dải ảnh lớn tràn viền mở đầu trang */}
      <section className="relative h-[78vh] min-h-[460px] w-full overflow-hidden">
        <Image
          src={img.thuyDinh.src}
          alt={img.thuyDinh.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,12,6,0.16)_0%,transparent_42%,rgba(20,12,6,0.66)_100%)]" />
        <Container className="relative z-10 flex h-full items-end pb-10 sm:pb-14">
          <p className="max-w-lg text-sm leading-6 text-paper/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-base sm:leading-7">
            <span className="font-display text-lg text-paper sm:text-xl">
              Thủy đình làng Chàng Sơn
            </span>{" "}
            — biểu tượng soi bóng trên mặt hồ, nơi hội tụ tín ngưỡng, lễ hội và
            ký ức bao đời của người làng nghề.
          </p>
        </Container>
      </section>

      {/* Tổng quan */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal stagger>
            <SectionHeading
              eyebrow="Vùng đất & con người"
              title="Nơi gió mang theo hơi thở của nghề"
            />
            <div className="mt-6 space-y-5 text-base leading-8 text-ink-soft">
              <p>
                Nằm ở huyện Thạch Thất, Hà Nội, Chàng Sơn từ lâu đã được biết
                đến như một cái nôi của nghề thủ công truyền thống. Tiếng lành về
                những chiếc quạt, những công trình gỗ và sự khéo léo của người
                thợ nơi đây đã vượt ra khỏi lũy tre làng.
              </p>
              <p>
                Ở Chàng Sơn, nghề và đời gắn bó làm một. Nhịp sống của làng hòa
                cùng nhịp của nghề — từ tiếng chẻ tre, tiếng đục gỗ đến những
                ngày phơi quạt, ủ sơn. Tất cả tạo nên một không gian văn hóa
                sống động và bền bỉ.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/du-an">Tìm hiểu dự án Gió Từ Làng</Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] w-full overflow-hidden shadow-[var(--shadow-card)]">
              <Image
                src={img.duongLang.src}
                alt={img.duongLang.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Lịch sử */}
      <section className="border-t border-line bg-paper-2/40 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Lịch sử"
              title="Dòng chảy của một làng nghề"
              description="Từ thuở khởi nguồn đến hôm nay, nghề thủ công vẫn là mạch sống không dứt của Chàng Sơn."
            />
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {history.map((item, i) => (
              <div
                key={item.era}
                className="relative rounded-2xl border border-line bg-white/70 p-7"
              >
                <span className="font-display text-3xl text-son">0{i + 1}</span>
                <p className="mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-dat">
                  {item.era}
                </p>
                <h3 className="mt-1 font-display text-xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Di sản — ghép ảnh kiến trúc cổ */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Di sản"
              title="Dấu tích trăm năm"
              description="Những nếp nhà, mái đình và đường chạm cổ vẫn lặng lẽ kể câu chuyện về một làng nghề giàu truyền thống."
            />
          </Reveal>
          <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(280px,1fr)]">
            <figure className="group relative aspect-[4/3] overflow-hidden sm:col-span-2 lg:col-span-7 lg:row-span-2 lg:min-h-[580px] lg:aspect-auto">
              <Image
                src={img.nhaCo.src}
                alt={img.nhaCo.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(20,12,6,0.78))] p-5 font-display text-lg text-paper">
                Nếp nhà cổ giữa làng nghề
              </figcaption>
            </figure>
            <figure className="group relative aspect-[3/2] overflow-hidden lg:col-span-5 lg:min-h-[280px] lg:aspect-auto">
              <Image
                src={img.vanCoAnhLinh.src}
                alt={img.vanCoAnhLinh.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(20,12,6,0.78))] p-5 font-display text-lg text-paper">
                Đại tự “Vạn Cổ Anh Linh”
              </figcaption>
            </figure>
            <figure className="group relative aspect-[3/2] overflow-hidden lg:col-span-5 lg:min-h-[280px] lg:aspect-auto">
              <Image
                src={img.dauDao.src}
                alt={img.dauDao.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(20,12,6,0.78))] p-5 font-display text-lg text-paper">
                Đầu đao chạm khắc tinh xảo
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* Ý nghĩa tên gọi */}
      <section className="border-t border-line bg-paper-2/40 py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-[var(--shadow-card)]">
              <Image
                src={img.congDinh.src}
                alt={img.congDinh.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal stagger>
            <SectionHeading eyebrow="Ý nghĩa tên gọi" title="Vì sao là “Gió Từ Làng”" />
            <div className="mt-6 space-y-5 text-base leading-8 text-ink-soft">
              <p>
                “Gió” là hình ảnh gắn liền với chiếc quạt — sản phẩm tiêu biểu
                nhất của làng. Gió cũng là thứ vô hình nhưng lan tỏa, như cách
                câu chuyện làng nghề được truyền đi từ người này sang người khác.
              </p>
              <p>
                “Từ Làng” nhắc tới cội nguồn: mọi giá trị đều bắt đầu từ làng
                nghề Chàng Sơn, từ đôi bàn tay người thợ và nếp sống đã nuôi
                dưỡng nghề qua bao thế hệ.
              </p>
              <p>
                <span className="font-medium text-ink">Gió Từ Làng</span> vì thế
                là lời mời gọi: hãy để ngọn gió của làng nghề đưa bạn vào một
                hành trình khám phá quạt, mộc, sơn và tre.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Bản sắc */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Bản sắc"
              title="Điều làm nên Chàng Sơn"
              align="center"
            />
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {identity.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-line bg-white/70 p-7"
              >
                <h3 className="font-display text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Giá trị văn hóa + thông tin nhanh */}
      <section className="border-t border-line bg-paper-2/40 py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[5/6] w-full overflow-hidden shadow-[var(--shadow-card)]">
              <Image
                src={img.nguoiLang.src}
                alt={img.nguoiLang.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal stagger>
            <SectionHeading
              eyebrow="Giá trị văn hóa"
              title="Giữ nghề là giữ lấy cội rễ"
            />
            <p className="mt-6 text-base leading-8 text-ink-soft">
              Trong dòng chảy hiện đại, nhiều làng nghề đứng trước nguy cơ mai
              một. Việc gìn giữ và lan tỏa giá trị của làng nghề Chàng Sơn không
              chỉ là bảo tồn một nghề, mà là giữ lại một phần ký ức và bản sắc
              của văn hóa Việt.
            </p>
            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border border-line bg-white/70 p-4"
                >
                  <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-display text-base text-ink">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>
    </SiteShell>
  );
}
