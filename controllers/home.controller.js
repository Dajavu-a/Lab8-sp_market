exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM products ORDER BY id DESC";
    
    db.query(query, (err, result) => {
        if (err) return res.redirect('/');
        res.render('index.ejs', {
            title: "Supermarket Admin | Dashboard",
            products: result,
            message: req.query.msg || ''
        });
    });
};