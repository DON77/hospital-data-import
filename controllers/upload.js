const fs = require("fs");
const { promisify } = require('util');
const db = require('../models');
const {PATIENT, TREATMENT, PATIENT_KEY, TREATMENT_KEY} = require('../constants');
const { getDataFromFile } = require('../services/elt.service');
const { mergeTreatments, getHospitalName} = require('../utils');

const readFile = promisify(fs.readFile);


exports.uploadController = async (req, res) => {
  const filePaths = req.files.map(f => ({path: f.path, filename: f.originalname}));

  const patient = filePaths.find(({path}) => path.includes(PATIENT_KEY));
  const treatment = filePaths.find(({path}) => path.includes(TREATMENT_KEY));

  if (!patient || !treatment) res.status(400).send('incorrect files');

  const hospitalName = getHospitalName(patient.filename, PATIENT_KEY);

  let hospital = await db.Hospital.findOne({where: {name: hospitalName}});
  if (!hospital) {
    hospital = await db.Hospital.create({
      name: hospitalName
    });
  }

  const patientFile = await readFile(patient.path, {encoding: 'utf8'})
  const treatmentFile = await readFile(treatment.path, {encoding: 'utf8'})

  const patientsData = getDataFromFile(patientFile, PATIENT,  hospital.id, PATIENT_KEY);
  const treatmentsData = getDataFromFile(treatmentFile, TREATMENT, hospital.id, TREATMENT_KEY);

  await db.Patient.bulkCreate(mergeTreatments(patientsData, treatmentsData), {
    include: [db.Patient.Treatment]
  }, { ignoreDuplicates: true });

  res.status(201).json({
    success: true,
    message: 'Imported successfully',
    patientCount: patientsData.length,
    treatmentCount: treatmentsData.length
  })
}

