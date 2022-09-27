import { Express } from "express";
const router = express.Router();
import stripe from 'stripe' (process.env.Stripe_S_Key)

router.post('/checkout', auth, (req, res) => {
    Cart.findOne({ _customeId: req._customeId }).exec(async(error, data) => {
        if (error) return res.status(400).json({ status: false, error });
        const token = req.body.token;
        const totalAmount = req.body.total;
        const charge = await stripe.charges.create({
            amount: totalAmount + 100,
            currency: 'usd',
            description: 'payment for product',
            source: token.id
        })

        const orderData = {
            _customerId: data._customer,
            orderDetails: data.cartDetails,
            paymentId: charge.id,
            orderDate: new Date(),
            totalAmount
        }

        const newOrder = Order(orderData);
        newOrder.save(async(error, data) => {
            if (error) return res.status(400).json({ status: false, error });
            else {
                await Cart.deleteOne({ _customerId: req._customerId });
                return res.status(200).json({
                    status: true,
                    message: 'Order Has Been Created Successfully',
                    data
                })
            }
        })

    })
})