const router = require("express").Router();
const {
  userController,
  feedbackController,
  scrapController,
  complaincontroller,
  adminController,
} = require("../controllers/index");
const checkUserInScrap = require("../middleware/checkUserinScrap");
const { validateToken, verifyScrap } = require("../middleware/index");
const validateComplain = require("../middleware/validateComplain");

/*******    USER   *******/
//REGISTER
router.post("/user/register", userController.registerUser);

//LOGIN
router.post("/user/login", userController.login);

//UPDATE PROFILE
router.put("/user/update/:id", validateToken, userController.updateUser);

//GIVE FEEDBACK
router.post("/user/feedback", validateToken, feedbackController.giveFeedback);

//FETCH COMPLAINS
router.get(
  "/user/get-complains-user",
  validateToken,
  complaincontroller.fetchComplainsByUserId
);

//GIVE COMPLAIN
router.post(
  "/user/add-complain",
  validateToken,
  complaincontroller.giveComplain
);

//DELETE COMPLAIN
router.delete(
  "/user/delete-complain/:complainId",
  validateToken,
  validateComplain,
  complaincontroller.deleteComplainUser
);
/*******    USER   *******/

/*******    SCRAP   *******/

//GET SCRAPS BY USER ID
router.get(
  "/user/getscrapsbyuserid/:userId",
  validateToken,
  checkUserInScrap,
  scrapController.getSrapsByUserId
);

// ADD SCRAP
router.post("/user/addscrap", validateToken, scrapController.addScrap);

// UPDATE SCRAP
router.put(
  "/user/updatescrap/:scrapId",
  validateToken,
  verifyScrap,
  scrapController.updateScrap
);

// DELETE SCRAP
router.delete(
  "/user/deletescrap/:scrapId",
  validateToken,
  verifyScrap,
  scrapController.deleteScrap
);

/*******    SCRAP   *******/

/*******    ADMIN   *******/

//GET SCRAPS
router.get("/admin/getscraps", validateToken, adminController.getScraps);
router.get("/admin/getusers", validateToken, adminController.getUsers);
router.get("/admin/get-complains", validateToken, adminController.getComplains);
router.get("/admin/get-feedbacks", validateToken, adminController.getFeedbacks);

//CHANGE STATUS OF SCRAP
router.put(
  "/admin/change-status/:scrapId",
  validateToken,
  verifyScrap,
  adminController.changeStatus
);
/*******    ADMIN   ******/

module.exports = router;
