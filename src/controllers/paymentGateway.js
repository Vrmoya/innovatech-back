require('dotenv').config();
const { ACCESS_TOKEN } = process.env;
const { MercadoPagoConfig, Preference } = require('mercadopago')

const client = new MercadoPagoConfig({ accessToken: `${ACCESS_TOKEN}` });

const paymentGateway =
    async (req, res) => {
        console.log(req.body);
        try {
            const body = {
                items: [
                    {
                        title: req.body.title,
                        quantity: Number(req.body.quantity),
                        unit_price: Number(req.body.price),
                        currency_id: "ARS",
                    }
                ],
                back_urls: {
                    "success": "http://localhost:5173/",
                    "failure": "http://localhost:5173/",
                    "pending": "http://localhost:5173/"
                },
                auto_return: "approved",
            };
            const preference = new Preference(client);
            const result = await preference.create({ body });
            res.json({ id: result.id })
        } catch (error) {
            console.log(error);
        }
    }

module.exports = paymentGateway;