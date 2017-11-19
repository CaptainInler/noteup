# noteup
Projekt1 beim CAS - Frontend Engineering der HSR

Das Projekt umfasst eine kleine Notizverwaltung. Es ist in zwei Umsetzungen verfügbar.

1. Branch Master. Sämtliche Notizen werden in den SessionStorage des Browsers gespeichert und sind deshalb auch nur solange da wie der Browser die Seite offen hat. Zum Starten muss nur die Datei index.html geöffnet werden.

2. Branch nodeintegration. Die Daten (Notizen) werden auf einem Server gespeichert und verwaltet. Auf dem Server (Node.JS) müssen die nötigen Dependencies installiert sein (in der Datei package.json ersichtlich). Danach is mit Node.JS die Datei Server/main.js zu starten. Der Client muss die Datei index.hmtl öffnen.
