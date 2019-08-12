const Router = require("koa-router");
const employeeQueries = require("../services/employee");
const messageConfig = require("../config/msgConfig");
const base64ToImage = require("base64-to-image");
//const jwt = require('../middlewares/jwt');

const router = new Router();
const BASE = "/employee";

// Photo saving
function saveImageByBase64(base64imgurl) {
  var base64Str = base64imgurl;
  var filepath = "./uploads/";
  var fileName = "emp" + new Date().getTime();
  var optionalObj = { fileName: fileName, type: "png" };
  base64ToImage(base64Str, filepath, optionalObj);
  console.log(base64Str);
  var imageInfo = base64ToImage(base64Str, filepath, optionalObj);
  console.log(imageInfo);
  return imageInfo.fileName;
}

router.get(BASE, async ctx => {
  try {
    //console.log('I am here....');
    const employee = await employeeQueries.getAllEmployee();
    //console.log('Testing:' . JSON.stringify(users));

    ctx.body = {
      status: messageConfig.status.success,
      data: employee
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: messageConfig.status.error,
      message: err.message || messageConfig.message.error.internalError
    };
  }
});

router.get(`${BASE}/service-men/:position`, async ctx => {
  try {
    //console.log('I am here....');
    const employee = await employeeQueries.getEmployeeByPosition(
      ctx.params.position
    );
    //console.log('Testing:' . JSON.stringify(users));

    ctx.body = {
      status: messageConfig.status.success,
      data: employee
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: messageConfig.status.error,
      message: err.message || messageConfig.message.error.internalError
    };
  }
});

router.get(`${BASE}/employee/:emp_code`, async ctx => {
  try {
    //console.log('I am here....');
    const employee = await employeeQueries.getEmployeeByEmpCode(
      ctx.params.emp_code
    );
    //console.log('Testing:' . JSON.stringify(users));

    ctx.body = {
      status: messageConfig.status.success,
      data: employee
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: messageConfig.status.error,
      message: err.message || messageConfig.message.error.internalError
    };
  }
});

router.get(`${BASE}/employee/mail/:email`, async ctx => {
  try {
    const employee = await employeeQueries.getEmployeeByEmail(ctx.params.email);
    console.log("data: " + employee);
    ctx.body = {
      status: messageConfig.status.success,
      data: employee
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: messageConfig.status.error,
      message: err.message || messageConfig.message.error.internalError
    };
  }
});

router.get(`${BASE}/employee/user/:name`, async ctx => {
  try {
    const employee = await employeeQueries.getEmployeeByName(ctx.params.name);

    ctx.body = {
      status: messageConfig.status.success,
      data: employee
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: messageConfig.status.error,
      message: err.message || messageConfig.message.error.internalError
    };
  }
});

router.get(`${BASE}/positions/:position`, async ctx => {
  try {
    //console.log('I am here....');
    const employee = await employeeQueries.getEmployeeByPositionAndAvailable(
      ctx.params.position
    );
    //console.log('Testing:' . JSON.stringify(users));

    ctx.body = {
      status: messageConfig.status.success,
      data: employee
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: messageConfig.status.error,
      message: err.message || messageConfig.message.error.internalError
    };
  }
});

router.get(`${BASE}/status/:status`, async ctx => {
  try {
    //console.log('I am here....');
    const employee = await employeeQueries.getEmployeeByStatus(
      ctx.params.status
    );
    //console.log('Testing:' . JSON.stringify(users));

    ctx.body = {
      status: messageConfig.status.success,
      data: employee
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
    const employee = await employeeQueries.getEmployeeById(ctx.params.id);

    ctx.body = {
      status: messageConfig.status.success,
      data: employee
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
  if (ctx.request.body.image != null) {
    ctx.request.body.image = saveImageByBase64(ctx.request.body.image);
  }
  try {
    const employee = await employeeQueries.addEmployee(ctx.request.body);
    // console.log('Date received from router class: ' + JSON.stringify(user));
    if (employee && employee != "error") {
      ctx.status = 201;
      ctx.body = {
        status: messageConfig.status.success,
        data: employee
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

router.put(`${BASE}/:id`, async ctx => {
  if (ctx.request.body.image != null) {
    ctx.request.body.image = saveImageByBase64(ctx.request.body.image);
  }
  try {
    const employee = await employeeQueries.updateEmployee(
      ctx.params.id,
      ctx.request.body
    );
    if (employee && employee != "error") {
      ctx.status = 200;
      ctx.body = {
        status: "success",
        data: employee
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

router.delete(`${BASE}/:id`, async ctx => {
  try {
    const employee = await employeeQueries.deleteEmployee(ctx.params.id);
    // console.log('User router delete: ' + JSON.stringify(user));
    if (employee && employee != "error") {
      ctx.status = 200;
      ctx.body = {
        status: "success",
        data: employee
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
