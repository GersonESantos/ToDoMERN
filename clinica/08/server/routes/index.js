import express from "express";
import userRoutes from "./userRoute.js";
import taskRoutes from "./taskRoute.js";
import patientRoutes from "./patientRoute.js";

const router = express.Router();
console.log("DEBUG: Main Router loaded. Registering /patient...");

router.use("/user", userRoutes);
router.use("/task", taskRoutes);
router.use("/patient", patientRoutes);

export default router;
