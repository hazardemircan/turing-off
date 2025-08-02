# Security Policy

## Supported Versions

We actively support the following versions of TuringOff:

| Version | Supported          |
| ------- | ------------------ |
| 1.0     | ✅ Yes             |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue in TuringOff, please report it responsibly.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by:

1. **Email**: Send details to [hazardemircan.dev@outlook.com] with "TuringOff Security" in the subject line
2. **GitHub Security Advisories**: Use the "Report a vulnerability" button in the Security tab of this repository

### What to Include

When reporting a vulnerability, please include:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: We aim to acknowledge your report within 48 hours
- **Status Updates**: We'll provide regular updates on our progress every 7 days
- **Resolution**: We aim to resolve critical issues within 30 days

### Safe Harbor

We support responsible disclosure and will not pursue legal action against researchers who:

- Make a good faith effort to avoid privacy violations and data destruction
- Only interact with accounts you own or with explicit permission of the account holder
- Do not access or modify others' data
- Report the vulnerability promptly
- Do not disclose the issue publicly until we've had a chance to address it

### Recognition

We believe in recognizing security researchers who help keep TuringOff safe:

- We'll acknowledge your contribution in our release notes (unless you prefer to remain anonymous)
- We'll list you in our security researchers hall of fame
- For significant findings, we're happy to provide a letter of recommendation

### Scope

This security policy applies to:

- The TuringOff Chrome extension
- This GitHub repository
- Official distribution channels (Chrome Web Store)

Out of scope:
- Third-party Chrome extensions that interact with TuringOff
- Social engineering attacks
- Issues in third-party dependencies (please report to the respective maintainers)

## Security Best Practices for Contributors

When contributing to TuringOff:

- Never commit API keys, passwords, or sensitive data
- Use secure coding practices
- Validate all inputs
- Follow the principle of least privilege
- Keep dependencies updated
- Test for common vulnerabilities (XSS, injection attacks, etc.)

## Browser Extension Security

TuringOff follows Chrome extension security best practices:

- Uses Manifest V3 for enhanced security
- Minimal permissions requested
- No external script loading
- Content Security Policy enforced
- No eval() or innerHTML usage with user data

## Questions?

If you have questions about this security policy, please create a GitHub issue or contact us at [hazardemircan.dev@outlook.com].

---

**Policy version**: 1.0
