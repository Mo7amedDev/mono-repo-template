 
export default class TwoCheckoutProvider {
  constructor(private config: { apiKey: string }) {}

  async process(amount: number) {
    console.log('2Checkout payment:', amount);
    return { success: true };
  }
}
