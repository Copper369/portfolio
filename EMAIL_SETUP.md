# Contact Form Setup with Web3Forms

## Overview
The contact form uses Web3Forms - a free service that sends form submissions directly to your email without requiring a backend server.

## How It Works

When a visitor submits the contact form:
1. Form data is sent to Web3Forms API
2. Web3Forms processes the submission
3. You receive an email at your configured address
4. Visitor sees a success message

## Configuration

### Access Key
Your Web3Forms access key is already configured:
```
481708d1-d17b-455a-a567-34ddf76a5fed
```

### Email Destination
Configure where emails are sent:
1. Go to [Web3Forms Dashboard](https://web3forms.com/)
2. Log in with your access key
3. Set your email: ayushkarnewar369@gmail.com
4. Customize email templates (optional)

## Features

### Form Fields
- **Name** (required)
- **Email** (required) - for reply-to
- **Phone** (optional)
- **Message** (required)

### User Experience
- Real-time form validation
- Loading spinner during submission
- Success/error messages
- Form auto-clears after successful submission
- Beautiful glassmorphism design

### Email Features
- Professional email formatting
- Reply-to set to visitor's email
- Custom subject line
- All form data included

## Benefits

✅ **No Backend Required** - Works with static hosting
✅ **Free Forever** - 250 submissions/month on free plan
✅ **Spam Protection** - Built-in honeypot and reCAPTCHA support
✅ **Instant Delivery** - Emails arrive immediately
✅ **No Dependencies** - Pure JavaScript, no npm packages
✅ **GDPR Compliant** - Privacy-focused service

## Advanced Features (Optional)

### Add reCAPTCHA
Add spam protection:
```html
<input type="hidden" name="recaptcha_site_key" value="YOUR_SITE_KEY">
```

### Custom Redirect
Redirect after submission:
```html
<input type="hidden" name="redirect" value="https://yoursite.com/thank-you">
```

### Email Notifications
Customize email template in Web3Forms dashboard:
- Add your logo
- Change colors
- Modify layout

## Testing

1. Start dev server: `npm run dev`
2. Navigate to Contact section
3. Fill out the form
4. Click "Send Message"
5. Check your email inbox

## Troubleshooting

### Not receiving emails?
- Check spam/junk folder
- Verify access key is correct
- Confirm email is configured in Web3Forms dashboard
- Check Web3Forms dashboard for submission logs

### Form not submitting?
- Check browser console for errors
- Verify internet connection
- Ensure all required fields are filled

## Upgrade Options

Free plan includes:
- 250 submissions/month
- Email notifications
- File uploads (up to 5MB)
- Webhook support

Paid plans offer:
- More submissions
- Custom branding
- Priority support
- Advanced integrations

## Alternative: "Say Hello" Button

The "Say Hello" button provides a quick mailto link:
- Opens visitor's email client
- Pre-filled with your email
- No form required

## Production Ready

This setup works perfectly for:
- ✅ Vercel deployment
- ✅ Netlify deployment
- ✅ GitHub Pages
- ✅ Any static hosting

No environment variables or server configuration needed!


