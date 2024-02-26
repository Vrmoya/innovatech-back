require('dotenv').config();
const { ACCESS_TOKEN } = process.env;
const { MercadoPagoConfig, Preference } = require('mercadopago')

const client = new MercadoPagoConfig({ accessToken: `${ACCESS_TOKEN}` });

paymentGateway = async (req, res) => {
    console.log(req.body);
    try {
        const itemsFromFrontend = req.body.items;
        const itemsForBackend = itemsFromFrontend.map(item => ({
            title: item.title,
            quantity: item.quantity,
            unit_price: item.price,
            // currency_id: "ARS",
        }));

        const body = {
            items: itemsForBackend,
            total: req.body.total,
            back_urls: {
                "success": "http://localhost:5173/",
                "failure": "http://localhost:5173/",
                "pending": "http://localhost:5173/"
            },
            auto_return: "approved",
        };
        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({ id: result.id });
    } catch (error) {
        console.log(error);
    }
}

module.exports = paymentGateway;