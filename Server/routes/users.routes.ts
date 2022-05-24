import { Router } from "express";
import upload from "../modules/fileupload";
import {
  getUsers,
  createUser,
  getUsersByempId,
  getUsersById,
  updateUsersById,
  getAllUsers,
  getUsersLoginDetails,
} from "../controller/users.controller";
const router = Router();
router.get("/info", getAllUsers);

router.post("/login", getUsersLoginDetails);

router.get("/:status", getUsers);
router.get("/info/:empId", getUsersById);

router.get("/data/:Id", getUsersByempId);
router.post(
  "/",
  upload.fields([
    { name: "aadhar" },
    { name: "panCard" },
    { name: "SSC" },
    { name: "intermediate" },
    { name: "diploma" },
    { name: "bachelor" },
    { name: "master" },
    { name: "marksMemo" },
    { name: "TC" },
    { name: "offerLetter" },
    { name: "experienceCertificate" },
    { name: "incrementLetter" },
    { name: "resignationLette" },
    { name: "payslips" },
    { name: "passportSizePhoto" },
  ]),
  createUser
);

router.put("/data/:Id", updateUsersById);
// app.get("/user/:empId", async (req: any, res: any) => {
//   const data = await prisma.users.findMany({
//     where: {
//       employee_id: req.params.empId,
//     },
//   });
//   res.status(200);
//   res.send(data);
// });
export default router;
