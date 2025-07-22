import config from "@/config"

interface Theme {
	brandColor?: string;
	buttonText?: string;
}

interface SendVerificationRequestParams {
	identifier: string;
	url: string;
	provider: {
		apiKey: string;
		from: string;
	};
	theme: Theme;
}

export async function sendVerificationRequest(params: SendVerificationRequestParams) {
	const { identifier: to, provider, url, theme } = params
	const { host } = new URL(url)
	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${provider.apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from: provider.from,
			to,
			subject: `Sign in to ${host}`,
			html: html({ url, host, theme }),
			text: text({ url, host }),
		}),
	})

	if (!res.ok)
		throw new Error("Resend error: " + JSON.stringify(await res.json()))
}

export function html({ url, host, theme }: { url: string; host: string; theme: Theme }) {
	const escapedHost = host.replace(/\./g, "&#8203;.")

	const brandColor = theme?.brandColor || "#3b82f6"
	const color = {
		background: "#f3f4f6",
		text: "#374151",
		mainBackground: "#ffffff",
		buttonBackground: brandColor,
		buttonBorder: brandColor,
		buttonText: theme?.buttonText || "#ffffff",
		linkColor: "#3b82f6",
		mutedText: "#6b7280",
		borderColor: "#e5e7eb"
	}

	return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign in to ${config.metadata.title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${color.background}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${color.background};">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: ${color.mainBackground}; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
          <!-- Logo/Header -->
          <tr>
            <td align="center" style="padding: 40px 20px 20px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: ${color.text};">
                ${config.metadata.title}
              </h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td align="center" style="padding: 20px 40px;">
              <h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 600; color: ${color.text};">
                Welcome back!
              </h2>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: ${color.mutedText};">
                Click the button below to sign in to your account. This link will expire in 24 hours.
              </p>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 0 40px 40px;">
              <a href="${url}" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: ${color.buttonBackground}; color: ${color.buttonText}; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px; box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 1px 2px -1px rgba(0, 0, 0, 0.06);">
                Sign in to ${config.metadata.title}
              </a>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-top: 1px solid ${color.borderColor};"></td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Alternative Link -->
          <tr>
            <td align="center" style="padding: 40px;">
              <p style="margin: 0 0 8px; font-size: 14px; color: ${color.mutedText};">
                Or copy and paste this URL into your browser:
              </p>
              <p style="margin: 0; font-size: 14px; word-break: break-all;">
                <a href="${url}" style="color: ${color.linkColor}; text-decoration: none;">
                  ${url}
                </a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 40px 40px;">
              <p style="margin: 0; font-size: 14px; color: ${color.mutedText};">
                If you didn't request this email, you can safely ignore it.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
export function text({ url, host }: { url: string; host: string }) {
	return `Welcome back to ${config.metadata.title}!

Click the link below to sign in to your account:
${url}

This link will expire in 24 hours.

If you didn't request this email, you can safely ignore it.

Best regards,
The ${config.metadata.title} Team
`
}