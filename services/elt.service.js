const { PATIENT_KEY, TREATMENT_KEY } = require('../constants');

exports.getDataFromFile = (file, dataType, hospitalId, type) => {
  let [cols, ...data] = file.split('\n');
  cols = cols.split(',')
  data = data.map(row => {
    return row.replace('\r', '').split(',')
  })

  return data.map(row => {
    const eltRow = {};
    row.forEach((originalValue, idx) => {
      Object.entries(dataType).forEach(([eltKey, rawNames]) => {
        const originalKey = cols[idx].replace('\r', '');
        const f = rawNames.includes(originalKey);
        if (f) {
          assignTreatmentFixedData(eltRow, eltKey, originalKey, originalValue);

          switch (type) {
            case PATIENT_KEY: {
              eltRow["hospitalId"] = hospitalId;
              eltRow["compositeId"] = `p${eltRow.mrn}h${eltRow.hospitalId}`;
              break;
            }
            case TREATMENT_KEY: {
              eltRow["hospitalId"] = hospitalId;
              eltRow["compositePatientId"] = `p${eltRow.patientId}h${eltRow.hospitalId}`;
              break;
            }
          }

        }
      });
    })
    return eltRow;
  })
}

const assignTreatmentFixedData = (data, eltKey, originalKey, originalValue) => {
  switch (originalKey) {
    case 'CyclesXDays': {
      const [count, duration] = originalValue.split('X')
      data['cycleDuration'] = parseInt(count);
      data['cycleCount'] = parseInt(duration);
      break;
    }
    case 'Active': {
      data[eltKey] = originalValue === "Ordered";
      break;
    }
    case 'Status': {
      data[eltKey] = originalValue === "Active";
      break;
    }
    case 'Sex': {
      data[eltKey] = originalValue.toLowerCase();
      break;
    }
    default:
      data[eltKey] = !originalValue || originalValue.toLowerCase().includes('null') ? null : originalValue;
  }
}
