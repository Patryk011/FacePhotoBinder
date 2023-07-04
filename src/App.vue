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
    </div>
  </div>
</template>

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
    handleImagesUploaded(images) {
      this.isProcessing = true;

      const imagesWithFaces = [];
      const imagesWithoutFaces = [];

      Promise.all(
        images.map(async (imageData) => {
          const hasFace = await this.detectFace(imageData.dataURL);
          if (hasFace) {
            imagesWithFaces.push(imageData);
          } else {
            imagesWithoutFaces.push(imageData);
          }
        })
      )
        .then(() => {
          this.sortedFolders = [
            { title: "Folder z ludźmi", images: imagesWithFaces },
            { title: "Folder bez ludzi", images: imagesWithoutFaces },
          ];
          this.isProcessing = false;
        })
        .catch((error) => {
          console.error("Błąd podczas przetwarzania zdjęć:", error);
          this.isProcessing = false;
        });
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
        const response = await fetch(image.dataURL);
        const blob = await response.blob();

        const fileName = `Obraz_${index + 1}.jpg`;
        zip.file(fileName, blob, { binary: true });
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
</style>
