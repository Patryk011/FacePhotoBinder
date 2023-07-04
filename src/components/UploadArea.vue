<template>
  <div class="upload-container">
    <label for="imageUpload">Przeciągnij i upuść zdjęcia: </label>
    <div
      class="file-upload"
      @dragover.prevent
      @drop.prevent="handleImageUpload"
    >
      <span>Upuść tutaj pliki</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadArea",
  emits: ["images-uploaded"],
  methods: {
    handleImageUpload(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      const images = Array.from(files);

      let imagesData = [];

      images.forEach((imageFile, index) => {
        let reader = new FileReader();

        reader.onload = (event) => {
          imagesData.push({ file: imageFile, dataURL: event.target.result });

          // Emit images-uploaded event when all files are processed
          if (index === images.length - 1) {
            this.$emit("images-uploaded", imagesData);
          }
        };

        reader.readAsDataURL(imageFile);
      });
    },
  },
};
</script>

<style scoped>
.upload-container {
  text-align: center;
  margin-bottom: 30px;
}

.upload-container label {
  display: block;
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
}

.file-upload {
  border: 2px dashed #4caf50;
  border-radius: 5px;
  padding: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.file-upload:hover {
  background-color: #f0f0f0;
}

.file-upload span {
  font-size: 16px;
  color: #4caf50;
}
</style>
