const Router = require("koa-router");
const moduleQueries = require("../services/module");
const messageConfig = require("../config/msgConfig");

const router = new Router();
const BASE = "/modules";

router.get(BASE, async ctx => {
  try {
    const modules = await moduleQueries.getAllModule();

    ctx.body = {
      status: messageConfig.status.success,
      data: modules
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: messageConfig.status.error,
      message: err.message || messageConfig.message.error.internalError
    };
  }
});

router.get(`${BASE}/:id`, async ctx => {
  try {
    const myModule = await moduleQueries.getModuleById(ctx.params.id);
    ctx.body = {
      status: messageConfig.status.success,
      data: myModule
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: messageConfig.status.error,
      message: err.message || messageConfig.message.error.internalError
    };
  }
});

router.post(`${BASE}`, async ctx => {
  try {
    const myModule = await moduleQueries.addModule(ctx.request.body);
    console.log(ctx.request.body);
    if (myModule && myModule != "error") {
      ctx.status = 201;
      ctx.body = {
        status: messageConfig.status.success,
        data: myModule
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: messageConfig.status.error,
        message: messageConfig.message.error.internalError
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

router.put(`${BASE}/:id`, async ctx => {
  try {
    const myModule = await moduleQueries.updateModule(
      ctx.params.id,
      ctx.request.body
    );
    if (myModule && myModule != "error") {
      ctx.status = 200;
      ctx.body = {
        status: "success",
        data: myModule
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: messageConfig.status.error,
        message: messageConfig.message.error.internalError
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

router.delete(`${BASE}/:id`, async ctx => {
  try {
    const myModule = await moduleQueries.deleteModule(ctx.params.id);
    console.log(myModule);
    if (myModule && myModule != "error") {
      ctx.status = 200;
      ctx.body = {
        status: "success",
        data: myModule
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
