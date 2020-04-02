import * as Joi from 'joi';

class FileValidator {
  store() {
    return Joi.object()
      .keys({
        path: Joi.string().required(),
      })
      .error(() => {
        return {
          message: '"file" is required',
        };
      })
      .unknown();
  }
}

export default new FileValidator();
