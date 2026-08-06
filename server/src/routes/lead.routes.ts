import { Router } from "express";
import * as leadController from "../controllers/lead.controller";
import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

/**
 * Public
 */
router.post("/public", leadController.createPublicLead);

/**
 * Protected
 */
router.use(protect);

/**
 * Admin + Member
 */
router.get("/", authorize("ADMIN", "MEMBER"), leadController.getLeads);

router.get("/:id", authorize("ADMIN", "MEMBER"), leadController.getLead);

router.post("/:id/notes", authorize("ADMIN", "MEMBER"), leadController.addLeadNote);

/**
 * Admin only
 */
router.post("/", authorize("ADMIN"), leadController.createLead);

router.patch("/:id", authorize("ADMIN"), leadController.updateLead);

router.post("/:id/assign", authorize("ADMIN"), leadController.assignLead);

router.patch("/:id/status", authorize("ADMIN"), leadController.changeLeadStatus);
router.delete(
    "/:id",
    authorize("ADMIN"),
    leadController.deleteLead
);

router.get(
    "/dashboard/stats",
    authorize("ADMIN","MEMBER"),
    leadController.getDashboardStats
);
router.get(
  "/:id/activity",
  authorize("ADMIN", "MEMBER"),
  leadController.getActivity
);
export default router;