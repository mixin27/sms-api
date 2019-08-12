const Router = require("koa-router");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const passport = require("koa-passport");

const jwt = require("../middlewares/jwt");
const userQueries = require("../services/users");
const messageConfig = require("../config/msgConfig");
const helpers = require("./_helpers");

const router = new Router();
const BASE = "/auth";

const secret = process.env.JWT_SECRET || "jwt_secret";

router.post(`${BASE}/register`, async ctx => {
  try {
    // const models = ctx.app.models.user
    // const users = ctx.request.body
    // const opts = { abortEarly: false, context: { validatePassword: true } }
    // console.log('users', users)
    // console.log(typeof users)
    // const uv = await models.validate(users, opts)

    const user = await userQueries.addUser(ctx.request.body);
    // ctx.body = user; return
    console.log("user", user);
    console.log("Date received from router class: " + JSON.stringify(user));
    if (user && user != "error") {
      // return passport.authenticate('local', (err, user, info, status) => {
      //     if (user) {
      //         ctx.login(user);
      //         ctx.status = 200;
      //         ctx.body = {
      //             status: 'success',
      //             data: user
      //         };
      //         //ctx.redirect(`${BASE}/status`);
      //     } else {
      //         ctx.status = 400;
      //         ctx.body = {
      //             status: messageConfig.status.error,
      //             message: messageConfig.message.error.fileNotFound
      //         };
      //     }
      // }) (ctx);
      ctx.status = 200;
      ctx.body = {
        status: "success",
        data: user
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: messageConfig.status.error,
        message: messageConfig.message.error.fileNotFound
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: messageConfig.status.error,
      message: err.message || messageConfig.message.error.internalError
    };
  }
});

// ============================================================================
router.post(`${BASE}/login`, async ctx => {
  try {
    console.log("hello", ctx.request.body);

    let user = await userQueries.getUserByEmail(ctx.request.body.email);

    console.log("User if Found", user);

    if (!user) {
      console.log("User is not found!");
      ctx.status = 401;
      ctx.body = {
        status: messageConfig.status.success,
        message: messageConfig.message.invalidUser,
        data: user
      };
    } else {
      console.log(ctx.request.body.password);

      if (
        await bcrypt.compareSync(ctx.request.body.password, user.password_hash)
      ) {
        ctx.body = {
          token: jsonwebtoken.sign(
            {
              data: { id: user.id },
              exp: Math.floor(Date.now() / 1000) + 60 * 60
            },
            secret
          ),
          data: user,
          status: messageConfig.status.success
        };
      } else {
        ctx.status = 401;
        ctx.body = {
          status: messageConfig.status.error,
          message: messageConfig.message.error.passwordNotMatch
        };
      }
    }
  } catch (err) {
    console.log(err.message);
    ctx.status = 400;
    ctx.body = {
      status: messageConfig.status.error,
      message: err.message || messageConfig.message.error.internalError
    };
  }
});

// =========================================================================

// router.post(`${BASE}/login`, async ctx => {
//   try {
//     let user = await userQueries.getUserByName(ctx.request.body.email);
//     if (!user) {
//       console.log("User is not found!");
//       ctx.status = 401;
//       ctx.body = {
//         status: messageConfig.status.success,
//         message: messageConfig.message.invalidUser
//       };
//     } else {
//       if (
//         await bcrypt.compareSync(ctx.request.body.password, user.password_hash)
//       ) {
//         ctx.body = {
//           token: jsonwebtoken.sign(
//             {
//               data: { id: user.id },
//               exp: Math.floor(Date.now() / 1000) + 60 * 60
//             },
//             secret
//           )
//         };
//       } else {
//         ctx.status = 401;
//         ctx.body = {
//           status: messageConfig.status.error,
//           message: messageConfig.message.error.passwordNotMatch
//         };
//       }
//     }
//   } catch (err) {
//     console.log(err.message);
//     ctx.status = 400;
//     ctx.body = {
//       status: messageConfig.status.error,
//       message: err.message || messageConfig.message.error.internalError
//     };
//   }
// });

router.get(`${BASE}/logout`, jwt, async ctx => {
  if (helpers.ensureAuthenticated(ctx)) {
    ctx.logout();
    ctx.redirect(`${BASE}/login`);
  } else {
    ctx.body = messageConfig.message.error.internalError;
    ctx.throw(401);
  }
});

router.get(`${BASE}/status`, async ctx => {
  if (helpers.ensureAuthenticated(ctx)) {
    ctx.status = 200;
    ctx.message = "Welcome! You have successfully logged in.";
  } else {
    ctx.redirect(`${BASE}/login`);
  }
});

module.exports = router;
