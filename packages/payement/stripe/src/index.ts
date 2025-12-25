// packages/payments/stripe/src/index.ts
 
export default class StripeProvider {
  constructor(private config: { apiKey: string }) {}

  async process(amount: number) {
    console.log('Stripe payment:', amount);
    return { success: true };
  }
}
