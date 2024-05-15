package utils;

import dev.failsafe.internal.util.Assert;
import org.openqa.selenium.WebDriver;

public class calcUtils {

    WebDriver driver;

    public static boolean verifyValidNumberButton(String myNumber){

        boolean isValidNumber = false;
        String[] numbers = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};

        boolean found = isInArray(numbers, myNumber);

        if(found) {
            isValidNumber = true;

        } else {

            Assert.state(false,"Number passed is not a number button under evaluation");
        }

        return isValidNumber;
    }






    public static boolean isInArray(String[] array, String str) {
        for (String element : array) {
            if (element.equals(str)) {
                return true;
            }
        }
        return false;
    }


}
