import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import pages.googleCalculator;
import pages.googleSearch;
import utils.calcUtils;

import java.time.Duration;

public class googleCalculatorE2E {

    public static WebDriver driver = null;
    public static FluentWait wait = new FluentWait(driver)
            .withTimeout(Duration.ofSeconds(15))
            .pollingEvery(Duration.ofSeconds(1));



    @Test(priority=1)
    public static void searchForCalculatorTest(){
        System.out.println("Search for calculator in Google");
        googleSearch.searchBox(driver).sendKeys("calculator",Keys.ENTER);
        wait.until(ExpectedConditions.visibilityOf(googleCalculator.calcEquation(driver)));
        Assert.assertTrue(googleCalculator.calcEquation(driver).isDisplayed());

    }

    @Test(priority = 2)
    public static void basicMathOperationsTest() {

        System.out.println("Divide:  9 ÷ 3");

        //click 9
        googleCalculator.calcBtn_Num(driver,"9").click();
        wait.until(ExpectedConditions.visibilityOf(googleCalculator.calcCE(driver)));


        //click divide
        googleCalculator.calcOperBtn_Divide(driver).click();

        //click 3
        googleCalculator.calcBtn_Num(driver,"3").click();

        wait.until(ExpectedConditions.visibilityOf(googleCalculator.calcCE(driver)));
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"9 ÷ 3");

        //click equals
        googleCalculator.calcOperBtn_Equals(driver).click();
        wait.until(ExpectedConditions.visibilityOf(googleCalculator.calcAnswer(driver)));

        //check answer shows equation
        Assert.assertEquals(googleCalculator.calcAnswer(driver).getText(),"9 ÷ 3 =");

