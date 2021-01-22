exports.getHospitalName = (filename, key) => {
  return filename.split(`_${key}`)[0];
};

exports.mergeTreatments = (patients, treatments) => {
  return patients.map(patient => {
    return {
      ...patient,
      Treatments: treatments.filter(t => t.patientId === patient.mrn)
    }
  })
}
