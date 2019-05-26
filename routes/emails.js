const errors = require("restify-errors");
const Email = require("../models/Email");

module.exports = server => {
  server.get("/emails", async (req, res, next) => {
    try {
      const emails = await Email.find({});
      res.send(emails);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  server.get("/emails/:id", async (req, res, next) => {
    try {
      const email = await Email.findById(req.params.id);
      res.send(email);
      next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError("Email not Found"));
    }
  });

  // by user
  server.get("/emails/:owner/", async (req, res, next) => {
    try {
      const emails = await Email.find({ owner: req.params.owner });
      res.send(emails);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  server.get("/emails/:owner/:folder", async (req, res, next) => {
    try {
      const emails = await Email.find({
        owner: req.params.owner,
        tags: req.params.folder
      });
      res.send(emails);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  server.get("/emails/:owner/:folder/headers", async (req, res, next) => {
    try {
      const headers = await Email.find(
        {
          owner: req.params.owner,
          tags: req.params.folder
        },
        {
          header: 1,
          attachments: 1
        }
      );
      res.send(headers);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // add Email
  server.post("/emails", async (req, res, next) => {
    // check for JSON
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    const { header, body, owner, tags, attachments } = req.body;

    const email = new Email({
      header,
      body,
      owner,
      tags,
      attachments
    });

    try {
      const newEmail = await email.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });
};