        //check value is 3
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"3");

        System.out.println("Multiply: 3 × 8");

        //click multiply
        googleCalculator.calcOperBtn_Multiply(driver).click();

        //click 8
        googleCalculator.calcBtn_Num(driver,"8").click();
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"3 × 8");

        //click equals
        googleCalculator.calcOperBtn_Equals(driver).click();
        //check answer shows equation
        Assert.assertEquals(googleCalculator.calcAnswer(driver).getText(),"3 × 8 =");
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"24");

        System.out.println("Subtract: 24 − 16");
        //click subtract
        googleCalculator.calcOperBtn_Subtract(driver).click();

        //click 16
        googleCalculator.calcBtn_Num(driver,"1").click();
        googleCalculator.calcBtn_Num(driver,"6").click();
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"24 - 16");

        //click equals
        googleCalculator.calcOperBtn_Equals(driver).click();
        Assert.assertEquals(googleCalculator.calcAnswer(driver).getText(),"24 - 16 =");
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"8");


        System.out.println("Add: 8 + 1");
        //click add
        googleCalculator.calcOperBtn_Add(driver).click();
        //click 1
        googleCalculator.calcBtn_Num(driver,"1").click();
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"8 + 1");
        //click equals
        googleCalculator.calcOperBtn_Equals(driver).click();
        Assert.assertEquals(googleCalculator.calcAnswer(driver).getText(),"8 + 1 =");
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"9");

    }

    @Test(priority = 3)
    public static void negativeNumberAndDecimalTest() {

        //use a number with decimal.  confirm negative number is returned

        System.out.println("Negative number returned:  -2.05");
        //click subtract
        googleCalculator.calcOperBtn_Subtract(driver).click();
        //click 11
        googleCalculator.calcBtn_Num(driver,"1").click();;
        googleCalculator.calcBtn_Num(driver,"1").click();
        // click decimal
        googleCalculator.calcBtn_decimal(driver).click();
        //click 05
        googleCalculator.calcBtn_Num(driver,"0").click();
        googleCalculator.calcBtn_Num(driver,"5").click();
        //click equals
        googleCalculator.calcOperBtn_Equals(driver).click();

        Assert.assertEquals(googleCalculator.calcAnswer(driver).getText(),"9 - 11.05 =");

        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"-2.05");

        wait.until(ExpectedConditions.visibilityOf(googleCalculator.calcAC(driver)));
        googleCalculator.calcAC(driver).click();

    }

    @Test(priority = 4)
    public static void orderOfOperationsTest(){

        System.out.println("follows correct order of operations:  6 ÷ 2 + 3 × 2 - 1");
        // click 6
        googleCalculator.calcBtn_Num(driver,"6").click();
        //click divide
        googleCalculator.calcOperBtn_Divide(driver).click();
        //click 2
        googleCalculator.calcBtn_Num(driver,"2").click();
        //click add
        googleCalculator.calcOperBtn_Add(driver).click();
        //click 3
        googleCalculator.calcBtn_Num(driver,"3").click();
        //click multiply
        googleCalculator.calcOperBtn_Multiply(driver).click();
        //click 2
        googleCalculator.calcBtn_Num(driver,"2").click();
        //click subtract
        googleCalculator.calcOperBtn_Subtract(driver).click();
        //click 1
        googleCalculator.calcBtn_Num(driver,"1").click();

        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"6 ÷ 2 + 3 × 2 - 1");
        //click equals
        googleCalculator.calcOperBtn_Equals(driver).click();
        Assert.assertEquals(googleCalculator.calcAnswer(driver).getText(),"6 ÷ 2 + 3 × 2 - 1 =");
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"8");

        //clear result
        wait.until(ExpectedConditions.visibilityOf(googleCalculator.calcAC(driver)));
        googleCalculator.calcAC(driver).click();


    }

    @Test(priority = 5)
    public static void errorTest(){

        System.out.println("Confirm Error returns for 0 ÷ 0");
        //click 0
        googleCalculator.calcBtn_Num(driver,"0").click();
        //click divide
        googleCalculator.calcOperBtn_Divide(driver).click();
        //click 0
        googleCalculator.calcBtn_Num(driver,"0").click();
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"0 ÷ 0");
        //click equals
        googleCalculator.calcOperBtn_Equals(driver).click();
        Assert.assertEquals(googleCalculator.calcAnswer(driver).getText(),"0 ÷ 0 =");
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"Error");

        wait.until(ExpectedConditions.visibilityOf(googleCalculator.calcAC(driver)));
        googleCalculator.calcAC(driver).click();

    }

    @Test(priority = 6)
    public static void clearMemoryTest() {
        System.out.println("Clear Memory");
        //click 5
        googleCalculator.calcBtn_Num(driver,"5").click();
        //click add
        googleCalculator.calcOperBtn_Add(driver).click();
        //click 2
        googleCalculator.calcBtn_Num(driver,"2").click();
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"5 + 2");

        //click clear
        googleCalculator.calcCE(driver).click();
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"5 +");
        //click clear
        googleCalculator.calcCE(driver).click();
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"5");
        //click clear
        googleCalculator.calcCE(driver).click();
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"0");

    }

    @Test(priority = 7)
    public static void keyboardKeysTest() throws InterruptedException {
        //instead of using buttons, confirm keys on keyboard are working

        System.out.println("Test Keyboard keys are functioning");

        googleCalculator.calcCard(driver).sendKeys(
                "6",
                Keys.DIVIDE,
                "2",
                Keys.ADD,
                "3",
                Keys.MULTIPLY,
                "2",
                Keys.SUBTRACT,
                "123",
                Keys.BACK_SPACE,
                Keys.BACK_SPACE);

        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"6 ÷ 2 + 3 × 2 - 1");

        //send enter for equals
        googleCalculator.calcCard(driver).sendKeys(Keys.ENTER);

        wait.until(ExpectedConditions.visibilityOf(googleCalculator.calcAC(driver)));
        Assert.assertEquals(googleCalculator.calcAnswer(driver).getText(),"6 ÷ 2 + 3 × 2 - 1 =");
        Assert.assertEquals(googleCalculator.calcEquation(driver).getText(),"8");

    }


    @BeforeTest
    public static void initBrowserToGoogle(){
        driver = new ChromeDriver();

        String testURL = "https://www.google.com/";
        driver.get(testURL);

        wait.until(ExpectedConditions.elementToBeClickable(googleSearch.searchBox(driver)));

    }

    @AfterTest
    public static void closeBrowser(){
        driver.close();
    }


}
