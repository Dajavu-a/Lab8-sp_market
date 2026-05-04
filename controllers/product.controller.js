const fs = require('fs');

exports.addProductPage = (req, res) => {
    res.render('add-product.ejs', { title: 'Add New Product', message: '' });
};

exports.addProduct = (req, res) => {
    if (!req.file) return res.status(400).send('No files were uploaded.');

    let { name, category, price, stock } = req.body;
    let image = req.file.filename;

    let query = "INSERT INTO products (name, category, price, stock, image) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [name, category, price, stock, image], (err, result) => {
        if (err) return res.status(500).send(err);
        res.redirect('/?msg=Product added successfully!');
    });
};

exports.editProductPage = (req, res) => {
    let id = req.params.id;
    let query = "SELECT * FROM products WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.render('edit-product.ejs', { title: 'Edit Product', product: result[0], message: '' });
    });
};

exports.editProduct = (req, res) => {
    let id = req.params.id;
    let { name, category, price, stock, old_image } = req.body;
    let image = old_image;

    if (req.file) {
        image = req.file.filename;
        if (old_image && fs.existsSync(`uploads/${old_image}`)) {
            fs.unlink(`uploads/${old_image}`, (err) => {
                if (err) console.error("Failed to delete old image", err);
            });
        }
    }

    let query = "UPDATE products SET name=?, category=?, price=?, stock=?, image=? WHERE id=?";
    db.query(query, [name, category, price, stock, image, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.redirect('/?msg=Product updated successfully!');
    });
};

exports.deleteProduct = (req, res) => {
    let id = req.params.id;
    let getImageQuery = 'SELECT image FROM products WHERE id = ?';
    let deleteQuery = 'DELETE FROM products WHERE id = ?';

    db.query(getImageQuery, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        let image = result[0].image;

        if (image && fs.existsSync(`uploads/${image}`)) {
            fs.unlink(`uploads/${image}`, (err) => {
                if (err) console.error(err);
            });
        }

        db.query(deleteQuery, [id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.redirect('/?msg=Product deleted successfully!');
        });
    });
};