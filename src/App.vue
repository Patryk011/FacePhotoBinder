<template>
  <div class="id">
    <h1>Segregator zdjęć</h1>
    <UploadArea @images-uploaded="handleImagesUploaded" />
    <div v-if="isProcessing">
      <p>Trwa przetwarzanie...</p>
    </div>
    <div v-if="sortedFolders.length" class="folders">
      <Folder
        v-for="(folder, index) in sortedFolders"
        :key="index"
        :title="folder.title"
        :images="folder.images"
        @download-folder="downloadFolder($event, folder.title)"
      />
      <button @click="resetView" class="reset-button">Domyślny widok</button>
    </div>
  </div>
</template>

<!-- <button v-if="sortedFolders.length" class="reset-button" @click="resetView">Resetuj widok</button> -->

<script>
import UploadArea from "./components/UploadArea.vue";
import Folder from "./components/Folder.vue";
import JSZip from "jszip";
import { detectAllFaces } from "face-api.js";

export default {
  name: "App",
  components: {
    UploadArea,
    Folder,
  },
  data() {
    return {
      sortedFolders: [],
      isProcessing: false,
    };
  },
  methods: {
    resetView() {
      this.sortedFolders = [];
    },
    async handleImagesUploaded(images) {
      this.isProcessing = true;

      const imagesWithFaces = [];
      const imagesWithoutFaces = [];

      await Promise.all(
        images.map(async (imageData) => {
          const hasFace = await this.detectFace(imageData.dataURL);
          if (hasFace) {
            imagesWithFaces.push(imageData);
          } else {
            imagesWithoutFaces.push(imageData);
          }
        })
      );

      this.sortedFolders = [
        { title: "Folder z ludźmi", images: imagesWithFaces },
        { title: "Folder bez ludzi ", images: imagesWithoutFaces },
      ];

      this.isProcessing = false;
    },

    async detectFace(dataURL) {
      let image = new Image();
      image.src = dataURL;
      await image.decode(); // Make sure image is loaded

      const detections = await detectAllFaces(image);
      return detections.length > 0;
    },
    async downloadFolder(images, title) {
      const zip = new JSZip();

      for (let index = 0; index < images.length; index++) {
        const image = images[index];
        const fileName = `Obraz_${index + 1}.jpg`;
        zip.file(fileName, image.blob, { binary: true });
      }

      zip.generateAsync({ type: "blob" }).then((content) => {
        const downloadUrl = URL.createObjectURL(content);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `${title}.zip`;
        link.click();
      });
    },
  },
};
</script>

<style>
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  border-radius: 10px;
}

h1 {
  text-align: center;
  font-size: 30px;
  color: #333;
  margin-bottom: 100px;
}

.folders {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

p {
  font-size: 18px;
  color: #333;
}

.reset-button {
  display: block;
  margin: 40px auto;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 50%;
}

.reset-button:hover {
  background-color: #0056b3;
}
</style>
