import express from 'express';
import loginMedic from './loginMedic.routes.js';
import loginUser from './loginUser.routes.js';
import medic from './medic.routes.js'
import patient from './patient.routes.js'
import user from './user.routes.js'
import exam from './exam.routes.js'

const router = express.Router();

router.use('/user', user);
router.use('/medic', medic);
router.use('/patient', patient);
router.use('/exam', exam);
router.use('/loginUser', loginUser);
router.use('/loginMedic', loginMedic);
router.use('/', loginUser);
router.use('/', medic);


export default router;