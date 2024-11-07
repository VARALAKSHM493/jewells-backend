const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const customer = require('../models/user');

let otps = {}; // Temporary storage for OTPs

// SignUp Function
const Signup = (req, res) => {
    const { username, email, password } = req.body;

    // Generate an OTP with 8 characters (Alphanumeric + Special Characters)
    const otp = otpGenerator.generate(6, {
        digits: true,        // Allow only digits (0-9)
        upperCase: false,    // No uppercase letters
        specialChars: false  // No special characters
    });

    // Store the generated OTP in memory (you can store it in a more persistent storage if needed)
    otps[email] = otp;

    // Setup the email transporter using Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'varamynam11@gmail.com', // Use your email
            pass: 'qyxc xhhk xefx rpgj', // Use your email password or app-specific password
        },
    });

    // Email Options
    const mailOptions = {
        from: 'varamynam11@gmail.com',  // Use the same email here
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
    };

    // Send OTP Email
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return res.status(500).send('Error sending OTP');
        }

        // Create a new user in the database after OTP is sent
        customer.create({ username, email, password })
            .then(() => res.json({ message: 'OTP sent to email. Please verify it.' }))
            .catch(err => {
                console.error(err);
                res.status(500).send('Error creating user');
            });
    });
};

// Verify OTP Function
const verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    // Check if the OTP matches the stored one for that email
    if (otps[email] && otps[email] === otp) {
        delete otps[email]; // Remove OTP after verification
        return res.json('OTP verified successfully!');
    } else {
        return res.status(400).json('Invalid or expired OTP');
    }
};

// Login Function
const Login = (req, res) => {
    const { email, password } = req.body;

    // Find the user in the database
    customer.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json('success');
                } else {
                    res.json('password is incorrect');
                }
            } else {
                res.json('user not found');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error logging in');
        });
};

module.exports = { Signup, Login, verifyOtp };
