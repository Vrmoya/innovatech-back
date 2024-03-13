const axios = require('axios')
require('dotenv').config();
const { ACCESS_TOKEN } = process.env;
const { User, Cart } = require('../db')
const { MercadoPagoConfig, Payment } = require('mercadopago')
const emailSender = require('../helpers/emailSender')
// Configurar el acceso al token
const MercadoPago = new MercadoPagoConfig({
    access_token: ACCESS_TOKEN
});
const payment = new Payment(MercadoPago);


module.exports = async (req, res) => {
    let merchant_order = null;
    let payment = null;
    let email = null;
    res.status(200).send('notification received');

    const { topic } = req.query;
    const { type } = req.query;

    if (topic === 'merchant_order') {
        try {
            // console.log('query id:',req.query.id);
            merchant_order_result = await axios.get(`https://api.mercadopago.com/merchant_orders/${req.query.id}`, { params: { access_token: ACCESS_TOKEN } })
            merchant_order = merchant_order_result.data
            // console.log('merchant_order2:', merchant_order);
        } catch (error) {
            console.error("Error al buscar la orden de compra:", error);
        }
    } else if (type === 'payment') {
        try {
            // const payment = await MercadoPago.payment.findById(req.query.id);
            // console.log('query id:', req.query);
            const id = req.query['data.id']
            console.log('id is:', id);
            const result = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, { params: { access_token: ACCESS_TOKEN } })
            // const resultado = await payment.get({id});
            payment = result.data;
            // console.log('payment', result);
            // Obtener el pago y la orden de compra correspondiente reportada por el IPN
            // merchant_order = await MercadoPago.merchant_orders.findById(payment.order.id);
            result_merchant_order = await axios.get(`https://api.mercadopago.com/merchant_orders/${payment.order.id}`, { params: { access_token: ACCESS_TOKEN } })
            merchant_order = result_merchant_order.data
            email = merchant_order.external_reference;
            console.log('merchant_order1:', payment.order.id);
            merchant_order.payments.push(payment)
            // console.log('merchant_order1:', merchant_order);
        } catch (error) {
            console.error("Error al buscar el pago:", error);
        }
    } else {
        console.log('Unhandled notification');
        return 'Unhandled notification'
    }


    let paid_amount = 0;
    if (merchant_order) {
        merchant_order.payments.forEach(payment => {
            if (payment.status === 'approved') {
                paid_amount += payment.transaction_amount;
            }
        });

        // Si el monto de la transacción del pago es igual o mayor que el monto total de la orden de compra, puedes liberar tus artículos
        if (paid_amount >= merchant_order.total_amount) {
            if (merchant_order.shipments.length > 0) { // La orden de compra tiene envíos
                if (merchant_order.shipments[0].status === "ready_to_ship") {
                    console.log("Totalmente pagado. Imprime la etiqueta y libera tu artículo.");
                }
            } else { // La orden de compra no tiene envíos
                console.log("Totalmente pagado. Libera tu artículo.");
                emailSender(email, `<p>El estado de su pago es: ${payment.status}</p>`, payment.status)
            }
        } else {
            console.log("Aún no está pagado. No liberes tu artículo.");
            if (payment && payment.status)
                emailSender(email, `<p>El estado de su pago es: ${payment.status}</p>`, payment.status)
        }
    } else {
        console.log("No se encontró la orden de compra o el pago correspondiente.");
    }


}


// module.exports = async (req, res) => {
//     try {
//         // Obtener datos de la notificación de Mercado Pago
//         const topic = req.query.topic;
//         const id = req.query.id;

//         // Realizar acciones según el tipo de notificación
//         switch (topic) {
//             case 'payment':
//                 // Aquí puedes hacer lo que necesites con el pago recibido, como verificar su estado, actualizar tu base de datos, etc.
//                 const payment = await Payment.findById(id);
//                 console.log('Notificación de pago recibida:', payment);
//                 break;
//             case 'merchant_order':
//                 // Manejar notificaciones relacionadas con la orden del comerciante
//                 // Por ejemplo, puedes obtener la orden de la base de datos y actualizar su estado
//                 console.log('Notificación de orden de comerciante recibida:', id);
//                 break;
//             // Agregar más casos según los eventos que quieras manejar
//         }

//         // Responder con un código 200 para indicar que se recibió la notificación correctamente
//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error al manejar la notificación de Mercado Pago:', error);
//         // Responder con un código de error para indicar que ocurrió un problema al procesar la notificación
//         res.sendStatus(500);
//     }
// }