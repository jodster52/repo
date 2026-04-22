Jodi Chalupa - 03-13-2026

Automation of the top 2 scenarios

Assumptions & Trade-Offs
1. Using only Chrome for this project.
2. Using faker-js to generate fake data
3. Sometimes there's a 'toast' class that appears on the join page.  It will say something like: https://tools.ietf.org/html/rfc9110#section-15.5.1 One or more validation errors occurred. 400 [object Object] 00-e06b7a46b4a44474aee526b76f12fb59-34dbb09b0bb5bd8b-01  I put in a 500 ms timeout but, if I had more time, I would build an if statement and take a screenshot to capture this popup.
4. I have not fully handled if there are no more available days for the month.  I would build a loop that would click the 'next month' button until it found some avialable days.  Same with timeslots.
5. For the selectScan method, I have it always pick 'MRI Scan'.  It would be better to have a selectRandomScan method with a switch statement where it would randomly pick one of the enabled options.  This give a better test coverage.  Same with Gender, it would randomly pick between the genders available so we test more options.



To Run: in a terminal/powershell window, type the following commands:
npm install @playwright/test
npx playwright install
npm install -D @faker-js/faker
npm install dayjs
npx playwright test --headed