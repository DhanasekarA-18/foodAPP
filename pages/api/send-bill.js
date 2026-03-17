import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    // In Next.js Pages Router, req.body is already parsed if the content-type is application/json
    // Supporting both possible body formats for safety
    const body = req.body;
    const { email, paymentId, selectedItems, totalAmount, subtotal, discountAmount, isCouponApplied, status = "success" } = body;

    console.log(`Received send-bill request (${status}) for:`, email);

    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      console.error("Mail credentials missing in environment variables");
      return res.status(500).json({ success: false, error: "Mail configuration error" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Ensure selectedItems is an object/array before calling Object.values
    const itemsList = selectedItems ? Object.values(selectedItems) : [];

    const itemsHtml = itemsList
      .map(
        (item) => `
      <tr>
        <td style="padding: 15px 0; border-bottom: 1px solid #eee;">
          <div style="font-weight: 600; color: #1c1c1c; font-size: 15px;">${item.name || "Food Item"}</div>
          <div style="font-size: 12px; color: #828282;">Qty: ${item.selectedCount || 0}</div>
        </td>
        <td style="padding: 15px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: 600; color: #1c1c1c;">
          ₹${(item.cost || 0) * (item.selectedCount || 0)}
        </td>
      </tr>
    `
      )
      .join("");

    const displayPaymentId = paymentId && typeof paymentId === 'string' ? paymentId.slice(-8).toUpperCase() : "FAILED";
    const isSuccess = status === "success";

    const mailOptions = {
      from: `"DS FOOD Delivery" <${process.env.MAIL_FROM || process.env.MAIL_USER}>`,
      to: email,
      subject: isSuccess
        ? `Order Confirmed: Your delicious meal is on the way! 🍔`
        : `Payment Failed: Don't let your hunger wait! 🍕`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif !important; }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f7f6;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f7f6; padding: 20px 0;">
            <tr>
              <td align="center">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                  
                  <!-- Header -->
                  <tr>
                    <td align="center" style="background: ${isSuccess ? 'linear-gradient(135deg, #ff4d4d, #f97316)' : 'linear-gradient(135deg, #4b5563, #1f2937)'}; padding: 50px 40px;">
                      <div style="background: #ffffff; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                        <span style="font-size: 30px;">${isSuccess ? '🚚' : '❌'}</span>
                      </div>
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">
                        ${isSuccess ? 'Order Confirmed!' : 'Payment Failed'}
                      </h1>
                      <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">
                        ${isSuccess ? "We've received your order and it's being prepared." : "Don't worry, your money is safe. If debited, it will be refunded."}
                      </p>
                    </td>
                  </tr>

                  <!-- Order Summary Section -->
                  <tr>
                    <td style="padding: 40px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <div style="font-size: 12px; color: #828282; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; margin-bottom: 8px;">Order Details</div>
                            <div style="font-size: 18px; color: #1c1c1c; font-weight: 700; font-family: monospace;">#${displayPaymentId}</div>
                          </td>
                          <td style="text-align: right;">
                            <div style="font-size: 12px; color: #828282; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; margin-bottom: 8px;">Status</div>
                            <div style="display: inline-block; padding: 4px 12px; background: ${isSuccess ? '#e6fffa' : '#fee2e2'}; color: ${isSuccess ? '#00864e' : '#b91c1c'}; border-radius: 20px; font-size: 12px; font-weight: 700;">
                              ${isSuccess ? 'PAYMENT SUCCESS' : 'PAYMENT FAILED'}
                            </div>
                          </td>
                        </tr>
                      </table>

                      <div style="margin: 30px 0; height: 1px; background: #eee;"></div>

                      ${!isSuccess ? `
                      <div style="background: #fff5f5; border: 1px solid #fed7d7; border-radius: 12px; padding: 15px; margin-bottom: 30px;">
                        <p style="margin: 0; color: #c53030; font-size: 14px; font-weight: 600;">Reason: Transaction was declined by the bank or cancelled.</p>
                      </div>
                      ` : ''}

                      <!-- Items Table -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <thead>
                          <tr>
                            <th align="left" style="font-size: 13px; color: #828282; padding-bottom: 10px; font-weight: 600;">ITEM</th>
                            <th align="right" style="font-size: 13px; color: #828282; padding-bottom: 10px; font-weight: 600;">TOTAL</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${itemsHtml}
                        </tbody>
                      </table>

                      <!-- Final Calculations -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 25px; border-top: 1px solid #eee; padding-top: 20px;">
                        <tr>
                          <td style="font-size: 14px; color: #828282; padding-bottom: 8px;">Subtotal</td>
                          <td align="right" style="font-size: 14px; color: #1c1c1c; padding-bottom: 8px; font-weight: 600;">₹${subtotal || totalAmount}</td>
                        </tr>
                        ${isCouponApplied ? `
                        <tr>
                          <td style="font-size: 14px; color: #10b981; padding-bottom: 8px; font-weight: 600;">Coupon Discount</td>
                          <td align="right" style="font-size: 14px; color: #10b981; padding-bottom: 8px; font-weight: 600;">-₹${discountAmount}</td>
                        </tr>
                        ` : ''}
                        <tr style="font-size: 20px;">
                          <td style="padding: 15px 0 0; color: #1c1c1c; font-weight: 800; border-top: 2px solid #1c1c1c;">Order Total</td>
                          <td align="right" style="padding: 15px 0 0; color: #1c1c1c; font-weight: 800; border-top: 2px solid #1c1c1c;">₹${totalAmount}</td>
                        </tr>
                      </table>

                      ${!isSuccess ? `
                      <div style="margin-top: 40px; text-align: center;">
                        <a href="${process.env.DOMAIN}" style="background: #ff4d4d; color: #ffffff; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; display: inline-block;">Retry Payment</a>
                      </div>
                      ` : `
                      <!-- Helpful Info for Success -->
                      <div style="margin-top: 40px; padding: 25px; background: #FFF9F5; border-radius: 12px; border: 1px dashed #FFD0B0;">
                        <div style="display: flex; align-items: flex-start;">
                          <div style="margin-right: 15px; font-size: 24px;">⭐</div>
                          <div>
                            <div style="font-weight: 700; color: #1c1c1c; margin-bottom: 4px;">Rate your experience</div>
                            <div style="font-size: 13px; color: #555; line-height: 1.5;">Help us improve by rating your ordering experience once the food arrives.</div>
                          </div>
                        </div>
                      </div>
                      <div style="margin-top: 30px; text-align: center;">
                        <a href="${process.env.DOMAIN}" style="color: #ff4d4d; text-decoration: none; font-size: 14px; font-weight: 700;">Order more delicious food →</a>
                      </div>
                      `}
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 0 40px 40px;">
                      <div style="text-align: center;">
                        <div style="margin-bottom: 20px;">
                          <a href="${process.env.DOMAIN}" style="color: #ff4d4d; text-decoration: none; font-size: 14px; font-weight: 700; margin: 0 10px;">Visit Website</a>
                          <span style="color: #eee;">|</span>
                          <a href="#" style="color: #828282; text-decoration: none; font-size: 14px; margin: 0 10px;">Terms of Use</a>
                        </div>
                        <p style="font-size: 12px; color: #828282; line-height: 1.8; margin: 0;">
                          You received this email because you initiated an order on <strong>DS FOOD</strong>.<br>
                          &copy; 2025 DS FOOD. All rights reserved.
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    console.log("Sending email to:", email);
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");

    return res.status(200).json({ success: true, message: "Bill sent successfully" });
  } catch (error) {
    console.error("Email send error details:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
