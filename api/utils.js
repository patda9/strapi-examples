function overwriteRequestBody(data, body) {
  const requestBody = data.request.body;
  if (!body || Object.keys(body).length === 0) return requestBody;

  const overwrittenBody = Object.keys(body).reduce((acc, k) => {
    acc[k] = body[k];

    return acc;
  }, requestBody);

  return { ...data, request: { ...data.request, body: overwrittenBody } };
}

module.exports = {
  overwriteRequestBody
};
