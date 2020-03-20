import * as Joi from 'joi';

class PostValidator {
  store() {
    return Joi.object().keys({
      text: Joi.string()
        .min(3)
        .max(255)
        .required(),
      file_id: Joi.number(),
    });
  }

  update() {
    return Joi.object().keys({
      text: Joi.string()
        .min(3)
        .max(255)
        .required(),
      file_id: Joi.number(),
    });
  }
}

export default new PostValidator();
