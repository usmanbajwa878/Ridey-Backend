const mongoose = require('mongoose');


const transactionSchema = mongoose.Schema({
    entryId: mongoose.Types.ObjectId,
    userId: { type: String, required: true },
    tripId: { type: String,required:true},
    transactionId: { type: String, required: true },
    balanceTransactionId: { type: String, required: true },
    amount: { type: String, required: true },
    customerId: { type: String, required: true },
    description: { type: String, required: true },
    paymentMethod: { type: Object, required: true },
    source: { type: Object, required: true },
    receipt_url: { type: String, required: true },
    user: { type: Object, required: true }
})

module.exports = mongoose.model('Transaction', transactionSchema);


// charge {
//     id: 'ch_1IS5kuJMCSB6b043ECMo913t',
//     object: 'charge',
//     amount: 200,
//     amount_captured: 200,
//     amount_refunded: 0,
//     application: null,
//     application_fee: null,
//     application_fee_amount: null,
//     balance_transaction: 'txn_1IS5kuJMCSB6b043NpmvkxrH',
//     billing_details: {
//       address: {
//         city: null,
//         country: null,
//         line1: null,
//         line2: null,
//         postal_code: null,
//         state: null
//       },
//       email: null,
//       name: null,
//       phone: null
//     },
//     calculated_statement_descriptor: 'Stripe',
//     captured: true,
//     created: 1615058740,
//     currency: 'usd',
//     customer: 'cus_J4EDCVUhUebFxW',
//     description: 'Paid for ride',
//     destination: null,
//     dispute: null,
//     disputed: false,
//     failure_code: null,
//     failure_message: null,
//     fraud_details: {},
//     invoice: null,
//     livemode: false,
//     metadata: {},
//     on_behalf_of: null,
//     order: null,
//     outcome: {
//       network_status: 'approved_by_network',
//       reason: null,
//       risk_level: 'normal',
//       risk_score: 63,
//       seller_message: 'Payment complete.',
//       type: 'authorized'
//     },
//     paid: true,
//     payment_intent: null,
//     payment_method: 'card_1IS5ksJMCSB6b0433zapBnvg',
//     payment_method_details: {
//       card: {
//         brand: 'visa',
//         checks: [Object],
//         country: 'US',
//         exp_month: 8,
//         exp_year: 2022,
//         fingerprint: 'MH4v7m75obDf9ysO',
//         funding: 'credit',
//         installments: null,
//         last4: '4242',
//         network: 'visa',
//         three_d_secure: null,
//         wallet: null
//       },
//       type: 'card'
//     },
//     receipt_email: null,
//     receipt_number: null,
//     receipt_url: 'https://pay.stripe.com/receipts/acct_1Ht7oBJMCSB6b043/ch_1IS5kuJMCSB6b043ECMo913t/rcpt_J4EDIYqz0eq4Ku9Jb0x9QmeTQLYMNNu',
//     refunded: false,
//     refunds: {
//       object: 'list',
//       data: [],
//       has_more: false,
//       total_count: 0,
//       url: '/v1/charges/ch_1IS5kuJMCSB6b043ECMo913t/refunds'
//     },
//     review: null,
//     shipping: null,
//     source: {
//       id: 'card_1IS5ksJMCSB6b0433zapBnvg',
//       object: 'card',
//       address_city: null,
//       address_country: null,
//       address_line1: null,
//       address_line1_check: null,
//       address_line2: null,
//       address_state: null,
//       address_zip: null,
//       address_zip_check: null,
//       brand: 'Visa',
//       country: 'US',
//       customer: 'cus_J4EDCVUhUebFxW',
//       cvc_check: 'pass',
//       dynamic_last4: null,
//       exp_month: 8,
//       exp_year: 2022,
//       fingerprint: 'MH4v7m75obDf9ysO',
//       funding: 'credit',
//       last4: '4242',
//       metadata: {},
//       name: null,
//       tokenization_method: null
//     },
//     source_transfer: null,
//     statement_descriptor: null,
//     statement_descriptor_suffix: null,
//     status: 'succeeded',
//     transfer_data: null,
//     transfer_group: null
//   }