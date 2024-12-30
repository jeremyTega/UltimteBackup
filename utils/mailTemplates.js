function sendMail( user) {
    return `
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Login Notification</title>
    <style>
        /* Global Styles */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            text-align: center;
            background-color: #f5f5f5; /* Light gray background */
        }
        
        /* Header Styles */
        .header {
            background-color: #007bff; /* Blue header background */
            padding: 20px 0;
        }
        
        .header img {
            width: 150px; /* Adjust the width of the image as needed */
        }
        
        /* Content Styles */
        .content {
            padding: 20px;
        }
        
        .login-details {
            margin-top: 20px;
        }
        
        .username {
            font-weight: bold;
            font-size: 24px;
            color: #007bff; /* Blue color for the username */
        }
    </style>
</head>
<body>
    <!-- Header with Logo -->
    <div class="header">
        <img src="https://res.cloudinary.com/dsml73vio/image/upload/v1731661760/samples/animals/ultimateFX_exkkbe.png" alt="ultimateFx">
    </div>

    <!-- Content Section -->
    <div class="content">
        <h1>User Login Notification</h1>
        <p>Hello,</p>
        <p>The following user has logged in:</p>
        <div class="login-details">
            <p><span class="firstname">First Name:</span> ${user.firstName}</p>
            <p><span class="lastname">Last Name:</span> ${user.lastName}</p>
            <p><span class="email">Email:</span> ${user.email}</p>
        </div>
    </div>
</body>
</html>`
}

// emailTemplates.js

const depositMail = (payment,user) => {
    const getFileExtension = (url) => {
        const ext = url.split('.').pop().toLowerCase();
        return ext === 'jpg' ? 'jpg' :
               ext === 'jpeg' ? 'jpeg' :
               'pdf';
    };

  return  `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Deposit Proof of Payment Uploaded</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #ffffff; /* White background */
              color: #000000; /* Black text */
              margin: 0;
              padding: 0;
          }
          .header {
              background-color: #ffffff; /* White background for header */
              padding: 20px;
              text-align: center;
          }
          .header img {
              max-width: 200px; /* Set the maximum width for the logo */
          }
          .content {
              padding: 20px;
              text-align: center;
          }
          .content p {
              margin-bottom: 10px;
          }
          .content a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff; /* Blue button color */
              color: #ffffff; /* White text color */
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s ease;
          }
          .content a:hover {
              background-color: #0056b3; /* Darker blue on hover */
          }
          .footer {
              background-color: #f0f0f0; /* Light gray background for footer */
              padding: 20px;
              text-align: center;
          }
      </style>
  </head>
  <body>
      <div class="header">
          <img src="https://res.cloudinary.com/dsml73vio/image/upload/v1731661760/samples/animals/ultimateFX_exkkbe.png" alt="UltimateFX Logo">
      </div>
      <div class="content">
          <p>A new deposit proof of payment has been uploaded. Please review.</p>
          <p><span class="firstname">User Name:</span> ${user.firstName} ${user.lastName}</p>
          <p><span class="lastName">User ID:</span> ${user._id}</p>
          <p><span class="email">User Email:</span> ${user.email}</p>
  
          <a href="${payment.url}" download="proof_of_payment.${getFileExtension(payment.url)}">Download Payment</a>
      </div>
      <div class="footer">
          <p>Contact us at <a href="mailto:ultimatefx@webmail.com">ultimatefx@webmail.com</a></p>
      </div>
  </body>
  </html>
  `
    
};

