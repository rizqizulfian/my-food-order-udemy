import axios from 'axios';

export const constructReqPayload = data => {
  const date = new Date();
  const today = date.getFullYear() + (date.getMonth() + 1) + date.getDate();
  const miliseconds = date.getMilliseconds();
  const name = data.user.name.replace(/\s+/g, '')
  const order_id = `MID-${name}-${today}${miliseconds}`;

  const orders = data.orderedItems;
  const grossAmount = orders.reduce(function (tot, record) {
    return tot + (record.price * record.quantity);
  }, 0);

  const parameter = {
    "transaction_details": {
      "order_id": order_id,
      "gross_amount": grossAmount + 50000,
    },
    "item_details": [...orders, {
      "price": 50000,
      "quantity": 1,
      "name": "Admin Fee",
      "brand": "NiceFoods",
      "merchant_name": "NiceFoods"
    }],
    "customer_details": {
      "username": data.user.name,
      "email": `${name}@gmail.com`,
      "shipping_address": {
        "first_name": name,
        "email": `${name}@gmail.com`,
        "address": data.user.street,
        "city": data.user.city,
        "country_code": "IDN"
      }
    },
    "credit_card": {
      "secure": true,
      "bank": "bca",
      "installment": {
        "required": false,
        "terms": {
          "bni": [3, 6, 12],
          "mandiri": [3, 6, 12],
          "cimb": [3],
          "bca": [3, 6, 12],
          "offline": [6, 12]
        }
      },
      "whitelist_bins": ["48111111", "41111111"]
    },
  };

  axios({
    url: "https://try-clothes-remote-10.herokuapp.com/getTokenMidtrans",
    method: "POST",
    data: {
      parameter
    },
    headers: {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBcmkiLCJlbWFpbCI6ImFyaUBnbWFpbC5jb20iLCJpYXQiOjE2MzkyNDk1NzZ9.9GUc0SUT024Xmi8rrdyigeEFU3E9RDHgBq1ysjlZ3aA'
    }
  }).then(snapResponse => {
    window.snap.pay(snapResponse.data, {
      onSuccess: function (result) {

      },
      onPending: function (result) {

      },
      onError: function (result) {

      },
      onClose: function () {

      }
    })
  })
};

export const convertToRupiah = nominal => {
  var rupiah = '';
  var angkarev = nominal.toString().split('').reverse().join('');
  for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
  return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
};
