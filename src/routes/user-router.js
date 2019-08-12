const Router = require("koa-router");
const userQueries = require("../services/users");
const messageConfig = require("../config/msgConfig");
const jwt = require("../middlewares/jwt");

const router = new Router();
const BASE = "/users";

router.get(BASE, jwt, async ctx => {
  try {
    //console.log('I am here....');
    const users = await userQueries.getAccountAllUsers();
    //console.log('Testing:' . JSON.stringify(users));

    ctx.body = {
      status: messageConfig.status.success,
      data: users
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: messageConfig.status.error,
      message: err.message || messageConfig.message.error.internalError
    };
  }
});

// =========================================================================
router.get(`${BASE}/:id`, jwt, async ctx => {
  try {
    console.log(ctx.params.id);

    const user = await userQueries.getAccountUserById(ctx.params.id);
    console.log(user);

    if (user) {
      ctx.body = {
        status: messageConfig.status.success,
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

router.get(`${BASE}/user/:id`, jwt, async ctx => {
  try {
    const user = await userQueries.getUserById(ctx.params.id);
    if (user.length) {
      ctx.body = {
        status: messageConfig.status.success,
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

router.post(`${BASE}`, jwt, async ctx => {
  try {
    const user = await userQueries.addUser(ctx.request.body);
    // console.log('Date received from router class: ' + JSON.stringify(user));
    if (user && user != "error") {
      ctx.status = 201;
      ctx.body = {
        status: messageConfig.status.success,
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

router.put(`${BASE}/:id`, jwt, async ctx => {
  try {
    const user = await userQueries.updateUser(ctx.params.id, ctx.request.body);
    if (user && user != "error") {
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
    // console.log('Router Exception Error .... : ' + err);
    ctx.status = 400;
    ctx.body = {
      status: messageConfig.status.error,
      message: err.message || messageConfig.message.error.internalError
    };
  }
});

router.delete(`${BASE}/:id`, jwt, async ctx => {
  try {
    const user = await userQueries.deleteUser(ctx.params.id);
    // console.log('User router delete: ' + JSON.stringify(user));
    if (user && user != "error") {
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
    // console.log('Router Exception Error .... : ' + err);
    ctx.status = 400;
    ctx.body = {
      status: messageConfig.status.error,
      message: err.message || messageConfig.message.error.internalError
    };
  }
});

module.exports = router;
