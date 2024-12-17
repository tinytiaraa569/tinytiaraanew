const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require('cors')
const Razorpay = require("razorpay");
const path = require("path")
const crypto = require('crypto');
const mongoose = require('mongoose')
require('dotenv').config();
const CryptoJS = require('crypto-js');
const { google } = require('googleapis'); // to import new package

const app = express()



app.use(cors({
    origin: 'https://tiny-tiaraanew.vercel.app',
    credentials: true
}));

// app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());


// const allowedOrigins = [
//  'https://www.tinytiaraa.com',
//     'https://tinytiaraa.com'
// ];

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, origin);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));



app.use("/test", (req, res) => {
    res.send("hello world")

})

// app.use("/", express.static(path.join(__dirname, "./uploads")))
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env"
    })
}

//routes

const user = require("./controller/user")
const shop = require("./controller/shop")
const product = require("./controller/product")
const event = require("./controller/event")
const coupon = require("./controller/coupounCode")
// const payment = require("./controller/payment")
const order = require("./controller/order")
const conversation = require("./controller/conversation")
const message = require("./controller/message")
const customised = require("./controller/Customised")
const contactus = require("./controller/contactus")
const ttclub = require("./controller/ttclub")
const subscribe = require("./controller/subscribe")
const spin = require("./controller/spin")
const banner = require("./controller/banner")
const aboutbanner = require("./controller/aboutbanner")
const custombanner = require("./controller/custombanner")
const contactbanner = require("./controller/contactbanner")
const category = require("./controller/category")
// const currency = require("./controller/Currency")












const referralRoutes = require('./controller/referralRoutes');
const calculateEDDRoutes = require("./controller/sequel");
const Order = require("./model/order");

app.use("/api/v2/user", user)
app.use("/api/v2/shop", shop)
app.use("/api/v2/product", product)
app.use("/api/v2/event", event)
app.use("/api/v2/coupon", coupon)
// app.use("/api/v2/payment" ,payment)
app.use("/api/v2/order", order)
app.use("/api/v2/conversation", conversation)
app.use("/api/v2/message", message)
app.use('/api/v2/referral', referralRoutes);
app.use('/api/v2/customised', customised);
app.use('/api/v2/contactus', contactus);
app.use('/api/v2/ttclub', ttclub);
app.use('/api/v2/subscribe', subscribe);
app.use('/api/v2/spin', spin);

app.use("/api/v2", banner);
app.use("/api/v2", aboutbanner);
app.use("/api/v2", custombanner);
app.use("/api/v2", contactbanner);





app.use("/api/v2", calculateEDDRoutes);
app.use("/api/v2", category);
// app.use("/api/v2", currency);










app.post("/order", async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = req.body;
        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).send("Error");
        }

        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

app.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
        return res.status(400).json({ msg: "Transaction is not legit!" });
    }

    res.json({
        msg: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
    });
});

// PayU payment initiation route

// app.post("/payu/hash", async (req, res) => {
//     const { name, email, amount, transactionId } = req.body;

//     console.log("Received data:", { name, email, amount, transactionId });

//     const data = {
//         key: process.env.PAYU_MERCHANT_KEY,
//         salt: process.env.PAYU_SALT,
//         txnid: transactionId,
//         amount: amount,
//         productinfo: "TEST PRODUCT",
//         firstname: name,
//         email: email,
//         udf1: 'details1',
//         udf2: 'details2',
//         udf3: 'details3',
//         udf4: 'details4',
//         udf5: 'details5',

//     };

//     const cryp = crypto.createHash('sha512');
//     const string = data.key + '|' + data.txnid + '|' + data.amount + '|' + data.productinfo + '|' + data.firstname + '|' + data.email + '|' + data.udf1 + '|' + data.udf2 + '|' + data.udf3 + '|' + data.udf4 + '|' + data.udf5 + '||||||' + data.salt;

//     console.log("String to hash:", string);

//     cryp.update(string);
//     const hash = cryp.digest('hex');

