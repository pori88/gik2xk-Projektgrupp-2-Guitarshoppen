function createResponseSuccess(data, status = 200) {
  return { status, data };
}

function createResponseMessage(status, message) {
  return { status, data: { message } };
}

function createResponseError(status = 500, message = 'Server error') {
  return { status, data: { error: message } };
}

module.exports = {
  createResponseSuccess,
  createResponseMessage,
  createResponseError
};