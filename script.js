/* script.js
 *
 * سایت نمایشی صنایع فولاد آریا
 * بدون وابستگی، درخواست API یا منابع خارجی.
 *
 * چون نسخه ارسالی HTML فقط متن استخراج‌شده است و کلاس‌ها و شناسه‌های
 * اصلی آن مشخص نیست، این فایل ساختار نمایشی صفحه را ایجاد و جایگزین می‌کند.
 * نام کلاس‌ها با styles.css ارسالی هماهنگ است.
 *
 * در index.html:
 * <script src="./script.js" defer></script>
 *
 * مسیر رسانه‌ها نسبت به index.html محاسبه می‌شود.
 * نبود تصاویر و ویدئو با جایگزین متنی مدیریت می‌شود.
 * کاتالوگ واقعی باید در مسیر تعریف‌شده قرار بگیرد.
 */

(() => {
  "use strict";

  const STORAGE_KEY = "aria-steel-language";
  const LANGUAGES = ["fa", "en"];

  // --------------------------------------------------
  // اطلاعات قابل ویرایش شرکت
  // --------------------------------------------------

  const COMPANY = {
    phone: "+98 21 8877 6600",
    ceoPhone: "+98 21 8877 6655",
    salesPhone: "+98 21 8877 6644",
    email: "info@ariasteel.example",
    salesEmail: "sales@ariasteel.example",
    logo: "./assets/images/logo.svg",
    hero: "./assets/images/hero.jpg",
    factory: "./assets/images/gallery/factory-01.jpg",
    ceoImage: "./assets/images/team/ceo.jpg",
    salesImage: "./assets/images/team/sales.jpg",
    map: "./assets/images/gallery/map-office.jpg",
    video: "./assets/videos/company-intro.mp4",

    name: {
      fa: "صنایع فولاد آریا",
      en: "Aria Steel Industries"
    },

    ceo: {
      fa: "مهندس رضا کریمی",
      en: "Reza Karimi"
    },

    salesManager: {
      fa: "مهندس سارا محمدی",
      en: "Sara Mohammadi"
    },

    officeAddress: {
      fa: "تهران، خیابان ولیعصر، برج صنعت، طبقه ۷، واحد ۷۰۴",
      en: "Unit 704, 7th Floor, Sanat Tower, Valiasr Street, Tehran, Iran"
    },

    factoryAddress: {
      fa: "شهرک صنعتی البرز، خیابان صنعت ۱۲، پلاک ۴۵",
      en: "No. 45, Sanat 12 Street, Alborz Industrial Estate, Iran"
    }
  };

  const PRODUCTS = [
    {
      id: "cnc-parts",
      image: "./assets/images/products/cnc-parts.jpg",
      name: {
        fa: "قطعات دقیق ماشین‌کاری CNC",
        en: "Precision CNC Components"
      },
      description: {
        fa: "تولید قطعات پیچیده با دقت ابعادی بالا برای تجهیزات صنعتی، خطوط مونتاژ و ماشین‌آلات تخصصی.",
        en: "High-precision components for industrial equipment, assembly lines and specialized machinery."
      },
      details: {
        fa: "ماشین‌کاری قطعات بر اساس نقشه مشتری با فرآیندهای فرزکاری، تراشکاری و سوراخ‌کاری انجام می‌شود. کنترل ابعادی و گزارش بازرسی برای سفارش قابل ارائه است.",
        en: "Custom components manufactured from customer drawings using milling, turning and drilling. Dimensional inspection reports are available."
      },
      specs: [
        {
          label: { fa: "مواد اولیه", en: "Materials" },
          value: {
            fa: "فولاد آلیاژی، استنلس استیل، آلومینیوم",
            en: "Alloy steel, stainless steel, aluminum"
          }
        },
        {
          label: { fa: "تلرانس قابل دستیابی", en: "Achievable tolerance" },
          value: {
            fa: "تا ±۰٫۰۱ میلی‌متر، بسته به قطعه",
            en: "Down to ±0.01 mm, depending on geometry"
          }
        },
        {
          label: { fa: "حداکثر طول قطعه", en: "Maximum part length" },
          value: { fa: "۱۲۰۰ میلی‌متر", en: "1,200 mm" }
        }
      ]
    },
    {
      id: "industrial-flanges",
      image: "./assets/images/products/flanges.jpg",
      name: {
        fa: "فلنج و اتصالات صنعتی",
        en: "Industrial Flanges & Fittings"
      },
      description: {
        fa: "فلنج‌ها و اتصالات فولادی برای خطوط انتقال سیالات و تأسیسات پالایشگاهی و نیروگاهی.",
        en: "Steel flanges and fittings for fluid pipelines, refineries and power generation facilities."
      },
      details: {
        fa: "ساخت فلنج‌های گلودار، تخت و کور مطابق مشخصات سفارش انجام می‌شود. جنس، کلاس فشاری و نوع سطح آب‌بندی پیش از تولید با خریدار نهایی می‌شود.",
        en: "Weld-neck, slip-on and blind flanges manufactured to order. Material, pressure class and sealing face are confirmed before production."
      },
      specs: [
        {
          label: { fa: "جنس", en: "Material" },
          value: {
            fa: "فولاد کربنی و استنلس استیل",
            en: "Carbon steel and stainless steel"
          }
        },
        {
          label: { fa: "محدوده اندازه", en: "Size range" },
          value: { fa: "۲ تا ۲۴ اینچ", en: "2–24 inches" }
        },
        {
          label: { fa: "کلاس فشاری", en: "Pressure class" },
          value: { fa: "۱۵۰ تا ۶۰۰، بر اساس سفارش", en: "150–600, to order" }
        }
      ]
    },
    {
      id: "heavy-assemblies",
      image: "./assets/images/products/heavy-assemblies.jpg",
      name: {
        fa: "مجموعه‌ها و سازه‌های فلزی سنگین",
        en: "Heavy Steel Assemblies"
      },
      description: {
        fa: "طراحی و ساخت شاسی، فریم و مجموعه‌های فلزی برای ماشین‌آلات و تجهیزات خطوط تولید.",
        en: "Design and fabrication of bases, frames and steel assemblies for machinery and production equipment."
      },
      details: {
        fa: "خدمات شامل برش، جوشکاری، تنش‌زدایی، ماشین‌کاری سطوح نصب و مونتاژ نهایی است. پوشش محافظ با توجه به شرایط محیطی پروژه انتخاب می‌شود.",
        en: "Services include cutting, welding, stress relief, mounting-surface machining and final assembly. Protective coatings are selected for project conditions."
      },
      specs: [
        {
          label: { fa: "وزن هر مجموعه", en: "Assembly weight" },
          value: { fa: "تا ۸ تن", en: "Up to 8 tonnes" }
        },
        {
          label: { fa: "فرآیند جوشکاری", en: "Welding processes" },
          value: { fa: "MIG / MAG / SMAW", en: "MIG / MAG / SMAW" }
        },
        {
          label: { fa: "پوشش نهایی", en: "Surface finish" },
          value: {
            fa: "رنگ صنعتی یا پوشش سفارشی",
            en: "Industrial paint or specified coating"
          }
        }
      ]
    }
  ];

  const GALLERY = [
    {
      image: "./assets/images/gallery/factory-01.jpg",
      title: { fa: "نمای سالن تولید", en: "Production Hall" }
    },
    {
      image: "./assets/images/gallery/production-line.jpg",
      title: { fa: "خط تولید قطعات صنعتی", en: "Component Production Line" }
    },
    {
      image: "./assets/images/gallery/cnc-machine.jpg",
      title: { fa: "مرکز ماشین‌کاری CNC", en: "CNC Machining Center" }
    },
    {
      image: "./assets/images/gallery/quality-control.jpg",
      title: { fa: "کنترل کیفیت و اندازه‌گیری", en: "Quality Control & Inspection" }
    },
    {
      image: "./assets/images/gallery/welding.jpg",
      title: { fa: "ساخت و جوشکاری سازه‌ها", en: "Fabrication & Welding" }
    },
    {
      image: "./assets/images/gallery/finished-products.jpg",
      title: { fa: "محصولات آماده تحویل", en: "Products Ready for Delivery" }
    }
  ];

  const CATALOGS = [
    {
      file: "./assets/catalogs/company-catalog.pdf",
      title: { fa: "معرفی شرکت", en: "Company Profile" },
      description: {
        fa: "معرفی فعالیت‌ها، ظرفیت تولید و توانمندی‌های صنایع فولاد آریا.",
        en: "An overview of Aria Steel Industries, its production capacity and capabilities."
      }
    },
    {
      file: "./assets/catalogs/products-catalog.pdf",
      title: { fa: "کاتالوگ محصولات", en: "Product Catalog" },
      description: {
        fa: "معرفی گروه‌های محصول و مشخصات فنی نمونه.",
        en: "Product categories and representative technical specifications."
      }
    },
    {
      file: "./assets/catalogs/capabilities-catalog.pdf",
      title: { fa: "توانمندی‌های تولید", en: "Manufacturing Capabilities" },
      description: {
        fa: "مروری بر ماشین‌کاری، ساخت سازه و کنترل کیفیت.",
        en: "An overview of machining, fabrication and quality control."
      }
    }
  ];

  // --------------------------------------------------
  // ترجمه رابط کاربری
  // --------------------------------------------------

  const TEXT = {
    fa: {
      pageTitle: "صنایع فولاد آریا | مهندسی دقیق، تولید پایدار",
      description: "معرفی صنایع فولاد آریا، محصولات صنعتی و توانمندی‌های تولید.",
      skip: "رفتن به محتوای اصلی",
      tagline: "مهندسی دقیق، تولید پایدار",
      language: "انتخاب زبان",
      menu: "باز و بسته کردن منو",
      home: "خانه",
      about: "درباره شرکت",
      products: "محصولات",
      gallery: "گالری",
      video: "ویدئو",
      catalogs: "کاتالوگ‌ها",
      contact: "تماس با ما",
      heroEyebrow: "بیش از ۲۵ سال تجربه در صنعت فلز",
      heroDescription: "طراحی و تولید قطعات صنعتی، ماشین‌کاری CNC و تجهیزات فلزی سنگین برای پالایشگاه‌ها، نیروگاه‌ها و صنایع خودروسازی، با تمرکز بر کیفیت و تحویل به‌موقع.",
      viewProducts: "مشاهده محصولات",
      heroAlt: "خط تولید صنایع فولاد آریا",
      years: "سال تجربه",
      projects: "پروژه اجراشده",
      experts: "نیروی متخصص",
      countries: "کشور صادرات",
      aboutEyebrow: "تخصص، تعهد و کیفیت",
      aboutTitle: "همراه صنعت، از طراحی تا تحویل",
      aboutP1: "صنایع فولاد آریا در سال ۱۳۷۸ با هدف تولید قطعات دقیق صنعتی تأسیس شد. امروز با سه کارخانه در شهرک صنعتی البرز، ظرفیت تولید سالانه بیش از ۱۲٬۰۰۰ تن قطعه فلزی را داریم.",
      aboutP2: "توانمندی اصلی ما ماشین‌کاری CNC، ریخته‌گری دقیق، عملیات حرارتی و مونتاژ مجموعه‌های صنعتی است. مراحل تولید زیر نظر تیم کنترل کیفیت و بر اساس الزامات پروژه انجام می‌شود.",
      features: [
        "فرآیندهای کیفیت و ایمنی مبتنی بر ISO 9001 و ISO 45001",
        "آزمایشگاه متالورژی داخلی",
        "خط تولید نیمه‌خودکار با ظرفیت بالا",
        "پشتیبانی فنی و خدمات پس از فروش"
      ],
      capacity: "۱۲٬۰۰۰ تن ظرفیت تولید سالانه",
      factoryAlt: "نمای کارخانه",
      productsIntro: "راهکارهای ساخت برای نیازهای متنوع صنایع؛ مشخصات نهایی هر سفارش پس از بررسی فنی تعیین می‌شود.",
      detail: "مشاهده جزئیات",
      specifications: "مشخصات فنی",
      quote: "درخواست استعلام قیمت",
      quoteMessage: "لطفاً اطلاعات قیمت و زمان تحویل محصول زیر را ارسال کنید:",
      galleryIntro: "نگاهی به محیط کارخانه، تجهیزات و مراحل تولید.",
      enlarge: "بزرگ‌نمایی",
      videoTitle: "از نزدیک با ما آشنا شوید",
      videoIntro: "فیلم معرفی کارخانه و فرآیندهای تولید.",
      videoUnavailable: "ویدئوی معرفی هنوز در دسترس نیست.",
      replaceFile: "فایل واقعی را در این مسیر قرار دهید:",
      videoFallback: "مرورگر شما از پخش این ویدئو پشتیبانی نمی‌کند.",
      openVideo: "مشاهده فایل ویدئو",
      catalogsIntro: "فایل‌های معرفی و اطلاعات فنی شرکت.",
      view: "مشاهده",
      download: "دانلود",
      catalogMissing: "فایل کاتالوگ هنوز موجود نیست یا PDF معتبر نیست.",
      catalogUnknown: "وجود فایل قابل بررسی نبود. لینک‌ها پس از قرار دادن PDF واقعی در مسیر زیر کار می‌کنند.",
      catalogChecking: "در حال بررسی فایل...",
      catalogReady: "فایل PDF آماده مشاهده و دانلود است.",
      contactIntro: "برای بررسی نقشه‌ها، انتخاب فرآیند تولید و دریافت پیشنهاد فنی با ما در ارتباط باشید.",
      ceo: "مدیرعامل",
      salesManager: "مسئول فروش",
      email: "ایمیل",
      salesEmail: "ایمیل فروش",
      phone: "تلفن",
      office: "دفتر مرکزی",
      factory: "کارخانه",
      hours: "ساعات کاری",
      hoursValue: "شنبه تا چهارشنبه، ۸:۰۰ تا ۱۷:۰۰؛ پنجشنبه، ۸:۰۰ تا ۱۳:۰۰",
      map: "موقعیت دفتر مرکزی",
      formTitle: "آماده‌سازی درخواست",
      fullName: "نام و نام خانوادگی",
      message: "پیام",
      submit: "باز کردن برنامه ایمیل",
      formNote: "این فرم پیام را در برنامه ایمیل شما آماده می‌کند و آن را از سایت ارسال نمی‌کند. نشانی‌های دامنه example نمایشی هستند و باید با ایمیل واقعی جایگزین شوند.",
      formStatus: "درخواست باز کردن برنامه ایمیل انجام شد؛ ارسال پیام باید در برنامه ایمیل تأیید شود.",
      emailSubject: "درخواست همکاری صنعتی",
      footerDescription: "طراحی، ساخت و تأمین قطعات و تجهیزات فلزی برای پروژه‌های صنعتی.",
      quickLinks: "دسترسی سریع",
      demo: "این سایت نمونه نمایشی است؛ نام‌ها، آمار و مشخصات، اطلاعات فرضی هستند.",
      rights: "صنایع فولاد آریا. نمونه نمایشی مستقل.",
      close: "بستن",
      previous: "تصویر قبلی",
      next: "تصویر بعدی",
      backTop: "بازگشت به بالای صفحه",
      imageMissing: "تصویر در دسترس نیست",
      imagePosition: "تصویر",
      of: "از"
    },

    en: {
      pageTitle: "Aria Steel Industries | Precision Engineering",
      description: "Explore Aria Steel Industries, industrial products and manufacturing capabilities.",
      skip: "Skip to main content",
      tagline: "Precision Engineering, Reliable Production",
      language: "Choose language",
      menu: "Toggle navigation",
      home: "Home",
      about: "About",
      products: "Products",
      gallery: "Gallery",
      video: "Video",
      catalogs: "Catalogs",
      contact: "Contact",
      heroEyebrow: "Over 25 years in the metal industry",
      heroDescription: "Industrial components, CNC machining and heavy steel equipment for refineries, power plants and automotive manufacturers, with a focus on quality and timely delivery.",
      viewProducts: "Explore Products",
      heroAlt: "Aria Steel Industries production line",
      years: "Years of experience",
      projects: "Completed projects",
      experts: "Skilled specialists",
      countries: "Export destinations",
      aboutEyebrow: "Expertise, Commitment & Quality",
      aboutTitle: "Your Manufacturing Partner",
      aboutP1: "Established in 1999, Aria Steel Industries manufactures precision industrial components. Our three factories in Alborz Industrial Estate provide an annual production capacity exceeding 12,000 tonnes.",
      aboutP2: "Our core capabilities include CNC machining, precision casting, heat treatment and industrial assembly. Production is supervised by our quality control team and follows project requirements.",
      features: [
        "Quality and safety processes based on ISO 9001 and ISO 45001",
        "In-house metallurgy laboratory",
        "High-capacity semi-automated production",
        "Technical support and after-sales service"
      ],
      capacity: "12,000 tonnes annual production capacity",
      factoryAlt: "Factory exterior",
      productsIntro: "Manufacturing solutions for diverse industrial needs. Final specifications are confirmed after engineering review.",
      detail: "View Details",
      specifications: "Technical Specifications",
      quote: "Request a Quote",
      quoteMessage: "Please send pricing and delivery information for:",
      galleryIntro: "Explore our facilities, equipment and manufacturing processes.",
      enlarge: "Enlarge",
      videoTitle: "Inside Our Factory",
      videoIntro: "An introduction to our facilities and production processes.",
      videoUnavailable: "The company video is not available yet.",
      replaceFile: "Place the actual file at:",
      videoFallback: "Your browser does not support this video.",
      openVideo: "Open video file",
      catalogsIntro: "Company literature and technical information.",
      view: "View",
      download: "Download",
      catalogMissing: "The catalog is missing or is not a valid PDF.",
      catalogUnknown: "File availability could not be checked. These links work once the actual PDF is placed at the path below.",
      catalogChecking: "Checking file availability...",
      catalogReady: "The PDF is available to view and download.",
      contactIntro: "Contact our team for drawing reviews, manufacturing advice and technical proposals.",
      ceo: "Chief Executive Officer",
      salesManager: "Sales Manager",
      email: "Email",
      salesEmail: "Sales Email",
      phone: "Phone",
      office: "Head Office",
      factory: "Factory",
      hours: "Business Hours",
      hoursValue: "Saturday to Wednesday, 08:00–17:00; Thursday, 08:00–13:00",
      map: "Head Office Location",
      formTitle: "Prepare an Inquiry",
      fullName: "Full Name",
      message: "Message",
      submit: "Open Email App",
      formNote: "This form prepares a message in your email app; it does not send it from this website. Addresses using the example domain are placeholders and must be replaced with real addresses.",
      formStatus: "An email-app launch was requested. Confirm and send your message in your email app.",
      emailSubject: "Industrial Manufacturing Inquiry",
      footerDescription: "Design, manufacturing and supply of metal components and equipment for industrial projects.",
      quickLinks: "Quick Links",
      demo: "Demonstration website. Names, statistics and specifications are fictional sample data.",
      rights: "Aria Steel Industries. Independent demonstration website.",
      close: "Close",
      previous: "Previous image",
      next: "Next image",
      backTop: "Back to top",
      imageMissing: "Image unavailable",
      imagePosition: "Image",
      of: "of"
    }
  };

  let language = readLanguage();
  let root;
  let previousFocus = null;
  let activeProduct = null;
  let galleryIndex = 0;
  let observer = null;
  let renderVersion = 0;

  const catalogStatus = new Map();
  const catalogRequests = new Map();
  const formDraft = { name: "", phone: "", email: "", message: "" };

  function readLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return LANGUAGES.includes(saved) ? saved : "fa";
    } catch {
      return "fa";
    }
  }

  function t(key) {
    return TEXT[language][key] ?? key;
  }

  function localized(value) {
    return value[language] ?? value.fa;
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function number(value) {
    return new Intl.NumberFormat(language === "fa" ? "fa-IR" : "en-US")
      .format(value);
  }

  function phoneLink(value) {
    return `tel:${value.replace(/[^\d+]/g, "")}`;
  }

  function media(path, alt, options = {}) {
    const { eager = false, ratio = "4 / 3" } = options;

    return `
      <div class="local-media" style="position:relative;aspect-ratio:${ratio}">
        <img
          src="${escapeHTML(path)}"
          alt="${escapeHTML(alt)}"
          loading="${eager ? "eager" : "lazy"}"
          decoding="async"
          ${eager ? 'fetchpriority="high"' : ""}
          style="width:100%;height:100%;object-fit:cover"
        >
        <div class="media-placeholder">
          <div>
            <strong>${escapeHTML(alt)}</strong>
            <p>${escapeHTML(t("imageMissing"))}</p>
            <small dir="ltr" style="overflow-wrap:anywhere">
              ${escapeHTML(path)}
            </small>
          </div>
        </div>
      </div>
    `;
  }

  function heading(title, description = "") {
    return `
      <div class="section-header">
        <h2>${escapeHTML(title)}</h2>
        ${description ? `<p>${escapeHTML(description)}</p>` : ""}
      </div>
    `;
  }

  function navigationLinks() {
    return ["home", "about", "products", "gallery", "video", "catalogs", "contact"]
      .map((id) => `
        <li>
          <a href="#${id}" class="nav-link">${escapeHTML(t(id))}</a>
        </li>
      `).join("");
  }

  function specs(product, table = false) {
    if (table) {
      return `
        <table class="spec-table">
          <caption class="sr-only">${escapeHTML(t("specifications"))}</caption>
          <tbody>
            ${product.specs.map((spec) => `
              <tr>
                <th scope="row">${escapeHTML(localized(spec.label))}</th>
                <td>${escapeHTML(localized(spec.value))}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }

    return `
      <dl class="product-specs">
        ${product.specs.map((spec) => `
          <div>
            <dt>${escapeHTML(localized(spec.label))}</dt>
            <dd>${escapeHTML(localized(spec.value))}</dd>
          </div>
        `).join("")}
      </dl>
    `;
  }

  function productCards() {
    return PRODUCTS.map((product) => `
      <article class="product-card">
        <div class="product-media">
          ${media(product.image, localized(product.name))}
        </div>
        <div class="product-body">
          <h3>${escapeHTML(localized(product.name))}</h3>
          <p>${escapeHTML(localized(product.description))}</p>
          ${specs(product)}
          <button
            type="button"
            class="btn btn-outline"
            data-product="${product.id}"
            aria-haspopup="dialog"
          >
            ${escapeHTML(t("detail"))}
            <span class="sr-only">${escapeHTML(localized(product.name))}</span>
          </button>
        </div>
      </article>
    `).join("");
  }

  function catalogCards() {
    return CATALOGS.map((catalog, index) => `
      <article class="catalog-card">
        <div class="catalog-icon" aria-hidden="true">PDF</div>
        <h3>${escapeHTML(localized(catalog.title))}</h3>
        <p>${escapeHTML(localized(catalog.description))}</p>
        <p class="form-note" data-catalog-status="${index}" role="status"></p>
        <p dir="ltr" style="overflow-wrap:anywhere">
          <small>${escapeHTML(catalog.file)}</small>
        </p>
        <div class="catalog-actions" data-catalog-actions="${index}">
          <a
            class="btn btn-outline btn-sm"
            href="${escapeHTML(catalog.file)}"
            target="_blank"
            rel="noopener noreferrer"
          >${escapeHTML(t("view"))}</a>
          <a
            class="btn btn-primary btn-sm"
            href="${escapeHTML(catalog.file)}"
            download
          >${escapeHTML(t("download"))}</a>
        </div>
      </article>
    `).join("");
  }

  function contactItem(label, content) {
    return `
      <li class="contact-item">
        <div>
          <span class="contact-label">${escapeHTML(label)}</span>
          ${content}
        </div>
      </li>
    `;
  }

  function render() {
    renderVersion += 1;
    observer?.disconnect();

    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
    document.title = t("pageTitle");

    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.append(description);
    }
    description.content = t("description");

    root.innerHTML = `
      <a class="skip-link" href="#main">${escapeHTML(t("skip"))}</a>

      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="#home">
            <span class="brand-mark">
              <img src="${COMPANY.logo}" alt="" width="46" height="46">
            </span>
            <span>
              <span class="brand-name">${escapeHTML(localized(COMPANY.name))}</span>
              <span class="brand-tagline">${escapeHTML(t("tagline"))}</span>
            </span>
          </a>

          <nav class="site-nav" id="site-nav" aria-label="${escapeHTML(t("quickLinks"))}">
            <ul>${navigationLinks()}</ul>
          </nav>

          <div class="header-actions">
            <div class="lang-switch" role="group" aria-label="${escapeHTML(t("language"))}">
              <button
                type="button"
                data-lang="fa"
                lang="fa"
                aria-pressed="${language === "fa"}"
                class="${language === "fa" ? "is-active" : ""}"
              >فا</button>
              <button
                type="button"
                data-lang="en"
                lang="en"
                aria-pressed="${language === "en"}"
                class="${language === "en" ? "is-active" : ""}"
              >EN</button>
            </div>
            <button
              type="button"
              class="nav-toggle"
              aria-label="${escapeHTML(t("menu"))}"
              aria-controls="site-nav"
              aria-expanded="false"
              data-menu
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </header>

      <main id="main" tabindex="-1">
        <section class="hero" id="home">
          <div class="container hero-grid">
            <div class="hero-content">
              <span class="eyebrow">${escapeHTML(t("heroEyebrow"))}</span>
              <h1>${escapeHTML(localized(COMPANY.name))}</h1>
              <p style="color:white;font-weight:700">${escapeHTML(t("tagline"))}</p>
              <p class="hero-description">${escapeHTML(t("heroDescription"))}</p>
              <div class="hero-actions">
                <a class="btn btn-primary" href="#products">${escapeHTML(t("viewProducts"))}</a>
                <a class="btn btn-outline" href="#contact">${escapeHTML(t("contact"))}</a>
              </div>
              <div class="hero-stats">
                ${[
                  [`${number(25)}+`, "years"],
                  [`${number(480)}+`, "projects"],
                  [number(120), "experts"],
                  [number(18), "countries"]
                ].map(([value, label]) => `
                  <div>
                    <strong><bdi>${value}</bdi></strong>
                    <span>${escapeHTML(t(label))}</span>
                  </div>
                `).join("")}
              </div>
            </div>
            <div class="hero-media">
              ${media(COMPANY.hero, t("heroAlt"), { eager: true, ratio: "5 / 4" })}
            </div>
          </div>
        </section>

        <section class="section" id="about">
          <div class="container about-grid">
            <div class="about-content">
              <span class="eyebrow">${escapeHTML(t("aboutEyebrow"))}</span>
              ${heading(t("aboutTitle"))}
              <p>${escapeHTML(t("aboutP1"))}</p>
              <p>${escapeHTML(t("aboutP2"))}</p>
              <ul class="feature-list">
                ${t("features").map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
              </ul>
            </div>
            <figure>
              <div class="about-media">
                ${media(COMPANY.factory, t("factoryAlt"))}
              </div>
              <figcaption class="video-caption">${escapeHTML(t("capacity"))}</figcaption>
            </figure>
          </div>
        </section>

        <section class="section section-alt" id="products">
          <div class="container">
            ${heading(t("products"), t("productsIntro"))}
            <div class="product-grid">${productCards()}</div>
          </div>
        </section>

        <section class="section" id="gallery">
          <div class="container">
            ${heading(t("gallery"), t("galleryIntro"))}
            <div class="gallery-grid">
              ${GALLERY.map((item, index) => `
                <button
                  type="button"
                  class="gallery-item"
                  data-gallery="${index}"
                  aria-haspopup="dialog"
                  aria-label="${escapeHTML(`${t("enlarge")}: ${localized(item.title)}`)}"
                >
                  ${media(item.image, localized(item.title))}
                  <span class="gallery-caption">${escapeHTML(localized(item.title))}</span>
                </button>
              `).join("")}
            </div>
          </div>
        </section>

        <section class="section section-alt" id="video">
          <div class="container">
            ${heading(t("videoTitle"), t("videoIntro"))}
            <div class="video-wrapper">
              <video
                id="company-video"
                controls
                playsinline
                preload="metadata"
                aria-label="${escapeHTML(t("videoTitle"))}"
              >
                <source src="${COMPANY.video}" type="video/mp4">
                ${escapeHTML(t("videoFallback"))}
              </video>
            </div>
            <div id="video-placeholder" class="contact-card" hidden>
              <h3>${escapeHTML(t("videoUnavailable"))}</h3>
              <p>${escapeHTML(t("replaceFile"))}</p>
              <p dir="ltr" style="overflow-wrap:anywhere">${COMPANY.video}</p>
            </div>
            <p class="video-caption">
              <a id="video-file-link" href="${COMPANY.video}">
                ${escapeHTML(t("openVideo"))}
              </a>
            </p>
          </div>
        </section>

        <section class="section" id="catalogs">
          <div class="container">
            ${heading(t("catalogs"), t("catalogsIntro"))}
            <div class="catalog-grid">${catalogCards()}</div>
          </div>
        </section>

        <section class="section section-alt" id="contact">
          <div class="container">
            ${heading(t("contact"), t("contactIntro"))}
            <div class="contact-grid">
              <div class="contact-info">
                <div class="contact-people">
                  <article class="person-card">
                    ${media(COMPANY.ceoImage, localized(COMPANY.ceo), { ratio: "1 / 1" })}
                    <h3>${escapeHTML(t("ceo"))}</h3>
                    <p>${escapeHTML(localized(COMPANY.ceo))}</p>
                    <a href="${phoneLink(COMPANY.ceoPhone)}"><bdi>${COMPANY.ceoPhone}</bdi></a>
                  </article>
                  <article class="person-card">
                    ${media(COMPANY.salesImage, localized(COMPANY.salesManager), { ratio: "1 / 1" })}
                    <h3>${escapeHTML(t("salesManager"))}</h3>
                    <p>${escapeHTML(localized(COMPANY.salesManager))}</p>
                    <a href="${phoneLink(COMPANY.salesPhone)}"><bdi>${COMPANY.salesPhone}</bdi></a>
                  </article>
                </div>
                <ul class="contact-list">
                  ${contactItem(t("phone"), `<a href="${phoneLink(COMPANY.phone)}"><bdi>${COMPANY.phone}</bdi></a>`)}
                  ${contactItem(t("email"), `<a href="mailto:${COMPANY.email}">${COMPANY.email}</a>`)}
                  ${contactItem(t("salesEmail"), `<a href="mailto:${COMPANY.salesEmail}">${COMPANY.salesEmail}</a>`)}
                  ${contactItem(t("office"), `<address>${escapeHTML(localized(COMPANY.officeAddress))}</address>`)}
                  ${contactItem(t("factory"), `<address>${escapeHTML(localized(COMPANY.factoryAddress))}</address>`)}
                  ${contactItem(t("hours"), `<p>${escapeHTML(t("hoursValue"))}</p>`)}
                </ul>
              </div>

              <form id="inquiry-form" class="contact-form">
                <h3>${escapeHTML(t("formTitle"))}</h3>
                <p id="form-note" class="form-note" style="margin-block:1rem">
                  ${escapeHTML(t("formNote"))}
                </p>
                <div class="form-grid">
                  <div class="form-group">
                    <label for="inquiry-name">${escapeHTML(t("fullName"))}</label>
                    <input id="inquiry-name" name="name" autocomplete="name"
                      maxlength="100" required value="${escapeHTML(formDraft.name)}">
                  </div>
                  <div class="form-group">
                    <label for="inquiry-phone">${escapeHTML(t("phone"))}</label>
                    <input id="inquiry-phone" name="phone" type="tel"
                      autocomplete="tel" maxlength="40" value="${escapeHTML(formDraft.phone)}">
                  </div>
                  <div class="form-group full-width">
                    <label for="inquiry-email">${escapeHTML(t("email"))}</label>
                    <input id="inquiry-email" name="email" type="email"
                      autocomplete="email" maxlength="254" required
                      value="${escapeHTML(formDraft.email)}">
                  </div>
                  <div class="form-group full-width">
                    <label for="inquiry-message">${escapeHTML(t("message"))}</label>
                    <textarea id="inquiry-message" name="message" required
                      maxlength="1200">${escapeHTML(formDraft.message)}</textarea>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary" aria-describedby="form-note">
                  ${escapeHTML(t("submit"))}
                </button>
                <p id="form-status" class="form-note" role="status" style="margin-block-start:1rem"></p>
              </form>
            </div>

            <figure style="margin-block-start:2rem">
              <div class="map-container">
                ${media(COMPANY.map, t("map"), { ratio: "16 / 5" })}
              </div>
              <figcaption class="video-caption">${escapeHTML(t("map"))}</figcaption>
            </figure>
          </div>
        </section>
      </main>

      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-about">
              <h3>${escapeHTML(localized(COMPANY.name))}</h3>
              <p>${escapeHTML(t("footerDescription"))}</p>
              <p>${escapeHTML(t("demo"))}</p>
            </div>
            <div>
              <h3>${escapeHTML(t("quickLinks"))}</h3>
              <ul class="footer-links">${navigationLinks()}</ul>
            </div>
            <div>
              <h3>${escapeHTML(t("contact"))}</h3>
              <p>${escapeHTML(localized(COMPANY.officeAddress))}</p>
              <a href="${phoneLink(COMPANY.phone)}"><bdi>${COMPANY.phone}</bdi></a>
              <p><a href="mailto:${COMPANY.email}">${COMPANY.email}</a></p>
            </div>
          </div>
          <div class="footer-bottom">
            <p>${escapeHTML(t("rights"))}</p>
            <span>${escapeHTML(t("tagline"))}</span>
          </div>
        </div>
      </footer>

      <dialog class="modal" id="product-dialog" aria-labelledby="product-dialog-title">
        <div class="modal-dialog" tabindex="-1">
          <div class="modal-header">
            <h2 class="modal-title" id="product-dialog-title"></h2>
            <button type="button" class="modal-close" data-close
              aria-label="${escapeHTML(t("close"))}">&times;</button>
          </div>
          <div class="modal-body" id="product-dialog-body"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-quote>
              ${escapeHTML(t("quote"))}
            </button>
          </div>
        </div>
      </dialog>

      <dialog class="lightbox" id="gallery-dialog" aria-labelledby="gallery-caption">
        <button type="button" class="lightbox-close" data-close
          aria-label="${escapeHTML(t("close"))}">&times;</button>
        <button type="button" class="lightbox-prev" data-gallery-step="-1"
          aria-label="${escapeHTML(t("previous"))}">
          <span aria-hidden="true">${language === "fa" ? "&#10095;" : "&#10094;"}</span>
        </button>
        <figure class="lightbox-figure">
          <div id="lightbox-media"></div>
          <figcaption class="lightbox-caption" id="gallery-caption" aria-live="polite"></figcaption>
        </figure>
        <button type="button" class="lightbox-next" data-gallery-step="1"
          aria-label="${escapeHTML(t("next"))}">
          <span aria-hidden="true">${language === "fa" ? "&#10094;" : "&#10095;"}</span>
        </button>
      </dialog>

      <button type="button" class="back-to-top" data-top
        aria-label="${escapeHTML(t("backTop"))}">&#8593;</button>
    `;

    bindMedia(root);
    bindVideo();
    bindDialogs();
    bindForm();
    syncNavigation();
    observeSections();
    updateScrollState();
    refreshCatalogs();
  }

  // --------------------------------------------------
  // جایگزین رسانه‌های محلی ناموجود
  // --------------------------------------------------

  function bindMedia(container) {
    container.querySelectorAll(".local-media img").forEach((image) => {
      const showFallback = () => {
        const wrapper = image.closest(".local-media");
        wrapper.classList.add("img-missing");

        const placeholder = wrapper.querySelector(".media-placeholder");
        placeholder.style.height = "100%";
        placeholder.style.minHeight = "inherit";
      };

      image.addEventListener("error", showFallback, { once: true });

      if (image.complete && image.naturalWidth === 0) {
        showFallback();
      }
    });

    const logo = container.querySelector(".brand-mark img");
    if (logo) {
      const replaceLogo = () => {
        const mark = document.createElement("span");
        mark.textContent = "AS";
        mark.setAttribute("aria-hidden", "true");
        mark.style.cssText = [
          "display:grid",
          "place-items:center",
          "width:46px",
          "height:46px",
          "border-radius:8px",
          "background:var(--color-primary)",
          "color:white",
          "font:bold 18px Arial"
        ].join(";");

        logo.replaceWith(mark);
      };

      logo.addEventListener("error", replaceLogo, { once: true });
      if (logo.complete && logo.naturalWidth === 0) replaceLogo();
    }
  }

  function bindVideo() {
    const video = root.querySelector("#company-video");
    const source = video.querySelector("source");

    const fail = () => {
      video.pause();
      video.closest(".video-wrapper").hidden = true;
      root.querySelector("#video-placeholder").hidden = false;
      root.querySelector("#video-file-link").hidden = true;
    };

    video.addEventListener("error", fail, { once: true });
    source.addEventListener("error", fail, { once: true });

    if (video.error) fail();
  }

  // --------------------------------------------------
  // کاتالوگ‌ها
  //
  // در HTTP(S)، محتوای فایل محلی بررسی می‌شود.
  // در file:// محدودیت مرورگر اجازه بررسی مطمئن با fetch نمی‌دهد.
  // در این حالت مسیر و توضیح صریح همراه لینک واقعی نمایش داده می‌شود.
  // --------------------------------------------------

  async function probeCatalog(path) {
    if (!["http:", "https:"].includes(location.protocol)) return "unknown";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(path, {
        signal: controller.signal,
        headers: { Range: "bytes=0-1023" },
        cache: "no-cache"
      });

      if (!response.ok) {
        return response.status === 404 || response.status === 410
          ? "missing"
          : "unknown";
      }

      if (!response.body) return "unknown";

      const reader = response.body.getReader();
      let prefix = "";

      try {
        while (prefix.length < 1024) {
          const { value, done } = await reader.read();
          if (done) break;

          const slice = value.subarray(0, 1024 - prefix.length);
          prefix += String.fromCharCode(...slice);

          if (prefix.includes("%PDF-")) return "ready";
        }
      } finally {
        await reader.cancel().catch(() => {});
      }

      return prefix.includes("%PDF-") ? "ready" : "missing";
    } catch {
      return "unknown";
    } finally {
      clearTimeout(timeout);
    }
  }

  function getCatalogStatus(path) {
    if (catalogStatus.has(path)) {
      return Promise.resolve(catalogStatus.get(path));
    }

    if (!catalogRequests.has(path)) {
      const request = probeCatalog(path).then((status) => {
        catalogStatus.set(path, status);
        catalogRequests.delete(path);
        return status;
      });

      catalogRequests.set(path, request);
    }

    return catalogRequests.get(path);
  }

  function paintCatalogStatus(index, status) {
    const message = root.querySelector(`[data-catalog-status="${index}"]`);
    const actions = root.querySelector(`[data-catalog-actions="${index}"]`);

    if (!message || !actions) return;

    const keys = {
      checking: "catalogChecking",
      ready: "catalogReady",
      missing: "catalogMissing",
      unknown: "catalogUnknown"
    };

    message.textContent = t(keys[status]);
    actions.hidden = status === "missing" || status === "checking";
  }

  function refreshCatalogs() {
    const version = renderVersion;

    CATALOGS.forEach((catalog, index) => {
      paintCatalogStatus(index, catalogStatus.get(catalog.file) ?? "checking");

      getCatalogStatus(catalog.file).then((status) => {
        if (version === renderVersion) paintCatalogStatus(index, status);
      });
    });
  }

  // --------------------------------------------------
  // پنجره محصول و گالری
  // dialog بومی: محدودسازی فوکوس، Escape و غیرفعال‌سازی پس‌زمینه
  // --------------------------------------------------

  function openDialog(dialog, trigger) {
    previousFocus = trigger || document.activeElement;
    dialog.showModal();
    document.body.classList.add("is-locked");
  }

  function closeDialog(dialog) {
    if (dialog?.open) dialog.close();
  }

  function bindDialogs() {
    root.querySelectorAll("dialog").forEach((dialog) => {
      dialog.addEventListener("close", () => {
        if (!root.querySelector("dialog[open]")) {
          document.body.classList.remove("is-locked");
        }

        if (previousFocus?.isConnected) previousFocus.focus();
        previousFocus = null;
      });

      // فقط کلیک مستقیم روی پوشش بیرونی، نه محتوای پنجره.
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) closeDialog(dialog);
      });
    });
  }

  function openProduct(id, trigger) {
    const product = PRODUCTS.find((item) => item.id === id);
    if (!product) return;

    activeProduct = product;

    const dialog = root.querySelector("#product-dialog");
    const content = root.querySelector("#product-dialog-body");

    root.querySelector("#product-dialog-title").textContent = localized(product.name);

    content.innerHTML = `
      <div class="product-detail">
        <div class="about-media">
          ${media(product.image, localized(product.name), { eager: true })}
        </div>
        <div>
          <p>${escapeHTML(localized(product.details))}</p>
          <h3>${escapeHTML(t("specifications"))}</h3>
          ${specs(product, true)}
        </div>
      </div>
    `;

    bindMedia(content);
    openDialog(dialog, trigger);
  }

  function paintGallery() {
    const item = GALLERY[galleryIndex];
    const container = root.querySelector("#lightbox-media");

    container.innerHTML = `
      <div class="local-media">
        <img
          src="${escapeHTML(item.image)}"
          alt="${escapeHTML(localized(item.title))}"
          decoding="async"
        >
        <div class="media-placeholder">
          <div>
            <p>${escapeHTML(t("imageMissing"))}</p>
            <small dir="ltr" style="overflow-wrap:anywhere">${escapeHTML(item.image)}</small>
          </div>
        </div>
      </div>
    `;

    root.querySelector("#gallery-caption").textContent =
      `${localized(item.title)} - ${t("imagePosition")} ` +
      `${number(galleryIndex + 1)} ${t("of")} ${number(GALLERY.length)}`;

    bindMedia(container);
  }

  function openGallery(index, trigger) {
    if (!Number.isInteger(index) || !GALLERY[index]) return;

    galleryIndex = index;
    paintGallery();
    openDialog(root.querySelector("#gallery-dialog"), trigger);
  }

  function stepGallery(step) {
    galleryIndex = (galleryIndex + step + GALLERY.length) % GALLERY.length;
    paintGallery();
  }

  // --------------------------------------------------
  // فرم بدون بک‌اند: آماده‌سازی ایمیل، نه ارسال نمایشی
  // --------------------------------------------------

  function captureDraft() {
    const form = root.querySelector("#inquiry-form");
    if (!form) return;

    Object.keys(formDraft).forEach((key) => {
      formDraft[key] = form.elements.namedItem(key).value;
    });
  }

  function bindForm() {
    const form = root.querySelector("#inquiry-form");

    form.addEventListener("input", captureDraft);

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;
      captureDraft();

      const body = [
        `${t("fullName")}: ${formDraft.name.trim()}`,
        `${t("phone")}: ${formDraft.phone.trim()}`,
        `${t("email")}: ${formDraft.email.trim()}`,
        "",
        formDraft.message.trim()
      ].join("\n");

      const href = `mailto:${COMPANY.salesEmail}` +
        `?subject=${encodeURIComponent(t("emailSubject"))}` +
        `&body=${encodeURIComponent(body)}`;

      window.location.href = href;
      root.querySelector("#form-status").textContent = t("formStatus");
    });
  }

  function requestQuote() {
    if (!activeProduct) return;

    const addition = `${t("quoteMessage")} ${localized(activeProduct.name)}`;
    const textarea = root.querySelector("#inquiry-message");

    textarea.value = textarea.value.trim()
      ? `${textarea.value.trim()}\n\n${addition}`
      : addition;

    captureDraft();
    closeDialog(root.querySelector("#product-dialog"));

    requestAnimationFrame(() => {
      root.querySelector("#contact").scrollIntoView({ behavior: scrollBehavior() });
      textarea.focus({ preventScroll: true });
    });
  }

  // --------------------------------------------------
  // منوی موبایل، ناوبری و زبان
  // --------------------------------------------------

  const mobileQuery = window.matchMedia("(max-width: 900px)");

  function setMenu(open, restoreFocus = false) {
    const nav = root.querySelector("#site-nav");
    const button = root.querySelector("[data-menu]");

    nav.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));

    if (mobileQuery.matches) {
      nav.setAttribute("aria-hidden", String(!open));
    } else {
      nav.removeAttribute("aria-hidden");
    }

    if (!open && restoreFocus) button.focus();
  }

  function syncNavigation() {
    setMenu(false);
  }

  function scrollBehavior() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
  }

  function updateScrollState() {
    root.querySelector("[data-top]")?.classList.toggle("is-active", window.scrollY > 600);
  }

  function observeSections() {
    if (!("IntersectionObserver" in window)) return;

    const visibleSections = new Map();

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.set(entry.target.id, entry);
        else visibleSections.delete(entry.target.id);
      });

      const visible = [...visibleSections.values()].sort(
        (a, b) => Math.abs(a.target.getBoundingClientRect().top - 100) -
                  Math.abs(b.target.getBoundingClientRect().top - 100)
      );

      if (!visible.length) return;
      const activeId = visible[0].target.id;

      root.querySelectorAll(".site-nav a").forEach((link) => {
        const active = link.getAttribute("href") === `#${activeId}`;
        link.classList.toggle("is-active", active);

        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, {
      rootMargin: "-80px 0px -35% 0px",
      threshold: 0
    });

    root.querySelectorAll("main > section[id]").forEach((section) => {
      observer.observe(section);
    });
  }

  function changeLanguage(nextLanguage) {
    if (!LANGUAGES.includes(nextLanguage) || nextLanguage === language) return;

    captureDraft();

    const sections = [...root.querySelectorAll("main > section[id]")];
    const anchor = sections.find((section) => section.getBoundingClientRect().bottom > 100);
    const offset = anchor?.getBoundingClientRect().top ?? 0;
    const anchorId = anchor?.id;

    root.querySelector("#company-video")?.pause();
    root.querySelectorAll("dialog[open]").forEach((dialog) => dialog.close());
    document.body.classList.remove("is-locked");

    language = nextLanguage;

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // سایت بدون دسترسی به فضای ذخیره‌سازی نیز کار می‌کند.
    }

    render();

    requestAnimationFrame(() => {
      if (anchorId) {
        const element = document.getElementById(anchorId);
        window.scrollBy({
          top: element.getBoundingClientRect().top - offset,
          behavior: "instant"
        });
      }

      root.querySelector(`[data-lang="${language}"]`).focus({ preventScroll: true });
    });
  }

  // --------------------------------------------------
  // رویدادهای مرکزی؛ هنگام تغییر زبان دوباره نصب نمی‌شوند
  // --------------------------------------------------

  function handleClick(event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const languageButton = target.closest("[data-lang]");
    if (languageButton) {
      changeLanguage(languageButton.dataset.lang);
      return;
    }

    const menuButton = target.closest("[data-menu]");
    if (menuButton) {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
      return;
    }

    const productButton = target.closest("[data-product]");
    if (productButton) {
      openProduct(productButton.dataset.product, productButton);
      return;
    }

    const galleryButton = target.closest("[data-gallery]");
    if (galleryButton) {
      openGallery(Number(galleryButton.dataset.gallery), galleryButton);
      return;
    }

    const stepButton = target.closest("[data-gallery-step]");
    if (stepButton) {
      stepGallery(Number(stepButton.dataset.galleryStep));
      return;
    }

    const closeButton = target.closest("[data-close]");
    if (closeButton) {
      closeDialog(closeButton.closest("dialog"));
      return;
    }

    if (target.closest("[data-quote]")) {
      requestQuote();
      return;
    }

    if (target.closest("[data-top]")) {
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
      root.querySelector(".brand").focus({ preventScroll: true });
      return;
    }

    const anchor = target.closest('a[href^="#"]');
    if (anchor) {
      const id = anchor.getAttribute("href").slice(1);
      const destination = document.getElementById(id);
      if (!destination) return;

      event.preventDefault();
      setMenu(false);

      if (!destination.hasAttribute("tabindex")) {
        destination.setAttribute("tabindex", "-1");
      }

      destination.focus({ preventScroll: true });
      destination.scrollIntoView({ behavior: scrollBehavior() });

      try {
        history.replaceState(null, "", `#${id}`);
      } catch {
        // برخی محیط‌های محلی تغییر history را محدود می‌کنند.
      }
      return;
    }

    if (!target.closest(".site-header")) setMenu(false);
  }

  function handleKeydown(event) {
    const gallery = root.querySelector("#gallery-dialog");

    if (gallery.open && ["ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.preventDefault();

      const next = language === "fa"
        ? event.key === "ArrowLeft"
        : event.key === "ArrowRight";

      stepGallery(next ? 1 : -1);
      return;
    }

    if (event.key === "Escape" && !root.querySelector("dialog[open]")) {
      const menuButton = root.querySelector("[data-menu]");
      if (menuButton.getAttribute("aria-expanded") === "true") {
        setMenu(false, true);
      }
    }
  }

  // --------------------------------------------------
  // آغاز
  // --------------------------------------------------

  function init() {
    // فقط ساختار صفحه جایگزین می‌شود؛ styles.css موجود حفظ می‌شود.
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement("meta");
      viewport.name = "viewport";
      viewport.content = "width=device-width, initial-scale=1";
      document.head.append(viewport);
    }

    // در صورت نبود لینک استایل، همان فایل محلی پیشنهادی اضافه می‌شود.
    if (!document.querySelector('link[rel="stylesheet"]')) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "./styles.css";
      document.head.append(stylesheet);
    }

    root = document.createElement("div");
    root.id = "industrial-site";
    document.body.replaceChildren(root);

    root.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);

    let scrollScheduled = false;

    window.addEventListener("scroll", () => {
      if (scrollScheduled) return;
      scrollScheduled = true;

      requestAnimationFrame(() => {
        updateScrollState();
        scrollScheduled = false;
      });
    }, { passive: true });

    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener("change", syncNavigation);
    } else {
      mobileQuery.addListener(syncNavigation);
    }

    render();

    // حفظ امکان ورود مستقیم با پیوندهایی مانند index.html#products.
    if (location.hash) {
      let id;
      try {
        id = decodeURIComponent(location.hash.slice(1));
      } catch {
        id = "";
      }

      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
/* ==================================================
   Inline text editor
   Append this block to the END of script.js.
   No HTML or CSS changes are required.
   ================================================== */

(() => {
  "use strict";

  const STORAGE_KEY = "aria-steel-text-edits-v1";
  const MARKER = "data-aria-editable";
  const records = new WeakMap();

  let root;
  let observer;
  let active = null;
  let editing = null;
  let hideTimer;
  let scanPending = false;
  let saved = Object.create(null);

  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    if (value && typeof value === "object" && !Array.isArray(value)) {
      saved = Object.assign(Object.create(null), value);
    }
  } catch {
    // Editing remains available when storage is unavailable.
  }

  const isEnglish = () =>
    document.documentElement.lang.toLowerCase().startsWith("en");

  const text = (fa, en) => (isEnglish() ? en : fa);

  function start() {
    root = document.getElementById("industrial-site");
    if (!root || document.getElementById("aria-text-editor")) return;

    const style = document.createElement("style");

    style.textContent = `
      [${MARKER}] {
        border-radius: 3px;
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
      }

      [${MARKER}]:hover,
      [${MARKER}]:focus-visible {
        outline: 1px dashed #c18416;
        outline-offset: 3px;
        background-color: rgb(242 174 53 / 12%);
      }

      #aria-edit-trigger {
        position: fixed;
        z-index: 2147483646;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 66px;
        min-height: 36px;
        padding: 5px 12px;
        margin: 0;
        border: 1px solid #153b57;
        border-radius: 7px;
        background: #153b57;
        color: #fff;
        font: 700 13px Tahoma, Arial, sans-serif;
        line-height: 1.5;
        box-shadow: 0 4px 18px rgb(0 0 0 / 24%);
        cursor: pointer;
      }

      #aria-edit-trigger:hover {
        background: #0c263b;
      }

      #aria-edit-trigger[hidden] {
        display: none !important;
      }

      #aria-text-editor {
        position: fixed;
        inset: 0;
        width: min(560px, calc(100% - 28px));
        max-width: 560px;
        max-height: calc(100dvh - 32px);
        margin: auto;
        padding: 24px;
        overflow: auto;
        border: 1px solid #dce5ec;
        border-radius: 16px;
        background: #fff;
        color: #203244;
        font-family: Tahoma, Arial, sans-serif;
        line-height: 1.8;
        box-shadow: 0 24px 80px rgb(0 0 0 / 30%);
      }

      #aria-text-editor::backdrop {
        background: rgb(4 15 25 / 70%);
      }

      #aria-text-editor h2 {
        margin: 0 0 16px;
        color: #102a40;
        font-size: 20px;
      }

      #aria-text-editor label {
        display: block;
        margin-bottom: 8px;
        font-weight: 700;
      }

      #aria-editor-input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        min-height: 150px;
        margin: 0;
        padding: 12px;
        border: 1px solid #a9bdcc;
        border-radius: 8px;
        background: #fff;
        color: #203244;
        font: inherit;
        line-height: 1.9;
        text-align: start;
        resize: vertical;
      }

      #aria-editor-note {
        margin: 12px 0;
        color: #596c7c;
        font-size: 12px;
      }

      #aria-editor-status {
        margin: 12px 0;
        color: #b42318;
        font-size: 13px;
      }

      #aria-text-editor .aria-editor-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 18px;
      }

      #aria-text-editor button {
        min-height: 42px;
        padding: 8px 14px;
        border: 1px solid #c6d3dd;
        border-radius: 8px;
        background: #f4f7fa;
        color: #203244;
        font: inherit;
        cursor: pointer;
      }

      #aria-text-editor #aria-editor-save {
        border-color: #153b57;
        background: #153b57;
        color: #fff;
      }

      #aria-text-editor button:focus-visible,
      #aria-edit-trigger:focus-visible,
      #aria-editor-input:focus-visible {
        outline: 3px solid #f2ae35;
        outline-offset: 3px;
      }

      @media print {
        #aria-edit-trigger,
        #aria-text-editor {
          display: none !important;
        }

        [${MARKER}] {
          outline: none !important;
          background: transparent !important;
        }
      }
    `;

    document.head.append(style);

    const trigger = document.createElement("button");
    trigger.id = "aria-edit-trigger";
    trigger.type = "button";
    trigger.hidden = true;
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-controls", "aria-text-editor");

    const dialog = document.createElement("dialog");
    dialog.id = "aria-text-editor";
    dialog.setAttribute("aria-labelledby", "aria-editor-title");

    dialog.innerHTML = `
      <form id="aria-editor-form">
        <h2 id="aria-editor-title"></h2>
        <label id="aria-editor-label" for="aria-editor-input"></label>
        <textarea
          id="aria-editor-input"
          dir="auto"
          aria-describedby="aria-editor-note"
        ></textarea>
        <p id="aria-editor-note"></p>
        <p id="aria-editor-status" role="status"></p>
        <div class="aria-editor-actions">
          <button id="aria-editor-save" type="submit"></button>
          <button id="aria-editor-reset" type="button"></button>
          <button id="aria-editor-cancel" type="button"></button>
        </div>
      </form>
    `;

    document.body.append(trigger, dialog);

    const input = dialog.querySelector("#aria-editor-input");
    const status = dialog.querySelector("#aria-editor-status");

    /*
     * Use a structural location plus the original text.
     * Identical labels in different locations remain independent.
     */
    function elementPath(element) {
      const parts = [];

      while (element && element !== root) {
        const parent = element.parentElement;
        if (!parent) break;

        const siblings = [...parent.children].filter(
          (child) => !child.hasAttribute(MARKER)
        );

        parts.unshift(
          `${element.localName}:${siblings.indexOf(element)}`
        );

        element = parent;
      }

      return parts.join("/");
    }

    function makeKey(node, original) {
      const parent = node.parentElement;
      const index = [...parent.childNodes].indexOf(node);

      return JSON.stringify([
        location.pathname,
        document.documentElement.lang || "fa",
        elementPath(parent),
        index,
        original
      ]);
    }

    function scan() {
      observer.disconnect();

      try {
        const nodes = [];
        const walker = document.createTreeWalker(
          root,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode(node) {
              if (!node.textContent.trim()) {
                return NodeFilter.FILTER_REJECT;
              }

              const parent = node.parentElement;
              if (!parent) return NodeFilter.FILTER_REJECT;

              if (
                parent.closest(
                  `script, style, noscript, textarea, select, option,
                   svg, math, video, audio, iframe,
                   [contenteditable], [${MARKER}],
                   .sr-only, .visually-hidden, .skip-link,
                   [aria-hidden="true"]`
                )
              ) {
                return NodeFilter.FILTER_REJECT;
              }

              return NodeFilter.FILTER_ACCEPT;
            }
          }
        );

        while (walker.nextNode()) nodes.push(walker.currentNode);

        /*
         * Calculate every key before changing the DOM.
         */
        const pending = nodes.map((node) => {
          const original = node.textContent;

          return {
            node,
            original,
            key: makeKey(node, original)
          };
        });

        for (const { node, original, key } of pending) {
          const span = document.createElement("span");

          span.setAttribute(MARKER, "");
          span.tabIndex = 0;

          span.textContent =
            typeof saved[key] === "string" ? saved[key] : original;

          records.set(span, { key, original });
          node.replaceWith(span);
        }

        if (active && !active.isConnected) hideTrigger();
      } finally {
        observer.observe(root, {
          subtree: true,
          childList: true,
          characterData: true
        });
      }
    }

    function scheduleScan() {
      if (scanPending) return;

      scanPending = true;

      queueMicrotask(() => {
        scanPending = false;
        scan();
      });
    }

    function hideTrigger() {
      clearTimeout(hideTimer);
      trigger.hidden = true;
      active = null;
    }

    function scheduleHide() {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(hideTrigger, 450);
    }

    function showTrigger(span) {
      if (!span || !records.has(span) || dialog.open) return;

      clearTimeout(hideTimer);
      active = span;

      /*
       * A control inside a native dialog must belong to that
       * dialog to appear above the browser's modal top layer.
       */
      const host = span.closest("dialog[open]") || document.body;

      if (trigger.parentElement !== host) host.append(trigger);

      trigger.textContent = text("ویرایش", "Edit");
      trigger.setAttribute(
        "aria-label",
        text("ویرایش این متن", "Edit this text")
      );
      trigger.hidden = false;

      const rect = span.getBoundingClientRect();
      const width = trigger.offsetWidth;
      const height = trigger.offsetHeight;

      const left = Math.max(
        8,
        Math.min(rect.right - width, window.innerWidth - width - 8)
      );

      const preferredTop =
        rect.top >= height + 10
          ? rect.top - height - 5
          : rect.bottom + 5;

      const top = Math.max(
        8,
        Math.min(preferredTop, window.innerHeight - height - 8)
      );

      trigger.style.left = `${left}px`;
      trigger.style.top = `${top}px`;
    }

    function updateLabels() {
      dialog.dir = isEnglish() ? "ltr" : "rtl";

      dialog.querySelector("#aria-editor-title").textContent =
        text("ویرایش متن", "Edit text");

      dialog.querySelector("#aria-editor-label").textContent =
        text("متن جدید", "New text");

      dialog.querySelector("#aria-editor-note").textContent =
        text(
          "تغییرات فقط در همین مرورگر ذخیره می‌شوند. مقصد لینک‌ها تغییر نمی‌کند.",
          "Changes are saved only in this browser. Link destinations are unchanged."
        );

      dialog.querySelector("#aria-editor-save").textContent =
        text("ذخیره", "Save");

      dialog.querySelector("#aria-editor-reset").textContent =
        text("بازگردانی متن اصلی", "Restore original");

      dialog.querySelector("#aria-editor-cancel").textContent =
        text("بستن", "Close");
    }

    function persist() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        return true;
      } catch {
        return false;
      }
    }

    function applyValue(key, value) {
      root.querySelectorAll(`[${MARKER}]`).forEach((span) => {
        if (records.get(span)?.key === key) {
          span.textContent = value;
        }
      });
    }

    function finishSave(persisted) {
      if (persisted) {
        dialog.close();
      } else {
        status.textContent = text(
          "متن فعلاً تغییر کرد، اما مرورگر اجازه ذخیره دائمی نداد. ممکن است پس از رفرش از بین برود.",
          "The text changed, but browser storage failed. It may be lost after refreshing."
        );
      }
    }

    trigger.addEventListener("pointerenter", () => {
      clearTimeout(hideTimer);
    });

    trigger.addEventListener("pointerleave", scheduleHide);

    trigger.addEventListener("focus", () => {
      clearTimeout(hideTimer);
    });

    trigger.addEventListener("blur", scheduleHide);

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const span = active;
      if (!span?.isConnected) return;

      editing = {
        span,
        ...records.get(span)
      };

      updateLabels();
      input.value = span.textContent;
      status.textContent = "";
      hideTrigger();

      dialog.showModal();
      input.focus();
      input.select();
    });

    root.addEventListener("pointerover", (event) => {
      if (!(event.target instanceof Element)) return;

      const span = event.target.closest(`[${MARKER}]`);
      if (span) showTrigger(span);
    });

    root.addEventListener("pointerout", (event) => {
      if (!(event.target instanceof Element)) return;

      if (event.target.closest(`[${MARKER}]`)) {
        scheduleHide();
      }
    });

    root.addEventListener("focusin", (event) => {
      if (!(event.target instanceof Element)) return;

      const span = event.target.closest(`[${MARKER}]`);
      if (span) showTrigger(span);
    });

    root.addEventListener("focusout", (event) => {
      if (event.relatedTarget !== trigger) scheduleHide();
    });

    /*
     * On touch screens, the first tap selects the text instead
     * of activating its surrounding link or button.
     * A second tap on the same text performs the normal action.
     */
    let touchedSpan = null;
    let touchedAt = 0;

    root.addEventListener("pointerdown", (event) => {
      if (
        event.pointerType !== "touch" ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const span = event.target.closest(`[${MARKER}]`);
      if (!span) return;

      if (
        touchedSpan === span &&
        Date.now() - touchedAt < 4000
      ) {
        touchedSpan = null;
        return;
      }

      touchedSpan = span;
      touchedAt = Date.now();
      showTrigger(span);

      const blockFirstClick = (clickEvent) => {
        clickEvent.preventDefault();
        clickEvent.stopImmediatePropagation();
        root.removeEventListener("click", blockFirstClick, true);
        showTrigger(span);
      };

      root.addEventListener("click", blockFirstClick, true);

      setTimeout(() => {
        root.removeEventListener("click", blockFirstClick, true);
      }, 800);
    }, true);

    dialog.querySelector("#aria-editor-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();

        if (!editing) return;

        if (!input.value.trim()) {
          status.textContent = text(
            "متن نمی‌تواند خالی باشد.",
            "Text cannot be empty."
          );
          input.focus();
          return;
        }

        saved[editing.key] = input.value;
        applyValue(editing.key, input.value);
        finishSave(persist());
      });

    dialog.querySelector("#aria-editor-reset")
      .addEventListener("click", () => {
        if (!editing) return;

        delete saved[editing.key];
        applyValue(editing.key, editing.original);
        input.value = editing.original;

        finishSave(persist());
      });

    dialog.querySelector("#aria-editor-cancel")
      .addEventListener("click", () => dialog.close());

    /*
     * Keep the site's gallery arrow-key shortcuts from running
     * while text is being edited over an existing gallery dialog.
     */
    document.addEventListener("keydown", (event) => {
      if (!dialog.open) return;

      event.stopImmediatePropagation();

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "enter"
      ) {
        event.preventDefault();
        dialog.querySelector("#aria-editor-form").requestSubmit();
      }
    }, true);

    dialog.addEventListener("close", () => {
      const span = editing?.span;
      editing = null;
      hideTrigger();

      if (span?.isConnected) {
        span.focus({ preventScroll: true });
      }
    });

    document.addEventListener("pointerdown", (event) => {
      if (!(event.target instanceof Element)) return;

      if (
        event.target.closest(
          `[${MARKER}], #aria-edit-trigger, #aria-text-editor`
        )
      ) {
        return;
      }

      hideTrigger();
    }, true);

    window.addEventListener("resize", hideTrigger);

    document.addEventListener("scroll", (event) => {
      if (
        event.target instanceof Node &&
        dialog.contains(event.target)
      ) {
        return;
      }

      hideTrigger();
    }, true);

    observer = new MutationObserver(scheduleScan);
    scan();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
