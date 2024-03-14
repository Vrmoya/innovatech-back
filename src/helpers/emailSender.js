const transporter = require("../config/sendEmail");
const { User, Cart } = require('../db')
const { ACCESS_TOKEN, EMAIL_INNOVATECH } = process.env;

module.exports = async (email, html, status) => {
    // const emailUser = await User.findOne({ where: { email } });



    User.findOne({
        where: { email: email },
        include: [{ model: Cart, as: 'carts', include: [{ all: true }] }] // Include associated carts
    })
        .then(user => {
            if (user) {

                // Assuming you want to modify the first cart found for the user
                console.log(user.carts);
                const cart = user.carts.pop(); // Access the cart

                if (cart) {
                    // Modify the key here, for example, changing the value of a key called 'keyName'
                    cart.payment_status = status;

                    // Save the changes
                    cart.save();

                    // Verificar si se encontró el usuario y obtener su dirección de correo electrónico
                    const userEmailAddress = user.email;
                    // Envío de correo electrónico
                    const mailOptions = {
                        from: EMAIL_INNOVATECH,
                        to: userEmailAddress,
                        subject: "Estado del pago en MercadoPago",
                        html,
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("Email enviado: " + info.response);
                        }
                    });
                } else {
                    console.log('User has no carts.');
                }
            } else {
                console.log('User not found.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });



}




// const cart = await Cart.findOneAndUpdate({ userId: emailUser.id }, { payment_status: status }, { new: true });
// console.log("Payment status updated in cart:", cart);

// try {
//     const cart = await Cart.findOne({ where: { orderId: merchant_order.id } });
//     if (cart) {
//         await cart.update({ paymentStatus: paymentInfo.status });
//         console.log("Payment status updated in cart:", cart);
//     } else {
//         console.log("No se encontró el carrito correspondiente.");
//     }
// } catch (error) {
//     console.error("Error al actualizar el estado del pago en el carrito:", error);
// }



