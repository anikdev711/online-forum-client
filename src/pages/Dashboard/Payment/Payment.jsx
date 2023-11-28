import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MembershipForm from "./MembershipForm";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    return (
        <div>
            <h3 className="text-center font-bold text-2xl mb-5 mt-5">Please pay $20 per year</h3>
            <Elements stripe={stripePromise}>
                <MembershipForm></MembershipForm>
                
            </Elements>
        </div>
    );
};

export default Payment;