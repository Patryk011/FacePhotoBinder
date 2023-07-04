<template>
  <div class="folder">
    <h2>{{ title }}</h2>
    <p>{{ images.length }} plików</p>
    <button class="download-button" @click="downloadFolder">
      Pobierz folder
    </button>
  </div>
</template>

<script>
export default {
  name: "Folder",
  props: {
    title: String,
    images: Array,
  },
  methods: {
    downloadFolder() {
      this.$emit("download-folder", this.images);
    },
  },
};
</script>

<style scoped>
.folder {
  width: 48%;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.folder h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
}

.download-button {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.download-button:hover {
  background-color: #45a049;
}

.image-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.image-list li {
  margin-bottom: 10px;
}

.image-list a {
  display: block;
  color: #333;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

.image-list a:hover {
  color: #4caf50;
}
</style>