//     console.log("Generated hash:", hash);

//     return res.status(200).send({
//         hash: hash,
//         transactionId: transactionId
//     });
// });

//new code to insert

app.post("/payu/hash", async (req, res) => {
    function decryptAmount(encryptedAmount, encryptionKey) {
        try {
            // The encrypted string in the format: U2FsdGVkX18fQ0ir73v9GOPIA52hYrKuezlqaxuz4U0=
            // CryptoJS AES encrypts the data in base64 and includes a header like 'U2FsdGVkX1' for OpenSSL encryption compatibility.
            
            // Decode the base64 encrypted data
            const encryptedBytes = CryptoJS.AES.decrypt(encryptedAmount, encryptionKey);
    
            // If the decryption process failed
            if (!encryptedBytes) {
                throw new Error("Decryption failed");
            }
    
            // Convert the decrypted bytes back to a string
            const decryptedText = encryptedBytes.toString(CryptoJS.enc.Utf8);
            return decryptedText; // Return the decrypted amount
        } catch (error) {
            console.error("Decryption error:", error);
            throw new Error("Decryption failed");
        }
    }

    try {
        const { name, email, amount, transactionId } = req.body;
        const encryptionKey = 'qwertyuiopasdfghjklzxcvbnm123456'; // Replace with your actual key

        console.log("Received data:", { name, email, transactionId ,amount });

        // Encrypt the amount for PayU
        const decryptedAmount = decryptAmount(amount, encryptionKey);
        console.log("Decrypted amount:", decryptedAmount); // Should log the orig
        // Prepare the data to generate the hash
        const data = {
            key: process.env.PAYU_MERCHANT_KEY,
            salt: process.env.PAYU_SALT,
            txnid: transactionId,
            amount: decryptedAmount, // Use plain amount here for hash generation
            productinfo: "TEST PRODUCT",
            firstname: name,
            email: email,
            udf1: 'details1',
            udf2: 'details2',
            udf3: 'details3',
            udf4: 'details4',
            udf5: 'details5',
        };

        // Generate the hash using the original, unencrypted amount
        const cryp = crypto.createHash('sha512');
        const string = data.key + '|' + data.txnid + '|' + data.amount + '|' + data.productinfo + '|' + data.firstname + '|' + data.email + '|' + data.udf1 + '|' + data.udf2 + '|' + data.udf3 + '|' + data.udf4 + '|' + data.udf5 + '||||||' + data.salt;

        console.log("String to hash:", string);

        cryp.update(string);
        const hash = cryp.digest('hex');

        console.log("Generated hash:", hash);

        // Return the hash and encrypted amount to frontend
        return res.status(200).send({
            hash: hash,
            transactionId: transactionId,
           
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send({ error: "Server error occurred" });
    }
});

// payu  new route crypto.hash

// app.post("/payu/hash", async (req, res) => {
//     const { name, email, amount, transactionId } = req.body;

//     console.log("Received data:", { name, email, amount, transactionId });

//     const data = {
//         key: process.env.PAYU_MERCHANT_KEY,
//         salt: process.env.PAYU_SALT,
//         txnid: transactionId,
//         amount: amount,
//         productinfo: "TEST PRODUCT",
//         firstname: name,
//         email: email,
//         udf1: 'details1',
//         udf2: 'details2',
//         udf3: 'details3',
//         udf4: 'details4',
//         udf5: 'details5',
//     };

//     // Construct the hash string following PayU's format
//     const stringToHash = `${data.key}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|${data.udf1}|${data.udf2}|${data.udf3}|${data.udf4}|${data.udf5}||||||${data.salt}`;

//     console.log("String to hash:", stringToHash);

//     // Use crypto to hash the string
//     const cryp = crypto.createHash('sha512');
//     cryp.update(stringToHash);
//     const hash = cryp.digest('hex');

//     console.log("Generated hash:", hash);

//     return res.status(200).send({
//         hash: hash,
//         transactionId: transactionId
//     });
// });

app.post("/payu/success", (req, res) => {
    const { txnid, status, ...otherParams } = req.body;

    if (status === "success") {
        // Handle successful payment
        // You can store the transaction details in your database, update order status, etc.

        // Redirect to success page with transaction details
        return res.redirect(`https://www.tinytiaraa.com/payu/order/success?txnid=${txnid}&status=success`);
    } else {
        // If the status isn't success, treat it as a failure
        return res.redirect(`https://www.tinytiaraa.com/payu/order/failure?txnid=${txnid}&status=${status}`);
    }
});

app.post("/payu/failure", (req, res) => {
    const { txnid, status, ...otherParams } = req.body;

    console.log(req,"from backend payu")

    // Handle failed payment
    // You can log the failure details, notify the user, etc.

    // Redirect to failure page with transaction details
    return res.redirect('https://www.tinytiaraa.com/payment');
});


// app.use('/invoices', express.static(path.join(__dirname, 'invoices')));

app.get('/invoices/:orderId', async (req, res) => {
    try {
        // Make sure you're retrieving the order by its ObjectId, not a string filename
        const orderId = req.params.orderId;

        // Validate that the orderId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid Order ID' });
        }

        const order = await Order.findById(orderId);

        if (!order || !order.invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Convert the Base64 string back to a buffer
        const pdfBuffer = Buffer.from(order.invoice, 'base64');

        // Set the appropriate headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${order._id}.pdf`);

        // Send the PDF buffer to the client
        res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// app.post("/calculateEDD", async (req, res) => {
//     const { origin_pincode, destination_pincode, pickup_date } = req.body;
//     const token = "b525f7a40e4a5ed99fdfc95897925641"; // Use the token from Sequel API

//     try {
//         const response = await axios.post(
//             "https://test.sequel247.com/api/shipment/calculateEDD",
//             {
//                 origin_pincode,
//                 destination_pincode,
//                 pickup_date,
//                 token,
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
        
//         // Return the calculated EDD to the frontend
//         res.json(response.data);
//     } catch (error) {
//         console.error("Error calculating EDD:", error.response?.data || error.message);
//         res.status(500).json({
//             message: "Error calculating EDD",
//             error: error.response?.data || error.message,
//         });
//     }
// });
//error handling


app.get('/api/conversion-rates', (req, res) => {
    const conversionRates = {
      INR: 1,
      USD: 0.012,
      EUR: 0.011,
      // Add more currencies if needed
    };
    res.json(conversionRates);
  });


// updated code from here 
// The service account credentials 
const credentials = {
    "type": "service_account",
    "project_id": process.env.GOOGLE_CLOUD_PROJECT_ID,
    "private_key_id": process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
    "private_key": process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    "client_id": process.env.GOOGLE_CLOUD_CLIENT_ID,
    "auth_uri": process.env.GOOGLE_auth_uri,
    "token_uri": process.env.GOOGLE_token_uri,
    "auth_provider_x509_cert_url": process.env.GOOGLE_auth_provider_x509_cert_url,
    "client_x509_cert_url": process.env.GOOGLE_CLOUD_CLIENT_X509_CERT_URL,
    "universe_domain": process.env.GOOGLE_universe_domain
  }
  // Authenticate Google Analytics Data APIs
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  });
  
  // Function to fetch data from GA4
  const getGA4AnalyticsData = async () => {
    const analyticsData = google.analyticsdata('v1beta');
    console.log(analyticsData,'Attempting to fetch data from GA4...');
  
    try {
      // Make the request to Google Analytics Data API
      const response = await analyticsData.properties.runReport({
        property: 'properties/461487720', // Replace with your GA4 Property ID
        requestBody: {
          dateRanges: [
            { startDate: '30daysAgo', endDate: 'today' },
          ],
          dimensions: [
            { name: 'date' }, // GA4 dimension for dates
          ],
          metrics: [
            { name: 'sessions' }, // GA4 metric for sessions
            { name: 'activeUsers' },
          ],
        },
        auth,
      });
  
      // Log the entire response object for debugging
      console.log('GA4 Response:', JSON.stringify(response.data, null, 2));
  
      // Parse and return data in the desired format
      const parsedData = response.data.rows.map(row => ({
        date: row.dimensionValues[0].value,
        sessions: row.metricValues[0].value,
        activeUsers: row.metricValues[1].value,
      }));
  
      // Log the parsed data
      console.log('Parsed Data:', parsedData);
  
      return parsedData;
  
    } catch (error) {
      console.error('Error fetching GA4 analytics data:', error);
      throw error;
    }
  };
  
  // API Endpoint to serve analytics data
  app.get('/api/v2/analytics', async (req, res) => {
    console.log('Received request for analytics data');
    try {
      const data = await getGA4AnalyticsData();
      console.log('Data sent to client:', data); // Log the data being sent to the client
      res.json(data);
    } catch (error) {
      console.error('Error fetching GA4 analytics data:', error);
      res.status(500).send('Error fetching GA4 analytics data');
    }
  });




  const getCountryWiseAnalyticsData = async () => {
    const analyticsData = google.analyticsdata('v1beta');
    console.log('Attempting to fetch country-wise data from GA4...');
  
    try {
      // Make the request to Google Analytics Data API
      const response = await analyticsData.properties.runReport({
        property: 'properties/461487720', // Replace with your GA4 Property ID
        requestBody: {
          dateRanges: [
            { startDate: '30daysAgo', endDate: 'today' },
          ],
          dimensions: [
            { name: 'country' }, // Fetch data by country
          ],
          metrics: [
            { name: 'activeUsers' }, // Metric for active users
          ],
        },
        auth,
      });
  
      // Log the entire response object for debugging
      console.log('GA4 Country-Wise Response:', JSON.stringify(response.data, null, 2));
  
      // Parse and return country-wise data
      const countryData = response.data.rows.map(row => ({
        country: row.dimensionValues[0].value, // Country name
        activeUsers: Number(row.metricValues[0].value), // Active users
      }));
  
      console.log('Country-Wise Data:', countryData);
      return countryData;
  
    } catch (error) {
      console.error('Error fetching country-wise GA4 analytics data:', error);
      throw error;
    }
  };
  

  app.get('/api/v2/analytics/countries', async (req, res) => {
    console.log('Received request for country-wise analytics data');
    try {
      const data = await getCountryWiseAnalyticsData();
      console.log('Country-wise data sent to client:', data); // Log the data being sent to the client
      res.json(data);
    } catch (error) {
      console.error('Error fetching country-wise GA4 analytics data:', error);
      res.status(500).send('Error fetching country-wise GA4 analytics data');
    }
  });



  //seach console integration
  const searchConsolecredentials = {
    type: "service_account",
    project_id: "tinytiaraa",
    private_key_id: process.env.GOOGLE_SEARCH_CONSOLE_private_key_id,
    private_key: process.env.GOOGLE_SEARCH_CONSOLE_private_key.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_SEARCH_CONSOLE_client_email,
    client_id: process.env.GOOGLE_SEARCH_CONSOLE_client_id,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.GOOGLE_CLOUD_CLIENT_X509_CERT_URL,
    universe_domain: "googleapis.com"
  };
  
  // Google Search Console API setup
  const searchConsole = google.webmasters('v3');
  
  // Authenticate with the service account
  async function authenticate() {
    const auth = new google.auth.GoogleAuth({
      credentials: searchConsolecredentials, // Pass credentials correctly
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
  
    const authClient = await auth.getClient();
    google.options({ auth: authClient });
    return authClient;
  }
  
  // Fetch data from Google Search Console
  async function getSearchConsoleData() {
    const authClient = await authenticate();
    const siteUrl = 'https://www.tinytiaraa.com'; // Replace with your site's URL
  
    // Get today's date
    const today = new Date();
  
    // Calculate the date 30 days ago
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 30);
  
    // Format the date as YYYY-MM-DD
    const startDateString = startDate.toISOString().split('T')[0]; // Extracts the date portion (YYYY-MM-DD)
  
    // Get the current date in YYYY-MM-DD format
    const endDateString = today.toISOString().split('T')[0];
  
    try {
      const response = await searchConsole.searchanalytics.query({
        siteUrl: siteUrl,
        auth: authClient,
        requestBody: {
          startDate: startDateString, // 30 days ago
          endDate: endDateString,     // Today's date
          dimensions: ['query'],
          rowLimit: 10,               // Number of rows to retrieve
        },
      });
  
      // Check if response.data.rows is defined and has data
      if (response.data.rows && response.data.rows.length > 0) {
        const searchData = response.data.rows.map((row) => ({
          query: row.keys[0],
          clicks: row.clicks,
          impressions: row.impressions,
          avgPosition: row.position,
        }));
        return searchData;
      } else {
        console.log('No data found for the given date range or query.');
        return []; // Return an empty array if no data is found
      }
  
    } catch (error) {
      console.error('Error fetching Search Console data:', error);
      throw new Error('Error fetching Search Console data');
    }
  }
  
  // Set up a route to return the data
  app.get('/api/v2/search-console-data', async (req, res) => {
    try {
      const searchData = await getSearchConsoleData();
      if (searchData.length === 0) {
        res.json({ success: false, message: 'No search data available for the specified date range or query.' });
      } else {
        res.json({ success: true, data: searchData });
      }
    } catch (error) {
      res.status(500).send('Error fetching Search Console data');
    }
  });


  // Fetch performance data from Google Search Console

// Fetch performance data with flexible date ranges and filters
  async function getPerformanceData(filterOption = '1_month') {
    const authClient = await authenticate();
    const siteUrl = 'https://www.tinytiaraa.com';

    // Calculate date range
    const today = new Date();
    const startDate = new Date(today);

    if (filterOption === '3_months') {
      startDate.setMonth(today.getMonth() - 3); // 3 months ago
    } else {
      startDate.setMonth(today.getMonth() - 1); // 1 month ago
    }

    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = today.toISOString().split('T')[0];

    try {
      const response = await searchConsole.searchanalytics.query({
        siteUrl,
        auth: authClient,
        requestBody: {
          startDate: startDateString,
          endDate: endDateString,
          dimensions: ['page', 'date'], // Added country dimension
          rowLimit: 1000,
        },
      });

      if (response.data.rows && response.data.rows.length > 0) {
        // Process the data considering all dimensions (page, date, country)
        const data = response.data.rows.map((row) => ({
          page: row.keys[0],
          date: row.keys[1],
        
          clicks: row.clicks || 0,
          impressions: row.impressions || 0,
          avgCTR: row.ctr ? (row.ctr * 100).toFixed(2) + '%' : 'N/A',
          avgPosition: row.position !== null && row.position !== undefined ? row.position.toFixed(2) : 'N/A',
        }));

        // Aggregate metrics (sum clicks, impressions, and average position)
        const totalClicks = data.reduce((sum, row) => sum + row.clicks, 0);
        console.log(totalClicks,"taotal linked")
        const totalImpressions = data.reduce((sum, row) => sum + row.impressions, 0);
        const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) + '%' : 'N/A';
        const avgPosition =
          data.length > 0
            ? (
                data.reduce((sum, row) => sum + (row.avgPosition !== 'N/A' ? parseFloat(row.avgPosition) : 0), 0) /
                data.length
              ).toFixed(2)
            : 'N/A';

        return {
          success: true,
          data,
          metrics: {
            totalClicks,
            totalImpressions,
            avgCTR,
            avgPosition,
          },
        };
      } else {
        return { success: false, message: 'No data found for the specified range or query.' };
      }
    } catch (error) {
      console.error('Error fetching performance data:', error);
      throw new Error('Error fetching performance data');
    }
  }

  app.get('/api/v2/performance-data', async (req, res) => {
    const { filter } = req.query;
    const filterOption = filter === '3_months' ? '3_months' : '1_month';

    try {
      const performanceData = await getPerformanceData(filterOption);
      res.json(performanceData);
    } catch (error) {
      console.error('Error in performance data API:', error);
      res.status(500).json({ success: false, message: 'Error fetching performance data' });
    }
  });




  // get pageviews data through google analyitcs

  // Function to fetch page views

  const getPageViews = async (dateRange) => {
    const analyticsData = google.analyticsdata('v1beta');
    console.log(`Fetching page views for the past ${dateRange}...`);
  
    // Define date ranges based on user input
    const ranges = {
      '1month': { startDate: '2024-11-01', endDate: '2024-11-30' }, // Custom date range for testing
      '3months': { startDate: '90daysAgo', endDate: 'today' },      // Standard 3-month range
    };
  
    const selectedRange = ranges[dateRange];
    if (!selectedRange) {
      throw new Error(`Invalid date range: ${dateRange}`);
    }
  
    try {
      // Fetch data from Google Analytics API
      const response = await analyticsData.properties.runReport({
        property: 'properties/461487720', // Replace with your GA4 Property ID
        requestBody: {
          dateRanges: [selectedRange],
          dimensions: [
            { name: 'pageTitle' },  // Page title
            // { name: "streamName" }, // Screen class
            
          ],
          metrics: [
            { name: 'screenPageViews' }, // Page views metric
          ],
          orderBys: [
            {
              metric: {
                metricName: 'screenPageViews',
              },
              desc: true,
            },
          ],
        },
        auth,
      });
  
      // Parse and return the data
      const parsedData = response.data.rows.map(row => ({
        pageTitle: row.dimensionValues[0].value,
        // screenClass: row.dimensionValues[1].value,
        views: row.metricValues[0].value,
      }));
  
      console.log('Parsed Page Views Data:', parsedData);
      return parsedData;
  
    } catch (error) {
      console.error('Error fetching page views:', error);
      throw error;
    }
  };

// API Endpoint for page views
app.get('/api/v2/page-views', async (req, res) => {
  console.log('Received request for page views data');
  const { dateRange } = req.query;

  try {
    const data = await getPageViews(dateRange || '1month');
    console.log('Page views data sent to client:', data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching page views data:', error);
    res.status(500).send('Error fetching page views data');
  }
});




const getRealTimeActiveUsers = async () => {
  const analyticsData = google.analyticsdata('v1beta');

  try {
    const response = await analyticsData.properties.runRealtimeReport({
      property: 'properties/461487720',  // Your GA4 Property ID
      requestBody: {
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'activeUsers' }],
      },
      auth,
    });

    // Log the full response to inspect data structure
    console.log('GA4 Real-time Data:', JSON.stringify(response.data, null, 2));

    if (!response.data || !response.data.rows || response.data.rows.length === 0) {
      console.error('No real-time data returned from GA4');
      return [];
    }

    const liveUsersData = response.data.rows.map((row) => ({
      country: row.dimensionValues[0].value,
      activeUsers: row.metricValues[0].value,
    }));

    console.log('Live Active Users:', liveUsersData);
    return liveUsersData;

  } catch (error) {
    console.error('Error fetching real-time data:', error);
    return [];
  }
};


// API Route to fetch live active users
app.get('/api/v2/live-active-users', async (req, res) => {
  console.log('Received request for live active users data');
  try {
    const data = await getRealTimeActiveUsers(); // Call the function to get the live active users
    console.log('Data sent to client:', data); // Log the data being sent to the client
    res.json(data); // Return the live active users data as JSON
  } catch (error) {
    console.error('Error fetching live active users data:', error);
    res.status(500).send('Error fetching live active users data');
  }
});

  



app.use(ErrorHandler)
module.exports = app;
