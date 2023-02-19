// スタイルのインポート
import "ress";
import "../styles/style.scss";

// fontawesomeのインポート
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

// swiperのインポート
import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";

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
