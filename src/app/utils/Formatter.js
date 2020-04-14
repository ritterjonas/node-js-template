/* eslint func-names: ["error", "never"] */
const formatObject = (data, fields) => {
  const newObj = {};
  fields.forEach(field => {
    if (!field || (typeof field !== 'string' && !Array.isArray(field))) return;

    if (Array.isArray(field)) {
      newObj[field[1]] = field[0].split('.').reduce(function(p, prop) {
        return p ? p[prop] : null;
      }, data);
    } else {
      newObj[field] = field.split('.').reduce(function(p, prop) {
        return p ? p[prop] : null;
      }, data);
    }
  });
  return newObj;
};

const format = (data, fields) => {
  if (Array.isArray(data)) {
    return data.map(item => {
      return formatObject(item, fields);
    });
  }

  if (typeof data === 'object') {
    return formatObject(data, fields);
  }

  throw new Error('Data format not valid');
};

export default format;
