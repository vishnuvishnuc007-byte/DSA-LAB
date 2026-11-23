export interface CodeLineExplanation {
  line: number
  code: string
  explanation: string
  tag: 'header' | 'declaration' | 'logic' | 'condition' | 'io' | 'return' | 'memory'
}

export interface FlowchartStep {
  id: string
  type: 'start' | 'process' | 'decision' | 'io' | 'end'
  text: string
  yesTarget?: string
  noTarget?: string
  next?: string
  explanation: string
}

export interface IndividualExperiment {
  id: string
  number: string
  title: string
  shortTitle: string
  category: string
  parentExperimentId: string
  parentExperimentTitle: string
  aim: string
  relatedSubTopics?: { id: string; title: string }[]
  theory: {
    introduction: string
    corePrinciple: string
    importantConcepts: { title: string; desc: string }[]
    howItWorks: string
    realWorldExample: string
    stepByStepExplanation: string[]
    algorithmSteps: string[]
    timeComplexity: { best: string; avg: string; worst: string; explanation: string }
    spaceComplexity: { auxiliary: string; explanation: string }
  }
  flowchart: {
    title: string
    description: string
    nodes: FlowchartStep[]
    stepWalkthrough: string[]
  }
  program: {
    title: string
    filename: string
    language: string
    cCode: string
    expectedOutput: string
    lineExplanations: CodeLineExplanation[]
  }
}

