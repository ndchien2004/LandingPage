/**
 * Bài viết tin tức — nội dung thật lấy từ file "Tin tức Web.docx" (bản
 * "Nội dung web được làm lại"), media lưu trên Cloudinary tại
 * GioTuLangLandingPage/articles/bai-N (upload bằng scripts/upload-article-assets.mjs).
 */

const imageBase = "https://res.cloudinary.com/dzwimbvjh/image/upload";
const videoBase = "https://res.cloudinary.com/dzwimbvjh/video/upload";
const assetRoot = "GioTuLangLandingPage/articles";

/** Ảnh bài viết: `cover` cắt khung 16/10 cho thẻ, `full` giữ nguyên tỉ lệ. */
function articleImage(bai: number, n: number, variant: "cover" | "full" = "full") {
  const transforms =
    variant === "cover" ? "f_auto,q_auto,c_fill,g_auto,w_1200,h_750" : "f_auto,q_auto,c_limit,w_1600";
  return `${imageBase}/${transforms}/${assetRoot}/bai-${bai}/anh-${n}.jpg`;
}

function articleVideo(bai: number) {
  return `${videoBase}/f_auto:video,q_auto/${assetRoot}/bai-${bai}/video.mp4`;
}

/** Poster (1 khung hình) trích từ video — dùng cho thẻ bài viết và thuộc tính poster. */
function articleVideoPoster(bai: number, variant: "cover" | "full" = "full") {
  const transforms =
    variant === "cover" ? "so_1,f_auto,q_auto,c_fill,g_auto,w_1200,h_750" : "so_1,f_auto,q_auto,w_1600";
  return `${videoBase}/${transforms}/${assetRoot}/bai-${bai}/video.jpg`;
}

export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string };

export type ArticleMediaImage = {
  src: string;
  alt: string;
};

export type Article = {
  slug: string;
  /** Tên ngắn hiển thị trên thẻ bài viết (theo danh sách tab nội dung). */
  title: string;
  /** Tiêu đề đầy đủ trên trang chi tiết. */
  headline: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  /** Ảnh đại diện cho thẻ (đã cắt khung 16/10). */
  image: string;
  /** Sapo — đoạn dẫn mở đầu bài. */
  lead: string;
  blocks: ArticleBlock[];
  gallery: ArticleMediaImage[];
  video?: { src: string; poster: string; portrait?: boolean };
  credit?: string;
};

