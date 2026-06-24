const cloudinaryBase = "https://res.cloudinary.com/dzwimbvjh/image/upload";
const assetRoot = "GioTuLangLandingPage";

function imageUrl(publicPath: string, transforms?: string) {
  return `${cloudinaryBase}/${transforms ? `${transforms}/` : ""}${assetRoot}/${publicPath}`;
}

const cloudinaryVideoBase = "https://res.cloudinary.com/dzwimbvjh/video/upload";

/** URL video .mp4 đã tối ưu (f_auto,q_auto…). publicPath không kèm đuôi. */
function videoUrl(publicPath: string, transforms?: string) {
  return `${cloudinaryVideoBase}/${transforms ? `${transforms}/` : ""}${assetRoot}/${publicPath}.mp4`;
}

/** Ảnh poster (1 khung hình) trích từ video, dùng cho thuộc tính poster. */
function videoPoster(publicPath: string, transforms = "so_0") {
  return `${cloudinaryVideoBase}/${transforms}/${assetRoot}/${publicPath}.jpg`;
}

export const cloudinaryAssets = {
  banner: {
    main: {
      src: imageUrl("banner/main-banner.png", "f_auto,q_auto,c_fill,w_2400"),
      rawSrc: imageUrl("banner/main-banner.png"),
      alt: "Gio Tu Lang landing page banner",
    },
  },
  // Bản đồ làng nghề dùng cho MapHero (lưu trên Cloudinary, không nằm trong repo).
  map: {
    banner: {
      src: imageUrl("map/banner-di-san.jpg", "f_auto,q_auto,w_2560"),
      rawSrc: imageUrl("map/banner-di-san.jpg"),
      alt: "Bản đồ di sản làng nghề Chàng Sơn",
    },
  },
  logo: {
    transparent: {
      src: imageUrl("logo/logo-transparent.png", "e_trim:10,c_fit,w_320,h_140"),
      rawSrc: imageUrl("logo/logo-transparent.png"),
      alt: "Gio Tu Lang logo",
    },
    normal: {
      src: imageUrl("logo/logo-normal.png", "f_auto,q_auto,c_fit,w_520,h_520"),
      rawSrc: imageUrl("logo/logo-normal.png"),
      alt: "Gio Tu Lang logo with village background",
    },
    black: {
      src: imageUrl("logo/logo-black.png", "f_auto,q_auto,c_fit,w_520,h_520"),
      rawSrc: imageUrl("logo/logo-black.png"),
      alt: "Gio Tu Lang black logo",
    },
  },
  crafts: {
    // Bộ ảnh thật của làng nghề Mộc (lưu trên Cloudinary, không nằm trong repo).
    moc: {
      tuLieuNonTan: {
        src: imageUrl("crafts/moc/tu-lieu-non-tan.jpg", "f_auto,q_auto,c_fit,w_1200"),
        alt: "Tư liệu “Trên đỉnh Non Tản” ghi chép về làng Chàng Thôn làm nghề thợ mộc",
      },
      ngheNhan: {
        src: imageUrl("crafts/moc/nghe-nhan-cham-khac.jpg", "f_auto,q_auto,c_fill,w_1600"),
        alt: "Nghệ nhân làng Chàng Sơn tỉ mỉ chạm khắc trên thớ gỗ",
      },
      banTay: {
        src: imageUrl("crafts/moc/ban-tay-cham-khac.jpg", "f_auto,q_auto:best,c_fill,w_2600"),
        alt: "Đôi bàn tay người thợ mộc đưa lưỡi đục trên mặt gỗ",
      },
      chamHoaVan: {
        src: imageUrl("crafts/moc/cham-hoa-van.jpg", "f_auto,q_auto,c_fill,w_1400"),
        alt: "Chạm hoa văn trên tấm gỗ sơn son",
      },
      khongGianNhaGo: {
        src: imageUrl("crafts/moc/khong-gian-nha-go.jpg", "f_auto,q_auto,c_fill,w_1400"),
        alt: "Không gian nhà gỗ truyền thống với hệ vì kèo và trần chạm khắc",
      },
      cuaVong: {
        src: imageUrl("crafts/moc/cua-vong-cham.jpg", "f_auto,q_auto,c_fill,w_1600"),
        alt: "Cửa võng gỗ với con tiện và mảng chạm thủng tinh xảo",
      },
      chiTietCham: {
        src: imageUrl("crafts/moc/chi-tiet-cham.jpg", "f_auto,q_auto,c_fill,w_1400"),
        alt: "Chi tiết hoa văn chạm thủng nhiều lớp trên mặt gỗ",
      },
      lapDung: {
        src: imageUrl("crafts/moc/lap-dung-noi-that.jpg", "f_auto,q_auto,c_fill,w_1400"),
        alt: "Người thợ lắp dựng và hoàn thiện nội thất gỗ tại công trình",
      },
      taoTac: {
        src: imageUrl("crafts/moc/tao-tac.jpg", "f_auto,q_auto,c_fill,w_1400"),
        alt: "Tạo tác phù điêu gỗ giữa lớp dăm bào",
      },
      xuongMoc: {
        src: imageUrl("crafts/moc/xuong-moc.jpg", "f_auto,q_auto,c_fill,w_1400"),
        alt: "Xưởng mộc Chàng Sơn với người thợ trẻ đang chạm khắc",
      },
    },
    // Bộ ảnh & video thật của làng nghề Quạt (nghề chủ đạo của dự án).
    quat: {
      thuyDinh: {
        src: imageUrl("crafts/quat/thuy-dinh.jpg", "f_auto,q_auto:best,c_fill,w_2600"),
        alt: "Thủy đình soi bóng trên hồ làng Chàng Sơn",
      },
      dinhLang: {
        src: imageUrl("crafts/quat/dinh-lang.jpg", "f_auto,q_auto,c_fill,w_1600"),
        alt: "Mặt tiền đình làng Chàng Sơn với đôi voi đá và biểu tượng chữ Thọ",
      },
      biaDiTich: {
        src: imageUrl("crafts/quat/bia-di-tich.jpg", "f_auto,q_auto,c_fill,w_1200"),
        alt: "Bia “Đình làng Yên — Di tích lịch sử văn hóa”",
      },
      biaDenVanVo: {
        src: imageUrl("crafts/quat/bia-den-van-vo.jpg", "f_auto,q_auto,c_fit,w_1400"),
        alt: "Hoành phi đền Văn - Võ Chàng Sơn thờ 25 vị danh nhân, trong đó có tổ sư nghề mộc",
      },
      quatTranhLangQue: {
        src: imageUrl("crafts/quat/quat-tranh-lang-que.jpg", "f_auto,q_auto:best,c_fill,w_2200"),
        alt: "Quạt trang trí cỡ lớn vẽ cảnh làng quê Việt Nam",
      },
      quatVeNhanVat: {
        src: imageUrl("crafts/quat/quat-ve-nhan-vat.jpg", "f_auto,q_auto,c_fill,w_1400"),
        alt: "Quạt giấy vẽ nhân vật trên nền quạt đỏ lớn",
      },
      quatVeTichCo: {
        src: imageUrl("crafts/quat/quat-ve-tich-co.jpg", "f_auto,q_auto,c_fill,w_1600"),
        alt: "Quạt vẽ tích cổ với các nhân vật trong trang phục truyền thống",
      },
      quatNanXuyenSang: {
        src: imageUrl("crafts/quat/quat-nan-xuyen-sang.jpg", "f_auto,q_auto,c_fill,w_1400"),
        alt: "Cánh quạt mỏng soi xuyên sáng để lộ nan tre và họa tiết cắt thủng",
      },
      quatRong: {
        src: imageUrl("crafts/quat/quat-rong.jpg", "f_auto,q_auto,c_fill,w_1600"),
        alt: "Quạt nan tre vẽ rồng trên nền quạt đỏ",
      },
      quatTheBong: {
        src: imageUrl("crafts/quat/quat-the-bong.jpg", "f_auto,q_auto,c_fill,w_1400"),
        alt: "Quạt giấy dó giơ lên ánh sáng, hiện rõ nan tre và chữ cắt thủng",
      },
      xuongSanXuat: {
        src: imageUrl("crafts/quat/xuong-san-xuat.jpg", "f_auto,q_auto,c_fill,w_1400"),
        alt: "Xưởng sản xuất quạt của làng Chàng Sơn",
      },
      nguoiDanLamQuat: {
        src: imageUrl("crafts/quat/nguoi-dan-lam-quat.jpg", "f_auto,q_auto,c_fill,w_1400"),
        alt: "Người dân Chàng Sơn ngồi làm và lưu trữ nan quạt tại nhà",
      },
      phoiNanQuat: {
        src: imageUrl("crafts/quat/phoi-nan-quat.jpg", "f_auto,q_auto,c_fill,w_1400"),
        alt: "Những bó nan quạt nhuộm cam được phơi bên hiên nhà",
      },
      quatBayPhoi: {
        src: imageUrl("crafts/quat/quat-bay-phoi.jpg", "f_auto,q_auto,c_fill,w_1600"),
        alt: "Hàng dài quạt thành phẩm bày phơi dưới sân",
      },
      videoHero: {
        src: videoUrl("crafts/quat/video-lang-quat-1", "f_auto,q_auto,c_fill,w_1600"),
        poster: videoPoster("crafts/quat/video-lang-quat-1", "so_2,f_auto,q_auto,w_1600"),
        alt: "Thước phim ngắn về làng nghề quạt Chàng Sơn",
      },
      videoFeature: {
        src: videoUrl("crafts/quat/video-lang-quat-2", "f_auto,q_auto,w_1280"),
        poster: videoPoster("crafts/quat/video-lang-quat-2", "so_3,f_auto,q_auto,w_1280"),
        alt: "Phóng sự về nghề làm quạt truyền thống ở Chàng Sơn",
      },
    },
  },
  // Ảnh cho trang Giới thiệu về làng Chàng Sơn.
  gioiThieu: {
    thuyDinh: {
      src: imageUrl("crafts/quat/thuy-dinh.jpg", "f_auto,q_auto:best,c_fill,w_2200"),
      alt: "Thủy đình soi bóng trên hồ làng Chàng Sơn",
    },
    duongLang: {
      src: imageUrl("gioi-thieu/duong-lang.jpg", "f_auto,q_auto,c_fill,w_1400"),
      alt: "Con đường làng Chàng Sơn rợp bóng cây xanh",
    },
    nhaCo: {
      src: imageUrl("gioi-thieu/nha-co.jpg", "f_auto,q_auto,c_fill,w_1800"),
      alt: "Nếp nhà cổ với mái ngói, mành tre và cửa gỗ chạm khắc, treo đèn lồng đỏ",
    },
    nguoiLang: {
      src: imageUrl("gioi-thieu/nguoi-lang.jpg", "f_auto,q_auto,c_fill,w_1400"),
      alt: "Người dân Chàng Sơn lặng lẽ với công việc thường nhật bên bức tường vàng cũ",
    },
    congDinh: {
      src: imageUrl("gioi-thieu/cong-dinh.jpg", "f_auto,q_auto,c_fill,w_2000"),
      alt: "Cổng đình làng Chàng Sơn nhìn từ sân đình",
    },
    vanCoAnhLinh: {
      src: imageUrl("gioi-thieu/van-co-anh-linh.jpg", "f_auto,q_auto,c_fill,w_1600"),
      alt: "Bức đại tự “Vạn Cổ Anh Linh” trên cổng di tích",
    },
    dauDao: {
      src: imageUrl("gioi-thieu/dau-dao.jpg", "f_auto,q_auto,c_fill,w_1600"),
      alt: "Chi tiết đầu đao chạm khắc trên mái công trình cổ",
    },
  },
} as const;
