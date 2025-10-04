# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e7]:
        - img "Leben in Deutschland Test Logo" [ref=e8]
        - generic [ref=e9]: Leben in Deutschland Test
    - main [ref=e10]:
      - generic [ref=e12]:
        - button "EN" [ref=e13] [cursor=pointer]
        - button "DE" [ref=e14] [cursor=pointer]
      - generic [ref=e15]:
        - heading "Premium Membership - €5.99 (3 Months)" [level=1] [ref=e16]
        - paragraph [ref=e17]: Enter your credit card information
      - generic [ref=e19]:
        - generic [ref=e20]:
          - generic [ref=e21]:
            - generic [ref=e22]: Name on Card
            - textbox "Full Name" [active] [ref=e23]
          - generic [ref=e24]:
            - generic [ref=e25]: Card Number
            - textbox "4242424242424242" [ref=e26]
          - generic [ref=e27]:
            - generic [ref=e28]:
              - generic [ref=e29]: Expiry Date
              - textbox "12/25" [ref=e30]
            - generic [ref=e31]:
              - generic [ref=e32]: CVC
              - textbox "123" [ref=e33]
          - button "Pay €5.99 for 3 Months Premium" [ref=e34] [cursor=pointer]
        - link "← Back to Pricing" [ref=e36]:
          - /url: /pricing
  - alert [ref=e37]
```