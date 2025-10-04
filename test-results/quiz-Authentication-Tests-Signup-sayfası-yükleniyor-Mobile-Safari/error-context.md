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
      - heading "Registrieren" [level=1] [ref=e13]
      - paragraph [ref=e14]: Neues Konto erstellen
    - generic [ref=e15]:
      - generic [ref=e16]:
        - generic [ref=e17]: Vollständiger Name
        - textbox "Vollständiger Name" [ref=e18]
      - generic [ref=e19]:
        - generic [ref=e20]: E-Mail
        - textbox "E-Mail" [ref=e21]
      - generic [ref=e22]:
        - generic [ref=e23]: Passwort
        - textbox "Passwort" [ref=e24]
        - paragraph [ref=e25]: Passwort muss mindestens 8 Zeichen lang sein und Sonderzeichen enthalten (!@#$%^&* usw.)
      - generic [ref=e26]:
        - generic [ref=e27]: Passwort bestätigen
        - textbox "Passwort bestätigen" [ref=e28]
      - button "Registrieren" [ref=e29] [cursor=pointer]
    - paragraph [ref=e31]:
      - text: Haben Sie bereits ein Konto?
      - link "Anmelden" [ref=e32]:
        - /url: /auth/signin
    - link "← Zurück zur Startseite" [ref=e34]:
      - /url: /
  - alert [ref=e35]
```