// スタイルのインポート
import "ress";
import "../styles/style.scss";
import "swiper/swiper-bundle.css";

// fontawesomeのインポート
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

// swiperのインポート
import Swiper, { Navigation, Pagination } from "swiper";

// fontawesomeの監視とその監視対象の追加
library.add(faBars, faCircleCheck, faQuoteLeft, faQuoteRight);
dom.watch();

// ハンバーガーメニューの実装
// 必要な要素の取得

const hamburger = document.querySelector(".hamburger") as HTMLButtonElement;
const menu = document.querySelector(".header__nav") as HTMLElement;
const menuList = document.querySelector(".header__nav ul") as HTMLUListElement;
const headerTitle = document.querySelector(
  ".header__title"
) as HTMLHeadingElement;

// ハンバーガーボタンのクリックに対してactiveクラスを付けはずしする
hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");

  if (menu.classList.contains("active")) {
    menu.style.height = `${menuList.clientHeight / 16}rem`;
  } else {
    menu.removeAttribute("style");
  }
});

// ハンバーガーメニューを閉じるイベントリスナーのコールバック関数
const removeMenu = () => {
  if (!menu.classList.contains("active")) return;
  menu.classList.remove("active");
  menu.removeAttribute("style");
};

// ヘッダータイトルをクリックした際もハンバーガーメニューを閉じる
headerTitle.addEventListener("click", removeMenu);

// ヘッダーリンクのスクロール制御
// 必要な要素の取得
const navlinks = document.querySelectorAll(
  ".header__list"
) as NodeListOf<HTMLLinkElement>;
const header = document.querySelector(".header") as HTMLHeadElement;

// ページ内スクロールのプログラム
const linkAction = (event: MouseEvent) => {
  // デフォルトの挙動を停止
  event.preventDefault();
  // リンクをクリックしたらハンバーガーメニューを閉じる
  removeMenu();

  // リンク先のid名を取得
  const linkId = (event.target as HTMLLinkElement)
    .getAttribute("href")
    ?.replace("#", "");

  // リンク先のウィンドウからの相対座標を取得
  if (!linkId) return;
  const rect = document.getElementById(linkId)?.getBoundingClientRect();

  // リンク先との相対座標 - ヘッダーの高さ
  if (!rect) return;
  const y = rect.y - header.clientHeight;

  // 相対スクロール
  window.scrollBy(0, y);
};

// リンクアクションを各ヘッダーメニューへ適用
navlinks.forEach((link) => {
  link.addEventListener("click", (e) => linkAction(e));
});

// swiperのイニシャライズ
const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination],
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  loop: true,
  slidesPerView: 1,
  centeredSlides: true,
  breakpoints: {
    768: {
      slidesPerView: 3,
      centeredSlides: true,
    },
  },
});

// スライダーナビゲーションの実装
// 必要な要素の取得
const prev = document.querySelector(
  ".slider__button--prev img"
) as HTMLImageElement;
const next = document.querySelector(
  ".slider__button--next img"
) as HTMLImageElement;

// 各ボタンへスライド機能の追加
prev.addEventListener("click", () => swiper.slidePrev());
next.addEventListener("click", () => swiper.slideNext());

// アコーディオン
// 必要な要素の取得
const tabs = document.querySelectorAll(
  ".accordion__tab"
) as NodeListOf<HTMLDivElement>;
const accordions = document.querySelectorAll(
  ".accordion__panel"
) as NodeListOf<HTMLDivElement>;
const accordionInner = document.querySelectorAll(
  ".accordion__inner"
) as NodeListOf<HTMLDivElement>;

// 各アコーディオンパネルの開閉プログラム
// indexは各要素の順番、toggleはtrueでパネルの開閉、falseで要素の高さの再計算
const accordionCallback = (index: number, toggle: boolean) => {
  const accordion = accordions[index];
  const tab = tabs[index];
  const inner = accordionInner[index];

  if (toggle) {
    tab.classList.toggle("active");
  }

  if (tab.classList.contains("active")) {
    accordion.style.height = `${inner.clientHeight / 16}rem`;
  } else {
    accordion?.removeAttribute("style");
  }
};

// 各タブに開閉プログラムを適用
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => accordionCallback(index, true));
});

// スクロールアニメーションの実装

// 必要な要素の取得
const animationTarget = document.querySelectorAll(
  ".intersective"
) as NodeListOf<HTMLElement>;

// 発火時にintersectiveクラスを外すプログラム
const intersectionObserverCallback: IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("intersective");
    observer.unobserve(entry.target);
  });
};

// オプション
const intersectionObserverOptions: IntersectionObserverInit = {
  rootMargin: "-40% 0px",
};

// intersectionObserverのイニシャライズ
const observer = new IntersectionObserver(
  intersectionObserverCallback,
  intersectionObserverOptions
);

// 各ターゲットへobserverの登録
animationTarget.forEach((target) => {
  observer.observe(target);
});

// viewportをスクロールバーを除いて計算するプログラム(--vw)
const jsViewPort = () => {
  let vw = document.body.clientWidth;
  document.documentElement.style.setProperty("--vw", `${vw / 16}rem`);
};

// 初回読み込み時にカスタムプロパティのviewportを計算して割り当て
window.addEventListener("DOMContentLoaded", () => {
  jsViewPort();
});

// 画面リサイズイベント
window.addEventListener("resize", () => {
  // 各アコーディオンパネルの高さを再計算
  tabs.forEach((_, index) => accordionCallback(index, false));
  // ハンバーガーメニューを閉じる
  removeMenu();
  // viewportの再計算
  jsViewPort();
});
