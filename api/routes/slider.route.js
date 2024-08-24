import { addsliderimage } from "../controllers/slider.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post("/addsliderimage", verifyToken, addsliderimage);

export default router;
