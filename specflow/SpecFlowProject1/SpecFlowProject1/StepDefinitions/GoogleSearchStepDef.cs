using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace SpecFlowProject1.StepDefinitions
{
    [Binding]
    public sealed class GoogleSearchStepDefs
    {
        private IWebDriver driver;

        public GoogleSearchStepDefs(IWebDriver driver)
        {
            this.driver = driver;
        }

        [Given(@"Open the browser")]
        public void GivenOpenTheBrowser()
        {
            //driver = new ChromeDriver();
            //driver.Manage().Window.Maximize();
        }

        [When(@"Enter the URL")]
        public void WhenEnterTheURL()
        {
            driver.Url = "https://www.google.com";
            Thread.Sleep(5000);
        }

        [Then(@"Search for Coffee machines")]
        public void ThenSearchForCoffeeMachines()
        {
                driver.FindElement(By.XPath("//*[@name='q']")).SendKeys("coffee machines");
                driver.FindElement(By.XPath("//*[@name='q']")).SendKeys(Keys.Enter);
                Thread.Sleep(3000);

                //driver.Quit();
           
        }

    }
}
