// 虚拟代理实现图片预加载
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function isDom($node) {
  return true;
}

class Img {
  constructor($mount) {
    this.$img = document.createElement("img");
    if (isDom($mount)) {
      $mount.appendChild(this.$img);
    }
  }

  setSrc(src) {
    this.$img.src = src;
  }
}

class ImgProxy {
  constructor($mount) {
    this.$img = new Img($mount);
    this.$imageCacheObj = new Image();
    this.$imageCacheObj.onload = function(){
        this.$img.setSrc(imageCacheObj.src); 
    }
  }

  setSrc(src) {
      this.$img.setSrc('loading.gif');
      this.$imageCacheObj.src = src;
  }
}