export const articles: Article[] = [
  {
    slug: "quat-co-viet-nam-di-san-dang-bi-nham-lan",
    title: "Quạt cổ Việt Nam – Di sản đang bị nhầm lẫn",
    headline:
      "Định danh quạt cổ Việt Nam: Khi di sản văn hóa bị khuất lấp sau những lầm tưởng",
    excerpt:
      "Từng là biểu tượng cho thẩm mỹ và cốt cách của người xưa, quạt cổ Việt Nam ngày nay đối mặt với nguy cơ bị quên lãng hoặc nhầm lẫn với các quốc gia lân cận.",
    category: "Góc nhìn",
    date: "18 tháng 7, 2026",
    readingTime: "7 phút đọc",
    image: articleImage(3, 1, "cover"),
    lead:
      "Giữa dòng chảy giao thoa văn hóa Á Đông, chiếc quạt cổ Việt Nam dường như đang chịu một số phận thầm lặng. Từng là biểu tượng cho thẩm mỹ, cốt cách và tầng nấc tri thức của người xưa, di sản này ngày nay lại đối mặt với nguy cơ bị quên lãng hoặc nhầm lẫn với các quốc gia lân cận.",
    blocks: [
      {
        type: "paragraph",
        text: "Khi nhắc đến nghệ thuật làm quạt truyền thống, tâm thức của đại đa số công chúng hiện đại thường lập tức hướng về những chiếc quạt giấy xếp của Nhật Bản hay quạt lụa tròn của Trung Quốc. Sự phổ biến của truyền thông và phim ảnh cổ trang ngoại quốc đã vô tình tạo nên một định kiến rằng: Việt Nam không có một nền văn hóa quạt cổ độc lập và đặc sắc. Nhưng sự thật lịch sử lại chứng minh điều ngược lại. Nước Việt có một hành trình làm quạt kéo dài hàng thế kỷ, mang theo phế tích của thời gian và hơi thở của chiều sâu văn hiến.",
      },
      { type: "heading", text: "Giao thoa và bản sắc: Chiếc quạt Việt không tồn tại biệt lập" },
      {
        type: "paragraph",
        text: "Việc quạt cổ Việt Nam có những nét tương đồng với các quốc gia láng giềng là một thực tế lịch sử không thể phủ nhận. Nằm trong không gian văn hóa Đông Á, chiếc quạt Việt Nam là kết quả của quá trình giao thoa, tiếp biến văn hóa qua nhiều triều đại. Sự tương đồng về hình dáng hay một số kỹ nghệ cơ bản không đồng nghĩa với việc chúng ta là một bản sao mờ nhạt.",
      },
      {
        type: "paragraph",
        text: "Ngược lại, bản sắc của quạt Việt nằm ở cách các bậc tiền nhân nội hóa những giá trị ngoại nhập để phục vụ cho tâm hồn Việt. Từ chất liệu tre mộc mạc của làng quê, qua bàn tay gọt giũa tỉ mỉ của những người thợ thủ công, kết hợp với độ bền bỉ của giấy dó, chiếc quạt đã tự định hình một đời sống riêng. Thẩm mỹ của người Việt xưa không phô trương mà thấm đẫm sự tinh tế, thể hiện qua những nét vẽ phong cảnh sơn thủy hữu tình, những dòng thơ chữ Nôm ngợi ca khí tiết, hay chính những hình ảnh sinh hoạt bình dị của làng quê được khắc họa trên diện quạt.",
      },
      { type: "heading", text: "Từ vật dụng tạo gió đến chứng nhân của dòng chảy văn hóa" },
      {
        type: "paragraph",
        text: "Nếu chỉ nhìn chiếc quạt như một công cụ làm mát vật lý, chúng ta đã bỏ qua phần lớn giá trị di sản của nó. Trong lịch sử, quạt hiện diện ở mọi không gian sống của người Việt, từ chốn dân dã đến nơi cung đình tôn nghiêm. Nó là chiếc quạt lá cọ, quạt nan mộc mạc gắn liền với bóng mát cây đa, bến nước, là vật bất ly thân của người nông dân trong những trưa hè oi ả.",
      },
      {
        type: "paragraph",
        text: "Khi bước vào đời sống nghệ thuật và tinh thần, chiếc quạt trở thành một thực thể sống động. Người ta tìm thấy bóng dáng chiếc quạt trong các bức tranh dân gian Đông Hồ, Hàng Trống; thấy nó biến hóa kỳ ảo trong các điệu múa truyền thống, trở thành đạo cụ biểu đạt tâm lý sắc sảo trong nghệ thuật chèo, tuồng. Đối với giới nho sĩ xưa, chiếc quạt xếp không chỉ để đón gió, mà còn là vật dụng để gửi gắm chí hướng, thể hiện tư duy thẩm mỹ và học vấn của người cầm. Mỗi nếp gấp của nan quạt như một trang sách mở ra ký ức văn hóa của cả một thời đại.",
      },
      { type: "heading", text: "Lời giải cho bài toán định danh di sản giữa thời đại số" },
      {
        type: "paragraph",
        text: "Khi những thiết bị công nghệ hiện đại xuất hiện và thay thế hoàn toàn công năng vật lý của chiếc quạt tay, một khoảng trống ký ức đã vô tình lộ ra. Những giá trị văn hóa phi vật thể gắn liền với chiếc quạt dần lùi sâu vào bóng tối của lịch sử. Bi kịch lớn nhất của một di sản không phải là sự biến mất về mặt vật chất, mà là sự thờ ơ của thế hệ hậu sinh và sự nhầm lẫn về mặt nguồn gốc.",
      },
      {
        type: "paragraph",
        text: "Có những di sản được trang trọng lưu giữ trong tủ kính bảo tàng, nhưng cũng có những di sản từng nằm trong tay của biết bao thế hệ người Việt, lặng lẽ kể câu chuyện về lịch sử và bản sắc dân tộc qua từng nan tre, thớ giấy. Việc khôi phục nhận diện cho quạt cổ Việt Nam, đặc biệt là những làng nghề trăm năm như Chàng Sơn, không chỉ là câu chuyện bảo tồn một nghề thủ công, mà chính là hành trình định vị lại một mảnh ghép văn hóa bị đánh rơi trong tâm thức người Việt hiện đại.",
      },
    ],
    gallery: Array.from({ length: 10 }, (_, i) => ({
      src: articleImage(3, i + 1),
      alt: `Tư liệu quạt cổ Việt Nam — ảnh ${i + 1}`,
    })),
  },
  {
    slug: "gioi-thieu-nghe-lam-quat-co",
    title: "Giới thiệu nghề làm quạt cổ",
    headline:
      "Tấm căn cước của ngọn gió tự nhiên: Nhận diện hồn cốt Việt trong kỹ nghệ quạt cổ Chàng Sơn",
    excerpt:
      "Giữa thị trường tràn ngập sản phẩm công nghiệp, mỗi ngọn gió từ nan tre, nếp giấy xứ Đoài cần được trả lại tấm căn cước văn hóa nguyên bản của chính mình.",
    category: "Nghề quạt",
    date: "17 tháng 7, 2026",
    readingTime: "7 phút đọc",
    image: articleVideoPoster(4, "cover"),
    lead:
      "Giữa một thị trường tràn ngập những sản phẩm công nghiệp bóng bẩy và đại trà, việc định vị bản sắc cho chiếc quạt cổ Việt Nam trở thành một đòi hỏi cấp bách. Để di sản không bị hòa tan, mỗi ngọn gió được tạo ra từ nan tre, nếp giấy xứ Đoài cần phải được trả lại tấm căn cước văn hóa nguyên bản của chính mình.",
    blocks: [
      {
        type: "paragraph",
        text: "Khi cầm trên tay một chiếc quạt xếp, chúng ta đang thực sự nhìn thấy điều gì? Một món đồ lưu niệm xinh xắn, một công cụ làm mát truyền thống, hay một mảnh ghép ký ức đang mờ nhạt dần theo thời gian? Câu hỏi tưởng chừng đơn giản này lại đang phơi bày một thực trạng đáng suy ngẫm về cách công chúng hiện đại tiếp cận với các giá trị di sản.",
      },
      {
        type: "paragraph",
        text: "Sự bùng nổ của thương mại toàn cầu mang đến cho thị trường vô số mẫu quạt có vẻ ngoài bắt mắt, họa tiết rực rỡ, nhưng thực chất lại là sản phẩm được sản xuất công nghiệp hàng loạt từ nước ngoài. Do thiếu thông tin định hướng, không ít người Việt vô tình sử dụng những sản phẩm nhập khẩu này và lầm tưởng đó là nét đẹp truyền thống của dân tộc. Thực trạng lai căng ấy đặt ra một bài toán lớn: Làm thế nào để nhận diện và phân biệt được đâu là “hồn cốt” thực sự của một chiếc quạt cổ Việt Nam?",
      },
      { type: "heading", text: "Vẻ đẹp từ sự “tĩnh”: Đối thoại giữa thủ công và công nghiệp" },
      {
        type: "paragraph",
        text: "Khác biệt hoàn toàn với sự bóng bẩy, chính xác đến lạnh lùng của những chiếc quạt máy công nghiệp, quạt cổ Chàng Sơn mang một vẻ đẹp đặc trưng được bao bọc trong sự “tĩnh”. Đó là vẻ đẹp không phô trương, cần người thưởng thức phải chậm lại để cảm nhận thông qua ba yếu tố cốt lõi: chất liệu, kỹ nghệ họa hình và tâm tình của người thợ.",
      },
      {
        type: "paragraph",
        text: "Trước hết là sự kết hợp hài hòa giữa chất liệu tự nhiên và kỹ nghệ thủ công mộc mạc. Nan quạt Chàng Sơn phải được làm từ tre già, qua quá trình ngâm tẩm, vót tay tỉ mỉ để đạt đến độ dẻo dai lý tưởng, giúp quạt bền bỉ theo năm tháng mà không bị gãy vụn. Trên khung xương tre vững chãi ấy, người thợ tiến hành bồi giấy dó hoặc lụa theo phương pháp truyền thống. Giấy dó có đặc tính xốp, thấm mực tự nhiên, tạo nên một bề mặt thô rạp nhưng vô cùng thân thuộc, khác hẳn với lớp giấy in phủ bóng của hàng công nghiệp.",
      },
      {
        type: "paragraph",
        text: "Thứ hai, giá trị của quạt cổ Chàng Sơn nằm ở tính độc bản của họa tiết. Thay vì sử dụng công nghệ in ấn máy móc cho ra ngàn bản như một, mỗi chiếc quạt nghệ thuật tại đây là một bức họa được người nghệ nhân phóng bút từ tâm trí. Những điển tích lịch sử, phong cảnh thủy mặc hay những bức tranh dân gian hiện lên với những nét đậm, nét nhạt đầy ngẫu hứng. Chính sự không trùng lặp hoàn toàn này đã thổi hồn vào diện quạt, biến mỗi sản phẩm thành một tác phẩm nghệ thuật độc lập.",
      },
      { type: "heading", text: "Cái “Tình” gửi gắm trong một nghề kén khách" },
      {
        type: "paragraph",
        text: "Vượt lên trên các yếu tố kỹ thuật vật lý, tấm căn cước rõ ràng nhất của quạt cổ Việt Nam chính là cái “Tình” của người giữ lửa làng nghề. Nghề làm quạt Chàng Sơn hôm nay không còn là một sinh kế dễ dàng giữa thời đại của điều hòa và quạt điện. Đó đã trở thành một lựa chọn đầy kiên trì, một nghề kén cả người làm lẫn người chơi.",
      },
      {
        type: "paragraph",
        text: "Để hoàn thiện một tác phẩm, người nghệ nhân phải dành ra hàng chục năm tích lũy kinh nghiệm, đánh đổi bằng sự kiên nhẫn qua từng công đoạn nhỏ nhất. Mỗi chiếc quạt rời xưởng không chỉ mang theo công năng che nắng, tạo gió, mà còn chở che cả câu chuyện thăng trầm của một vùng đất bách nghệ, là nhân chứng cho sự thủy chung của con người với di sản của cha ông.",
      },
      { type: "heading", text: "Vượt qua giá trị lưu niệm đại trà để nâng niu di sản" },
      {
        type: "paragraph",
        text: "Nền văn hóa truyền thống của một quốc gia không nên và không thể bị thu hẹp lại thành những món quà lưu niệm sản xuất hàng loạt, thiếu bản sắc. Việc tìm kiếm và tôn vinh những giá trị nguyên bản của quạt cổ Chàng Sơn không đơn thuần là một hoạt động hoài cổ, mà là hành động thiết thực để bảo vệ chủ quyền văn hóa trong đời sống thường nhật.",
      },
      {
        type: "paragraph",
        text: "Thông qua chiến dịch “Gió từ Làng”, chúng tôi mong muốn khơi dậy niềm tự hào ẩn sâu trong tâm thức mỗi người đọc. Để từ đây, mỗi khi cầm trên tay chiếc quạt Chàng Sơn, ta không chỉ đón nhận một làn gió mát lành từ tự nhiên, mà còn biết rằng mình đang nâng niu, gìn giữ cả một dòng chảy di sản ngàn năm của dân tộc.",
      },
    ],
    gallery: [],
    video: { src: articleVideo(4), poster: articleVideoPoster(4) },
  },
  {
    slug: "chan-dung-nhan-vat",
    title: "Chân dung nhân vật",
    headline:
      "Ký sự người giữ lửa Chàng Sơn: Hành trình 33 năm để quay về đánh thức di sản",
    excerpt:
      "Câu chuyện của bà Nguyễn Thị Tuấn — minh chứng sống động cho thấy di sản không bao giờ mất đi, chúng chỉ tạm ngủ quên chờ một tấm lòng đủ nặng sâu đánh thức.",
    category: "Chân dung",
    date: "16 tháng 7, 2026",
    readingTime: "6 phút đọc",
    image: articleImage(5, 1, "cover"),
    lead:
      "Có những hành trình vạn dặm không đi theo đường thẳng, và có những người phải bước qua biết bao thăng trầm của cuộc đời mới đủ độ “chín” để quay về ôm lấy tình yêu thuở thiếu thời. Câu chuyện của bà Nguyễn Thị Tuấn là một minh chứng sống động cho thấy di sản văn hóa không bao giờ mất đi, chúng chỉ tạm ngủ quên để chờ một tấm lòng đủ nặng sâu đánh thức.",
    blocks: [
      { type: "heading", text: "Thời tuổi trẻ can trường và đốm lửa quê hương âm ỉ" },
      {
        type: "paragraph",
        text: "Năm 1977, khi vừa tròn 17 tuổi – độ tuổi rực rỡ nhất của đời người, cô gái trẻ Nguyễn Thị Tuấn quyết định rời làng quê Chàng Sơn để lên đường theo tiếng gọi của vùng kinh tế mới tại Bảo Lộc. Đó là những năm tháng thanh xuân đối mặt với cảnh rừng thiêng nước độc, với những bát canh lá rừng chan vội hạt bo bo. Nhưng trong gian khó, lý tưởng của một người thanh niên xung phong vẫn luôn cháy bỏng trong huyết quản.",
      },
      {
        type: "paragraph",
        text: "Sau những ngày tháng cống hiến cho vùng đất mới, bà rẽ hướng sang làm cô giáo mầm non, rồi tham gia công tác hội tại địa phương. Cuộc sống cuốn đi với bao lo toan thường nhật, nhưng có một điều chưa từng thay đổi trong tâm thức người con xứ Đoài: tình yêu với những nan tre, mảnh giấy quạt quê hương. Ký ức về tiếng lạch cạch chẻ nan, mùi hồ dán nồng ấm của quê nhà vẫn âm ỉ như một đốm lửa nhỏ, kiên nhẫn chờ ngày bùng cháy.",
      },
      { type: "heading", text: "Tuổi năm mươi và quyết định hồi sinh nghề tổ" },
      {
        type: "paragraph",
        text: "Phải đến năm 2010, khi đã bước sang tuổi 50 – cái tuổi mà nhiều người chọn nghỉ ngơi, bà Nguyễn Thị Tuấn mới chính thức bắt tay vào hành trình khôi phục nghề làm quạt truyền thống của dòng họ. Động lực đằng sau quyết định bước ngoặt ấy thật giản đơn nhưng cũng đầy khắc khoải:",
      },
      {
        type: "quote",
        text: "Tôi không đành lòng nhìn sản phẩm đã gắn bó với mình từ tấm bé, thứ đã nuôi lớn tâm hồn tôi, đang dần mai một theo thời gian.",
      },
      {
        type: "paragraph",
        text: "Trở lại với nghề sau hơn ba mươi năm xa cách, bà bắt đầu lại từ những công việc mộc mạc nhất. Từ việc lặn lội chọn từng cây tre già đủ tuổi, ngâm tẩm kỹ lưỡng để chống mối mọt, cho đến việc phơi nắng sao cho nan tre đạt độ dẻo lý tưởng.",
      },
      {
        type: "paragraph",
        text: "Đặc biệt, bằng trí nhớ và sự chỉ dạy của các bậc tiền bối, bà đã tái hiện lại một trong những bí quyết đỉnh cao của kỹ nghệ làm quạt cổ Chàng Sơn: quy tắc “trong mười ngoài chín”.",
      },
      {
        type: "paragraph",
        text: "Đây là kỹ thuật chuốt nan quạt sao cho phần cán dày dặn, cứng cáp, nhưng mỏng dần một cách tinh tế về phía đầu nan. Sự phân bổ độ dày này giúp chiếc quạt khi xòe ra hay gập lại đều đạt được sự nhịp nhàng, thanh thoát, như thể món đồ vật vô tri ấy biết “thở” theo từng nhịp chuyển động của bàn tay người thưởng thức. Đó là sự tỉ mỉ, kiên nhẫn tối thượng mà chỉ một người đã chờ đợi, chắt chiu suốt 33 năm mới có thể thấu cảm và thực hiện trọn vẹn.",
      },
      { type: "heading", text: "Khi di sản được nuôi dưỡng bằng thời gian và lòng kiên định" },
      {
        type: "paragraph",
        text: "Những chiếc quạt giấy qua bàn tay của bà Nguyễn Thị Tuấn có một đời sống rất riêng. Chúng không phải là những sản phẩm được ép tiến độ để bán ra thị trường, mà là những tác phẩm được thời gian “nuôi dưỡng”. Mỗi chiếc quạt là sự kết tinh của nguồn nguyên liệu thuần khiết từ lòng đất mẹ, bàn tay tỉ mỉ của người thợ lành nghề và trên hết là một tấm lòng kiên định với di sản dân tộc.",
      },
      {
        type: "paragraph",
        text: "Nhìn những nếp quạt bóng đẹp, lên màu trầm mặc theo thời gian, người ta chợt nhận ra giá trị vĩnh cửu của những điều tử tế được gìn giữ qua nhiều thế hệ. Câu chuyện của bà Tuấn không chỉ là chân dung của một người thợ thủ công, mà là biểu tượng cho sức sống bền bỉ của văn hóa làng nghề Chàng Sơn – nơi dòng chảy di sản vẫn lặng lẽ chảy qua các thế hệ, bất chấp sự đào thải nghiệt ngã của thời gian.",
      },
    ],
    gallery: [
      { src: articleImage(5, 1), alt: "Chân dung nghệ nhân Nguyễn Thị Tuấn bên những chiếc quạt Chàng Sơn" },
    ],
  },
  {
    slug: "noi-tran-tro-sau-nhung-canh-quat-chang-son",
    title: "Nỗi trăn trở sau những cánh quạt Chàng Sơn",
    headline:
      "Nỗi trăn trở sau những cánh quạt Chàng Sơn: Khi linh hồn di sản bị thử thách trước áp lực thời cuộc",
    excerpt:
      "Những người giữ lửa như bà Nguyễn Thị Tuấn ngày ngày lặng lẽ chuốt từng nan tre, đối mặt với nỗi trăn trở về sự sống còn của một phần hồn cốt dân tộc.",
    category: "Trăn trở",
    date: "15 tháng 7, 2026",
    readingTime: "7 phút đọc",
    image: articleImage(6, 1, "cover"),
    lead:
      "Trong dòng chảy hối hả của kỷ nguyên số và sản xuất công nghiệp, làng nghề Chàng Sơn vẫn có những góc nhỏ nơi thời gian như ngừng lại. Ở đó, những người giữ lửa như bà Nguyễn Thị Tuấn ngày ngày lặng lẽ chuốt từng nan tre, bồi từng nếp giấy. Hành trình ấy không chỉ để giữ một nghề xưa, mà còn là sự đối mặt với nỗi trăn trở đau đáu về sự sống còn của một phần hồn cốt dân tộc trước làn sóng thị trường.",
    blocks: [
      { type: "heading", text: "Kỹ nghệ từ sự kiên nhẫn: Khi thời gian làm nên độ mịn của di sản" },
      {
        type: "paragraph",
        text: "Đối với những nghệ nhân nặng lòng với Chàng Sơn, linh hồn của một chiếc quạt cổ chưa bao giờ được đo đếm bằng số lượng sản xuất ra mỗi ngày, mà nằm ở độ tinh tế và hàm lượng kiên nhẫn kết tinh trong đó. Để một sản phẩm đạt đến độ chuẩn mực của quạt xứ Đoài, quy trình chuẩn bị nguyên liệu đòi hỏi một sự nghiêm cẩn gần như tuyệt đối.",
      },
      {
        type: "paragraph",
        text: "Tre làm nan phải là loại tre già chọn lọc, được đem ngâm kỹ dưới nước ít nhất một năm trời. Quá trình ngâm tẩm dài đằng đẵng này là bí quyết tự nhiên để loại bỏ hoàn toàn nguy cơ mối mọt, đồng thời tăng độ dẻo dai cho thớ gỗ. Sau đó, nan tre phải được phơi dưới cái nắng tự nhiên của trời đất để đạt được màu trắng ngần, thanh khiết.",
      },
      {
        type: "paragraph",
        text: "Chính quy trình kỳ công và nghiêm ngặt ấy đã tạo nên độ nhẵn mịn đặc trưng cho quạt Chàng Sơn. Điều làm nên sự khác biệt cốt lõi là những chiếc quạt cổ càng dùng sẽ càng bóng mịn theo thời gian. Sự bóng bẩy ấy không đến từ các hóa chất tạo bóng hay máy móc công nghiệp, mà được mài dũa một cách tự nhiên từ chính hơi ấm của bàn tay người nghệ nhân khi chế tác và cái chạm đầy trân trọng của người thưởng thức.",
      },
      { type: "heading", text: "Nghịch lý tốc độ và nỗi lo hoen ố giá trị nguyên bản" },
      {
        type: "paragraph",
        text: "Tuy nhiên, đằng sau vẻ đẹp trầm mặc của những cánh quạt là một nỗi lo canh cánh của những người làm nghề chân chính. Khi thị trường hiện đại vận hành theo quy luật của tốc độ và giá thành, áp lực thương mại đã vô tình đẩy nhiều cơ sở sản xuất vào cuộc đua rút ngắn quy trình.",
      },
      {
        type: "paragraph",
        text: "Một chiếc quạt làm vội, làm ẩu bằng máy móc có thể dễ dàng sao chép lại hình dáng bên ngoài của những mẫu quạt xưa, nhưng nó hoàn toàn trống rỗng về mặt giá trị bên trong.",
      },
      {
        type: "quote",
        text: "Tôi không sợ nghề làm quạt bị biến mất, tôi chỉ trăn trở khi những giá trị tinh túy nhất – sự tỉ mỉ, lòng kiên nhẫn và tính chính xác của thủ công – bị đánh đổi vì lợi nhuận.",
      },
      {
        type: "paragraph",
        text: "Khi cái tâm của người thợ bị khuất lấp bởi sản lượng, chiếc quạt dù có mang hình dáng cổ xưa đến đâu thì cũng chỉ là một thứ vỏ bọc vô hồn, không còn giữ được cái thần thái, cái linh hồn mà các bậc tiền nhân đã dày công để lại. Đó là bi kịch mang tên “lãng quên ngay trên chính quê hương của di sản”.",
      },
      { type: "heading", text: "Lựa chọn “chậm mà chắc” để gìn giữ ký ức văn hóa" },
      {
        type: "paragraph",
        text: "Giữa dòng chảy cuồn cuộn của thời đại, việc kiên trì lựa chọn những công đoạn thủ công “chậm mà chắc” giống như một lối đi ngược dòng đầy dũng cảm. Đối với những người thợ lành nghề tại Chàng Sơn, sự kiên trì này không phải là sự bảo thủ, mà là cách duy nhất để họ bảo vệ và lưu giữ một phần ký ức văn hóa của dân tộc.",
      },
      {
        type: "paragraph",
        text: "Họ chấp nhận dành nhiều thời gian hơn, chịu cực nhọc hơn để mỗi khi một người lật mở cánh quạt Chàng Sơn, họ không chỉ đón nhận một làn gió mát vật lý, mà còn có thể cảm nhận được hơi thở chân thực của một làng nghề trăm năm, thấy được dáng hình của lịch sử hiện hữu trên từng đường gân của nan tre.",
      },
      {
        type: "paragraph",
        text: "Di sản văn hóa phi vật thể không đơn thuần nằm ở sản phẩm cuối cùng được bày bán, mà nó nằm ở hành trình văn hóa, ở cách chúng ta trân trọng từng giọt mồ hôi và sự nhẫn nại tạo nên nó. Giữ gìn và bảo tồn nghề cũ theo đúng giá trị nguyên bản của nó chính là cách nuôi dưỡng cho tâm hồn người Việt luôn tìm thấy một khoảng lặng dịu mát, bình yên giữa những bộn bề của cuộc sống hiện đại.",
      },
    ],
    gallery: [1, 2, 3].map((n) => ({
      src: articleImage(6, n),
      alt: `Nghệ nhân Chàng Sơn bên những cánh quạt — ảnh ${n}`,
    })),
  },
  {
    slug: "chi-tiet-tham-my",
    title: "Chi tiết thẩm mỹ",
    headline:
      "Giải mã ngôn ngữ thẩm mỹ của quạt cổ Chàng Sơn: Khi di sản cất lời từ kỹ nghệ thủ công",
    excerpt:
      "Đằng sau lớp nan tre thanh mảnh và bề mặt giấy dó trầm mặc là cả một hệ thống ngôn ngữ thẩm mỹ, tư duy phong thủy và triết lý nhân sinh.",
    category: "Thẩm mỹ",
    date: "14 tháng 7, 2026",
    readingTime: "6 phút đọc",
    image: articleImage(7, 1, "cover"),
    lead:
      "Không đơn thuần là một công cụ làm mát vật lý, mỗi chiếc quạt cổ Chàng Sơn được ví như một tác phẩm nghệ thuật thu nhỏ. Đằng sau lớp nan tre thanh mảnh và bề mặt giấy dó trầm mặc là cả một hệ thống ngôn ngữ thẩm mỹ, tư duy phong thủy và triết lý nhân sinh được người nghệ nhân gửi gắm qua từng chi tiết nhỏ nhất.",
    blocks: [
      { type: "heading", text: "Bộ khung xương xứ Đoài: Khi thớ tre mang dấu ấn của thời gian" },
      {
        type: "paragraph",
        text: "Để hiểu được cái thần của một chiếc quạt truyền thống, trước hết phải nhìn vào phần khung xương – nền tảng định hình nên toàn bộ tác phẩm. Khác với các chất liệu hiện đại như nhựa hay gỗ ép công nghiệp vốn đồng đều một cách vô cảm, nan quạt Chàng Sơn được chế tác hoàn toàn từ những thanh tre già dẻo dai.",
      },
      {
        type: "paragraph",
        text: "Qua đôi bàn tay gọt giũa tỉ mỉ của người thợ lành nghề, mỗi nan tre đạt đến độ thanh mảnh tối đa nhưng vẫn giữ được sự chắc chắn, vững chãi dưới áp lực của những nhịp xòe gập liên tục.",
      },
      {
        type: "paragraph",
        text: "Giá trị độc đáo nhất của chất liệu tre tự nhiên nằm ở khả năng “thời gian hóa”. Theo năm tháng sử dụng, sự tương tác giữa hơi ấm bàn tay người và độ ẩm không khí sẽ khiến màu tre ngả dần sang tông màu trầm ấm, bóng mịn. Đây là thứ vẻ đẹp của sự trưởng thành và cổ kính, một thứ ngôn ngữ thị giác tự nhiên mà không một công nghệ tạo màu nhân tạo nào có thể mô phỏng được.",
      },
      { type: "heading", text: "Nét cọ độc bản: Bản ngã của người nghệ nhân trên diện quạt" },
      {
        type: "paragraph",
        text: "Nếu nan tre là phần cốt cách thì những nét vẽ trên diện quạt chính là phần linh hồn. Trên nền giấy dó xốp nhẹ hoặc lớp vải lụa mềm mại, họa tiết của quạt cổ Chàng Sơn hiện lên như một thế giới nghệ thuật đầy sống động. Đó có thể là bức tranh sơn thủy hữu tình, phong cảnh làng quê Việt bình yên với cây đa, bến nước, hay các bộ tranh tứ quý tùng - cúc - trúc - mai mang tính kinh điển.",
      },
      {
        type: "paragraph",
        text: "Điểm mấu chốt làm nên giá trị của quạt nghệ thuật Chàng Sơn chính là tính độc bản. Vì được vẽ tay hoàn toàn, mỗi đường đi của ngọn cọ đều là sự kết tinh của cảm xúc và năng lượng tại thời điểm chế tác.",
      },
      {
        type: "paragraph",
        text: "Độ đậm nhạt của mực, sự thanh mảnh hay phóng khoáng của nét vẽ hoàn toàn phụ thuộc vào lực tay và sự rung động của người nghệ nhân. Những nét cọ ngẫu hứng nhưng đầy chuẩn xác ấy chính là một dạng “chữ ký ẩn”, khẳng định quyền sở hữu trí tuệ và giá trị nghệ thuật độc duy của tác phẩm, điều mà các công nghệ in ấn hàng loạt trơn láng không bao giờ chạm tới được.",
      },
      { type: "heading", text: "Triết lý phong thủy và thông điệp văn hóa ẩn tàng" },
      {
        type: "paragraph",
        text: "Trong tâm thức của người Việt xưa, chiếc quạt xếp không dừng lại ở công năng sử dụng mà còn là một vật phẩm mang tính biểu tượng cao. Việc lựa chọn các họa tiết để thể hiện trên diện quạt luôn tuân theo những quy luật thẩm mỹ và phong thủy nghiêm ngặt của văn hóa Á Đông.",
      },
      {
        type: "paragraph",
        text: "Mỗi hình ảnh được khắc họa đều mang một hàm ý cát tường. Bức tranh tùng hạc tượng trưng cho sự trường thọ; cảnh sắc giang sơn biểu thị cho chí hướng bao la; hay hình ảnh hoa mai, hoa cúc lại gửi gắm ước vọng về sự an khang, thịnh vượng. Khi người xưa cầm chiếc quạt trên tay, hành động xòe quạt ra không chỉ để đón nhận ngọn gió mát lành, mà còn là một nghi thức tinh tế để chiêu tài, tụ khí, cầu mong vượng khí và sự bình an cho không gian sống.",
      },
      {
        type: "paragraph",
        text: "Vẻ đẹp của quạt cổ Chàng Sơn không nằm ở sự sặc sỡ, phô trương của màu sắc, mà ẩn hiện trong sự tĩnh tại, sâu sắc của chiều sâu văn hóa. Giữa nhịp sống hối hả hôm nay, việc lật mở một chiếc quạt giấy, chậm rãi ngắm nhìn những đường nét vẽ tay tỉ mỉ chính là một cách để chúng ta kết nối lại với tư duy thẩm mỹ tinh tế của cha ông, đồng thời nhận ra giá trị của những di sản đang lặng lẽ làm đẹp cho đời.",
      },
    ],
    gallery: [1, 2, 3, 4, 5, 6].map((n) => ({
      src: articleImage(7, n),
      alt: `Chi tiết thẩm mỹ trên quạt cổ Chàng Sơn — ảnh ${n}`,
    })),
    credit: "Nguồn hình ảnh: Dự án Gió từ Làng, Quạt Chàng Sơn và tư liệu sưu tầm.",
  },
  {
    slug: "chiec-quat-cuoi-cung-ban-cam-tren-tay",
    title: "Chiếc quạt cuối cùng bạn cầm trên tay là khi nào?",
    headline:
      "Khoảng lặng sau những cánh quạt tay: Đi tìm miền ký ức bị đánh mất giữa thời đại công nghệ",
    excerpt:
      "Giữa hơi lạnh điều hòa và sự tiện nghi của quạt điện, chiếc quạt tay truyền thống đang lùi dần vào hoài niệm, để lại một khoảng trống ký ức trong nhiều thế hệ.",
    category: "Ký ức",
    date: "13 tháng 7, 2026",
    readingTime: "5 phút đọc",
    image: articleImage(8, 1, "cover"),
    lead:
      "Đã bao lâu rồi bạn không còn cầm trên tay một chiếc quạt nan hay quạt giấy mộc mạc? Giữa nhịp sống hối hả được bao bọc bởi hơi lạnh của máy điều hòa và sự tiện nghi của quạt điện, chiếc quạt tay truyền thống dường như đang lùi sâu vào bóng tối của hoài niệm, để lại một khoảng trống ký ức trong tâm thức của nhiều thế hệ người Việt.",
    blocks: [
      { type: "heading", text: "Mảnh ghép bình dị trong dòng chảy đời sống xưa" },
      {
        type: "paragraph",
        text: "Đối với những người trưởng thành ở các thập niên trước, chiếc quạt tay không đơn thuần là một vật dụng làm mát, mà là một chứng nhân hiện diện trong mọi ngóc ngách của đời sống thường nhật. Có một thời, hình ảnh chiếc quạt nan treo lơ lửng nơi hiên nhà, đặt vội bên mâm cơm trưa oi ả, hay nằm gọn trong chiếc làn đi chợ của bà đã trở nên quen thuộc như hơi thở.",
      },
      {
        type: "paragraph",
        text: "Đó là những đêm hè oi bức của những ngày đất nước còn gian khó, những khi tiếng còi báo mất điện vang lên cũng là lúc những cánh quạt tay bắt đầu nhịp nhàng chuyển động. Làn gió mát lành từ đôi bàn tay hao gầy của mẹ, của bà đã đưa biết bao đứa trẻ vào giấc ngủ say nồng. Tiếng sột soạt nhẹ nhàng của nếp giấy, nếp nan khi ấy không chỉ xua đi cái nóng gay gắt của thời tiết, mà còn là sợi dây kết nối vô hình, đong đầy tình yêu thương và sự chở che của gia đình.",
      },
      { type: "heading", text: "Khi công nghệ khỏa lấp những giá trị vô hình" },
      {
        type: "paragraph",
        text: "Bước vào kỷ nguyên số, khi các thiết bị công nghệ hiện đại trở nên phổ biến và thay thế hoàn toàn công năng vật lý của các sản phẩm thủ công, chiếc quạt tay dần mất đi chỗ đứng. Nó không còn là vật bất ly thân của người dân mỗi khi mùa hè tới. Sự tiện nghi, nhanh chóng và mát lạnh của máy điều hòa nhiệt độ đã vô tình đẩy chiếc quạt truyền thống trở thành một cổ vật của quá khứ, một hình ảnh viễn xứ chỉ còn hiển hiện trong ký ức của những người hoài cổ.",
      },
      {
        type: "paragraph",
        text: "Tuy nhiên, sự thay thế về mặt vật lý này lại kéo theo một nguy cơ lớn hơn: sự đứt gãy của ký ức văn hóa. Khi thế hệ trẻ lớn lên trong những căn phòng khép kín với hơi mát nhân tạo, họ mất đi cơ hội được trải nghiệm cái chạm mộc mạc của tre già, mất đi cảm giác chờ đợi ngọn gió tự nhiên và thiếu vắng những câu chuyện kể bên hiên nhà gắn liền với chiếc quạt xưa. Những giá trị tinh thần thiêng liêng ấy là điều mà không một công nghệ hiện đại nào có thể tái tạo được.",
      },
      { type: "heading", text: "Chạm vào nan quạt để đánh thức bản ngã văn hóa" },
      {
        type: "paragraph",
        text: "Dù đã lâu không còn xuất hiện phổ biến, nhưng sức sống của chiếc quạt tay truyền thống chưa bao giờ thực sự lụi tàn. Chỉ cần vô tình bắt gặp một chiếc quạt nan xứ Đoài hay một chiếc quạt giấy Chàng Sơn, miền ký ức của những ngày hè năm ấy lại ngay lập tức ùa về trong tâm trí của mỗi người. Nó chứng minh rằng, những giá trị nguyên bản và tử tế luôn có một vị trí trang trọng trong lòng công chúng, chỉ cần có một cơ hội để khơi gợi và thức tỉnh.",
      },
      {
        type: "paragraph",
        text: "Với bạn, chiếc quạt tay ấy gắn liền với kỷ niệm, gương mặt hay khoảng thời gian thiêng liêng nào trong đời?",
      },
      {
        type: "paragraph",
        text: "Thông qua chiến dịch “Gió từ Làng”, chúng tôi không chỉ muốn giới thiệu một sản phẩm thủ công mỹ nghệ, mà muốn cùng độc giả dừng lại một nhịp giữa bộn bề cuộc sống, tìm về những giá trị nguyên bản nhất. Hãy cùng chúng tôi chia sẻ và nâng niu những câu chuyện ký ức, để ngọn gió từ làng nghề Chàng Sơn tiếp tục thổi mát tâm hồn người Việt hôm nay và mai sau.",
      },
    ],
    gallery: [{ src: articleImage(8, 1), alt: "Chiếc quạt nan gợi nhớ ký ức những ngày hè xưa" }],
  },
  {
    slug: "chiec-quat-va-loi-ru",
    title: "Chiếc quạt và lời ru",
    headline:
      "Chiếc quạt nan và lời ru của bà: Nơi ngọn gió thủ công chuyên chở tình yêu thương thầm lặng",
    excerpt:
      "Chiếc quạt thủ công không chỉ là vật dụng sinh hoạt mộc mạc, mà là biểu tượng của tình yêu thương thầm lặng, dệt nên những mảng màu bình yên nhất trong tâm hồn mỗi người.",
    category: "Ký ức",
    date: "12 tháng 7, 2026",
    readingTime: "5 phút đọc",
    image: articleVideoPoster(9, "cover"),
    lead:
      "Trong ký ức của nhiều thế hệ người Việt, tuổi thơ không gắn liền với những căn phòng điều hòa khép kín, mà là những buổi trưa hè rực nắng, nơi cái oi nồng được xua tan bởi nhịp quạt nan đều đặn và tiếng ê a lời ru của bà. Chiếc quạt thủ công, vì thế, không chỉ là một vật dụng sinh hoạt mộc mạc, mà đã trở thành biểu tượng của tình yêu thương thầm lặng, dệt nên những mảng màu bình yên nhất trong tâm hồn mỗi người.",
    blocks: [
      { type: "heading", text: "Nhịp đưa của đôi bàn tay và những yêu thương không lời" },
      {
        type: "paragraph",
        text: "Có những thứ tình cảm thiêng liêng trên thế giới này vốn chẳng cần đến những lời hoa mỹ để bày tỏ. Nó ẩn hiện trong sự chu đáo, trong sự hy sinh thầm lặng của những người phụ nữ Việt Nam qua nhiều thế hệ. Hãy ngược dòng thời gian trở về với những buổi trưa hè của nhiều thập niên trước, khi bóng nắng đổ dài trên khoảng sân gạch và cái nóng hầm hập như bủa vây lấy vạn vật. Trong không gian oi bức ấy, hình ảnh người bà ngồi bên cánh võng, tay cầm chiếc quạt nan mộc mạc, nhịp nhàng đưa gió cho đứa cháu thơ say ngủ đã trở thành một nét chạm khắc sâu đậm vào tâm thức của biết bao người.",
      },
      {
        type: "paragraph",
        text: "Bà quạt qua những ngày nắng gắt, quạt qua cả những đêm hè oi bức hay những buổi mất điện đột ngột giữa đêm. Từng nhịp quạt của bà mang theo làn gió mát lành tự nhiên, không chỉ xua đi những giọt mồ hôi lấm tấm trên trán trẻ thơ, mà còn đưa đứa cháu vào một thế giới tuổi thơ đầy ắp sự chở che. Nhịp quạt ấy hòa quyện cùng tiếng võng lạch cạch, cùng lời ru ngọt ngào mang dáng dấp của ca dao, tục ngữ. Chiếc quạt nan được làm từ tre nứa của những làng nghề truyền thống, qua bàn tay bà, đã trở thành một nhạc cụ thầm lặng, đệm nhịp cho bài ca yêu thương đi suốt cuộc đời mỗi con người.",
      },
      { type: "heading", text: "Đi qua giông bão cuộc đời, tìm về ngọn gió bình yên xưa" },
      {
        type: "paragraph",
        text: "Nhiều năm tháng trôi qua, những đứa trẻ năm ấy giờ đã trưởng thành, cuốn vào vòng xoáy của công việc, của sự hiện đại và những tiện nghi công nghệ. Chúng ta dần quen với hơi lạnh công nghiệp từ những chiếc điều hòa, quen với sự chính xác, mạnh mẽ của những chiếc quạt máy. Thế nhưng, giữa chốn thị thành phồn hoa, đôi khi chỉ cần tình cờ bắt gặp lại dáng hình một chiếc quạt nan truyền thống, một luồng ký ức mãnh liệt bỗng chốc được đánh thức trong lòng mỗi người hành hương về quá khứ.",
      },
      {
        type: "paragraph",
        text: "Tiếng sột soạt nhẹ nhàng của nếp tre, mùi thơm hoai hoải của nắng và thớ nan già như một chiếc chìa khóa vạn năng, mở toang cánh cửa dẫn về miền ký ức xa xôi. Người ta chợt nhớ về dáng ngồi gầy guộc của bà, nhớ về những trưa hè nắng cháy và cả một khoảng trời bình yên tưởng chừng đã đánh mất giữa những bộn bề cuộc sống. Chiếc quạt nan khi ấy không còn là một món đồ thủ công đơn thuần, nó là hiện thân của hoài niệm, là sợi dây tình cảm kết nối con người hiện đại với những giá trị cội nguồn thiêng liêng và nguyên bản nhất.",
      },
      { type: "heading", text: "Gìn giữ nghề xưa là bảo tồn dòng chảy ký ức dân tộc" },
      {
        type: "paragraph",
        text: "Việc những dự án văn hóa như “Gió từ Làng” nỗ lực bảo tồn và lan tỏa giá trị của làng nghề quạt truyền thống Chàng Sơn không chỉ dừng lại ở khía cạnh vật chất hay thương mại. Đó còn là hành trình gìn giữ những “chất xúc tác” của ký ức dân tộc. Nếu những chiếc quạt nan, quạt giấy biến mất hoàn toàn trong đời sống thường nhật, thế hệ mai sau sẽ chỉ có thể hình dung về lời ru của bà, về ngọn gió tình thân qua những trang sách lịch sử hay những thước phim tư liệu mờ nhạt.",
      },
      {
        type: "paragraph",
        text: "Bảo tồn một làng nghề trăm năm như Chàng Sơn chính là giữ lại chiếc neo ký ức cho tâm hồn người Việt. Để giữa những hối hả, lo toan và áp lực của kỷ nguyên số, mỗi khi cầm trên tay cánh quạt truyền thống, chúng ta lại được vỗ về bởi ngọn gió mát lành của tình thân, được nhắc nhở về một lối sống tử tế, giàu tình cảm mà cha ông đã dày công truyền lại qua bao đời.",
      },
    ],
    gallery: [],
    video: { src: articleVideo(9), poster: articleVideoPoster(9), portrait: true },
    credit: "Video: Tiên Đồng Hội Quạt.",
  },
  {
    slug: "chiec-quat-trong-doi-song-nguoi-viet",
    title: "Chiếc quạt đã hiện diện trong đời sống người Việt như thế nào?",
    headline:
      "Chiếc quạt tay trong đời sống người Việt: Từ vật dụng sinh hoạt đến chứng nhân văn hóa di sản",
    excerpt:
      "Qua thăng trầm lịch sử, giá trị của chiếc quạt tay đã vượt thoát khỏi công năng làm mát thuần túy để trở thành nơi trú ngụ của ký ức, nếp sống và bản sắc văn hóa dân tộc.",
    category: "Đời sống",
    date: "11 tháng 7, 2026",
    readingTime: "6 phút đọc",
    image: articleImage(10, 1, "cover"),
    lead:
      "Trước khi các thiết bị công nghệ hiện đại định hình lại lối sống của con người, chiếc quạt tay từng là một thực thể không thể tách rời trong mọi không gian sinh hoạt của người Việt. Qua thăng trầm lịch sử, giá trị của vật dụng mộc mạc này đã vượt thoát khỏi công năng làm mát thuần túy để trở thành nơi trú ngụ của ký ức, nếp sống và bản sắc văn hóa dân tộc.",
    blocks: [
      { type: "heading", text: "Sự hiện diện phổ quát trong mọi không gian sống xứ sở" },
      {
        type: "paragraph",
        text: "Trong cấu trúc đời sống cổ truyền của người Việt, chiếc quạt tay sở hữu một vị trí đặc biệt nhờ tính phổ quát của nó. Khi những tiện nghi về điện năng còn là điều xa xỉ, chiếc quạt xuất hiện như một giải pháp tự nhiên và gần gũi nhất để con người đối thoại với cái nóng gay gắt của khí hậu nhiệt đới. Vật dụng này không phân biệt giai tầng, có mặt ở khắp mọi nơi, từ chốn cung đình nghiêm cẩn cho đến những nếp nhà tranh nghèo xơ xác.",
      },
      {
        type: "paragraph",
        text: "Người ta có thể dễ dàng bắt gặp dáng hình chiếc quạt chuyển động nhịp nhàng trong những khoảnh khắc bình dị nhất của một ngày: bên mâm cơm gia đình rộn rã tiếng cười sau giờ lao động, trong những giấc ngủ trưa chập chờn của trẻ thơ, hay trên tay các bậc lão niên ngồi đàm đạo nơi quán nước cây đa đầu làng. Không dừng lại ở không gian riêng tư, chiếc quạt còn bước ra không gian cộng đồng, hiện diện nơi sân đình cổ kính trong các buổi sinh hoạt hội hè, trở thành một thứ đạo cụ giao tiếp tự nhiên, kết nối những con người trong cùng một làng xã. Chính sự hiện diện bền bỉ, lặng lẽ ấy đã biến chiếc quạt thành một chứng nhân thầm lặng cho nhịp sống đời thường của nhiều thế hệ.",
      },
      { type: "heading", text: "Sự dịch chuyển giá trị: Khi công năng nhường chỗ cho ký ức" },
      {
        type: "paragraph",
        text: "Theo sự phát triển tất yếu của lịch sử và công nghệ, vị thế của chiếc quạt tay trong đời sống hiện đại đã có những thay đổi căn bản. Khi những chiếc quạt điện, máy điều hòa không khí trở nên phổ biến, công năng làm mát vật lý của chiếc quạt thủ công dần suy giảm và gần như bị thay thế hoàn toàn. Thế nhưng, điều kỳ diệu là sự thoái lui về mặt tiện ích không làm chiếc quạt biến mất khỏi đời sống văn hóa, mà trái lại, nó đánh dấu một sự dịch chuyển giá trị đầy sâu sắc.",
      },
      {
        type: "paragraph",
        text: "Từ một vật dụng sinh hoạt thuần túy, chiếc quạt tay giờ đây đã nâng mình lên thành một biểu tượng của ký ức và nếp sống. Giá trị của một chiếc quạt nan Chàng Sơn hay một chiếc quạt giấy dó cổ hôm nay không còn được đo đếm bằng lượng gió nó tạo ra, mà bằng chiều sâu lịch sử và những giá trị phi vật thể gắn liền với nó. Nó mang theo hơi ấm bàn tay của những người muôn năm cũ, chuyên chở hình bóng của người bà, người mẹ, và lưu giữ cả một giai đoạn lịch sử khi con người còn sống hài hòa, thuận tự nhiên với đất trời. Chiếc quạt chính là một mảnh ghép quan trọng tạo nên bản sắc của một thời đại, giúp thế hệ hậu sinh định hình và nhận diện được cội nguồn văn hóa của dân tộc mình.",
      },
      { type: "heading", text: "Bảo tồn những điều bình dị để định vị bản sắc dân tộc" },
      {
        type: "paragraph",
        text: "Câu chuyện về sự hiện diện của chiếc quạt trong đời sống người Việt mang đến một thông điệp sâu sắc về công tác bảo tồn di sản. Đôi khi, những giá trị làm nên bản sắc của một dân tộc không nằm ở những công trình đồ sộ hay những báu vật xa hoa, mà ẩn tàng trong chính những vật dụng bình dị, thân thuộc nhất.",
      },
      {
        type: "paragraph",
        text: "Việc gìn giữ và phục dựng những làng nghề làm quạt truyền thống như Chàng Sơn không đơn thuần là giữ lại một sinh kế hay một kỹ nghệ thủ công. Đó là nỗ lực bảo vệ một lối sống, một nếp nghĩ và một không gian ký ức của người Việt. Khi chúng ta trân trọng chiếc quạt tay, chúng ta đang trân trọng hành trình lịch sử mà cha ông đã đi qua, giữ cho những giá trị văn hóa cốt lõi không bị hòa tan hay biến mất trước sức ép của làn sóng hiện đại hóa.",
      },
    ],
    gallery: [1, 2, 3, 4].map((n) => ({
      src: articleImage(10, n),
      alt: `Chiếc quạt trong đời sống thường ngày của người Việt — ảnh ${n}`,
    })),
  },
  {
    slug: "quy-trinh-nghe",
    title: "Quy trình nghề",
    headline:
      "Sinh mệnh của một chiếc quạt giấy Chàng Sơn: Kỹ nghệ thủ công thách thức thời gian",
    excerpt:
      "Phía sau âm thanh mở quạt giòn giã là cả một hành trình tạo tác: tuyển tre, chuốt nan, bồi giấy dó và phóng bút họa hình — không có chỗ cho sự vội vã.",
    category: "Quy trình",
    date: "10 tháng 7, 2026",
    readingTime: "6 phút đọc",
    image: articleVideoPoster(13, "cover"),
    lead:
      "Phía sau âm thanh mở quạt giòn giã và làn gió mát thanh nhẹ là cả một hành trình tạo tác dài bằng cả đời người. Giữa thời đại của băng chuyền công nghiệp và sản xuất hàng loạt, các nghệ nhân làng nghề Chàng Sơn vẫn lặng lẽ duy trì một quy trình nghiêm cẩn để thổi hồn cốt Việt vào từng nếp giấy, nan tre.",
    blocks: [
      { type: "heading", text: "Giữa tiếng lách cách chuốt nan và khoảng lặng của người thợ" },
      {
        type: "paragraph",
        text: "Bước vào một xưởng làm quạt truyền thống tại Chàng Sơn, điều đầu tiên chạm vào giác quan của du khách không phải là tiếng gầm rú của máy móc hiện đại, mà là một không gian âm thanh mang đầy tính nhịp điệu. Đó là tiếng lách cách đều đặn của con dao chuốt nan, tiếng sột soạt đặc trưng khi những thớ giấy dó chạm vào nhau, và trên hết là khoảng lặng đầy tập trung của những người thợ sở hữu đôi bàn tay đã chai sần qua hàng thập kỷ.",
      },
      {
        type: "paragraph",
        text: "Để một chiếc quạt giấy được “sinh ra” và hoàn chỉnh về cả công năng lẫn thẩm mỹ, quy trình chế tác tuyệt đối không có chỗ cho sự vội vã. Mỗi tác phẩm là một chuỗi các công đoạn nối tiếp nhau, đòi hỏi sự phối hợp nhịp nhàng giữa kinh nghiệm, nhãn quan và lòng kiên nhẫn nghệ nhân.",
      },
      { type: "heading", text: "Bốn chương tạo tác một chỉnh thể nghệ thuật" },
      {
        type: "paragraph",
        text: "Quy trình chế tác quạt cổ Chàng Sơn có thể được hệ thống hóa qua bốn giai đoạn cốt lõi, nơi mỗi bước đi đều quyết định đến tuổi thọ và cái thần của sản phẩm:",
      },
      {
        type: "paragraph",
        text: "Tuyển tre - Khởi đầu của sự bền bỉ: Khâu chọn nguyên liệu được xem là nền móng. Tre được chọn phải là tre già, đạt đủ độ tuổi để đảm bảo cấu trúc thớ gỗ có độ dẻo dai cao nhất. Tre đạt chuẩn sẽ giúp nan quạt không bị gãy gập hay giòn gãy trước những thay đổi của thời tiết, giữ trọn vẹn sự bền bỉ cùng thời gian.",
      },
      {
        type: "paragraph",
        text: "Kỹ nghệ chuốt nan - Định hình khung xương: Đây là công đoạn thử thách tài nghệ của người thợ vót. Bằng một con dao chuyên dụng và đôi mắt tinh tường, người nghệ nhân phải chuốt hàng chục nan quạt đều tăm tắp về độ dày và kích thước. Sự chuẩn xác trong việc tạo hình khung xương quyết định độ mở khép nhịp nhàng của chiếc quạt sau này.",
      },
      {
        type: "paragraph",
        text: "Bồi giấy dó - Sự giao hòa của đôi tay tỉ mỉ: Kỹ thuật bồi giấy dó lên khung tre đòi hỏi sự khéo léo tối đa. Người thợ phải vuốt phẳng mặt giấy một cách cẩn trọng sao cho diện quạt phẳng mịn tuyệt đối, không xuất hiện bất kỳ nếp nhăn, bong bóng khí hay vết bong tróc nào khi khô ráo.",
      },
      {
        type: "paragraph",
        text: "Phóng bút họa hình - Khai nhãn cho di sản: Đây là công đoạn chuyển hóa một vật dụng sinh hoạt thành một tác phẩm nghệ thuật. Trên nền giấy dó, các họa tiết được vẽ tay hoàn toàn. Mỗi nét cọ mang theo một bản ngã riêng, tạo nên tính độc bản mà không một công nghệ in ấn máy móc nào có thể sao chép được.",
      },
      { type: "heading", text: "Giá trị của “cái tình” giữa thời đại băng chuyền công nghiệp" },
      {
        type: "paragraph",
        text: "Sự khác biệt lớn nhất giữa một chiếc quạt sản xuất hàng loạt bằng máy móc và một sản phẩm thủ công xứ Đoài chính là “cái tình” được gửi gắm trong từng công đoạn. Người thợ Chàng Sơn không nhìn chiếc quạt như một sản phẩm thương mại đơn thuần, họ đối xử với nó như một đứa con tinh thần, một di sản cần được nâng niu và bảo tồn.",
      },
      {
        type: "paragraph",
        text: "Chiếc quạt thủ công không sinh ra từ những khuôn mẫu vô tri, nó sinh ra từ sự kiên nhẫn và lòng kiêu hãnh của một làng nghề trăm năm giữa nhịp sống hối hả.",
      },
      {
        type: "paragraph",
        text: "Chính vì vậy, mỗi khi lật mở chiếc quạt trên tay, người thưởng thức không chỉ đón nhận một làn gió mát thuần túy về mặt vật lý. Họ đang chạm vào hơi thở chân thực của lịch sử, cảm nhận được nhịp đập của làng nghề truyền thống và dòng chảy văn hóa Việt đang được gìn giữ vẹn nguyên qua thời gian.",
      },
    ],
    gallery: [],
    video: { src: articleVideo(13), poster: articleVideoPoster(13), portrait: true },
    credit: "Tư liệu truyền thông liên quan: Chương trình truyền hình “Alo nay nghề gì” (Tư liệu sưu tầm).",
  },
  {
    slug: "decor-nha-cua",
    title: "Decor nhà cửa",
    headline:
      "Đưa di sản vào không gian sống đương đại: Bản giao hưởng giữa quạt cổ Chàng Sơn và kiến trúc tối giản",
    excerpt:
      "Đưa một kỷ vật truyền thống như chiếc quạt giấy Chàng Sơn vào không gian sống là sự thiết lập một cuộc đối thoại tinh tế giữa di sản trăm năm và tư duy kiến trúc đương đại.",
    category: "Ứng dụng",
    date: "9 tháng 7, 2026",
    readingTime: "6 phút đọc",
    image: articleImage(14, 2, "cover"),
    lead:
      "Giữa những khối bê tông vuông vức và xu hướng nội thất công nghiệp của thời đại mới, con người lại có xu hướng tìm kiếm những “khoảng lặng” để cân bằng thị giác và cảm xúc. Việc đưa một kỷ vật truyền thống như chiếc quạt giấy Chàng Sơn vào không gian sống không đơn thuần là một giải pháp bài trí, mà là sự thiết lập một cuộc đối thoại tinh tế giữa giá trị di sản trăm năm và hơi thở của tư duy kiến trúc đương đại.",
    blocks: [
      { type: "heading", text: "Điểm chạm thị giác trong ngôn ngữ nội thất hiện đại" },
      {
        type: "paragraph",
        text: "Trong thiết kế nội thất hiện đại, đặc biệt là phong cách tối giản (Minimalism) hay đương đại (Contemporary), sự sang trọng không còn được định nghĩa bằng những món đồ xa xỉ, cầu kỳ hay sự lấp đầy không gian bằng vật chất. Thay vào đó, đỉnh cao của thẩm mỹ nằm ở cách sắp xếp những khoảng trống và việc tạo ra các “điểm chạm” thị giác độc đáo.",
      },
      {
        type: "paragraph",
        text: "Một chiếc quạt cổ Chàng Sơn, khi được tách ra khỏi công năng làm mát nguyên bản và đặt trang trọng trên một kệ sách gỗ phẳng, hay treo nhẹ nhàng trên một mảng tường xi măng trần, ngay lập tức sẽ tạo nên một hiệu ứng thẩm mỹ mạnh mẽ. Sự tương phản giữa những đường nét hình học sắc sảo của ngôi nhà hiện đại với phom dáng cong tròn mềm mại, tự nhiên của cánh quạt tạo ra một sự hòa hợp đầy bất ngờ. Không gian sống ngay lập tức được thổi vào một nguồn năng lượng mới: tĩnh tại, sang trọng và giàu chất thơ.",
      },
      { type: "heading", text: "Khi ánh sáng đánh thức câu chuyện của những nan tre" },
      {
        type: "paragraph",
        text: "Bản chất của một chiếc quạt thủ công là sự gồ ghề của chất liệu tự nhiên và tính ngẫu hứng của những nét vẽ tay. Điều này làm cho nó trở thành một thực thể sống động trong ngôi nhà, thay đổi sắc thái theo từng dòng chảy của thời gian và ánh sáng trong ngày.",
      },
      {
        type: "paragraph",
        text: "Khi ánh nắng mặt trời buổi sớm hay ánh đèn vàng dịu nhẹ vào ban đêm rọi vào diện quạt, cấu trúc tầng nấc của những nan tre già và độ xốp thô mộc của giấy dó sẽ hiện lên một cách rõ nét. Những bóng đổ đan xen, những vệt mực loang đậm nhạt từ nét vẽ thủy mặc hay tranh dân gian bắt đầu “cất lời”. Chiếc quạt lúc này không còn là một vật thể tĩnh, nó trở thành một người kể chuyện – kể về hành trình kiên nhẫn của nghệ nhân xứ Đoài, về sự tỉ mỉ qua từng công đoạn vót nan bồi giấy, và về cái “thần” của văn hóa Việt đã vượt qua bộ lọc của thời gian để hiển hiện trong căn phòng.",
      },
      { type: "heading", text: "Nuôi dưỡng tâm hồn từ những giá trị nguyên bản" },
      {
        type: "paragraph",
        text: "Sống tối giản hay sống hiện đại không đồng nghĩa với việc lược bỏ đi các giá trị tinh thần hay chối từ quá khứ. Ngược lại, một ngôi nhà hiện đại chỉ thực sự có chiều sâu khi nó phản ánh được thế giới quan và chiều sâu tâm hồn của gia chủ. Sau những giờ làm việc căng thẳng đối diện với màn hình máy tính và nhịp sống đô thị hối hả, việc trở về nhà và nhìn ngắm một mảnh ghép di sản mộc mạc chính là một liệu pháp tinh thần hiệu quả.",
      },
      {
        type: "paragraph",
        text: "Giữ lại một chút hoài niệm, một chút nét “cũ” tử tế giữa không gian sống tiện nghi là cách để con người đương đại neo giữ cảm xúc của mình với cội nguồn. Chiếc quạt Chàng Sơn trong ngôi nhà hiện đại không chỉ làm đẹp cho không gian, mà còn lặng lẽ nuôi dưỡng tư duy thẩm mỹ, nhắc nhở chúng ta về những giá trị bền vững, nguyên bản giữa một thế giới đầy biến động.",
      },
    ],
    gallery: [1, 2, 3, 4, 5].map((n) => ({
      src: articleImage(14, n),
      alt: `Quạt cổ Chàng Sơn trong không gian sống hiện đại — ảnh ${n}`,
    })),
    credit: "Ảnh: Gió từ Làng, sưu tầm.",
  },
  {
    slug: "thoi-trang",
    title: "Thời trang",
    headline:
      "Vẻ đẹp từ làn gió xưa: Khi quạt cổ Chàng Sơn trở thành điểm chạm thần thái của y phục Việt",
    excerpt:
      "Sự kết hợp giữa tà áo dài truyền thống và chiếc quạt xếp thủ công Chàng Sơn là sự giao hòa tuyệt mỹ giữa y phục và di sản.",
    category: "Ứng dụng",
    date: "8 tháng 7, 2026",
    readingTime: "5 phút đọc",
    image: articleImage(15, 6, "cover"),
    lead:
      "Trong dòng chảy của thời trang hiện đại, việc tìm kiếm sự khác biệt và chiều sâu văn hóa thường dẫn lối các nhà sáng tạo quay về với những giá trị nguyên bản. Sự kết hợp giữa tà áo dài truyền thống và chiếc quạt xếp thủ công Chàng Sơn không đơn thuần là một lựa chọn phối đồ, mà là sự giao hòa tuyệt mỹ giữa y phục và di sản, tôn vinh nét thanh cao, kín đáo nhưng đầy kiêu hãnh của người phụ nữ Việt.",
    blocks: [
      { type: "heading", text: "Ngôn ngữ hình thể và sự uyển chuyển của dáng ngọc" },
      {
        type: "paragraph",
        text: "Một trong những đỉnh cao của thẩm mỹ y phục Việt Nam truyền thống là sự kín đáo nhưng vẫn tôn lên được những đường nét uyển chuyển của cơ thể. Khi tà áo dài sánh đôi cùng chiếc quạt cầm tay, sự uyển chuyển ấy được nhân lên gấp bội. Không cần đến những trang sức cầu kỳ hay những món phụ kiện đắt tiền, một chiếc quạt nan tre thô mộc hoặc bồi lụa thanh nhã trên tay lại chính là thứ ngôn ngữ vô ngôn định hình nên tư thế và phong thái của người mặc.",
      },
      {
        type: "paragraph",
        text: "Hành động cầm quạt, khẽ lật mở diện quạt hay nhịp nhàng che nghiêng nửa khuôn mặt tạo nên một thứ ngôn ngữ hình thể đầy thi vị. Nó vừa gợi mở, vừa e ấp, phản ánh trọn vẹn nét tinh tế trong văn hóa giao tiếp và ứng xử của người Việt xưa. Chiếc quạt lúc này đóng vai trò như một nét vẽ nối dài của cánh tay, khiến cho dáng đứng, bước đi của người con gái trở nên mềm mại, tự nhiên và có nhịp điệu hơn trong từng khoảnh khắc.",
      },
      { type: "heading", text: "Tiếng nói của chất liệu thủ công trong mỗi khung hình" },
      {
        type: "paragraph",
        text: "Vượt lên trên vai trò của một đạo cụ chụp ảnh hay một vật dụng che nắng, đón gió thông thường, chiếc quạt Chàng Sơn là một chỉnh thể nghệ thuật chứa đựng những thông điệp văn hóa sâu sắc. Từng nan tre được người nghệ nhân chuốt tinh xảo, từng thớ giấy dó hay vạt lụa thấm đượm màu mực tự nhiên chính là những chi tiết làm nên “cái thần” cho mỗi tác phẩm thời trang và nhiếp ảnh.",
      },
      {
        type: "paragraph",
        text: "Sự đắt giá của việc đưa quạt cổ vào không gian thời trang đương đại nằm ở tính chân thực của chất liệu thủ công. Giữa một thời đại mà mọi thứ phụ kiện có thể dễ dàng sản xuất hàng loạt bằng nhựa hay kim loại vô hồn, sự xuất hiện của những nan tre già thô mộc, những nếp gấp giấy thấm đẫm thời gian mang lại một cảm giác ấm áp và chiều sâu lịch sử. Mỗi chi tiết nhỏ trên cánh quạt như đang lặng lẽ kể câu chuyện về sự kiên nhẫn, tinh hoa của một làng nghề trăm năm, từ đó nâng tầm giá trị cho người diện trang phục, biến họ thành một phần của không gian di sản sống động.",
      },
      { type: "heading", text: "Đánh thức linh hồn di sản thông qua ngôn ngữ thời trang" },
      {
        type: "paragraph",
        text: "Thời trang luôn có một sức sống mạnh mẽ nhất khi nó biết cách kết nối quá khứ với hiện tại. Việc thế hệ trẻ ngày nay ngày càng yêu thích xu hướng diện áo dài kết hợp với quạt cổ truyền thống trong các bộ ảnh nghệ thuật là một tín hiệu đáng mừng cho công tác bảo tồn văn hóa. Điều này chứng minh rằng di sản không phải là thứ gì đó xa xôi nằm trong tủ kính của bảo tàng, mà hoàn toàn có thể tái sinh một cách sống động ngay trong đời sống thường nhật.",
      },
      {
        type: "paragraph",
        text: "Bản thân mỗi chiếc quạt thủ công được tạo ra tại làng nghề Chàng Sơn đã có sẵn một linh hồn và câu chuyện riêng biệt. Khi được cộng hưởng cùng tà áo dài dân tộc, hai giá trị di sản này đã hòa quyện để tạo nên một thông điệp thẩm mỹ mạnh mẽ. Đó không chỉ là sự tôn vinh vẻ đẹp ngoại hình, mà còn là sự khẳng định đầy tự hào về tư duy thẩm mỹ độc lập, tinh tế và bền vững của dân tộc trước dòng chảy của thời gian.",
      },
    ],
    gallery: [1, 2, 3, 4, 5, 6, 7].map((n) => ({
      src: articleImage(15, n),
      alt: `Áo dài và quạt cổ Chàng Sơn — ảnh ${n}`,
    })),
    credit: "Nguồn hình ảnh: tiemchupanh.com",
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
