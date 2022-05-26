import express from "express";
const router = express.Router();
import users from "./users.routes";
import tasks from "./tasks.routes";
import exit from "./exits.routes";
import events from "./events.routes";
import interview from "./interview.routes";
import attendance from "./attendance.routes";

import lettergenaration from "./lettergenaration.routes";
router.use("/users", users);
router.use("/tasks", tasks);
router.use("/exits", exit);
router.use("/lettergenaration", lettergenaration);
// router.use("/users/events/interview", interview);
// router.use("/users/events", events);
// router.use("/attendance", attendance);

export default router;
