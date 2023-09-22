# Steg för att få igång applikationen

Installerade dotenv
Tog ut en API-nyckel från trafikverket
skapade en .env fil innehållande TRAFIKVERKET_API_KEY='din nyckel'
Lade till require('dotenv').config(); i de filer som använder APIet.

Notering: Detta tog oss fram till "hello world" och routarna.

Installerade node live-server för att köra frontenden. (testade först php, men fick det inte att funka.)

python3 -m htttp.server 9000 fungerade dock fint direkt.

Körde sedan backend och frontend i två olika terminaler på port 1337 respektive 9000.
live-server --port=9000 - front end till 9000 eller python3 -m http.server 9000
node app.js - back end till 1337

Installerade cors middleware.

Applikationen tycks nu fungera. Jag kan se försenade tåg, det är grafiskt representerat med markörer, jag kan klicka på en försenad avgång och komma till en sida förberedd för att kunna starta ärenden.

Bedömer att vi är "framme" och att applikationen fungerar så långt det går.

# npm audit report

# Problem 1

debug <=2.6.8
Severity: high
debug Inefficient Regular Expression Complexity vulnerability - https://github.com/advisories/GHSA-9vvw-cc9w-f27h
Regular Expression Denial of Service in debug - https://github.com/advisories/GHSA-gxpj-cx7g-858c
Depends on vulnerable versions of ms
fix available via `npm audit fix`
node_modules/debug
express 2.5.8 - 4.15.4 || 5.0.0-alpha.1 - 5.0.0-alpha.5
Depends on vulnerable versions of debug
Depends on vulnerable versions of finalhandler
Depends on vulnerable versions of fresh
Depends on vulnerable versions of qs
Depends on vulnerable versions of send
Depends on vulnerable versions of serve-static
node_modules/express
finalhandler <=1.0.5
Depends on vulnerable versions of debug
node_modules/finalhandler
send <=0.15.6
Depends on vulnerable versions of debug
Depends on vulnerable versions of fresh
Depends on vulnerable versions of mime
Depends on vulnerable versions of ms
node_modules/send
node_modules/serve-static/node_modules/send
serve-static 1.1.0 - 1.12.5
Depends on vulnerable versions of send
node_modules/serve-static

# Problem 2

fresh <0.5.2
Severity: high
Regular Expression Denial of Service in fresh - https://github.com/advisories/GHSA-9qj9-36jm-prpv
fix available via `npm audit fix`
node_modules/fresh

# Problem 3:

mime <1.4.1
Severity: moderate
mime Regular Expression Denial of Service when mime lookup performed on untrusted user input - https://github.com/advisories/GHSA-wrvr-8mpx-r7pp
fix available via `npm audit fix`
node_modules/mime

# Problem 4

ms <2.0.0
Severity: moderate
Vercel ms Inefficient Regular Expression Complexity vulnerability - https://github.com/advisories/GHSA-w9mr-4mfr-499f
fix available via `npm audit fix`
node_modules/ms
node_modules/serve-static/node_modules/ms

# Problem 5

node-fetch <2.6.7
Severity: high
node-fetch is vulnerable to Exposure of Sensitive Information to an Unauthorized Actor - https://github.com/advisories/GHSA-r683-j2x4-v87g
fix available via `npm audit fix`
node_modules/node-fetch

# Problem 6

qs <=6.2.3
Severity: high
Prototype Pollution Protection Bypass in qs - https://github.com/advisories/GHSA-gqgv-6jq5-jjj9
qs vulnerable to Prototype Pollution - https://github.com/advisories/GHSA-hrpp-h998-j3pp
fix available via `npm audit fix`
node_modules/qs

# Problem 7

semver 6.0.0 - 6.3.0 || 7.0.0 - 7.5.1
Severity: moderate
semver vulnerable to Regular Expression Denial of Service - https://github.com/advisories/GHSA-c2qf-rxjj-qqgw
semver vulnerable to Regular Expression Denial of Service - https://github.com/advisories/GHSA-c2qf-rxjj-qqgw
fix available via `npm audit fix`
node_modules/make-dir/node_modules/semver
node_modules/semver

11 vulnerabilities (3 moderate, 8 high)

To address all issues, run:
npm audit fix

# Lösning

npm audit fix löste samtliga sårbarheter.

# Val av Frontend ramverk

Efter en del tittande kom vi fram till foljande:

Vue är ett utmärkt val för vårt mindre projekt av flera anledningar:

Enkel inlärning: Vue har en lättförståelig och ren syntax som gör det enkelt för teammedlemmar att komma igång snabbt, även om de är nya inom ramverket.

Små projektstorlekar: För mindre projekt är Vue idealiskt eftersom det erbjuder flexibilitet och kraft utan att lägga till onödig komplexitet. Det hjälper oss att undvika överdriven kod och snabbar upp utvecklingen.

