"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToHeap = addToHeap;
exports.getPatientsByPriority = getPatientsByPriority;
var _heap = _interopRequireDefault(require("heap"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Importa una librería de montículos (por ejemplo, "heap" o "priority-queue")

// Montículo de pacientes
const patientHeap = new _heap.default((a, b) => {
  // Comparar pacientes por fecha de nacimiento (dob)
  // Esto asume que dob es de tipo Date en tus objetos de paciente
  return a.dob.getTime() - b.dob.getTime();
});

// Agrega pacientes al montículo
function addToHeap(patient) {
  patientHeap.push(patient);
}

// Obtiene pacientes del montículo en orden de prioridad
function getPatientsByPriority() {
  const patients = [];
  while (patientHeap.length > 0) {
    patients.push(patientHeap.pop());
  }
  return patients;
}