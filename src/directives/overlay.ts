const INTERVAL_DELAY = 60000; // 60s
const ANIMATION_DELAY = 1000; // 1s

const loadImage = (el: any): Promise<boolean> => {
  return new Promise((resolve) => {
    el.onload = () => resolve(true);
  });
};

const prepareImage = (el: any) => {
  el.style.opacity = "0";
  el.style.position = "absolute";
  el.style.top = "0";
  el.style.left = "0";
  el.style.width = "100%";
  el.style.height = "100%";
  el.style.objectFit = "cover";
  el.style.transition = `all ${ANIMATION_DELAY}ms ease`;
};

const hideImage = (el: any) => {
  el.style.opacity = "0";
  el.style.scale = "1.1";
  el.style.filter = "blur(30px)";
  el.style["-webkit-filter"] = "blur(40px)";
};

const showImage = (el: any) => {
  el.style.scale = "1";
  el.style.opacity = "1";
  el.style["-webkit-filter"] = "blur(0)";

  setTimeout(() => {
    hideImage(el);
  }, INTERVAL_DELAY);
};

const animate = async (images: any) => {
  const promises: Promise<boolean>[] = [];
  images.forEach((image: any) => promises.push(loadImage(image)));

  hideImage(images[0]);

  setTimeout(() => {
    showImage(images[0]);
  }, 1000);

  Promise.all(promises).then(() => {
    let index = 1;
    const count = images.length;

    setInterval(() => {
      showImage(images[index]);

      index++;
      if (index >= count) index = 0;
    }, INTERVAL_DELAY);
  });
};

export default {
  async created(el: HTMLElement) {
    const images = el.querySelectorAll("img");
    images.forEach((image) => prepareImage(image));
    await animate(images);
  },
};
