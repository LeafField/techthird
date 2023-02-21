// スタイルのインポート
import "ress";
import "../styles/style.scss";
import "swiper/swiper-bundle.css";

// fontawesomeのインポート
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

// swiperのインポート
import Swiper, { Navigation, Pagination } from "swiper";

// fontawesomeの監視とその監視対象の追加
library.add(faBars, faCircleCheck);
dom.watch();

// ハンバーガーメニューの実装
// 必要な要素の取得

const hamburger = document.querySelector(".hamburger") as HTMLButtonElement;
const menu = document.querySelector(".header__nav") as HTMLElement;
const menuList = document.querySelector(".header__nav ul") as HTMLUListElement;

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

// リサイズ時ハンバーガーメニューを閉じる
window.addEventListener("resize", removeMenu);

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
  ".information__tab"
) as NodeListOf<HTMLDivElement>;
const accordions = document.querySelectorAll(
  ".information__accordion"
) as NodeListOf<HTMLDivElement>;
const accordionInner = document.querySelectorAll(
  ".information__container"
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
    accordion.style.height = `${inner.clientHeight}px`;
  } else {
    accordion?.removeAttribute("style");
  }
};

// 各タブに開閉プログラムを適用
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => accordionCallback(index, true));
});

// リサイズ時に高さを再計算
window.addEventListener("resize", () => {
  tabs.forEach((_, index) => accordionCallback(index, false));
});