Aktiv gemenskap: Trots att Vue inte är lika stort som Angular eller React har det fortfarande en aktiv och växande community. Det innebär att vi kan hitta stöd, resurser och tredjepartsbibliotek när vi behöver dem.

Utmärkt dokumentation: Vue har känd för sin högkvalitativa och lättillgängliga dokumentation. Detta gör det enkelt för vårt team att lära sig, felsöka och optimera vår kod.

Integration: Vue är flexibelt och kan integreras i befintliga projekt och infrastrukturer. Detta kan vara en fördel om vi redan har investerat i vissa teknologier och bara vill använda Vue för en del av vårt projekt.

Sammanfattningsvis är Vue ett smart val för mindre projekt där vi behöver effektivitet, enkelhet och snabb inlärningskurva. Dess balans mellan funktionalitet och tydlighet gör det till ett kraftfullt alternativ för att bygga högkvalitativa användargränssnitt på kort tid.

# Installation av mongoDb

Installerar node driver npm install mongodb inom backend mappen samt till linux system via

wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

sudo apt update

sudo apt install mongodb-org

sudo systemctl start mongod

sudo systemctl enable mongod

Verify that MongoDB is running with:

sudo systemctl status mongod

Se om MongoDB fungerar, se terminal och run:

mongo

Mest viktiga till detta projekt att koppla sig mot databsen skapad via mongodb atlas:

const { MongoClient } = require("mongodb");

const database = {
openDb: async function openDb() {
const uri =
"mongodb+srv://adriandedorson2:8PJFVm5m6xStZS59@cluster0.ljydkel.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB Atlas URI

        const client = new MongoClient(uri);

kopplar upp sig till databasen

# implementera mongoDb med node samt skypa ny modiferad version av databas.js

installera inom backend-mongodb mappen:

npm install

npm install mongodb --save

# Installation av mocha tests back/frontend

installerade kompononenter till backend

npm install node-html-parser chai mocha mongodb chai-http selenium-webdriver --save-dev

installerade test kompononenter till frontend

npm install node-html-parser chai mocha mongodb chai-http selenium-webdriver --save-dev

\*Obs For att testa frontend ska en starta appen via servarna innan.

# Implementera tester backend

Miljöinställning:

Koden sätter miljövariabeln NODE_ENV till "test" för att ange att den körs i en testmiljö.

Testbibliotek:

Det använder testbibliotek som Chai och Chai-HTTP för att utföra HTTP-förfrågningstester och assertioner.

Testsvit:

Koden definierar en testsuite med namnet "Serveranslutningsbeteende" med hjälp av describe, som innehåller flera testfall relaterade till serveranslutning.

Serverinställning och avslut:

Innan testerna körs startar den en testserver på en angiven port och stänger den när testningen är klar.

Individuella testfall:

Det finns individuella testfall skapade med hjälp av it. Dessa testfall gör HTTP-förfrågningar till specifika serverendpunkter och kontrollerar om svarsstatuskoderna är som förväntat.

Spårning av teststatus:

Den håller koll på en variabel, allTestsPassed, för att följa om alla tester har passerat.

Åtgärder efter godkännande:

I efterkrok utför den efter-godkännande-åtgärder (t.ex. städning) om alla tester passerar framgångsrikt.

Lägg till fler testfall:

Koden uppmuntrar att lägga till fler testfall för att täcka olika vägar och beteenden i applikationen utefter refraktorering.

# Implementera tester frontend

Import av nödvändiga paket och bibliotek för Selenium-webdriver-tester.

Laddning av miljövariabler från .env-filen för att konfigurera testmiljön.

Skapande av en instans av Chrome-webbläsaren med inställningar och konfiguration.

Ange målet (target) URL för testerna.

En testsvit som innehåller flera testfall för att verifiera olika aspekter av webbplatsen.

Funktioner för att navigera till specifika länkar, matcha URL:er och verifiera textinnehåll på sidor.

Konfigurering av timeout för testerna.

Ett före-test som lanserar Chrome-webbläsaren och går till målet URL:en.

Individuella testfall som utför följande åtgärder:

Söker efter HTML-element som <body> och <head> för att kontrollera deras närvaro.
Väntar på att ett element blir synligt på sidan.
Kontrollerar sidtiteln och URL:en.
Klickar på specifika länkar och verifierar att de tar dig till rätt sidor.
Öppnar en ticket-visning och kontrollerar att nödvändiga element visas.
Ett efter-test som avslutar Chrome-webbläsaren.

Testerna är avsedda att automatisera testprocessen för att säkerställa att webbplatsen fungerar korrekt. De kontrollerar sidstruktur, interaktion och visuell representation för att säkerställa att allt fungerar som förväntat.Uppmuntrar även att lägga till fler testfall för att täcka olika aspekter av webbapplikationen utefter refraktorering.
