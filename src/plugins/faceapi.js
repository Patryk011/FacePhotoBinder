import * as faceapi from "face-api.js";

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromDisk("/models"),
  faceapi.nets.faceLandmark68Net.loadFromDisk("/models"),
  faceapi.nets.faceRecognitionNet.loadFromDisk("/models"),
])
  .then(() => {
    console.log("Modele zostały załadowane.");
  })
  .catch((error) => {
    console.error("Błąd podczas ładowania modeli:", error);
  });

export default faceapi;
