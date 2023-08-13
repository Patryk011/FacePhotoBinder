import * as faceapi from "face-api.js";

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
])
  .then(() => {
    console.log("Modele zostały załadowane.");
  })
  .catch((error) => {
    console.error("Błąd podczas ładowania modeli:", error);
  });

export default faceapi;
