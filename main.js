document.getElementById('upload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
          const imgElement = document.getElementById('original-image');
          imgElement.src = event.target.result;
          imgElement.onload = function() {
              processImage(imgElement);
          };
      };
      reader.readAsDataURL(file);
  }
});

function onOpenCvReady() {
  console.log('OpenCV.js is ready.');
}

function processImage(imgElement) {
  const src = cv.imread(imgElement);
  const dst = new cv.Mat();
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.GaussianBlur(src, src, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
  cv.Canny(src, dst, 50, 150, 3, false);
  cv.bitwise_not(dst, dst);
  cv.imshow('sketch-canvas', dst);
  src.delete();
  dst.delete();
}
