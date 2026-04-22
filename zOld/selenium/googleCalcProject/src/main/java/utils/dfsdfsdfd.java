package utils;

import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;
import java.util.regex.*;
import java.util.stream.*;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;



class Result {

    /*
     * Complete the 'findNumber' function below.
     *
     * The function is expected to return a STRING.
     * The function accepts following parameters:
     *  1. INTEGER_ARRAY arr
     *  2. INTEGER k
     */

    public static String findNumber(List<Integer> arr, int k) {

        int[] array = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        String exists_String = "";

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(System.in))) {
            System.out.print("Enter a number to check: ");
            int numberToCheck = Integer.parseInt(reader.readLine());

            boolean exists = false;
            for (int num : array) {
                if (num == numberToCheck) {
                    exists = true;
                    break;
                }
            }

            if (exists) {
                System.out.println("YES");
                exists_String = "YES";
            } else {
                System.out.println("NO");
                exists_String = "NO";
            }
        } catch (IOException e) {
            System.out.println("An error occurred while reading input.");
            e.printStackTrace();
        }

        return exists_String;
    }

    public class Solution {
        public static void main(String[] args) throws IOException {
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
            BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

            int arrCount = Integer.parseInt(bufferedReader.readLine().trim());

            List<Integer> arr = IntStream.range(0, arrCount).mapToObj(i -> {
                        try {
                            return bufferedReader.readLine().replaceAll("\\s+$", "");
                        } catch (IOException ex) {
                            throw new RuntimeException(ex);
                        }
                    })
                    .map(String::trim)
                    .map(Integer::parseInt)
                    .collect(toList());

            int k = Integer.parseInt(bufferedReader.readLine().trim());

            String result = Result.findNumber(arr, k);

            bufferedWriter.write(result);
            bufferedWriter.newLine();

            bufferedReader.close();
            bufferedWriter.close();
        }
    }
}
