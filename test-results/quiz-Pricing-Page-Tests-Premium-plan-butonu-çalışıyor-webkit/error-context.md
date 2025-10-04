# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - img "Leben in Deutschland Test" [ref=e6]
        - heading "Leben in Deutschland Test" [level=1] [ref=e8]
      - generic [ref=e9]:
        - button "EN" [ref=e10] [cursor=pointer]
        - button "DE" [ref=e11] [cursor=pointer]
    - generic [ref=e12]:
      - heading "Anmelden" [level=1] [ref=e13]
      - paragraph [ref=e14]: Melden Sie sich in Ihrem Konto an
    - generic [ref=e15]:
      - generic [ref=e16]:
        - generic [ref=e17]: E-Mail
        - textbox "E-Mail" [ref=e18]
      - generic [ref=e19]:
        - generic [ref=e20]: Passwort
        - textbox "Passwort" [ref=e21]
      - button "Anmelden" [ref=e22] [cursor=pointer]
    - paragraph [ref=e24]:
      - text: Haben Sie noch kein Konto?
      - link "Registrieren" [ref=e25]:
        - /url: /auth/signup
    - link "← Zurück zur Startseite" [ref=e27]:
      - /url: /
  - alert [ref=e28]
```