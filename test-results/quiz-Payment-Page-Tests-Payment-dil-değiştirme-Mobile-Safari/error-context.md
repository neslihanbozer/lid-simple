# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
        - heading "Premium-Mitgliedschaft - €5.99 (3 Monate)" [level=1] [ref=e16]
        - paragraph [ref=e17]: Geben Sie Ihre Kreditkarteninformationen ein
      - generic [ref=e19]:
        - generic [ref=e20]:
          - generic [ref=e21]:
            - generic [ref=e22]: Name auf der Karte
            - textbox "Vollständiger Name" [ref=e23]
          - generic [ref=e24]:
            - generic [ref=e25]: Kartennummer
            - textbox "4242424242424242" [ref=e26]
          - generic [ref=e27]:
            - generic [ref=e28]:
              - generic [ref=e29]: Ablaufdatum
              - textbox "12/25" [ref=e30]
            - generic [ref=e31]:
              - generic [ref=e32]: CVC
              - textbox "123" [ref=e33]
          - button "€5.99 für 3 Monate Premium bezahlen" [ref=e34] [cursor=pointer]
        - link "← Zur Preisgestaltung zurück" [ref=e36]:
          - /url: /pricing
  - alert [ref=e37]
```