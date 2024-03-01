//import
const router=require('express').Router();

const orderController=require('../controllers/orderController.js');
const { authGuardAdmin } = require('../middleware/authGuard.js');



router.post('/create',  orderController.createOrderInfo)
router.get('/getOrders',authGuardAdmin, orderController.getALlOrder)
router.get('/getOrdersByUser/:userId', orderController.getALlOrderByUserId)
router.put("/update_order/:orderId/status",authGuardAdmin, orderController.updateOrder)


//exportrouter.put('/api/orders/:orderId/status', updateOrder);

module.exports=router;
