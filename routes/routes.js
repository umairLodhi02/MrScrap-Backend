const router = require("express").Router();
const {
  userController,
  feedbackController,
  scrapController,
} = require("../controllers/index");
const checkUserInScrap = require("../middleware/checkUserinScrap");
const { validateToken, verifyScrap } = require("../middleware/index");

/*******    USER   *******/
//REGISTER
router.post("/user/register", userController.registerUser);

//LOGIN
router.post("/user/login", userController.login);

//UPDATE PROFILE
router.put("/user/update/:id", validateToken, userController.updateUser);

//GIVE FEEDBACK
router.post("/user/feedback", validateToken, feedbackController.giveFeedback);

//ADD SCRAP
router.get("/user/getscraps", validateToken, scrapController.getScraps);
router.get(
  "/user/getscrapsbyuserid/:userId",
  validateToken,
  checkUserInScrap,
  scrapController.getSrapsByUserId
);
router.post("/user/addscrap", validateToken, scrapController.addScrap);
router.put(
  "/user/updatescrap/:scrapId",
  validateToken,
  verifyScrap,
  scrapController.updateScrap
);
router.delete(
  "/user/deletescrap/:scrapId",
  validateToken,
  verifyScrap,
  scrapController.deleteScrap
);

/*******    USER   *******/

/*******    ADMIN   *******/
/*******    ADMIN   ******/

module.exports = router;
