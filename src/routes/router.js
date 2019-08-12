const Router = require("koa-router");

// import router files
const indexRoutes = require("./index");
const userRoutes = require("./user-router");
const authRoutes = require("./auth-router");
const employeeRoutes = require("./employee-router");
const machineRoutes = require("./machine-router");
const complainRoutes = require("./complain-router");
const modelRoutes = require("./model-router");
const positionRoutes = require("./position-router");
const departmentRoutes = require("./department-router");
const scheduleRoutes = require("./schedule-router");
const dailyReportRoutes = require("./daily-report-router");
const moduleRoutes = require("./module-router");
const permissionRoutes = require("./permission-router");
const roleRoutes = require("./role-router");
const router = new Router({ prefix: "/api/v1" });

// use router files
router.use(indexRoutes.routes(), router.allowedMethods());
router.use(userRoutes.routes(), router.allowedMethods());
router.use(authRoutes.routes(), router.allowedMethods());
router.use(employeeRoutes.routes(), router.allowedMethods());
router.use(machineRoutes.routes(), router.allowedMethods());
router.use(complainRoutes.routes(), router.allowedMethods());
router.use(modelRoutes.routes(), router.allowedMethods());
router.use(positionRoutes.routes(), router.allowedMethods());
router.use(departmentRoutes.routes(), router.allowedMethods());
router.use(scheduleRoutes.routes(), router.allowedMethods());
router.use(dailyReportRoutes.routes(), router.allowedMethods());
router.use(moduleRoutes.routes(), router.allowedMethods());
router.use(permissionRoutes.routes(), router.allowedMethods());
router.use(roleRoutes.routes(), router.allowedMethods());

module.exports = router;
