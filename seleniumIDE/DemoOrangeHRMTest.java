// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class DemoOrangeHRMTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void demoOrangeHRM() {
    driver.get("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    driver.manage().window().setSize(new Dimension(945, 1012));
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//img[@alt=\'company-branding\']")));
    }
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".orangehrm-login-slot-wrapper"));
      assert(elements.size() > 0);
    }
    assertThat(driver.findElement(By.cssSelector(".oxd-text--h5")).getText(), is("Login"));
    vars.put("usrName", driver.findElement(By.cssSelector(".oxd-sheet > .oxd-text:nth-child(1)")).getText());
    vars.put("usrPwd", driver.findElement(By.cssSelector(".oxd-sheet > .oxd-text:nth-child(2)")).getText());
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("username")));
    }
    driver.findElement(By.name("username")).click();
    driver.findElement(By.name("username")).sendKeys("Admin");
    driver.findElement(By.name("password")).sendKeys("admin123");
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".orangehrm-login-forgot-header"));
      assert(elements.size() > 0);
    }
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".oxd-button"));
      assert(elements.size() > 0);
    }
    driver.findElement(By.xpath("//button[contains(.,\'Login\')]")).click();
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//h6[contains(.,\'Dashboard\')]")));
    }
    {
      List<WebElement> elements = driver.findElements(By.xpath("//span[contains(.,\'Dashboard\')]"));
      assert(elements.size() > 0);
    }
    driver.findElement(By.cssSelector(".oxd-userdropdown-tab")).click();
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".bi-caret-down-fill"));
      assert(elements.size() > 0);
    }
    driver.findElement(By.cssSelector(".bi-caret-down-fill")).click();
    driver.findElement(By.linkText("Logout")).click();
  }
}
