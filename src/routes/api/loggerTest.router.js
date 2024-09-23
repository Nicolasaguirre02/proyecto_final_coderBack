import { Router } from "express";

const router = Router();

router.get('/loggerTest', (req, res) => {
    req.logger.debug("---debug---");
    req.logger.http("---http---");
    req.logger.info("---Info---");
    req.logger.warning("---Alerta---");
    req.logger.error("---Error---");
    req.logger.fatal("---fatal---");
})


export default router;