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
      - heading "Sign In" [level=1] [ref=e13]
      - paragraph [ref=e14]: Sign in to your account
    - generic [ref=e15]:
      - generic [ref=e16]:
        - generic [ref=e17]: Email
        - textbox "Email" [ref=e18]
      - generic [ref=e19]:
        - generic [ref=e20]: Password
        - textbox "Password" [ref=e21]
      - button "Sign In" [ref=e22] [cursor=pointer]
    - paragraph [ref=e24]:
      - text: Don't have an account?
      - link "Sign up" [ref=e25]:
        - /url: /auth/signup
    - link "← Back to home" [ref=e27]:
      - /url: /
  - alert [ref=e28]
```