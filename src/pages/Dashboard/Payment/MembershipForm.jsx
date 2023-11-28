import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const MembershipForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecureUser = useAxiosSecure();
    const { user } = useAuth();
    // console.log(user);
    const navigate = useNavigate();
    const membershipPrice = 20;

    useEffect(() => {

        axiosSecureUser.post('/create-payment-intent', { price: membershipPrice })
            .then(res => {
                console.log(res.data);
                setClientSecret(res.data.clientSecret);

            })
            .catch(error => {
                console.log(error);
            })

    }, [axiosSecureUser])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log('[error]', error);
            setError(error.message)
        }
        else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                },
            },
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                const payment = {
                    email: user?.email,
                    price: membershipPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'pending'
                }
                const res = await axiosSecureUser.post('/payments', payment);
                console.log('total payment', res.data);

                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        title: "Your payment is successful",
                        showClass: {
                            popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                          `
                        },
                        hideClass: {
                            popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                          `
                        }
                    });
                    navigate('/dashboard/payment-history');
                }
            }
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                className="btn btn-neutral text-white font-bold"
                type="submit"
                disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p>{error}</p>
            <p>{transactionId && <p>Your transaction id: {transactionId} </p>}</p>
        </form>
    );

};

export default MembershipForm;