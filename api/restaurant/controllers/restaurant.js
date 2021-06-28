"use strict";

const { isDraft } = require("strapi-utils").contentTypes;

const { overwriteRequestBody } = require("../../utils");

async function create(data, { files } = {}) {
  const definedModel = strapi.models.restaurant;
  const isDraftValue = isDraft(data, definedModel);
  const validData = await strapi.entityValidator.validateEntityCreation(definedModel, data, { isDraftValue });
  const entry = await strapi.query("restaurant").create(validData);

  if (files) {
    await strapi.entityService.uploadFiles(entry, files, { model: "restaurant" });

    return this.findOne({ id: entry.id });
  }

  return entry;
}

async function create2(data, { files } = {}) {
  const definedModel = strapi.models.restaurant;
  const model = overwriteRequestBody(data, { name: `${data.request.body.name} from create 2` });
  const isDraftValue = isDraft(model, definedModel);
  const validData = await strapi.entityValidator.validateEntityCreation(definedModel, model.request.body, { isDraftValue });
  const entry = await strapi.query("restaurant").create(validData);

  if (files) {
    await strapi.entityService.uploadFiles(entry, files, { model: "restaurant" });

    return this.findOne({ id: entry.id });
  }

  return entry;
}

module.exports = {
  create,
  create2
};