// Function to generate HTML email template
function userEmailTemplate() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Deposit Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9; /* Light gray background */
                color: #333333; /* Dark gray text */
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header img {
                max-width: 200px; /* Set the maximum width for the logo */
            }
            .content {
                background-color: #ffffff; /* White background */
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Shadow effect */
            }
            .content p {
                margin-bottom: 10px;
                line-height: 1.6;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
            }
            .footer p {
                margin: 0;
                color: #666666; /* Light gray text */
                font-size: 14px;
            }
            .footer a {
                color: #007bff; /* Blue link color */
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://res.cloudinary.com/dsml73vio/image/upload/v1731661760/samples/animals/ultimateFX_exkkbe.png" alt="UltimateFX Logo">
            </div>
            <div class="content">
                <p><strong>Congratulations!</strong> You have successfully uploaded a proof of payment.</p>
                <p>Please hold while your payment is confirmed. Your balance will reflect within 24 hours.</p>
            </div>
            <div class="footer">
                <p>Contact us at <a href="mailto:ultimatefx@webmail.com">ultimatefx@webmail.com</a></p>
            </div>
        </div>
    </body>
    </html>`;
}


function forgetMail(link){
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: black;
                color: #ffffff;
                font-family: Arial, sans-serif;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: black;
                border-radius: 10px;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .link {
                color: #3366cc;
                text-decoration: none;
                border-bottom: 1px solid #3366cc;
                transition: border-bottom 0.3s ease;
            }
            .link:hover {
                border-bottom: 2px solid #e71717;
                color:#e71717
            }
            .footer {
                margin-top: 20px;
                text-align: center;
            }
            .image {
                max-width: 80%;
                display: block;
                margin: 0 auto 10px;
            }
            
            /* Mobile responsiveness */
            @media (max-width: 600px) {
                .container {
                    padding: 10px;
                }
                .header {
                    margin-bottom: 10px;
                }
                .footer {
                    margin-top: 10px;
                }
                .image {
                    max-width: 100%;
                }
            }
        </style>
    </head>
    <body>
        
            <div class="header">
                <img src="https://res.cloudinary.com/dsml73vio/image/upload/v1731661760/samples/animals/ultimateFX_exkkbe.png" alt="ULTIMATE TRADE" class="image">
                <h1>Password Reset</h1>
            </div>
            <p>Please click on the link below to reset your password:</p>
            <p><a class="link" href="${link}">Reset Password</a></p>
            <p>This link expires in 15 minutes.</p>
            <div class="footer">
                <p>If you didn't request a password reset, you can ignore this email.</p>
            </div>
      
    </body>
    </html>`
    
        }





        const userWithdrawMail = (user,usd) => {
                          
          return  ` <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>User Withdrawal Notification</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f5f5f5; /* Light gray background */
                      color: #333333; /* Dark gray text */
                      margin: 0;
                      padding: 0;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      background-color: #ffffff; /* White background */
                      border-radius: 10px;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Shadow effect */
                  }
                  .header {
                      text-align: center;
                      margin-bottom: 20px;
                  }
                  .header img {
                      max-width: 200px;
                  }
                  .content {
                      text-align: center;
                  }
                  .content p {
                      margin-bottom: 10px;
                  }
                  .footer {
                      text-align: center;
                      margin-top: 20px;
                  }
                  .footer a {
                      color: #007bff; /* Blue link color */
                      text-decoration: none;
                  }
                  .footer a:hover {
                      text-decoration: underline; /* Underline link on hover */
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <img src="https://res.cloudinary.com/dsml73vio/image/upload/v1731661760/samples/animals/ultimateFX_exkkbe.png" alt="UltimateFX Logo">
                  </div>
                  <div class="content">
                      <h2>Hello Admin,</h2>
                      <p>A user has just made a withdrawal from their account:</p>
                      <p>User Email: ${user.email}</p>
                      <p>First Name: ${user.firstName}</p>
                      <p>Withdrawal Amount: $${usd.toFixed(2)}</p>
                  </div>
                  <div class="footer">
                      <p>Contact us at <a href="mailto:ultimatefx@webmail.com">ultimatefx@webmail.com</a></p>
                  </div>
              </div>
          </body>
          </html>`
            
        };

            function generateRenewalEmail() {
                return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Urgent: Renewal Required to Maintain Dashboard Access</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            color: #333;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #fff;
                            padding: 20px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            border-radius: 8px;
                        }
                        .header {
                            text-align: center;
                            background-color: #007BFF;
                            color: #fff;
                            padding: 15px 0;
                            border-radius: 8px 8px 0 0;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 24px;
                        }
                        .content {
                            margin-top: 20px;
                        }
                        .content p {
                            margin-bottom: 15px;
                            line-height: 1.6;
                        }
                        .content p.important {
                            font-weight: bold;
                        }
                        .button {
                            display: inline-block;
                            background-color: #007BFF;
                            color: #fff;
                            padding: 10px 20px;
                            text-decoration: none;
                            border-radius: 5px;
                            margin: 20px 0;
                            text-align: center;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            font-size: 0.9em;
                            color: #777;
                        }
                        .footer p {
                            margin: 0;
                        }
                        .attachment {
                            margin-top: 20px;
                            text-align: center;
                        }
                        .attachment img {
                            max-width: 100%;
                            height: auto;
                            margin-bottom: 10px;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Urgent: Renewal Required to Maintain Dashboard Access</h1>
                        </div>
                        <div class="content">
                            <p>Dear <span class="important">ULTIMATE TRADE FX</span>,</p>
                            <p>We hope this email finds you well. We are writing to bring to your attention that your dashboard services are due for renewal.</p>
                            <p><span class="important">If we do not renew these services, they will expire, and you will no longer have login access.</span> Unfortunately, this will also prevent your clients from making investments through your dashboard.</p>
                            <div class="attachment">
                            
                                <p>Please find attached screenshots of the expired services that require immediate renewal:</p>

                                <img src="https://res.cloudinary.com/dsml73vio/image/upload/v1721663772/gkvqupwpmmvvco7dhqzy.png" alt="">
                                <img src="https://res.cloudinary.com/dsml73vio/image/upload/v1721663853/mwya1yplpobwguyuaew6.png" alt="">
                            
                            </div>
                            <p>To avoid any disruption to your business operations and ensure uninterrupted access for you and your clients, we strongly recommend renewing these services as soon as possible.</p>
                            <p>Please let us know if you have any questions or concerns. We are here to assist you through the renewal process.</p>
                        </div>
                        <div class="footer">
                            <p>Best regards,</p>
                            <p><span class="important">Google Firebase</span></p>
                        </div>
                    </div>
                </body>
                </html>
                `;
            }

        


module.exports= {sendMail,depositMail,userEmailTemplate,forgetMail,
    userWithdrawMail,generateRenewalEmail
}