document.getElementById("file-input").addEventListener("change", function () {
  const file = this.files[0];
  if (file && file.type === "image/jpeg") {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = document.getElementById("preview-image");
      img.src = event.target.result;
      img.style.display = "block";

      // Convert JPG to PNG
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const image = new Image();

      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        // Generate PNG file
        const pngUrl = canvas.toDataURL("image/png");
        document.getElementById("download-btn").href = pngUrl;
        document.querySelector(".preview-section").style.display = "block";
      };

      image.src = event.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    alert("Please upload a valid JPG image.");
  }
});
