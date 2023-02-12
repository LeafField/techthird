import "ress";
import "../styles/style.scss";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

library.add(faBars, faCircleCheck);
dom.watch();

// ハンバーガーメニューの実装
// 必要な要素の取得

const hamburger = document.querySelector(".hamburger") as HTMLButtonElement;
const menu = document.querySelector(".header__nav") as HTMLElement;

// ハンバーガーボタンのクリックに対してactiveクラスを付けはずしする
hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");

  if (menu.classList.contains("active")) {
    menu.style.height = `calc(129 / 375 * 100vw)`;
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
