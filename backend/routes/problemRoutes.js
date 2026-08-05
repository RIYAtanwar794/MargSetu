const express = require('express');
const router = express.Router();
const {
  createProblem,
  getProblems,
  getProblem,
  updateProblem,
  deleteProblem,
  markAsRevised,
  getDueRevisions,
  getRevisionQueue,
} = require('../controllers/problemController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); 


router.get('/revisions/due', getDueRevisions);
router.get('/revisions/queue', getRevisionQueue);


router.route('/').post(createProblem).get(getProblems);
router.route('/:id').get(getProblem).put(updateProblem).delete(deleteProblem);
router.put('/:id/revise', markAsRevised);

module.exports = router;
