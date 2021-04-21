import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js'

const router = express.Router();

router.route('/').get(getProducts)           // different syntax but does the same work, as router.get('/', (req, res) => {})
router.route('/:id').get(getProductById)

export default router