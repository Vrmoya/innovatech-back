require('dotenv').config();
const { ACCESS_TOKEN, RUTA_NOTIFICACION } = process.env;
const { MercadoPagoConfig, Preference } = require('mercadopago')

const client = new MercadoPagoConfig({ accessToken: `${ACCESS_TOKEN}` });

const paymentGateway = async (req, res) => {
    console.log(req.body);
    try {
        const itemsFromFrontend = req.body.items;
        console.log(itemsFromFrontend);
        const itemsForBackend = itemsFromFrontend.map(item => ({
            id:item.productId,
            title: item.title,
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: "ARS",
        }));
        console.log(`payer email: ${req.body.email}`);
        const body = {
            items: itemsForBackend,
            total: req.body.total,
            back_urls: {
                "success": "http://localhost:5173/",
                "failure": "http://localhost:5173/",
                "pending": "http://localhost:5173/"
            },
            notification_url:RUTA_NOTIFICACION,
            external_reference:req.body.email
        };
        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({ id: result.id });
    } catch (error) {
        console.log(error);
    }
}

module.exports = paymentGateway;

// const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');

// const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

// const paymentGateway = async (req, res) => {
//   console.log(req.body);
//   try {
//     // Verificar si la solicitud es una notificación de Mercado Pago
//     if (req.body.topic === 'payment') {
//       // Obtener el ID del pago de la notificación
//       const paymentId = req.body.id;
      
//       // Obtener el estado actual del pago desde Mercado Pago
//       const payment = await Payment.findById(paymentId);
      
//       // Realizar acciones según el estado del pago
//       switch (payment.status) {
//         case 'approved':
//           // Pago aprobado, realizar acciones necesarias (por ejemplo, enviar confirmación por correo electrónico)
//           console.log('Pago aprobado:', payment);
//           break;
//         case 'pending':
//           // Pago pendiente, realizar acciones necesarias
//           console.log('Pago pendiente:', payment);
//           break;
//         case 'rejected':
//           // Pago rechazado, realizar acciones necesarias
//           console.log('Pago rechazado:', payment);
//           break;
//         // Agregar más casos según los estados que desees manejar
//         default:
//           console.log('Estado de pago no reconocido:', payment.status);
//       }
      
//       // Responder con un código 200 para indicar que se recibió la notificación correctamente
//       res.sendStatus(200);
//     } else {
//       // Si la solicitud no es una notificación de Mercado Pago, crear una preferencia de pago como lo hacías anteriormente
//       const itemsFromFrontend = req.body.items;
//       const itemsForBackend = itemsFromFrontend.map(item => ({
//         title: item.title,
//         quantity: item.quantity,
//         unit_price: item.price,
//         // currency_id: "ARS",
//       }));
      
//       const body = {
//         items: itemsForBackend,
//         total: req.body.total,
//         back_urls: {
//           "success": "http://localhost:5173/",
//           "failure": "http://localhost:5173/",
//           "pending": "http://localhost:5173/"
//         },
//         auto_return: "approved",
//       };
      
//       const preference = new Preference(client);
//       console.log("preference:", preference)
//       const result = await preference.create({ body });
//       console.log("result:", result)
//       res.json({ id: result.id });
//     }
//   } catch (error) {
//     console.error('Error al manejar la notificación de Mercado Pago:', error);
//     // Responder con un código de error para indicar que ocurrió un problema al procesar la notificación
//     res.sendStatus(500);
//   }
// };

// module.exports = paymentGateway;