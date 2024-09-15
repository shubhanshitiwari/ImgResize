const uploadBox = document.querySelector(".upload-box");
const fileInput = uploadBox.querySelector("input");
const previewImg = uploadBox.querySelector("img");
const widthInput = document.querySelector(".width input");
const heightInput = document.querySelector(".height input");
const ratioInput = document.querySelector("#ratio"); // Fixed this selector
const downloadBtn = document.querySelector(".download-btn");
const qualityInput = document.querySelector("#quality");

let ogImageRatio, imgQuality = 1.0; // Set default image quality

const loadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
}

widthInput.addEventListener("keyup", () => {
    if (ratioInput.checked) {
        heightInput.value = Math.floor(widthInput.value / ogImageRatio);
    }
});

heightInput.addEventListener("keyup", () => {
    if (ratioInput.checked) {
        widthInput.value = Math.floor(heightInput.value * ogImageRatio);
    }
});

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    const width = widthInput.value;
    const height = heightInput.value;

    canvas.width = width;
    canvas.height = height;

    // Set image quality
    imgQuality = qualityInput.checked ? 0.7 : 1.0;

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = "resized-image.jpg"; // Set a filename for the download
    a.click();
}

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
