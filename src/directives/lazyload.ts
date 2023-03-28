const ANIMATION_DURATION = 1000;

const loadImage = (el: any) => {
  return new Promise((resolve) => {
    el.onload = () => resolve(true);
  });
};

const hideImage = (el: any) => {
  el.style.visibility = "hidden";
  el.style.opacity = "0";
  el.style.scale = "1.1";
  el.style.filter = "blur(30px)";
  el.style["-webkit-filter"] = "blur(30px)";
};

const showImage = (el: any) => {
  el.style.visibility = "visible";
  el.style.transition = `all ${ANIMATION_DURATION}ms ease`;
  el.style.opacity = "1";
  el.style.scale = "1";
  el.style["-webkit-filter"] = "blur(0)";
};

export default {
  created(el: HTMLElement) {
    hideImage(el);
    loadImage(el).then(() => showImage(el));
  },
};
