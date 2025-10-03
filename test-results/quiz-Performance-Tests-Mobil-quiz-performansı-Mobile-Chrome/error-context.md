# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e5]:
        - img "Leben in Deutschland Logo" [ref=e6]
        - generic [ref=e7]: Leben in Deutschland Quiz
    - generic [ref=e9]:
      - generic [ref=e11]:
        - heading "Leben in Deutschland Test" [level=1] [ref=e12]
        - generic [ref=e13]: Frage 1 / 20
      - generic [ref=e16]:
        - heading "Welche Farbe hat die deutsche Flagge?" [level=2] [ref=e17]
        - generic [ref=e18]:
          - button "Rot, Weiß, Grün" [ref=e19] [cursor=pointer]:
            - generic [ref=e20] [cursor=pointer]: Rot, Weiß, Grün
          - button "Schwarz, Rot, Gold" [ref=e21] [cursor=pointer]:
            - generic [ref=e22] [cursor=pointer]: Schwarz, Rot, Gold
          - button "Blau, Weiß, Rot" [ref=e23] [cursor=pointer]:
            - generic [ref=e24] [cursor=pointer]: Blau, Weiß, Rot
          - button "Grün, Weiß, Rot" [ref=e25] [cursor=pointer]:
            - generic [ref=e26] [cursor=pointer]: Grün, Weiß, Rot
      - generic [ref=e27]:
        - link "← Zurück zur Startseite" [ref=e28] [cursor=pointer]:
          - /url: /
        - button "Antwort senden" [disabled] [ref=e29]
  - alert [ref=e30]
```