const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const productController = require('../controllers/product.controller');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


router.get('/add', productController.addProductPage);
router.post('/add', upload.single('image'), productController.addProduct);

router.get('/edit/:id', productController.editProductPage);
router.post('/edit/:id', upload.single('image'), productController.editProduct); 

router.get('/delete/:id', productController.deleteProduct);

module.exports = router;