export const INDIVIDUAL_EXPERIMENTS: Record<string, IndividualExperiment> = {
  // =========================================================================
  // EXPERIMENT 01A: RECURSION
  // =========================================================================
  'recursion': {
    id: 'recursion',
    number: '01A',
    title: 'RECURSION',
    shortTitle: 'Recursion',
    category: 'Simple C Programs',
    parentExperimentId: 'exp-01',
    parentExperimentTitle: '01. Simple C Programs',
    aim: 'To design, implement and analyze recursive functions in C using mathematical recursion (Factorial of N) and function call-stack mechanics.',
    relatedSubTopics: [
      { id: 'recursion', title: 'Recursion' },
      { id: 'structure', title: 'Structure' },
      { id: 'pointer', title: 'Pointer' }
    ],
    theory: {
      introduction: 'Recursion is an essential algorithmic problem-solving technique where a function calls itself directly or indirectly to solve a smaller subproblem of the same type. Every recursive routine must have at least one base case that stops execution and prevents infinite loops.',
      corePrinciple: 'Divide and conquer: Break down problem P(N) into subproblem P(N-1), push activation records onto the call stack, and unwind the stack when the base case is reached.',
      importantConcepts: [
        { title: 'Base Case Termination', desc: 'The stopping condition (e.g. n <= 1) that returns a constant value without making further recursive calls.' },
        { title: 'Call Stack Allocation', desc: 'Each recursive invocation allocates a new stack frame in memory storing local parameters and the return address.' },
        { title: 'Stack Unwinding', desc: 'Once the base case is reached, values propagate backwards as stack frames pop in Last-In First-Out (LIFO) order.' }
      ],
      howItWorks: 'When factorial(4) is called, factorial(3) is invoked, which calls factorial(2), which calls factorial(1). When factorial(1) hits the base case, it returns 1. Then factorial(2) returns 2 * 1 = 2, factorial(3) returns 3 * 2 = 6, and factorial(4) returns 4 * 6 = 24.',
      realWorldExample: 'Russian Nesting Dolls (Matryoshka dolls) where you open each doll to reveal a smaller doll until you reach the solid smallest doll at the core.',
      stepByStepExplanation: [
        'Check if N is equal to 0 or 1. If true, terminate recursion by returning 1.',
        'If N > 1, make a recursive call to compute factorial(N - 1).',
        'Multiply current value N by the returned result of factorial(N - 1).',
        'Return the product and unwind the call-stack frame back to the calling function.'
      ],
      algorithmSteps: [
        'Step 1: Start the program.',
        'Step 2: Read positive integer N from user input.',
        'Step 3: Call recursive function FACTORIAL(N).',
        'Step 4: In FACTORIAL: If N <= 1, return 1 (Base Case).',
        'Step 5: Else return N * FACTORIAL(N - 1) (Recursive Case).',
        'Step 6: Print the returned factorial result in main().',
        'Step 7: Terminate the program (Stop).'
      ],
      timeComplexity: {
        best: 'O(1)',
        avg: 'O(N)',
        worst: 'O(N)',
        explanation: 'There are N recursive calls made sequentially, each performing constant time O(1) multiplication.'
      },
      spaceComplexity: {
        auxiliary: 'O(N)',
        explanation: 'Call stack requires O(N) memory frames proportional to the recursion depth before unwinding.'
      }
    },
    flowchart: {
      title: 'Algorithmic Flowchart for Recursive Factorial',
      description: 'Standard flowchart demonstrating function call initialization, base case decision diamond, and recursive unwinding.',
      nodes: [
        { id: 'n1', type: 'start', text: 'START FACTORIAL(N)', explanation: 'Function execution begins with integer parameter N passed.' },
        { id: 'n2', type: 'decision', text: 'Is N <= 1 ?', yesTarget: 'n3', noTarget: 'n4', explanation: 'Decision check: Evaluate base condition to stop recursion.' },
        { id: 'n3', type: 'process', text: 'Return 1', next: 'n5', explanation: 'Base case met: Return 1 to unwind the current stack frame.' },
        { id: 'n4', type: 'process', text: 'Call FACTORIAL(N - 1)', next: 'n6', explanation: 'Recursive step: Push new activation record with parameter (N-1).' },
        { id: 'n6', type: 'process', text: 'Return N * Result', next: 'n5', explanation: 'Multiply N with returned subproblem result and propagate backwards.' },
        { id: 'n5', type: 'end', text: 'END / RETURN', explanation: 'Stack frame destroyed and execution control returned to caller.' }
      ],
      stepWalkthrough: [
        '1. Entry into function FACTORIAL(N).',
        '2. Decision Diamond tests if N <= 1.',
        '3. If YES: Returns 1 directly without further recursive branching.',
        '4. If NO: Executes recursive call FACTORIAL(N - 1) and multiplies N by return value.',
        '5. Exits function frame through End node.'
      ]
    },
    program: {
      title: 'Recursive Factorial Implementation in C',
      filename: 'factorial_recursion.c',
      language: 'C (ISO C99)',
      cCode: `#include <stdio.h>

// Recursive function to calculate factorial of n
long long factorial(int n) {
    if (n <= 1) {
        return 1; // Base case: 0! = 1! = 1
    }
    return n * factorial(n - 1); // Recursive call
}

int main() {
    int num = 5;
    printf("Computing Factorial using Recursion:\\n");
    printf("Input Number: %d\\n", num);
    
    long long result = factorial(num);
    printf("Factorial of %d = %lld\\n", num, result);
    
    return 0;
}`,
      expectedOutput: `Computing Factorial using Recursion:
Input Number: 5
Factorial of 5 = 120

Process returned 0 (0x0)   execution time : 0.002 s`,
      lineExplanations: [
        { line: 1, code: '#include <stdio.h>', explanation: 'Includes the Standard Input Output header library for printf() functions.', tag: 'header' },
        { line: 3, code: '// Recursive function to calculate factorial of n', explanation: 'Comment describing the function purpose.', tag: 'declaration' },
        { line: 4, code: 'long long factorial(int n) {', explanation: 'Defines the recursive function taking integer n and returning a 64-bit long long integer.', tag: 'declaration' },
        { line: 5, code: '    if (n <= 1) {', explanation: 'Base Condition: Checks if n is 0 or 1. Essential to prevent infinite recursive calls.', tag: 'condition' },
        { line: 6, code: '        return 1;', explanation: 'Returns 1 when base case is reached, initiating stack unwinding.', tag: 'return' },
        { line: 7, code: '    }', explanation: 'Closes the base condition block.', tag: 'logic' },
        { line: 8, code: '    return n * factorial(n - 1);', explanation: 'Recursive Case: Multiplies n by the return value of factorial(n - 1). Pushes a new frame.', tag: 'logic' },
        { line: 9, code: '}', explanation: 'Closes the factorial function body.', tag: 'logic' },
        { line: 11, code: 'int main() {', explanation: 'Entry point of the C program execution.', tag: 'declaration' },
        { line: 12, code: '    int num = 5;', explanation: 'Initializes variable num with input value 5.', tag: 'declaration' },
        { line: 13, code: '    printf("Computing Factorial using Recursion:\\n");', explanation: 'Outputs introductory heading to standard output.', tag: 'io' },
        { line: 14, code: '    printf("Input Number: %d\\n", num);', explanation: 'Prints the chosen input integer number.', tag: 'io' },
        { line: 16, code: '    long long result = factorial(num);', explanation: 'Calls factorial(5) and stores the final computed product into result.', tag: 'logic' },
        { line: 17, code: '    printf("Factorial of %d = %lld\\n", num, result);', explanation: 'Prints the calculated factorial answer (120) using %lld specifier.', tag: 'io' },
        { line: 19, code: '    return 0;', explanation: 'Returns exit code 0 indicating successful program execution.', tag: 'return' },
        { line: 20, code: '}', explanation: 'Closes main function.', tag: 'logic' }
      ]
    }
  },

  // =========================================================================
  // EXPERIMENT 01B: STRUCTURE
  // =========================================================================
  'structure': {
    id: 'structure',
    number: '01B',
    title: 'STRUCTURE',
    shortTitle: 'Structure',
    category: 'Simple C Programs',
    parentExperimentId: 'exp-01',
    parentExperimentTitle: '01. Simple C Programs',
    aim: 'To design and implement user-defined C structures (struct) for managing heterogeneous data records with member alignment and dot operator access.',
    relatedSubTopics: [
      { id: 'recursion', title: 'Recursion' },
      { id: 'structure', title: 'Structure' },
      { id: 'pointer', title: 'Pointer' }
    ],
    theory: {
      introduction: 'A structure in C is a user-defined composite data type that allows grouping variables of different data types (e.g. char, int, float) under a single meaningful name. Structures are the foundation for building advanced data structures such as linked list nodes and tree nodes.',
      corePrinciple: 'Contiguous heterogeneous record encapsulation: Unlike arrays which only hold elements of identical type, structures pack diverse fields into contiguous memory blocks with memory alignment padding.',
      importantConcepts: [
        { title: 'struct Keyword & Tag', desc: 'Defines the blueprint schema containing member field declarations.' },
        { title: 'Dot (.) Operator', desc: 'Direct member selector used to access fields of a structure variable.' },
        { title: 'Memory Alignment & Padding', desc: 'Compilers align variables on word boundaries (4 or 8 bytes) for CPU read efficiency.' }
      ],
      howItWorks: 'When struct Student s1 is instantiated, memory is reserved for name (50 bytes), rollNo (4 bytes), and gpa (4 bytes). Fields are populated and accessed independently using s1.rollNo and s1.gpa.',
      realWorldExample: 'A Student ID Card holding a photo, student name (string), ID number (integer), and GPA (floating point).',
      stepByStepExplanation: [
        'Declare structure template using struct keyword with desired data fields.',
        'Instantiate a structure variable in main() memory space.',
        'Assign values to each field using dot operator (variable.field = value).',
        'Retrieve and display structure fields on console.'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: Define structure struct Student with fields: rollNo, name, marks.',
        'Step 3: Declare variable s1 of type struct Student.',
        'Step 4: Assign values to s1.rollNo, s1.name, and s1.marks.',
        'Step 5: Compute total and average percentage.',
        'Step 6: Display structured student record.',
        'Step 7: Stop.'
      ],
      timeComplexity: {
        best: 'O(1)',
        avg: 'O(1)',
        worst: 'O(1)',
        explanation: 'Direct offset calculation allows O(1) constant-time access to any structure member.'
      },
      spaceComplexity: {
        auxiliary: 'O(1)',
        explanation: 'Allocates fixed memory equal to the sum of members plus compiler alignment padding.'
      }
    },
    flowchart: {
      title: 'Algorithmic Flowchart for C Structure Management',
      description: 'Flowchart tracing struct template declaration, instantiation, member assignment, and output.',
      nodes: [
        { id: 's1', type: 'start', text: 'START PROGRAM', explanation: 'Execution entry point.' },
        { id: 's2', type: 'process', text: 'Define struct Student template', next: 's3', explanation: 'Creates blueprint with rollNo, name, and marks fields.' },
        { id: 's3', type: 'process', text: 'Declare struct variable s1', next: 's4', explanation: 'Allocates contiguous memory space for s1 on the stack.' },
        { id: 's4', type: 'io', text: 'Input: Set s1.rollNo, s1.name, s1.marks', next: 's5', explanation: 'Stores heterogeneous data into respective memory offsets.' },
        { id: 's5', type: 'process', text: 'Compute Total and GPA', next: 's6', explanation: 'Processes structure member values.' },
        { id: 's6', type: 'io', text: 'Display Student Record Details', next: 's7', explanation: 'Prints formatted student record to terminal.' },
        { id: 's7', type: 'end', text: 'END PROGRAM', explanation: 'Program finishes successfully.' }
      ],
      stepWalkthrough: [
        '1. Begins execution and defines struct template schema.',
        '2. Instantiates struct variable s1 allocating stack space.',
        '3. Populates members using the dot (.) operator.',
        '4. Performs computational processing on member values.',
        '5. Displays complete structured record.'
      ]
    },
    program: {
      title: 'C Program using Structures for Student Records',
      filename: 'student_structure.c',
      language: 'C (ISO C99)',
      cCode: `#include <stdio.h>
#include <string.h>

// User-defined structure definition
struct Student {
    int rollNo;
    char name[50];
    float marks1;
    float marks2;
    float average;
};

int main() {
    struct Student s1; // Declare structure variable
    
    // Assign values to structure members
    s1.rollNo = 307;
    strcpy(s1.name, "Vishnu Student");
    s1.marks1 = 92.5;
    s1.marks2 = 88.0;
    
    // Compute average
    s1.average = (s1.marks1 + s1.marks2) / 2.0;
    
    // Display structure members
    printf("--- Student Database Record ---\\n");
    printf("Roll Number : %d\\n", s1.rollNo);
    printf("Student Name: %s\\n", s1.name);
    printf("Subject 1   : %.1f\\n", s1.marks1);
    printf("Subject 2   : %.1f\\n", s1.marks2);
    printf("Average GPA : %.2f\\n", s1.average);
    
    return 0;
}`,
      expectedOutput: `--- Student Database Record ---
Roll Number : 307
Student Name: Vishnu Student
Subject 1   : 92.5
Subject 2   : 88.0
Average GPA : 90.25

Process returned 0 (0x0)   execution time : 0.003 s`,
      lineExplanations: [
        { line: 1, code: '#include <stdio.h>', explanation: 'Standard I/O header for printf() output.', tag: 'header' },
        { line: 2, code: '#include <string.h>', explanation: 'String handling header for strcpy() function.', tag: 'header' },
        { line: 4, code: '// User-defined structure definition', explanation: 'Documentation comment for the structure.', tag: 'declaration' },
        { line: 5, code: 'struct Student {', explanation: 'Keyword struct defines a user-defined record named Student.', tag: 'declaration' },
        { line: 6, code: '    int rollNo;', explanation: 'Integer member storing student roll number.', tag: 'declaration' },
        { line: 7, code: '    char name[50];', explanation: 'Character array of length 50 storing student name.', tag: 'declaration' },
        { line: 8, code: '    float marks1;', explanation: 'Floating-point score for subject 1.', tag: 'declaration' },
        { line: 9, code: '    float marks2;', explanation: 'Floating-point score for subject 2.', tag: 'declaration' },
        { line: 10, code: '    float average;', explanation: 'Floating-point member to hold computed average.', tag: 'declaration' },
        { line: 11, code: '};', explanation: 'Semicolon terminates the structure template definition.', tag: 'declaration' },
        { line: 13, code: 'int main() {', explanation: 'Program entry point.', tag: 'declaration' },
        { line: 14, code: '    struct Student s1;', explanation: 'Instantiates structure variable s1 on stack memory.', tag: 'memory' },
        { line: 17, code: '    s1.rollNo = 307;', explanation: 'Uses dot (.) operator to assign 307 to s1.rollNo.', tag: 'logic' },
        { line: 18, code: '    strcpy(s1.name, "Vishnu Student");', explanation: 'Copies string into character array member s1.name.', tag: 'logic' },
        { line: 19, code: '    s1.marks1 = 92.5;', explanation: 'Assigns 92.5 to subject 1 marks.', tag: 'logic' },
        { line: 20, code: '    s1.marks2 = 88.0;', explanation: 'Assigns 88.0 to subject 2 marks.', tag: 'logic' },
        { line: 23, code: '    s1.average = (s1.marks1 + s1.marks2) / 2.0;', explanation: 'Calculates arithmetic mean and stores in s1.average.', tag: 'logic' },
        { line: 26, code: '    printf("--- Student Database Record ---\\n");', explanation: 'Prints section banner.', tag: 'io' },
        { line: 27, code: '    printf("Roll Number : %d\\n", s1.rollNo);', explanation: 'Prints roll number field.', tag: 'io' },
        { line: 28, code: '    printf("Student Name: %s\\n", s1.name);', explanation: 'Prints student name string.', tag: 'io' },
        { line: 29, code: '    printf("Subject 1   : %.1f\\n", s1.marks1);', explanation: 'Prints marks1 with 1 decimal precision.', tag: 'io' },
        { line: 30, code: '    printf("Subject 2   : %.1f\\n", s1.marks2);', explanation: 'Prints marks2 with 1 decimal precision.', tag: 'io' },
        { line: 31, code: '    printf("Average GPA : %.2f\\n", s1.average);', explanation: 'Prints average score with 2 decimal precision.', tag: 'io' },
        { line: 33, code: '    return 0;', explanation: 'Exits main successfully with status 0.', tag: 'return' },
        { line: 34, code: '}', explanation: 'Closes main function.', tag: 'logic' }
      ]
    }
  },

  // =========================================================================
  // EXPERIMENT 01C: POINTER
  // =========================================================================
  'pointer': {
    id: 'pointer',
    number: '01C',
    title: 'POINTER',
    shortTitle: 'Pointer',
    category: 'Simple C Programs',
    parentExperimentId: 'exp-01',
    parentExperimentTitle: '01. Simple C Programs',
    aim: 'To design and implement C programs demonstrating pointer variables, address referencing (&), dereferencing (*), dynamic memory allocation (malloc), and deallocation (free).',
    relatedSubTopics: [
      { id: 'recursion', title: 'Recursion' },
      { id: 'structure', title: 'Structure' },
      { id: 'pointer', title: 'Pointer' }
    ],
    theory: {
      introduction: 'A pointer is a variable that stores the memory address of another variable. Pointers provide direct access to hardware memory, enable dynamic memory allocation on the heap, facilitate passing large structures by reference without copying, and are fundamental to all linked data structures.',
      corePrinciple: 'Direct memory addressing: & operator fetches variable address; * operator dereferences the address to access or mutate the value stored in that physical memory cell.',
      importantConcepts: [
        { title: 'Address-of Operator (&)', desc: 'Returns the hexadecimal physical address of an operand in RAM.' },
        { title: 'Dereference Operator (*)', desc: 'Directly reads or writes the value located at the pointer target address.' },
        { title: 'Dynamic Allocation (malloc/free)', desc: 'malloc() requests heap bytes at runtime; free() returns heap memory back to OS to avoid memory leaks.' }
      ],
      howItWorks: 'int x = 25; int *ptr = &x; The variable ptr holds the address (e.g. 0x7ffd98). When *ptr = 50 is executed, the CPU writes 50 directly to memory address 0x7ffd98, altering x.',
      realWorldExample: 'A home address written on an envelope: The address is not the house itself, but points precisely to where the house is located.',
      stepByStepExplanation: [
        'Declare pointer variable with base type: int *ptr.',
        'Assign memory address of target variable or allocate heap memory with malloc().',
        'Verify that pointer is not NULL (defensive programming).',
        'Access or mutate target data using dereference operator *ptr.',
        'Deallocate dynamically allocated heap memory using free(ptr).'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: Declare int variable a and int pointer ptr.',
        'Step 3: Point ptr to address of a (&a).',
        'Step 4: Dynamically allocate array of size N using malloc(N * sizeof(int)).',
        'Step 5: Check if malloc returned NULL (Allocation Failure).',
        'Step 6: Fill and read dynamic array using pointer arithmetic *(ptr + i).',
        'Step 7: Release heap memory using free(ptr).',
        'Step 8: Stop.'
      ],
      timeComplexity: {
        best: 'O(1)',
        avg: 'O(1)',
        worst: 'O(1)',
        explanation: 'Pointer dereferencing and arithmetic are single CPU machine instructions taking O(1) constant time.'
      },
      spaceComplexity: {
        auxiliary: 'O(1)',
        explanation: 'Pointer variable occupies fixed memory (4 bytes on 32-bit architecture, 8 bytes on 64-bit systems).'
      }
    },
    flowchart: {
      title: 'Algorithmic Flowchart for Pointer & Dynamic Memory Operations',
      description: 'Flowchart tracing pointer initialization, heap allocation check, dereferencing, and freeing.',
      nodes: [
        { id: 'p1', type: 'start', text: 'START PROGRAM', explanation: 'Execution entry point.' },
        { id: 'p2', type: 'process', text: 'Declare int *ptr and size N', next: 'p3', explanation: 'Creates pointer reference variable.' },
        { id: 'p3', type: 'process', text: 'ptr = malloc(N * sizeof(int))', next: 'p4', explanation: 'Requests N contiguous integer blocks from Heap memory.' },
        { id: 'p4', type: 'decision', text: 'Is ptr == NULL ?', yesTarget: 'p5', noTarget: 'p6', explanation: 'Verifies OS successfully allocated memory block.' },
        { id: 'p5', type: 'process', text: 'Print "Memory Error" & Exit', next: 'p8', explanation: 'Handles allocation failure.' },
        { id: 'p6', type: 'process', text: 'Store values via *(ptr + i)', next: 'p7', explanation: 'Pointer arithmetic writes data directly to heap addresses.' },
        { id: 'p7', type: 'process', text: 'free(ptr); Set ptr = NULL', next: 'p8', explanation: 'Releases allocated heap memory back to OS avoiding leaks.' },
        { id: 'p8', type: 'end', text: 'END PROGRAM', explanation: 'Program finishes execution.' }
      ],
      stepWalkthrough: [
        '1. Begins program and declares pointer variable.',
        '2. Requests dynamic heap memory using malloc().',
        '3. Evaluates if pointer is NULL.',
        '4. Performs pointer arithmetic and dereferencing to store/retrieve numbers.',
        '5. Frees heap memory and terminates safely.'
      ]
    },
    program: {
      title: 'C Program using Pointers & Dynamic Memory Allocation',
      filename: 'pointer_dynamic_memory.c',
      language: 'C (ISO C99)',
      cCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr;
    
    printf("--- Pointers & Dynamic Memory Allocation ---\\n");
    
    // Allocate dynamic heap array of 5 integers
    arr = (int *)malloc(n * sizeof(int));
    
    // Check allocation success
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }
    
    // Assign values using pointer arithmetic *(arr + i)
    for (int i = 0; i < n; i++) {
        *(arr + i) = (i + 1) * 10;
    }
    
    // Display elements and their physical memory addresses
    printf("Dynamic Array Elements via Pointers:\\n");
    for (int i = 0; i < n; i++) {
        printf("Element [%d]: Value = %d | Address = %p\\n", i, *(arr + i), (void *)(arr + i));
    }
    
    // Release allocated heap memory
    free(arr);
    arr = NULL; // Prevent dangling pointer
    printf("Memory freed successfully.\\n");
    
    return 0;
}`,
      expectedOutput: `--- Pointers & Dynamic Memory Allocation ---
Dynamic Array Elements via Pointers:
Element [0]: Value = 10 | Address = 0x6000021b0
Element [1]: Value = 20 | Address = 0x6000021b4
Element [2]: Value = 30 | Address = 0x6000021b8
Element [3]: Value = 40 | Address = 0x6000021bc
Element [4]: Value = 50 | Address = 0x6000021c0
Memory freed successfully.

Process returned 0 (0x0)   execution time : 0.002 s`,
      lineExplanations: [
        { line: 1, code: '#include <stdio.h>', explanation: 'Standard I/O header for printf().', tag: 'header' },
        { line: 2, code: '#include <stdlib.h>', explanation: 'Standard library header containing malloc() and free().', tag: 'header' },
        { line: 4, code: 'int main() {', explanation: 'Main function entry point.', tag: 'declaration' },
        { line: 5, code: '    int n = 5;', explanation: 'Number of elements to allocate in the dynamic array.', tag: 'declaration' },
        { line: 6, code: '    int *arr;', explanation: 'Declares integer pointer variable arr to hold heap address.', tag: 'declaration' },
        { line: 8, code: '    printf("--- Pointers & Dynamic Memory Allocation ---\\n");', explanation: 'Prints section title.', tag: 'io' },
        { line: 11, code: '    arr = (int *)malloc(n * sizeof(int));', explanation: 'malloc() requests 5 * 4 = 20 bytes from Heap. Returns void* cast to int*.', tag: 'memory' },
        { line: 14, code: '    if (arr == NULL) {', explanation: 'Defensive check: Tests if system has sufficient free heap memory.', tag: 'condition' },
        { line: 15, code: '        printf("Memory allocation failed!\\n");', explanation: 'Error message if heap space is exhausted.', tag: 'io' },
        { line: 16, code: '        return 1;', explanation: 'Exits program with error code 1.', tag: 'return' },
        { line: 17, code: '    }', explanation: 'Closes null check.', tag: 'logic' },
        { line: 20, code: '    for (int i = 0; i < n; i++) {', explanation: 'Loop through array indices from 0 to 4.', tag: 'logic' },
        { line: 21, code: '        *(arr + i) = (i + 1) * 10;', explanation: 'Pointer arithmetic *(arr + i) calculates memory offset and assigns 10, 20, 30, 40, 50.', tag: 'memory' },
        { line: 22, code: '    }', explanation: 'Closes population loop.', tag: 'logic' },
        { line: 25, code: '    printf("Dynamic Array Elements via Pointers:\\n");', explanation: 'Prints output header.', tag: 'io' },
        { line: 26, code: '    for (int i = 0; i < n; i++) {', explanation: 'Loop to display stored values and addresses.', tag: 'logic' },
        { line: 27, code: '        printf("Element [%d]: Value = %d | Address = %p\\n", i, *(arr + i), (void *)(arr + i));', explanation: '%p specifier displays physical hexadecimal memory addresses spaced 4 bytes apart.', tag: 'io' },
        { line: 28, code: '    }', explanation: 'Closes display loop.', tag: 'logic' },
        { line: 31, code: '    free(arr);', explanation: 'free() deallocates the 20 heap bytes, returning them back to the operating system.', tag: 'memory' },
        { line: 32, code: '    arr = NULL;', explanation: 'Nullifies pointer to avoid dangling pointer vulnerability.', tag: 'memory' },
        { line: 33, code: '    printf("Memory freed successfully.\\n");', explanation: 'Confirms safe deallocation.', tag: 'io' },
        { line: 35, code: '    return 0;', explanation: 'Returns successful status.', tag: 'return' },
        { line: 36, code: '}', explanation: 'Closes main function.', tag: 'logic' }
      ]
    }
  },

  // =========================================================================
  // EXPERIMENT 02: LINKED LIST
  // =========================================================================
  'linked-list': {
    id: 'linked-list',
    number: '02',
    title: 'LINKED LIST',
    shortTitle: 'Linked List',
    category: 'List ADT',
    parentExperimentId: 'exp-02',
    parentExperimentTitle: '02. Linked List Implementation of List ADT',
    aim: 'To implement the List Abstract Data Type (ADT) using a Singly Linked List with dynamic node creation, insertion at head/tail, and sequential traversal.',
    theory: {
      introduction: 'A Linked List is a linear dynamic data structure where elements (called nodes) are not stored in contiguous memory locations. Each node contains a data field and a pointer (next) holding the physical memory address of the subsequent node in sequence.',
      corePrinciple: 'Dynamic pointer chain: Nodes are allocated independently on the heap and linked together by address references. Insertion and deletion do not require shifting elements, unlike arrays.',
      importantConcepts: [
        { title: 'Node Architecture', desc: 'Struct containing data payload and a self-referential struct Node *next pointer.' },
        { title: 'Head Pointer', desc: 'Starting reference anchor. If head == NULL, the list is empty.' },
        { title: 'O(1) Insertion', desc: 'Inserting at head only requires pointing new_node->next to head, then head = new_node.' }
      ],
      howItWorks: 'To insert a value 10: allocate node on heap, set node->data = 10, node->next = head, and update head = node. Traversal proceeds by initializing temp = head and iterating temp = temp->next until temp == NULL.',
      realWorldExample: 'A train where each carriage is coupled to the next carriage behind it, or a music playlist playing next songs sequentially.',
      stepByStepExplanation: [
        'Define self-referential struct Node with int data and struct Node *next.',
        'Create new node on heap using malloc(sizeof(struct Node)).',
        'Assign data value and point next pointer to current head.',
        'Update head pointer to point to the newly allocated node.',
        'Traverse and print list from head until reaching NULL.'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: Initialize HEAD = NULL.',
        'Step 3: To INSERT(VAL): Allocate NEW_NODE. Set NEW_NODE->data = VAL.',
        'Step 4: Set NEW_NODE->next = HEAD.',
        'Step 5: Set HEAD = NEW_NODE.',
        'Step 6: To TRAVERSE: Set TEMP = HEAD. While TEMP != NULL: Print TEMP->data, TEMP = TEMP->next.',
        'Step 7: Stop.'
      ],
      timeComplexity: {
        best: 'O(1)',
        avg: 'O(1)',
        worst: 'O(1)',
        explanation: 'Insertion at head takes O(1) constant time. Traversal or search takes O(N).'
      },
      spaceComplexity: {
        auxiliary: 'O(N)',
        explanation: 'Each node requires additional pointer overhead (8 bytes on 64-bit architecture).'
      }
    },
    flowchart: {
      title: 'Algorithmic Flowchart for Linked List Operations',
      description: 'Flowchart illustrating node creation, head insertion, and null-terminated traversal.',
      nodes: [
        { id: 'l1', type: 'start', text: 'START INSERT_BEGIN(VAL)', explanation: 'Begins insertion procedure.' },
        { id: 'l2', type: 'process', text: 'NEW_NODE = malloc(sizeof(Node))', next: 'l3', explanation: 'Allocates memory for new node on heap.' },
        { id: 'l3', type: 'process', text: 'NEW_NODE->data = VAL', next: 'l4', explanation: 'Stores data in new node.' },
        { id: 'l4', type: 'process', text: 'NEW_NODE->next = HEAD', next: 'l5', explanation: 'Links new node to current head of list.' },
        { id: 'l5', type: 'process', text: 'HEAD = NEW_NODE', next: 'l6', explanation: 'Updates head anchor to new first node.' },
        { id: 'l6', type: 'end', text: 'RETURN SUCCESS', explanation: 'Insertion complete in O(1) time.' }
      ],
      stepWalkthrough: [
        '1. Allocates new node in heap memory.',
        '2. Sets node data to user value.',
        '3. Points node next to existing HEAD.',
        '4. Updates HEAD pointer to new node.',
        '5. Returns updated list.'
      ]
    },
    program: {
      title: 'Singly Linked List Implementation in C',
      filename: 'singly_linked_list.c',
      language: 'C (ISO C99)',
      cCode: `#include <stdio.h>
#include <stdlib.h>

// Definition of Singly Linked List Node
struct Node {
    int data;
    struct Node *next;
};

// Function to insert a new node at the beginning
void insertAtBeginning(struct Node **headRef, int val) {
    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = *headRef;
    *headRef = newNode;
}

// Function to traverse and print the linked list
void displayList(struct Node *node) {
    printf("HEAD -> ");
    while (node != NULL) {
        printf("[%d] -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main() {
    struct Node *head = NULL;
    
    printf("--- Singly Linked List ADT Operations ---\\n");
    insertAtBeginning(&head, 40);
    insertAtBeginning(&head, 30);
    insertAtBeginning(&head, 20);
    insertAtBeginning(&head, 10);
    
    printf("Linked List after insertions:\\n");
    displayList(head);
    
    return 0;
}`,
      expectedOutput: `--- Singly Linked List ADT Operations ---
Linked List after insertions:
HEAD -> [10] -> [20] -> [30] -> [40] -> NULL

Process returned 0 (0x0)   execution time : 0.002 s`,
      lineExplanations: [
        { line: 1, code: '#include <stdio.h>', explanation: 'Includes printf() standard I/O library.', tag: 'header' },
        { line: 2, code: '#include <stdlib.h>', explanation: 'Includes malloc() dynamic memory allocator.', tag: 'header' },
        { line: 5, code: 'struct Node {', explanation: 'Defines the self-referential Node structure.', tag: 'declaration' },
        { line: 6, code: '    int data;', explanation: 'Integer payload of the node.', tag: 'declaration' },
        { line: 7, code: '    struct Node *next;', explanation: 'Pointer storing the address of the next node.', tag: 'declaration' },
        { line: 8, code: '};', explanation: 'Closes struct Node definition.', tag: 'declaration' },
        { line: 11, code: 'void insertAtBeginning(struct Node **headRef, int val) {', explanation: 'Function taking double pointer to head to modify the caller head pointer.', tag: 'declaration' },
        { line: 12, code: '    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));', explanation: 'Allocates node size bytes in heap.', tag: 'memory' },
        { line: 13, code: '    newNode->data = val;', explanation: 'Assigns data value into newNode.', tag: 'logic' },
        { line: 14, code: '    newNode->next = *headRef;', explanation: 'Points new node next pointer to current head node.', tag: 'logic' },
        { line: 15, code: '    *headRef = newNode;', explanation: 'Dereferences headRef to update head to newNode.', tag: 'logic' },
        { line: 16, code: '}', explanation: 'Closes insertAtBeginning.', tag: 'logic' },
        { line: 19, code: 'void displayList(struct Node *node) {', explanation: 'Function traversing list and printing each node data.', tag: 'declaration' },
        { line: 20, code: '    printf("HEAD -> ");', explanation: 'Prints head indicator.', tag: 'io' },
        { line: 21, code: '    while (node != NULL) {', explanation: 'Loops until reaching null pointer at tail of list.', tag: 'condition' },
        { line: 22, code: '        printf("[%d] -> ", node->data);', explanation: 'Prints current node data in brackets.', tag: 'io' },
        { line: 23, code: '        node = node->next;', explanation: 'Advances node pointer to subsequent address.', tag: 'logic' },
        { line: 24, code: '    }', explanation: 'Closes while loop.', tag: 'logic' },
        { line: 25, code: '    printf("NULL\\n");', explanation: 'Prints terminating NULL pointer.', tag: 'io' },
        { line: 26, code: '}', explanation: 'Closes displayList function.', tag: 'logic' },
        { line: 28, code: 'int main() {', explanation: 'Main program execution start.', tag: 'declaration' },
        { line: 29, code: '    struct Node *head = NULL;', explanation: 'Initializes empty list with head pointing to NULL.', tag: 'memory' },
        { line: 32, code: '    insertAtBeginning(&head, 40);', explanation: 'Inserts 40.', tag: 'logic' },
        { line: 33, code: '    insertAtBeginning(&head, 30);', explanation: 'Inserts 30.', tag: 'logic' },
        { line: 34, code: '    insertAtBeginning(&head, 20);', explanation: 'Inserts 20.', tag: 'logic' },
        { line: 35, code: '    insertAtBeginning(&head, 10);', explanation: 'Inserts 10 (becomes new head).', tag: 'logic' },
        { line: 38, code: '    displayList(head);', explanation: 'Calls traversal function.', tag: 'io' },
        { line: 40, code: '    return 0;', explanation: 'Program exits cleanly.', tag: 'return' },
        { line: 41, code: '}', explanation: 'Closes main.', tag: 'logic' }
      ]
    }
  },

  // =========================================================================
  // EXPERIMENT 03: STACK
  // =========================================================================
  'stack': {
    id: 'stack',
    number: '03',
    title: 'IMPLEMENTATION OF STACK',
    shortTitle: 'Stack ADT',
    category: 'Stack',
    parentExperimentId: 'exp-03',
    parentExperimentTitle: '03. Stack using Arrays & Linked List',
    aim: 'To implement the Stack Abstract Data Type using a contiguous Array buffer with Push, Pop, Peek, and Overflow/Underflow error handling.',
    theory: {
      introduction: 'A Stack is a linear data structure that operates under the LIFO (Last-In, First-Out) principle. Elements can only be added or removed from a single end, known as the TOP of the stack. Stacks are used in compilers for parenthesis checking, function call execution, and undo operations.',
      corePrinciple: 'LIFO (Last-In, First-Out): The most recently pushed element is the first element to be popped.',
      importantConcepts: [
        { title: 'Top Pointer', desc: 'Integer index tracking current top element. When empty, top = -1.' },
        { title: 'Stack Overflow', desc: 'Attempting to push into a full stack (top == MAX - 1).' },
        { title: 'Stack Underflow', desc: 'Attempting to pop from an empty stack (top == -1).' }
      ],
      howItWorks: 'Push(x) increments top by 1 and inserts x at stack[top]. Pop() retrieves stack[top] and decrements top by 1. Both operations complete in O(1) constant time.',
      realWorldExample: 'A stack of dining plates in a cafeteria where you can only take the top plate or place a new plate on top.',
      stepByStepExplanation: [
        'Initialize top = -1 and define capacity MAX.',
        'Push: Check if top == MAX-1 (Overflow). If not, top++ and stack[top] = value.',
        'Pop: Check if top == -1 (Underflow). If not, value = stack[top] and top--.',
        'Peek: Return stack[top] without removing.'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: Initialize TOP = -1.',
        'Step 3: PUSH(X): If TOP == MAX - 1, print "Stack Overflow" and exit. Else TOP = TOP + 1, STACK[TOP] = X.',
        'Step 4: POP(): If TOP == -1, print "Stack Underflow" and exit. Else VAL = STACK[TOP], TOP = TOP - 1, return VAL.',
        'Step 5: PEEK(): Return STACK[TOP].',
        'Step 6: Stop.'
      ],
      timeComplexity: {
        best: 'O(1)',
        avg: 'O(1)',
        worst: 'O(1)',
        explanation: 'Push, Pop, and Peek perform constant-time index arithmetic.'
      },
      spaceComplexity: {
        auxiliary: 'O(N)',
        explanation: 'Fixed contiguous array buffer of size N.'
      }
    },
    flowchart: {
      title: 'Algorithmic Flowchart for Stack Operations',
      description: 'Flowchart tracing Push and Pop operations with overflow and underflow checks.',
      nodes: [
        { id: 'st1', type: 'start', text: 'START STACK OPERATION', explanation: 'Operation begins.' },
        { id: 'st2', type: 'decision', text: 'Operation == PUSH ?', yesTarget: 'st3', noTarget: 'st6', explanation: 'Decide operation type.' },
        { id: 'st3', type: 'decision', text: 'Is TOP == MAX - 1 ?', yesTarget: 'st4', noTarget: 'st5', explanation: 'Overflow check.' },
        { id: 'st4', type: 'process', text: 'Error: Stack Overflow', next: 'st9', explanation: 'Buffer is full.' },
        { id: 'st5', type: 'process', text: 'TOP = TOP + 1; STACK[TOP] = VAL', next: 'st9', explanation: 'Element added at TOP.' },
        { id: 'st6', type: 'decision', text: 'Is TOP == -1 ?', yesTarget: 'st7', noTarget: 'st8', explanation: 'Underflow check.' },
        { id: 'st7', type: 'process', text: 'Error: Stack Underflow', next: 'st9', explanation: 'Stack is empty.' },
        { id: 'st8', type: 'process', text: 'VAL = STACK[TOP]; TOP = TOP - 1', next: 'st9', explanation: 'Element removed from TOP.' },
        { id: 'st9', type: 'end', text: 'STOP', explanation: 'Operation finishes.' }
      ],
      stepWalkthrough: [
        '1. Checks if operation is Push or Pop.',
        '2. For Push: Tests overflow (top == MAX - 1). If not full, increments top and inserts value.',
        '3. For Pop: Tests underflow (top == -1). If not empty, retrieves top and decrements top.',
        '4. Returns status.'
      ]
    },
    program: {
      title: 'Array Implementation of Stack ADT in C',
      filename: 'stack_array.c',
      language: 'C (ISO C99)',
      cCode: `#include <stdio.h>
#define MAX 5

int stack[MAX];
int top = -1;

void push(int val) {
    if (top >= MAX - 1) {
        printf("Stack Overflow! Cannot push %d\\n", val);
        return;
    }
    stack[++top] = val;
    printf("PUSH: %d (top = %d)\\n", val, top);
}

int pop() {
    if (top < 0) {
        printf("Stack Underflow! Stack is empty.\\n");
        return -1;
    }
    int popped = stack[top--];
    printf("POP : %d (top = %d)\\n", popped, top);
    return popped;
}

void display() {
    if (top == -1) {
        printf("Stack is empty.\\n");
        return;
    }
    printf("Current Stack (Top to Bottom): ");
    for (int i = top; i >= 0; i--) {
        printf("[%d] ", stack[i]);
    }
    printf("\\n");
}

int main() {
    printf("--- Array Implementation of Stack ADT ---\\n");
    push(10);
    push(20);
    push(30);
    display();
    
    pop();
    display();
    
    return 0;
}`,
      expectedOutput: `--- Array Implementation of Stack ADT ---
PUSH: 10 (top = 0)
PUSH: 20 (top = 1)
PUSH: 30 (top = 2)
Current Stack (Top to Bottom): [30] [20] [10] 
POP : 30 (top = 1)
Current Stack (Top to Bottom): [20] [10] 

Process returned 0 (0x0)   execution time : 0.002 s`,
      lineExplanations: [
        { line: 1, code: '#include <stdio.h>', explanation: 'Includes printf() standard I/O library.', tag: 'header' },
        { line: 2, code: '#define MAX 5', explanation: 'Pre-processor macro defining maximum stack capacity as 5.', tag: 'declaration' },
        { line: 4, code: 'int stack[MAX];', explanation: 'Fixed-size integer array buffer for stack storage.', tag: 'memory' },
        { line: 5, code: 'int top = -1;', explanation: 'Initializes top pointer to -1 indicating stack is empty.', tag: 'declaration' },
        { line: 7, code: 'void push(int val) {', explanation: 'Push function definition.', tag: 'declaration' },
        { line: 8, code: '    if (top >= MAX - 1) {', explanation: 'Overflow condition check.', tag: 'condition' },
        { line: 9, code: '        printf("Stack Overflow! Cannot push %d\\n", val);', explanation: 'Alert message when stack is full.', tag: 'io' },
        { line: 10, code: '        return;', explanation: 'Aborts push on overflow.', tag: 'return' },
        { line: 11, code: '    }', explanation: 'Closes overflow check.', tag: 'logic' },
        { line: 12, code: '    stack[++top] = val;', explanation: 'Pre-increments top index and stores val in stack buffer.', tag: 'memory' },
        { line: 13, code: '    printf("PUSH: %d (top = %d)\\n", val, top);', explanation: 'Prints confirmation of pushed value and updated top.', tag: 'io' },
        { line: 14, code: '}', explanation: 'Closes push function.', tag: 'logic' },
        { line: 16, code: 'int pop() {', explanation: 'Pop function definition returning removed integer.', tag: 'declaration' },
        { line: 17, code: '    if (top < 0) {', explanation: 'Underflow condition check.', tag: 'condition' },
        { line: 18, code: '        printf("Stack Underflow! Stack is empty.\\n");', explanation: 'Alert message when stack is empty.', tag: 'io' },
        { line: 19, code: '        return -1;', explanation: 'Returns sentinel -1 on failure.', tag: 'return' },
        { line: 20, code: '    }', explanation: 'Closes underflow check.', tag: 'logic' },
        { line: 21, code: '    int popped = stack[top--];', explanation: 'Retrieves element at top and post-decrements top pointer.', tag: 'memory' },
        { line: 22, code: '    printf("POP : %d (top = %d)\\n", popped, top);', explanation: 'Prints popped value.', tag: 'io' },
        { line: 23, code: '    return popped;', explanation: 'Returns popped integer.', tag: 'return' },
        { line: 24, code: '}', explanation: 'Closes pop function.', tag: 'logic' },
        { line: 26, code: 'void display() {', explanation: 'Displays stack elements.', tag: 'declaration' },
        { line: 31, code: '    for (int i = top; i >= 0; i--) {', explanation: 'Iterates from top down to 0.', tag: 'logic' },
        { line: 32, code: '        printf("[%d] ", stack[i]);', explanation: 'Prints element.', tag: 'io' },
        { line: 37, code: 'int main() {', explanation: 'Main program execution start.', tag: 'declaration' }
      ]
    }
  },

  // =========================================================================
  // EXPERIMENT 04: BALANCED PARENTHESES
  // =========================================================================
  'balanced-parentheses': {
    id: 'balanced-parentheses',
    number: '04',
    title: 'BALANCED PARENTHESES',
    shortTitle: 'Balanced Parentheses',
    category: 'Stack Application',
    parentExperimentId: 'exp-04',
    parentExperimentTitle: '04. Checking Balanced Parentheses using Stack',
    aim: 'To verify whether a given mathematical or code expression contains properly balanced parentheses, brackets, and braces using Stack delimiter parsing.',
    theory: {
      introduction: 'Balanced Parentheses verification is a classic compiler application of Stacks. An expression is balanced if every opening bracket (, {, [ has a corresponding closing bracket ), }, ] of the same type in the correct nesting order.',
      corePrinciple: 'LIFO delimiter pairing: When an opening delimiter is read, push it onto the stack. When a closing delimiter is read, pop the top of stack and verify that the types match.',
      importantConcepts: [
        { title: 'Matching Pairs', desc: 'Valid bracket pairs: () with (), {} with {}, and [] with [].' },
        { title: 'Early Mismatch Detection', desc: 'If a closing bracket arrives and stack is empty or top does not match, the expression is invalid.' },
        { title: 'Final Stack Verification', desc: 'After scanning all characters, the stack must be completely empty for the string to be balanced.' }
      ],
      howItWorks: 'For expression "{[()]}": Scan \'{\', push. Scan \'[\', push. Scan \'(\', push. Scan \')\', pop \'(\' (match!). Scan \']\', pop \'[\' (match!). Scan \'}\', pop \'{\' (match!). Stack is empty -> Balanced.',
      realWorldExample: 'Compiler syntax checkers in IDEs (like VS Code) that alert developers with red squiggles when a closing bracket is missing.',
      stepByStepExplanation: [
        'Initialize an empty stack of characters.',
        'Traverse expression string character by character from left to right.',
        'If character is (, {, or [, push onto stack.',
        'If character is ), }, or ], check if stack is empty (Underflow -> Unbalanced). Else pop and check if brackets match.',
        'At end of string: If stack is empty, return BALANCED; otherwise return UNBALANCED.'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: Read expression string EXPR.',
        'Step 3: Initialize character stack.',
        'Step 4: For each character CH in EXPR:',
        'Step 5: If CH is opening bracket \'(\', \'{\', or \'[\': PUSH(CH).',
        'Step 6: If CH is closing bracket: If stack is empty, return UNBALANCED. Else POP top. If top does not match CH, return UNBALANCED.',
        'Step 7: If stack is empty after scan, return BALANCED; else return UNBALANCED.',
        'Step 8: Stop.'
      ],
      timeComplexity: {
        best: 'O(N)',
        avg: 'O(N)',
        worst: 'O(N)',
        explanation: 'Scans string of length N once, performing O(1) push and pop operations per character.'
      },
      spaceComplexity: {
        auxiliary: 'O(N)',
        explanation: 'Stack holds up to N/2 opening brackets in worst-case nested expressions.'
      }
    },
    flowchart: {
      title: 'Algorithmic Flowchart for Balanced Parentheses Checking',
      description: 'Flowchart tracing character scan, bracket matching, and stack empty verification.',
      nodes: [
        { id: 'bp1', type: 'start', text: 'START SCAN EXPR', explanation: 'Begins expression scanning.' },
        { id: 'bp2', type: 'decision', text: 'More characters left?', yesTarget: 'bp3', noTarget: 'bp7', explanation: 'Checks loop condition.' },
        { id: 'bp3', type: 'decision', text: 'Is Opening Bracket (, {, [ ?', yesTarget: 'bp4', noTarget: 'bp5', explanation: 'Identifies bracket category.' },
        { id: 'bp4', type: 'process', text: 'PUSH(CH) to Stack', next: 'bp2', explanation: 'Saves opening bracket on stack.' },
        { id: 'bp5', type: 'decision', text: 'Is Stack Empty OR Mismatch?', yesTarget: 'bp6', noTarget: 'bp2', explanation: 'Validates matching pair.' },
        { id: 'bp6', type: 'end', text: 'RETURN UNBALANCED', explanation: 'Syntax error detected.' },
        { id: 'bp7', type: 'decision', text: 'Is Stack Empty ?', yesTarget: 'bp8', noTarget: 'bp6', explanation: 'Final balance check.' },
        { id: 'bp8', type: 'end', text: 'RETURN BALANCED', explanation: 'Expression is fully balanced.' }
      ],
      stepWalkthrough: [
        '1. Loops through string characters.',
        '2. Pushes opening brackets onto stack.',
        '3. Pops and matches closing brackets.',
        '4. Verifies stack is empty at end.',
        '5. Concludes Balanced or Unbalanced.'
      ]
    },
    program: {
      title: 'Balanced Parentheses Verification Program in C',
      filename: 'balanced_parentheses.c',
      language: 'C (ISO C99)',
      cCode: `#include <stdio.h>
#include <string.h>
#define MAX 100

char stack[MAX];
int top = -1;

void push(char c) { stack[++top] = c; }
char pop() { return stack[top--]; }

int isMatching(char open, char close) {
    if (open == '(' && close == ')') return 1;
    if (open == '{' && close == '}') return 1;
    if (open == '[' && close == ']') return 1;
    return 0;
}

int isBalanced(char expr[]) {
    top = -1; // Reset stack
    int len = strlen(expr);
    
    for (int i = 0; i < len; i++) {
        char ch = expr[i];
        if (ch == '(' || ch == '{' || ch == '[') {
            push(ch);
        } else if (ch == ')' || ch == '}' || ch == ']') {
            if (top == -1) return 0; // Closing bracket without opening
            char popped = pop();
            if (!isMatching(popped, ch)) return 0; // Mismatch
        }
    }
    return (top == -1); // 1 if balanced, 0 if brackets remain
}

int main() {
    char test1[] = "{[()]}";
    char test2[] = "{[(])}";
    
    printf("--- Checking Balanced Parentheses using Stack ---\\n");
    printf("Expression: %s -> %s\\n", test1, isBalanced(test1) ? "BALANCED" : "NOT BALANCED");
    printf("Expression: %s -> %s\\n", test2, isBalanced(test2) ? "BALANCED" : "NOT BALANCED");
    
    return 0;
}`,
      expectedOutput: `--- Checking Balanced Parentheses using Stack ---
Expression: {[()]} -> BALANCED
Expression: {[(])} -> NOT BALANCED

Process returned 0 (0x0)   execution time : 0.002 s`,
      lineExplanations: [
        { line: 1, code: '#include <stdio.h>', explanation: 'Standard I/O header.', tag: 'header' },
        { line: 2, code: '#include <string.h>', explanation: 'String library for strlen().', tag: 'header' },
        { line: 5, code: 'char stack[MAX];', explanation: 'Character array stack to store opening brackets.', tag: 'memory' },
        { line: 6, code: 'int top = -1;', explanation: 'Top index of stack.', tag: 'declaration' },
        { line: 8, code: 'void push(char c) { stack[++top] = c; }', explanation: 'Pushes bracket char onto stack.', tag: 'logic' },
        { line: 9, code: 'char pop() { return stack[top--]; }', explanation: 'Pops top bracket char from stack.', tag: 'logic' },
        { line: 11, code: 'int isMatching(char open, char close) {', explanation: 'Helper function checking valid pair matching.', tag: 'condition' },
        { line: 17, code: 'int isBalanced(char expr[]) {', explanation: 'Main algorithm checking if expression string is balanced.', tag: 'declaration' },
        { line: 21, code: '    for (int i = 0; i < len; i++) {', explanation: 'Scans each character of expression.', tag: 'logic' },
        { line: 23, code: '        if (ch == \'(\' || ch == \'{\' || ch == \'[\') {', explanation: 'Checks for opening bracket.', tag: 'condition' },
        { line: 24, code: '            push(ch);', explanation: 'Pushes opening bracket onto stack.', tag: 'logic' },
        { line: 25, code: '        } else if (ch == \')\' || ch == \'}\' || ch == \']\') {', explanation: 'Checks for closing bracket.', tag: 'condition' },
        { line: 26, code: '            if (top == -1) return 0;', explanation: 'Unmatched closing bracket: returns 0 (Unbalanced).', tag: 'return' },
        { line: 27, code: '            char popped = pop();', explanation: 'Pops top opening bracket.', tag: 'logic' },
        { line: 28, code: '            if (!isMatching(popped, ch)) return 0;', explanation: 'Returns 0 if popped opening bracket does not match closing bracket.', tag: 'return' },
        { line: 31, code: '    return (top == -1);', explanation: 'Returns 1 if stack is completely empty, 0 otherwise.', tag: 'return' }
      ]
    }
  },

  // =========================================================================
  // EXPERIMENT 05: QUEUE
  // =========================================================================
  'queue': {
    id: 'queue',
    number: '05',
    title: 'IMPLEMENTATION OF QUEUE',
    shortTitle: 'Queue ADT',
    category: 'Queue',
    parentExperimentId: 'exp-05',
    parentExperimentTitle: '05. Implementation of Queue using Arrays & Linked List',
    aim: 'To implement the Queue Abstract Data Type using a Circular Array Buffer with Enqueue, Dequeue, Front, and modulo wrapping.',
    theory: {
      introduction: 'A Queue is a linear data structure adhering to the FIFO (First-In, First-Out) principle. Elements are enqueued at the REAR and dequeued from the FRONT. A Circular Queue wraps around using modulo arithmetic to prevent unused memory waste in standard arrays.',
      corePrinciple: 'FIFO (First-In, First-Out) with circular index wrapping: rear = (rear + 1) % MAX and front = (front + 1) % MAX.',
      importantConcepts: [
        { title: 'Front and Rear Pointers', desc: 'Front points to the departure item; Rear points to the last inserted item.' },
        { title: 'Circular Wrapping', desc: 'Modulo arithmetic allows rear to loop back to index 0 when front moves forward.' },
        { title: 'Queue Full Condition', desc: '(rear + 1) % MAX == front indicates buffer is full.' }
      ],
      howItWorks: 'Enqueue increments rear = (rear + 1) % SIZE and inserts data. Dequeue extracts queue[front] and increments front = (front + 1) % SIZE. Both run in O(1) time.',
      realWorldExample: 'A queue of people at a ticket counter or print spooling in operating systems.',
      stepByStepExplanation: [
        'Initialize front = -1, rear = -1.',
        'Enqueue: Check if (rear + 1) % SIZE == front (Overflow). Set rear = (rear + 1) % SIZE and insert.',
        'Dequeue: Check if front == -1 (Underflow). Extract queue[front]. If front == rear, reset to -1; else front = (front + 1) % SIZE.',
        'Display: Print elements from front to rear in circular order.'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: Initialize FRONT = -1, REAR = -1.',
        'Step 3: ENQUEUE(VAL): If (REAR + 1) % SIZE == FRONT, print "Queue Full". Else if FRONT == -1, FRONT = 0; REAR = (REAR + 1) % SIZE, QUEUE[REAR] = VAL.',
        'Step 4: DEQUEUE(): If FRONT == -1, print "Queue Empty". Else VAL = QUEUE[FRONT]. If FRONT == REAR, FRONT = REAR = -1; Else FRONT = (FRONT + 1) % SIZE; return VAL.',
        'Step 5: Stop.'
      ],
      timeComplexity: {
        best: 'O(1)',
        avg: 'O(1)',
        worst: 'O(1)',
        explanation: 'Enqueue and Dequeue are constant-time modulo pointer updates.'
      },
      spaceComplexity: {
        auxiliary: 'O(N)',
        explanation: 'Contiguous buffer of size N.'
      }
    },
    flowchart: {
      title: 'Algorithmic Flowchart for Circular Queue',
      description: 'Flowchart tracing Enqueue and Dequeue operations with modulo arithmetic checks.',
      nodes: [
        { id: 'q1', type: 'start', text: 'START QUEUE OPERATION', explanation: 'Operation starts.' },
        { id: 'q2', type: 'decision', text: 'Operation == ENQUEUE ?', yesTarget: 'q3', noTarget: 'q6', explanation: 'Operation selector.' },
        { id: 'q3', type: 'decision', text: 'Is (REAR+1)%SIZE == FRONT ?', yesTarget: 'q4', noTarget: 'q5', explanation: 'Queue full check.' },
        { id: 'q4', type: 'process', text: 'Error: Queue Overflow', next: 'q9', explanation: 'Buffer is full.' },
        { id: 'q5', type: 'process', text: 'REAR = (REAR+1)%SIZE; QUEUE[REAR] = VAL', next: 'q9', explanation: 'Inserts value at rear.' },
        { id: 'q6', type: 'decision', text: 'Is FRONT == -1 ?', yesTarget: 'q7', noTarget: 'q8', explanation: 'Queue empty check.' },
        { id: 'q7', type: 'process', text: 'Error: Queue Underflow', next: 'q9', explanation: 'Buffer is empty.' },
        { id: 'q8', type: 'process', text: 'VAL = QUEUE[FRONT]; FRONT = (FRONT+1)%SIZE', next: 'q9', explanation: 'Dequeues front element.' },
        { id: 'q9', type: 'end', text: 'STOP', explanation: 'Operation complete.' }
      ],
      stepWalkthrough: [
        '1. Determines Enqueue or Dequeue.',
        '2. Checks circular buffer bounds.',
        '3. Inserts or removes data.',
        '4. Returns updated state.'
      ]
    },
    program: {
      title: 'Circular Queue Implementation in C',
      filename: 'circular_queue.c',
      language: 'C (ISO C99)',
      cCode: `#include <stdio.h>
#define SIZE 5

int queue[SIZE];
int front = -1, rear = -1;

void enqueue(int val) {
    if ((rear + 1) % SIZE == front) {
        printf("Queue Full! Cannot enqueue %d\\n", val);
        return;
    }
    if (front == -1) front = 0;
    rear = (rear + 1) % SIZE;
    queue[rear] = val;
    printf("ENQUEUE: %d (rear = %d)\\n", val, rear);
}

int dequeue() {
    if (front == -1) {
        printf("Queue Empty! Nothing to dequeue.\\n");
        return -1;
    }
    int val = queue[front];
    if (front == rear) {
        front = -1; rear = -1; // Reset when last element is removed
    } else {
        front = (front + 1) % SIZE;
    }
    printf("DEQUEUE: %d\\n", val);
    return val;
}

int main() {
    printf("--- Circular Queue Implementation in C ---\\n");
    enqueue(10);
    enqueue(20);
    enqueue(30);
    dequeue();
    enqueue(40);
    
    return 0;
}`,
      expectedOutput: `--- Circular Queue Implementation in C ---
ENQUEUE: 10 (rear = 0)
ENQUEUE: 20 (rear = 1)
ENQUEUE: 30 (rear = 2)
DEQUEUE: 10
ENQUEUE: 40 (rear = 3)

Process returned 0 (0x0)   execution time : 0.002 s`,
      lineExplanations: [
        { line: 1, code: '#include <stdio.h>', explanation: 'Standard I/O library header.', tag: 'header' },
        { line: 2, code: '#define SIZE 5', explanation: 'Defines queue capacity constant SIZE as 5.', tag: 'declaration' },
        { line: 4, code: 'int queue[SIZE];', explanation: 'Fixed-size array buffer for queue.', tag: 'memory' },
        { line: 5, code: 'int front = -1, rear = -1;', explanation: 'Initializes front and rear indices to -1.', tag: 'declaration' },
        { line: 7, code: 'void enqueue(int val) {', explanation: 'Enqueue function definition.', tag: 'declaration' },
        { line: 8, code: '    if ((rear + 1) % SIZE == front) {', explanation: 'Circular queue full check using modulo arithmetic.', tag: 'condition' },
        { line: 9, code: '        printf("Queue Full! Cannot enqueue %d\\n", val);', explanation: 'Alert message when queue is full.', tag: 'io' },
        { line: 10, code: '        return;', explanation: 'Aborts enqueue on full.', tag: 'return' },
        { line: 12, code: '    if (front == -1) front = 0;', explanation: 'Sets front to 0 on inserting first element.', tag: 'logic' },
        { line: 13, code: '    rear = (rear + 1) % SIZE;', explanation: 'Advances rear circularly using modulo SIZE.', tag: 'logic' },
        { line: 14, code: '    queue[rear] = val;', explanation: 'Stores val at rear index.', tag: 'memory' },
        { line: 15, code: '    printf("ENQUEUE: %d (rear = %d)\\n", val, rear);', explanation: 'Prints enqueue log.', tag: 'io' },
        { line: 18, code: 'int dequeue() {', explanation: 'Dequeue function definition.', tag: 'declaration' },
        { line: 19, code: '    if (front == -1) {', explanation: 'Underflow condition check.', tag: 'condition' },
        { line: 23, code: '    int val = queue[front];', explanation: 'Extracts value at front index.', tag: 'memory' },
        { line: 24, code: '    if (front == rear) {', explanation: 'Checks if queue is now empty.', tag: 'condition' },
        { line: 25, code: '        front = -1; rear = -1;', explanation: 'Resets indices to empty state.', tag: 'logic' },
        { line: 27, code: '        front = (front + 1) % SIZE;', explanation: 'Advances front circularly.', tag: 'logic' }
      ]
    }
  },

  // =========================================================================
  // EXPERIMENT 06: BINARY SEARCH TREES
  // =========================================================================
  'binary-search-tree': {
    id: 'binary-search-tree',
    number: '06',
    title: 'BINARY SEARCH TREES',
    shortTitle: 'Binary Search Tree',
    category: 'Non-Linear Structures',
    parentExperimentId: 'exp-06',
    parentExperimentTitle: '06. Binary Search Trees Implementation',
    aim: 'To construct, search, and traverse a Binary Search Tree (BST) maintaining the invariant that left subtree keys < node key < right subtree keys.',
    theory: {
      introduction: 'A Binary Search Tree (BST) is a hierarchical node-based data structure where each node has at most two children (left and right). For every node, all keys in its left subtree are strictly smaller, and all keys in its right subtree are strictly greater. Inorder traversal of a BST yields elements in sorted ascending order.',
      corePrinciple: 'Binary search invariant: Key comparison directs traversal left (key < root) or right (key > root), cutting remaining search space in half at each step in balanced trees.',
      importantConcepts: [
        { title: 'BST Invariant', desc: 'Left_Child < Parent < Right_Child for every subtree in the tree.' },
        { title: 'Inorder Traversal (L-Root-R)', desc: 'Recursively visit left subtree, print root, visit right subtree -> Produces sorted output.' },
        { title: 'O(log N) Search Time', desc: 'In balanced trees, search time is proportional to tree height h = log₂(N).' }
      ],
      howItWorks: 'To insert key 40 into tree with root 50: 40 < 50, so move left. If left child is 30: 40 > 30, so move to right of 30. If NULL, insert 40 as right child of 30.',
      realWorldExample: 'A sorted dictionary or auto-complete search indices used by database query engines.',
      stepByStepExplanation: [
        'Define TreeNode structure with int data, struct TreeNode *left, and struct TreeNode *right.',
        'Insert: If root is NULL, allocate new node. If val < root->data, root->left = insert(root->left, val); else root->right = insert(root->right, val).',
        'Inorder Traversal: Recur left, display current data, recur right.',
        'Search: Compare target with root data and recurse left or right accordingly.'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: Function INSERT(ROOT, VAL): If ROOT == NULL, return CREATE_NODE(VAL).',
        'Step 3: If VAL < ROOT->data, ROOT->left = INSERT(ROOT->left, VAL).',
        'Step 4: Else if VAL > ROOT->data, ROOT->right = INSERT(ROOT->right, VAL).',
        'Step 5: Return ROOT.',
        'Step 6: Function INORDER(ROOT): If ROOT != NULL, INORDER(ROOT->left), Print ROOT->data, INORDER(ROOT->right).',
        'Step 7: Stop.'
      ],
      timeComplexity: {
        best: 'O(log N)',
        avg: 'O(log N)',
        worst: 'O(N)',
        explanation: 'O(log N) for balanced trees; degrades to O(N) in skewed degenerate trees.'
      },
      spaceComplexity: {
        auxiliary: 'O(H)',
        explanation: 'Stack depth proportional to tree height H.'
      }
    },
    flowchart: {
      title: 'Algorithmic Flowchart for BST Insertion & Traversal',
      description: 'Flowchart tracing BST node insertion logic based on key comparisons.',
      nodes: [
        { id: 'b1', type: 'start', text: 'START INSERT(ROOT, VAL)', explanation: 'Insertion begins.' },
        { id: 'b2', type: 'decision', text: 'Is ROOT == NULL ?', yesTarget: 'b3', noTarget: 'b4', explanation: 'Checks for empty leaf slot.' },
        { id: 'b3', type: 'process', text: 'Create New Node with VAL & Return', next: 'b7', explanation: 'Allocates node and returns address.' },
        { id: 'b4', type: 'decision', text: 'Is VAL < ROOT->data ?', yesTarget: 'b5', noTarget: 'b6', explanation: 'Compares key with current root.' },
        { id: 'b5', type: 'process', text: 'ROOT->left = INSERT(ROOT->left, VAL)', next: 'b7', explanation: 'Branches to left subtree.' },
        { id: 'b6', type: 'process', text: 'ROOT->right = INSERT(ROOT->right, VAL)', next: 'b7', explanation: 'Branches to right subtree.' },
        { id: 'b7', type: 'end', text: 'RETURN ROOT', explanation: 'Tree structure updated.' }
      ],
      stepWalkthrough: [
        '1. Compares insertion value with current root node.',
        '2. Traverses left if smaller, right if larger.',
        '3. Creates new node when reaching NULL.',
        '4. Returns updated root.'
      ]
    },
    program: {
      title: 'Binary Search Tree Insertion and Traversal in C',
      filename: 'bst_operations.c',
      language: 'C (ISO C99)',
      cCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left;
    struct Node *right;
};

struct Node* createNode(int val) {
    struct Node* n = (struct Node*)malloc(sizeof(struct Node));
    n->data = val;
    n->left = NULL;
    n->right = NULL;
    return n;
}

struct Node* insert(struct Node* root, int val) {
    if (root == NULL) return createNode(val);
    if (val < root->data) {
        root->left = insert(root->left, val);
    } else if (val > root->data) {
        root->right = insert(root->right, val);
    }
    return root;
}

void inorder(struct Node* root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}

int main() {
    struct Node* root = NULL;
    root = insert(root, 50);
    insert(root, 30);
    insert(root, 70);
    insert(root, 20);
    insert(root, 40);
    insert(root, 60);
    insert(root, 80);
    
    printf("--- Binary Search Tree (BST) ---\\n");
    printf("Inorder Traversal (Sorted Output):\\n");
    inorder(root);
    printf("\\n");
    
    return 0;
}`,
      expectedOutput: `--- Binary Search Tree (BST) ---
Inorder Traversal (Sorted Output):
20 30 40 50 60 70 80 

Process returned 0 (0x0)   execution time : 0.003 s`,
      lineExplanations: [
        { line: 4, code: 'struct Node {', explanation: 'Tree node structure with data, left pointer, and right pointer.', tag: 'declaration' },
        { line: 10, code: 'struct Node* createNode(int val) {', explanation: 'Helper creating a new tree node on heap.', tag: 'memory' },
        { line: 18, code: 'struct Node* insert(struct Node* root, int val) {', explanation: 'Recursive function inserting node following BST rules.', tag: 'declaration' },
        { line: 19, code: '    if (root == NULL) return createNode(val);', explanation: 'Base case: Empty position found, returns new node.', tag: 'condition' },
        { line: 20, code: '    if (val < root->data) {', explanation: 'If val < root, recurse into left subtree.', tag: 'condition' },
        { line: 22, code: '    } else if (val > root->data) {', explanation: 'If val > root, recurse into right subtree.', tag: 'condition' },
        { line: 28, code: 'void inorder(struct Node* root) {', explanation: 'Inorder (Left, Root, Right) traversal.', tag: 'declaration' },
        { line: 30, code: '        inorder(root->left);', explanation: 'Traverse left subtree.', tag: 'logic' },
        { line: 31, code: '        printf("%d ", root->data);', explanation: 'Visit root node and print value.', tag: 'io' },
        { line: 32, code: '        inorder(root->right);', explanation: 'Traverse right subtree.', tag: 'logic' }
      ]
    }
  },

  // =========================================================================
  // EXPERIMENT 07: DIJKSTRA'S ALGORITHM
  // =========================================================================
  'dijkstra': {
    id: 'dijkstra',
    number: '07',
    title: 'DIJKSTRA\'S ALGORITHM',
    shortTitle: 'Dijkstra\'s Algorithm',
    category: 'Graph Algorithms',
    parentExperimentId: 'exp-07',
    parentExperimentTitle: '07. Implement the Dijkstra\'s Algorithm',
    aim: 'To calculate the shortest path distances from a single source vertex to all other vertices in a weighted graph with non-negative edge weights using greedy relaxation.',
    theory: {
      introduction: 'Dijkstra\'s Algorithm solves the single-source shortest path problem on a directed or undirected graph with non-negative edge weights. It maintains an array of shortest distances, repeatedly picking the unvisited vertex with minimum tentative distance and relaxing all outgoing edges.',
      corePrinciple: 'Greedy edge relaxation: For edge (u, v) with weight w, if dist[u] + w < dist[v], update dist[v] = dist[u] + w.',
      importantConcepts: [
        { title: 'Distance Array dist[]', desc: 'Stores current shortest distance from source to each vertex. Initialized to infinity.' },
        { title: 'Visited Set', desc: 'Tracks settled vertices whose shortest paths are permanently finalized.' },
        { title: 'Relaxation Step', desc: 'Updates neighbor distances if a shorter path through the current vertex is found.' }
      ],
      howItWorks: 'Start with dist[src] = 0 and all other dist = INF. Pick unvisited vertex u with min dist. Mark u visited. For all neighbors v of u: relax distance dist[v] = min(dist[v], dist[u] + weight(u, v)). Repeat until all vertices visited.',
      realWorldExample: 'Google Maps GPS navigation finding the shortest travel route from your current location to all destinations in a road network.',
      stepByStepExplanation: [
        'Set dist[src] = 0, and dist[v] = INF for all other vertices.',
        'Mark all vertices as unvisited (visited[v] = 0).',
        'Find unvisited vertex u with minimum dist[u].',
        'Mark u as visited.',
        'For each adjacent vertex v: if not visited and dist[u] + weight(u, v) < dist[v], set dist[v] = dist[u] + weight(u, v).',
        'Repeat until all vertices are visited.'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: Initialize dist[i] = INF, visited[i] = 0 for all vertices i.',
        'Step 3: Set dist[SOURCE] = 0.',
        'Step 4: For count = 0 to V - 1: Pick vertex u with min dist[u] among unvisited.',
        'Step 5: Mark visited[u] = 1.',
        'Step 6: For each adjacent vertex v: If visited[v] == 0 and dist[u] + weight(u, v) < dist[v], set dist[v] = dist[u] + weight(u, v).',
        'Step 7: Print shortest distance array dist[].',
        'Step 8: Stop.'
      ],
      timeComplexity: {
        best: 'O(V²)',
        avg: 'O(V²)',
        worst: 'O(V²)',
        explanation: 'O(V²) with adjacency matrix; can be optimized to O((V + E) log V) with min-priority queues.'
      },
      spaceComplexity: {
        auxiliary: 'O(V)',
        explanation: 'Distance and visited tracking arrays.'
      }
    },
    flowchart: {
      title: 'Algorithmic Flowchart for Dijkstra\'s Shortest Path',
      description: 'Flowchart tracing distance initialization, greedy vertex picking, and edge relaxation.',
      nodes: [
        { id: 'd1', type: 'start', text: 'START DIJKSTRA(GRAPH, SRC)', explanation: 'Algorithm starts.' },
        { id: 'd2', type: 'process', text: 'dist[src] = 0; dist[v] = INF; visited[v] = 0', next: 'd3', explanation: 'Initializes arrays.' },
        { id: 'd3', type: 'decision', text: 'Are there unvisited vertices?', yesTarget: 'd4', noTarget: 'd7', explanation: 'Main loop condition.' },
        { id: 'd4', type: 'process', text: 'Pick u with MIN dist[u]; visited[u] = 1', next: 'd5', explanation: 'Greedy choice: pick closest unvisited vertex.' },
        { id: 'd5', type: 'process', text: 'Relax edges: dist[v] = min(dist[v], dist[u] + w)', next: 'd3', explanation: 'Updates adjacent vertex distances.' },
        { id: 'd7', type: 'io', text: 'Print Shortest Distances dist[]', next: 'd8', explanation: 'Outputs final distance table.' },
        { id: 'd8', type: 'end', text: 'STOP', explanation: 'Algorithm finishes.' }
      ],
      stepWalkthrough: [
        '1. Initializes distance array with infinity and source with 0.',
        '2. Picks closest unvisited vertex.',
        '3. Relaxes neighbor edges.',
        '4. Loops until all nodes visited.',
        '5. Displays shortest paths.'
      ]
    },
    program: {
      title: 'Dijkstra\'s Shortest Path Algorithm in C',
      filename: 'dijkstra_shortest_path.c',
      language: 'C (ISO C99)',
      cCode: `#include <stdio.h>
#include <stdbool.h>
#define V 5
#define INF 99999

int minDistance(int dist[], bool visited[]) {
    int min = INF, min_index = -1;
    for (int v = 0; v < V; v++) {
        if (!visited[v] && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}

void dijkstra(int graph[V][V], int src) {
    int dist[V];
    bool visited[V];
    
    for (int i = 0; i < V; i++) {
        dist[i] = INF;
        visited[i] = false;
    }
    dist[src] = 0;
    
    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, visited);
        visited[u] = true;
        
        for (int v = 0; v < V; v++) {
            if (!visited[v] && graph[u][v] && dist[u] != INF 
                && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    
    printf("Vertex \\t Shortest Distance from Source (%d)\\n", src);
    for (int i = 0; i < V; i++) {
        printf("%d \\t\\t %d\\n", i, dist[i]);
    }
}

int main() {
    int graph[V][V] = {
        {0, 4, 2, 0, 0},
        {4, 0, 1, 5, 0},
        {2, 1, 0, 8, 10},
        {0, 5, 8, 0, 2},
        {0, 0, 10, 2, 0}
    };
    
    printf("--- Dijkstra's Shortest Path Algorithm ---\\n");
    dijkstra(graph, 0);
    return 0;
}`,
      expectedOutput: `--- Dijkstra's Shortest Path Algorithm ---
Vertex 	 Shortest Distance from Source (0)
0 		 0
1 		 3
2 		 2
3 		 8
4 		 10

Process returned 0 (0x0)   execution time : 0.003 s`,
      lineExplanations: [
        { line: 3, code: '#define V 5', explanation: 'Graph vertex count constant set to 5.', tag: 'declaration' },
        { line: 4, code: '#define INF 99999', explanation: 'Infinity constant placeholder.', tag: 'declaration' },
        { line: 6, code: 'int minDistance(int dist[], bool visited[]) {', explanation: 'Finds vertex with lowest distance value among unvisited.', tag: 'logic' },
        { line: 17, code: 'void dijkstra(int graph[V][V], int src) {', explanation: 'Main Dijkstra algorithm implementation.', tag: 'declaration' },
        { line: 25, code: '    dist[src] = 0;', explanation: 'Distance to source vertex is always 0.', tag: 'logic' },
        { line: 28, code: '        int u = minDistance(dist, visited);', explanation: 'Picks unvisited vertex with minimal distance.', tag: 'logic' },
        { line: 29, code: '        visited[u] = true;', explanation: 'Marks vertex u permanently settled.', tag: 'logic' },
        { line: 32, code: '            if (!visited[v] && graph[u][v] && dist[u] != INF && dist[u] + graph[u][v] < dist[v]) {', explanation: 'Relaxation check condition.', tag: 'condition' },
        { line: 33, code: '                dist[v] = dist[u] + graph[u][v];', explanation: 'Relaxes edge: updates dist[v] to shorter path.', tag: 'logic' }
      ]
    }
  },

  // =========================================================================
  // EXPERIMENT 08: MINIMUM SPANNING TREE
  // =========================================================================
  'mst': {
    id: 'mst',
    number: '08',
    title: 'MINIMUM SPANNING TREE',
    shortTitle: 'Minimum Spanning Tree',
    category: 'Graph Algorithms',
    parentExperimentId: 'exp-08',
    parentExperimentTitle: '08. Minimum Spanning Tree (Kruskal & Prim)',
    aim: 'To construct the Minimum Spanning Tree of a connected weighted undirected graph using Kruskal\'s greedy edge-sorting algorithm with cycle detection.',
    theory: {
      introduction: 'A Spanning Tree of a connected undirected graph is a subgraph that is a tree and connects all vertices together without cycles. A Minimum Spanning Tree (MST) is a spanning tree with the minimum possible total edge weight.',
      corePrinciple: 'Greedy edge selection: Kruskal\'s algorithm sorts all edges in ascending order of weight and adds each edge to the MST if and only if it does not form a cycle with previously chosen edges.',
      importantConcepts: [
        { title: 'Tree Properties', desc: 'An MST with V vertices always contains exactly V - 1 edges and no cycles.' },
        { title: 'Cycle Detection', desc: 'Disjoint Set Union (DSU) or parent array detects whether two vertices are already connected.' },
        { title: 'Greedy Correctness', desc: 'Proven optimal by the Cut Property in network optimization.' }
      ],
      howItWorks: 'Sort edges by weight. Pick smallest edge. If endpoints belong to different connected components, add edge to MST and union components. Repeat until V-1 edges are selected.',
      realWorldExample: 'Laying telecommunication fiber optic cables or electrical power grids between cities with minimum total wire length.',
      stepByStepExplanation: [
        'Sort all graph edges by weight in ascending order.',
        'Initialize disjoint subsets: each vertex in its own parent set.',
        'Pick the next smallest edge (u, v).',
        'Find parent of u and parent of v.',
        'If parent[u] != parent[v]: include edge in MST, union sets.',
        'Repeat until V - 1 edges are included.'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: Read edge list with weights.',
        'Step 3: Sort edges in non-decreasing order of weight.',
        'Step 4: For each edge (u, v):',
        'Step 5: Check if FIND(u) != FIND(v).',
        'Step 6: If true: Add edge to MST, execute UNION(u, v).',
        'Step 7: Else: Discard edge (forms cycle).',
        'Step 8: Stop when V - 1 edges are added.',
        'Step 9: Output total MST weight and edges.'
      ],
      timeComplexity: {
        best: 'O(E log E)',
        avg: 'O(E log E)',
        worst: 'O(E log E)',
        explanation: 'Dominated by sorting the E edges; union-find operations take nearly O(1) with path compression.'
      },
      spaceComplexity: {
        auxiliary: 'O(V)',
        explanation: 'Parent and rank tracking arrays for Disjoint Set Union.'
      }
    },
    flowchart: {
      title: 'Algorithmic Flowchart for Kruskal\'s Minimum Spanning Tree',
      description: 'Flowchart tracing edge sorting, cycle validation, and MST construction.',
      nodes: [
        { id: 'm1', type: 'start', text: 'START KRUSKAL(EDGES)', explanation: 'Algorithm starts.' },
        { id: 'm2', type: 'process', text: 'Sort all edges by weight ascending', next: 'm3', explanation: 'Pre-sorting step.' },
        { id: 'm3', type: 'decision', text: 'MST has V - 1 edges?', yesTarget: 'm7', noTarget: 'm4', explanation: 'Termination condition.' },
        { id: 'm4', type: 'process', text: 'Pick next edge (u, v) with lowest weight', next: 'm5', explanation: 'Greedy edge pick.' },
        { id: 'm5', type: 'decision', text: 'Does (u, v) form cycle (FIND(u)==FIND(v))?', yesTarget: 'm3', noTarget: 'm6', explanation: 'Cycle detection check.' },
        { id: 'm6', type: 'process', text: 'Add (u, v) to MST; UNION(u, v)', next: 'm3', explanation: 'Includes edge in spanning tree.' },
        { id: 'm7', type: 'io', text: 'Output MST Edges & Total Weight', next: 'm8', explanation: 'Prints final tree.' },
        { id: 'm8', type: 'end', text: 'STOP', explanation: 'Finished.' }
      ],
      stepWalkthrough: [
        '1. Sorts all graph edges by weight.',
        '2. Picks lowest weight edge.',
        '3. Tests if adding edge forms a cycle.',
        '4. Adds non-cyclic edges to MST.',
        '5. Outputs MST when V-1 edges reached.'
      ]
    },
    program: {
      title: 'Kruskal\'s Minimum Spanning Tree Algorithm in C',
      filename: 'kruskal_mst.c',
      language: 'C (ISO C99)',
      cCode: `#include <stdio.h>
#define V 4

int parent[V];

int find(int i) {
    while (parent[i] != i)
        i = parent[i];
    return i;
}

void unionSets(int i, int j) {
    int a = find(i);
    int b = find(j);
    parent[a] = b;
}

int main() {
    // Adjacency matrix of 4-vertex weighted graph
    int cost[V][V] = {
        {0, 10, 6, 5},
        {10, 0, 0, 15},
        {6, 0, 0, 4},
        {5, 15, 4, 0}
    };
    
    for (int i = 0; i < V; i++) parent[i] = i;
    
    int edge_count = 0, mincost = 0;
    printf("--- Minimum Spanning Tree (Kruskal's) ---\\n");
    printf("Edges in the constructed MST:\\n");
    
    while (edge_count < V - 1) {
        int min = 9999, a = -1, b = -1;
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (find(i) != find(j) && cost[i][j] != 0 && cost[i][j] < min) {
                    min = cost[i][j];
                    a = i;
                    b = j;
                }
            }
        }
        unionSets(a, b);
        printf("Edge %d: (%d, %d) cost: %d\\n", ++edge_count, a, b, min);
        mincost += min;
    }
    printf("Total Minimum Spanning Tree Weight = %d\\n", mincost);
    return 0;
}`,
      expectedOutput: `--- Minimum Spanning Tree (Kruskal's) ---
Edges in the constructed MST:
Edge 1: (2, 3) cost: 4
Edge 2: (0, 3) cost: 5
Edge 3: (0, 1) cost: 10
Total Minimum Spanning Tree Weight = 19

Process returned 0 (0x0)   execution time : 0.003 s`,
      lineExplanations: [
        { line: 4, code: 'int parent[V];', explanation: 'Parent array tracking disjoint sets for cycle prevention.', tag: 'memory' },
        { line: 6, code: 'int find(int i) {', explanation: 'Find function locating root representative of set i.', tag: 'logic' },
        { line: 12, code: 'void unionSets(int i, int j) {', explanation: 'Union function merging sets a and b.', tag: 'logic' },
        { line: 31, code: '    while (edge_count < V - 1) {', explanation: 'Loops until exactly V - 1 edges are added to MST.', tag: 'condition' },
        { line: 35, code: '                if (find(i) != find(j) && cost[i][j] != 0 && cost[i][j] < min) {', explanation: 'Picks minimum edge that does not form cycle.', tag: 'condition' },
        { line: 42, code: '        unionSets(a, b);', explanation: 'Merges sets of selected edge endpoints.', tag: 'logic' }
      ]
    }
  },

  // =========================================================================
  // EXPERIMENT 09: SORTING ALGORITHMS
  // =========================================================================
  'sorting': {
    id: 'sorting',
    number: '09',
    title: 'SORTING ALGORITHMS',
    shortTitle: 'Sorting Algorithms',
    category: 'Sorting & Searching',
    parentExperimentId: 'exp-09',
    parentExperimentTitle: '09. Program to sort set of elements (Insertion, Merge, Quick)',
    aim: 'To implement, visualize, and benchmark classic sorting algorithms: Insertion Sort, Merge Sort (Divide & Conquer), and Quick Sort (Partitioning).',
    theory: {
      introduction: 'Sorting is the fundamental algorithmic process of arranging data elements in a specific order (ascending or descending). Efficient sorting is critical for optimizing search operations (Binary Search), database indexing, and data presentation.',
      corePrinciple: 'Incremental ordering: Insertion Sort builds a sorted array one element at a time; Merge Sort divides the array into halves and merges them; Quick Sort partitions around a pivot.',
      importantConcepts: [
        { title: 'Insertion Sort', desc: 'Iterates through array, picking element and inserting into its sorted position among predecessors.' },
        { title: 'Merge Sort', desc: 'Divide and conquer algorithm with guaranteed O(N log N) worst-case time.' },
        { title: 'Quick Sort', desc: 'Picks a pivot, partitions elements smaller to left and larger to right, recursing on subarrays.' }
      ],
      howItWorks: 'In Insertion Sort: Element key = arr[i]. Compare key with elements to its left. Shift greater elements one position right. Insert key at its correct position.',
      realWorldExample: 'Sorting a hand of playing cards where you pick each card and insert it into its correct position among your sorted cards.',
      stepByStepExplanation: [
        'Iterate index i from 1 to N-1.',
        'Set key = arr[i] and j = i - 1.',
        'While j >= 0 and arr[j] > key: shift arr[j] to arr[j+1], and decrement j.',
        'Place key at arr[j+1].',
        'Repeat until array is fully sorted.'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: Read array ARR of N elements.',
        'Step 3: For i = 1 to N - 1:',
        'Step 4: Set KEY = ARR[i], J = i - 1.',
        'Step 5: While J >= 0 and ARR[J] > KEY:',
        'Step 6: ARR[J + 1] = ARR[J], J = J - 1.',
        'Step 7: ARR[J + 1] = KEY.',
        'Step 8: Display sorted array.',
        'Step 9: Stop.'
      ],
      timeComplexity: {
        best: 'O(N)',
        avg: 'O(N²)',
        worst: 'O(N²)',
        explanation: 'Insertion Sort is O(N) when already sorted; Merge and Quick Sort achieve O(N log N).'
      },
      spaceComplexity: {
        auxiliary: 'O(1)',
        explanation: 'In-place sorting using constant additional memory.'
      }
    },
    flowchart: {
      title: 'Algorithmic Flowchart for Insertion Sort',
      description: 'Flowchart tracing outer loop, inner shift condition, and key insertion.',
      nodes: [
        { id: 'so1', type: 'start', text: 'START INSERTION_SORT(ARR, N)', explanation: 'Sort algorithm begins.' },
        { id: 'so2', type: 'process', text: 'Loop i from 1 to N - 1', next: 'so3', explanation: 'Iterates through unsorted partition.' },
        { id: 'so3', type: 'process', text: 'KEY = ARR[i]; j = i - 1', next: 'so4', explanation: 'Picks candidate key.' },
        { id: 'so4', type: 'decision', text: 'Is j >= 0 AND ARR[j] > KEY ?', yesTarget: 'so5', noTarget: 'so6', explanation: 'Checks if preceding elements need shifting.' },
        { id: 'so5', type: 'process', text: 'ARR[j + 1] = ARR[j]; j = j - 1', next: 'so4', explanation: 'Shifts element right.' },
        { id: 'so6', type: 'process', text: 'ARR[j + 1] = KEY', next: 'so7', explanation: 'Inserts key at correct sorted slot.' },
        { id: 'so7', type: 'decision', text: 'More elements (i < N) ?', yesTarget: 'so2', noTarget: 'so8', explanation: 'Outer loop check.' },
        { id: 'so8', type: 'end', text: 'STOP / RETURN SORTED ARRAY', explanation: 'Array is sorted.' }
      ],
      stepWalkthrough: [
        '1. Begins with second element as key.',
        '2. Compares key with preceding sorted elements.',
        '3. Shifts greater elements one position right.',
        '4. Inserts key into vacant position.',
        '5. Repeats until end of array.'
      ]
    },
    program: {
      title: 'Insertion Sort Algorithm in C',
      filename: 'insertion_sort.c',
      language: 'C (ISO C99)',
      cCode: `#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        // Shift elements of arr[0..i-1] that are greater than key
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("--- Insertion Sort Algorithm in C ---\\n");
    printf("Original Unsorted Array:\\n");
    printArray(arr, n);
    
    insertionSort(arr, n);
    
    printf("Sorted Array in Ascending Order:\\n");
    printArray(arr, n);
    
    return 0;
}`,
      expectedOutput: `--- Insertion Sort Algorithm in C ---
Original Unsorted Array:
64 25 12 22 11 
Sorted Array in Ascending Order:
11 12 22 25 64 

Process returned 0 (0x0)   execution time : 0.002 s`,
      lineExplanations: [
        { line: 1, code: '#include <stdio.h>', explanation: 'Standard input/output header for printf().', tag: 'header' },
        { line: 3, code: 'void insertionSort(int arr[], int n) {', explanation: 'Function executing insertion sort in-place.', tag: 'declaration' },
        { line: 4, code: '    for (int i = 1; i < n; i++) {', explanation: 'Outer loop moving from second element to end.', tag: 'logic' },
        { line: 5, code: '        int key = arr[i];', explanation: 'Stores candidate element to be placed in sorted sub-array.', tag: 'declaration' },
        { line: 6, code: '        int j = i - 1;', explanation: 'Initializes index j to immediate left element.', tag: 'declaration' },
        { line: 9, code: '        while (j >= 0 && arr[j] > key) {', explanation: 'Loops while left elements are strictly greater than key.', tag: 'condition' },
        { line: 10, code: '            arr[j + 1] = arr[j];', explanation: 'Shifts larger element one position to the right.', tag: 'memory' },
        { line: 11, code: '            j = j - 1;', explanation: 'Decrements j to inspect next preceding element.', tag: 'logic' },
        { line: 13, code: '        arr[j + 1] = key;', explanation: 'Inserts key into its correct sorted slot.', tag: 'memory' }
      ]
    }
  }
}

// Helper to look up an individual experiment by ID or alias
export function getIndividualExperiment(id: string): IndividualExperiment {
  // Normalize alias
  const aliasMap: Record<string, string> = {
    'exp-01': 'recursion',
    'exp-01-recursion': 'recursion',
    'exp-01-structure': 'structure',
    'exp-01-pointer': 'pointer',
    'exp-02': 'linked-list',
    'exp-03': 'stack',
    'exp-04': 'balanced-parentheses',
    'exp-05': 'queue',
    'exp-06': 'binary-search-tree',
    'exp-07': 'dijkstra',
    'exp-08': 'mst',
    'exp-09': 'sorting'
  }
  const targetId = aliasMap[id] || id
  return INDIVIDUAL_EXPERIMENTS[targetId] || INDIVIDUAL_EXPERIMENTS['recursion']
}
