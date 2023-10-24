const express = require('express');
const router = express.Router();
const dataRouter = require('../routers/dataRouters');
const categoryRouter = require('../routers/categoryRouters');
const userRouter = require('../routers/userRouters');
const historyRouter = require('../routers/historyRouters');
const customerRouter = require('../routers/customerRouters');
const { authenticate } = require('../middlewares/authentication');

router.use(userRouter);
router.use('/pub', customerRouter);

router.use(authenticate);
router.use('/product', dataRouter);
router.use('/category', categoryRouter);
router.use('/history', historyRouter);

module.exports = router;
