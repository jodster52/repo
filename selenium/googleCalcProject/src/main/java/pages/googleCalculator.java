package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import utils.calcUtils;

public class googleCalculator {

    private static WebElement element = null;

    public static WebElement calcCard(WebDriver driver){
        element = driver.findElement(By.xpath("//div[@class='card-section']//div[@jsname='jhotKb']"));
        return  element;
    }


    public static WebElement calcAnswer(WebDriver driver){
        element = driver.findElement(By.xpath("//div[@class='card-section']//span[contains(@style,'right')]"));
        return  element;
    }

    public static WebElement calcEquation(WebDriver driver){
        element = driver.findElement(By.xpath("//div[@class='card-section']//span[@id='cwos']"));
        return element;
    }

    public static WebElement calcCE(WebDriver driver){
        element = driver.findElement(By.xpath("//div[@class='card-section']//div[(not(contains(@style,' none'))) and (@aria-label='clear entry')]"));
        return element;
    }

    public static WebElement calcAC(WebDriver driver){
        element = driver.findElement(By.xpath("//div[@class='card-section']//div[(not(contains(@style,' none'))) and (@aria-label='all clear')]"));
        return element;
    }


    public static WebElement calcBtn_Num(WebDriver driver,String myNumber){
        if(calcUtils.verifyValidNumberButton(myNumber)) {
            element = driver.findElement(By.xpath("//div[@class='card-section']//tr/td//div[.='" + myNumber + "']"));

        } else {
            element = null;
        }

        return element;
    }


    public static WebElement calcBtn_decimal(WebDriver driver){
        element = driver.findElement(By.xpath("//div[@class='card-section']//tr/td//div[.='.']"));
        return element;
    }

    public static WebElement calcOperBtn_Add(WebDriver driver){
        element = driver.findElement(By.xpath("//div[@class='card-section']//tr/td//div[.='+']"));
        return element;
    }

    public static WebElement calcOperBtn_Subtract(WebDriver driver){
        element = driver.findElement(By.xpath("//div[@class='card-section']//tr/td//div[.='−']"));
        return element;
    }

    public static WebElement calcOperBtn_Multiply(WebDriver driver){
        element = driver.findElement(By.xpath("//div[@class='card-section']//tr/td//div[.='×']"));
        return element;
    }

    public static WebElement calcOperBtn_Divide(WebDriver driver){
        element = driver.findElement(By.xpath("//div[@class='card-section']//tr/td//div[.='÷']"));
        return element;
    }

    public static WebElement calcOperBtn_Equals(WebDriver driver){
        element = driver.findElement(By.xpath("//div[@class='card-section']//tr/td//div[.='=']"));
        return element;
    }

}
