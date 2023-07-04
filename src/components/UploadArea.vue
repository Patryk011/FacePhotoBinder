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
    async handleImageUpload(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      const images = Array.from(files);

      const processedImages = await Promise.all(
        images.map(async (imageFile) => {
          const dataURL = await this.convertFileToDataURL(imageFile);
          const blob = await this.convertFileToBlob(imageFile);

          return {
            dataURL,
            blob,
          };
        })
      );

      this.$emit("images-uploaded", processedImages);
    },

    convertFileToDataURL(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    },
    convertFileToBlob(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const blob = new Blob([event.target.result], { type: file.type });
          resolve(blob);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
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
