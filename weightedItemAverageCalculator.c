#include <stdio.h>

int main() 
{
    double wi1, ci1, wi2, ci2, result; // Declare variables for weights and counts
    
    // Prompt user for weight and count of item 1
    printf("Weight - Item1: ");
    scanf("%lf", &wi1);
    
    // Prompt user for count of item 1
    printf("No. of item1: ");
    scanf("%lf", &ci1);
    
    // Prompt user for weight and count of item 2
    printf("Weight - Item2: ");
    scanf("%lf", &wi2);
    
    // Prompt user for count of item 2
    printf("No. of item2: ");
    scanf("%lf", &ci2);
    
    // Calculate average value
    result = ((wi1 * ci1) + (wi2 * ci2)) / (ci1 + ci2);
    
    // Print the average value
    printf("Average Value = %f\n", result);
    
    return 0;
}

