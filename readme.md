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

To access MongoDB, open a terminal and run:

mongo

Mest viktiga till detta projekt att sedan koppla sig mot produktions databasen skapad via mongodb atlas i databases.js:

const { MongoClient } = require("mongodb");

// Construct the MongoDB Atlas URI using environment variables
const uri = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.ljydkel.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

Implementerat testdatabas inuti if sats

if (process.env.NODE_ENV === "test") {
dbName = "testlocal"; // Använd "testlocal" som databasnamn för tester
}

# implementera mongoDb med node samt skypa ny modiferad version av databas.js

installera inom backend mappen:

npm install mongodb --save

# Installation av mocha tests back/frontend

installerade kompononenter till backend

npm install node-html-parser chai mocha mongodb chai-http
--save-dev

installerade test lompononenter till frontend

npm install selenium-webdriver

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

// Import av nödvändiga paket och bibliotek för Selenium-webdriver-tester.

// Laddning av miljövariabler från .env-filen för att konfigurera testmiljön.

// Skapande av en instans av Chrome-webbläsaren med inställningar och konfiguration för headless-läge.

// Ange målet (target) URL för testerna.

// En testsvit som innehåller flera testfall för att verifiera olika aspekter av webbplatsen.

// Funktioner för att navigera till specifika länkar, matcha URL:er och verifiera textinnehåll på sidor.

// Konfigurering av timeout för testerna.

// Ett före-test som lanserar Chrome-webbläsaren och går till målet URL:en.

// Individuella testfall som utför olika åtgärder.

// Ett efter-test som avslutar Chrome-webbläsaren.

Testerna är avsedda att automatisera testprocessen för att säkerställa att webbplatsen fungerar korrekt. De kontrollerar sidstruktur, interaktion och visuell representation för att säkerställa att allt fungerar som förväntat. Det smidiga headless-läget har förenklat och effektiviserat testkörningen. Eventuella ytterligare testfall kan enkelt läggas till för att täcka olika aspekter av webbapplikationen efter eventuell refraktorering. Headless mycket smidigare mot Ci kedja.

# Implementera CI Kedja

CI/CD för Backend-Test
I den här CI/CD-kedjan för backend implementerar vi ett automatiskt bygg- och testflöde för backend-applikationen varje gång det sker en push till dev-grenen.

Checkout code: Koden hämtas från din Git-repository för att initiera bygg- och testprocessen.

Set up Node.js: Den aktuella Node.js-versionen (16.20.2) installeras för att säkerställa att testerna körs i rätt miljö.

Set up MongoDB: En Docker-container med MongoDB (version 5.0) hämtas och startas. Detta ger en dedikerad MongoDB-miljö för att köra backend-testerna.

Start MongoDB-service: MongoDB-tjänsten startas i Docker-kontainern.

Install backend dependencies: Backend-projektets beroenden installeras.

Run backend tests: Backend-testerna körs i sin dedikerade miljö. Eventuella fel eller problem rapporteras tillbaka.

CI/CD för Frontend-tests
I den här CI-kedjan för frontend implementerar vi ett automatiskt bygg- och testflöde för frontend-applikationen varje gång det sker en push till dev-grenen.

Checkout code: Koden hämtas från din Git-repository för att initiera bygg- och testprocessen.

Set up Node.js: Den aktuella Node.js-versionen (16.20.2) installeras för att säkerställa att testerna körs i rätt miljö.

Install dependencies: Frontend-projektets beroenden installeras.

Run Selenium tests: Selenium-tester körs i headless Chrome-webbläsaren. Denna typ av tester kan användas för att verifiera webbapplikationens funktionalitet och användarinteraktioner.

Dessa CI-kedjor möjliggör en smidig utvecklingsprocess genom att automatisera bygg- och teststegen och säkerställa att koden fungerar korrekt i både backend- och frontend-applikationerna. De hjälper också till att upptäcka och åtgärda eventuella problem tidigt i utvecklingscykeln.

# Driftsättning Backend

Här är de stegen som har utförts för att framgångsrikt driftsätta backend-applikationen på Azure App Services:

Azure-konto och resursgrupp: Ett Azure-konto har skapats, och en resursgrupp har skapats inom Azure Portal för att organisera och hantera de resurser som behövs för applikationen.

Azure App Service-plan: En App Service-plan har skapats för att definiera resurser och skalning för din backend-applikation.

Skapa och publicera webbapp: Backend-koden har publicerats på Azure App Services som en webbapp. Detta görs enkelt med hjälp av Azure Portal eller genom att använda verktyg som Azure CLI eller Azure DevOps-pipelines.

Hantera miljövariabler: Alla nödvändiga miljövariabler och anslutningssträngar, inklusive din anslutning till Azure-databasen, har konfigurerats som Application Settings i Azure Portal eller som miljövariabler för att skydda känslig information.

Konfigurera CORS-policy: För att hantera Cross-Origin Resource Sharing (CORS) och tillåta anslutningar från olika källor, har en säker och specifik CORS-policy konfigurerats. Detta är viktigt för att säkerställa att klientapplikationer, både lokalt och från studentservern, kan kommunicera med din backend på Azure App Services.

Genom att implementera dessa steg har din backend-applikation blivit framgångsrikt driftsatt på Azure App Services och är redo att acceptera anslutningar från olika källor. Den har också säkrats genom korrekt hantering av miljövariabler och konfigurering av en CORS-policy för att tillåta säker och smidig kommunikation med din frontend och andra klienter. Detta möjliggör en pålitlig och skalbar driftsättning av din backend-applikation på Azure-molnet.

# Driftsättning Frontend

Frontend driftsatt via studentservern

Följande steg utfördes: 

Konvertering av existerande kod till Vue (3). 

Tillägg av router för hantering av navigering - hashhantering behövdes för historiken

Uppdatering av Vue samt Leaflet (npm install / update)

Deploy-script använt vid package.json,  "deploy": "npm run build && rsync -av --delete dist/ anbx22@ssh.student.bth.se:www/editor"

Test av funktionalitet efter publish till studentservern. 
