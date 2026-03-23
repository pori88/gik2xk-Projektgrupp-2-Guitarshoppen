const db = require('../models');
const bcrypt = require('bcrypt');
const {createResponseSuccess,createResponseError,createResponseMessage} = require('../helpers/responseHelper');
async function getAll() {                                 // getAll hämtar alla användare utan att visa lösenord.
  try {
    const users = await db.user.findAll({
      attributes: { exclude: ['password'] }
    });
    return createResponseSuccess(users);
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
async function getById(id) {                              // getById hämtar en specifik användare baserat på id.
  if (!id) return createResponseError(422, 'user id is required');
  try {
    const user = await db.user.findOne({
      where: { user_id: id },
      attributes: { exclude: ['password'] }
    });
    if (!user)
      return createResponseError(404, 'User not found');
    return createResponseSuccess(user);
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
async function create(user) {                            // create skapar en ny användare.
  try {
    const created = await db.user.create(user);
    created.password = undefined;                        // Lösenordet tas bort från svaret av säkerhetsskäl.
    return createResponseSuccess(created, 201);
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
async function update(id, user) {                        // update uppdaterar en användare baserat på id.
  if (!id) return createResponseError(422, 'user id is required');
  try {
    await db.user.update(user, { where: { user_id: id } });
    return createResponseMessage(200, 'User updated');
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
async function destroy(id) {                              // destroy tar bort en användare.
  if (!id) return createResponseError(422, 'user id is required');
  try {
    const deleted = await db.user.destroy({ where: { user_id: id } });
    if (!deleted)
      return createResponseError(404, 'User not found');
    return createResponseMessage(200, 'User deleted');
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
async function register(user) {                           // register registrerar en ny användare.
  try {
    if (!user.email || !user.password)                    // Den kollar att email och lösenord finns.
      return createResponseError(422, 'Email and password required');
    const existingEmail = await db.user.findOne({         // Den kontrollerar också om email redan är registrerat.
      where: { email: user.email }
    });
    if (existingEmail)
      return createResponseError(409, 'Email already registered');
    const hashedPassword = await bcrypt.hash(user.password, 10);    
    const created = await db.user.create({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hashedPassword                            // Lösenordet hash:as med bcrypt innan det sparas.
    });
    return createResponseSuccess({
      user_id: created.user_id,
      username: created.username,
      firstName: created.firstName,
      lastName: created.lastName,
      email: created.email
    }, 201);
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
async function login(credentials) {                       // login loggar in en användare.
  try {
    const user = await db.user.findOne({
      where: { username: credentials.username }
    });
    if (!user)
      return createResponseError(404, 'User not found');
    const passwordMatch = await bcrypt.compare(           // Den kollar om användaren finns och om lösenordet stämmer.
      credentials.password,
      user.password
    );
    if (!passwordMatch)                                   // Om allt är rätt returneras användarens information (utan lösenord).
      return createResponseError(401, 'Wrong password');
    return createResponseSuccess({
      user_id: user.user_id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  } catch (err) {
    return createResponseError(500, err.message);
  }
}
module.exports = {getAll,getById,create,update,destroy,register,login};