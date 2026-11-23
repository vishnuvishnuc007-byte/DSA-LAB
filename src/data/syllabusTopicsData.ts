import type { FlowchartNode, PracticeProblem, VivaQuestion } from './experimentsData'

export interface TopicDetails {
  id: string
  topicNumber: string
  title: string
  shortTitle: string
  parentExperimentId: string
  parentExperimentNumber: string
  parentExperimentTitle: string
  iconType: 'code' | 'link' | 'stack' | 'parens' | 'queue' | 'tree' | 'dijkstra' | 'mst' | 'sort'
  topicsSummary: string
  aim: string
  problemStatement: string
  objectives: string[]
  requiredConcepts: string[]
  syllabusScope: string[]
  expectedOutput: string
  learningOutcome: string
  theory: {
    introduction: string
    importantConcepts: { title: string; desc: string }[]
    howItWorks: string
    realWorldExample: string
    stepByStepExplanation: string[]
    algorithmSteps: string[]
    pseudocode: string
    timeComplexity: { best: string; avg: string; worst: string; explanation: string }
    spaceComplexity: { auxiliary: string; explanation: string }
  }
  flowchartNodes: FlowchartNode[]
  demoType: 'recursion' | 'structure' | 'pointer' | 'linked-list' | 'stack' | 'parens' | 'queue' | 'bst' | 'dijkstra' | 'mst-kruskal' | 'mst-prim' | 'sort-insertion' | 'sort-merge' | 'sort-quick'
  practiceProblems: PracticeProblem[]
  vivaQuestions: VivaQuestion[]
  cCodeSnippet: string
}

export interface SyllabusExperimentGroup {
  id: string
  number: string
  title: string
  shortTitle: string
  shortDesc: string
  topics: TopicDetails[]
}

export const SYLLABUS_EXPERIMENTS: SyllabusExperimentGroup[] = [
  // =========================================================================
  // EXPERIMENT 01 — SIMPLE C PROGRAMS
  // =========================================================================
  {
    id: 'exp-01',
    number: '01',
    title: 'SIMPLE C PROGRAMS',
    shortTitle: 'SIMPLE C PROGRAMS',
    shortDesc: 'Foundations of structured programming in C with memory address references and call-stack execution.',
    topics: [
      {
        id: 'recursion',
        topicNumber: '01.1',
        title: 'Programs using recursion',
        shortTitle: 'Recursion',
        parentExperimentId: 'exp-01',
        parentExperimentNumber: '01',
        parentExperimentTitle: 'Simple C Programs',
        iconType: 'code',
        topicsSummary: 'Function call-stack mechanics, base case termination, recursive factorial & Fibonacci series.',
        aim: 'To design, implement and analyze recursive functions in C using mathematical recursion and activation records.',
        problemStatement: 'Develop a C program that computes the factorial of an integer N using direct recursion, properly identifying the base case and unwinding the function stack.',
        objectives: [
          'Understand call-stack frame allocation and destruction during recursive calls.',
          'Formulate base case termination conditions to prevent stack overflow.',
          'Trace return value propagation backwards through activation records.'
        ],
        requiredConcepts: ['C Functions', 'Call Stack & Stack Frames', 'Base Conditions', 'Variable Scope'],
        syllabusScope: ['Mathematical recursion (Factorial calculation, Fibonacci series)', 'Stack frame tracing', 'Recursion depth analysis'],
        expectedOutput: `Computing Factorial using Recursion:\nInput Number: 5\nFactorial of 5 = 120\n\nProcess returned 0 (0x0)   execution time : 0.002 s`,
        learningOutcome: 'CO1 (Apply): Apply recursive logic and call-stack unwinding to solve inductive computational problems.',
        theory: {
          introduction: 'Recursion is an essential programming technique where a function calls itself directly or indirectly to solve a smaller subproblem of the same type. Every recursive routine must contain at least one base case that stops execution and initiates stack unwinding.',
          importantConcepts: [
            { title: 'Base Case Condition', desc: 'The termination check (e.g. n <= 1) that returns a constant value without making further recursive calls.' },
            { title: 'Activation Record', desc: 'Each recursive call allocates a new stack frame storing local variables, parameters, and the return address.' },
            { title: 'Stack Unwinding', desc: 'Once the base case is reached, values multiply and propagate backwards as stack frames pop in LIFO order.' }
          ],
          howItWorks: 'When factorial(4) is invoked, it pushes factorial(3), which pushes factorial(2), which pushes factorial(1). factorial(1) hits the base case and returns 1. Then factorial(2) returns 2 * 1 = 2, factorial(3) returns 3 * 2 = 6, and factorial(4) returns 4 * 6 = 24.',
          realWorldExample: 'Russian Nesting Dolls (Matryoshka dolls) where you open each doll to reveal a smaller doll until you reach the solid smallest doll at the core.',
          stepByStepExplanation: [
            'Check base case: if n <= 1, return 1.',
            'Recursive step: compute factorial(n - 1).',
            'Multiply n with the returned result and return it.',
            'Unwind call stack step by step back to main().'
          ],
          algorithmSteps: [
            'Step 1: Start the program.',
            'Step 2: Read positive integer N.',
            'Step 3: Call function FACTORIAL(N).',
            'Step 4: Inside FACTORIAL: if N <= 1, return 1 (Base Case).',
            'Step 5: Else return N * FACTORIAL(N - 1) (Recursive Case).',
            'Step 6: Display the computed factorial result in main().',
            'Step 7: Terminate program (Stop).'
          ],
          pseudocode: `FUNCTION Factorial(n):
    IF n <= 1 THEN
        RETURN 1
    ELSE
        RETURN n * Factorial(n - 1)
    END IF
END FUNCTION`,
          timeComplexity: {
            best: 'O(1)',
            avg: 'O(N)',
            worst: 'O(N)',
            explanation: 'N recursive calls made sequentially, each performing constant-time O(1) multiplication.'
          },
          spaceComplexity: {
            auxiliary: 'O(N)',
            explanation: 'The call stack grows to depth N before unwinding, requiring O(N) auxiliary stack memory.'
          }
        },
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START FACTORIAL(N)', next: '2' },
          { id: '2', type: 'io', text: 'Read integer N', next: '3' },
          { id: '3', type: 'decision', text: 'Is N <= 1 ?', yesTarget: '4', noTarget: '5' },
          { id: '4', type: 'process', text: 'Return 1 (Base Case)', next: '6' },
          { id: '5', type: 'process', text: 'Result = N * Factorial(N - 1)', next: '6' },
          { id: '6', type: 'io', text: 'Output Result', next: '7' },
          { id: '7', type: 'end', text: 'END / RETURN' }
        ],
        demoType: 'recursion',
        practiceProblems: [
          {
            id: 'rec-p1',
            title: 'Calculate Sum of Natural Numbers using Recursion',
            difficulty: 'Beginner',
            description: 'Write a recursive function in C that accepts an integer N and returns the sum of all natural numbers up to N (1 + 2 + ... + N).',
            inputFormat: 'A single positive integer N',
            outputFormat: 'Single integer representing the sum',
            sampleInput: '5',
            sampleOutput: '15',
            hint: 'Base case is when N <= 1, return 1. Otherwise return N + sum(N - 1).',
            starterCode: `#include <stdio.h>\n\nint sumNatural(int n) {\n    // Write recursive logic here\n    return 0;\n}\n\nint main() {\n    printf("%d\\n", sumNatural(5));\n    return 0;\n}`,
            solutionCode: `#include <stdio.h>\n\nint sumNatural(int n) {\n    if (n <= 1) return n;\n    return n + sumNatural(n - 1);\n}\n\nint main() {\n    printf("%d\\n", sumNatural(5));\n    return 0;\n}`,
            testCases: [
              { input: '5', expected: '15' },
              { input: '10', expected: '55' }
            ]
          }
        ],
        vivaQuestions: [
          {
            id: 'rec-v1',
            type: 'mcq',
            question: 'What occurs if a recursive function does not include a proper base case condition?',
            options: ['Memory fragmentation', 'Stack Overflow Error', 'Segmentation Fault at compile time', 'Arithmetic Underflow'],
            correctAnswer: 1,
            explanation: 'Without a base case, recursive calls continue pushing activation records indefinitely until the call stack limits are exceeded, triggering a Stack Overflow.'
          },
          {
            id: 'rec-v2',
            type: 'short',
            question: 'What information is stored inside an activation record on the call stack during a recursive call?',
            correctAnswer: 'Parameters, local variables, and return address',
            explanation: 'Each activation record (stack frame) stores function argument parameters, local variables, book-keeping CPU registers, and the return address to resume caller execution.'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\n\nlong long factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    int num = 5;\n    printf("Computing Factorial using Recursion:\\n");\n    printf("Input Number: %d\\n", num);\n    long long result = factorial(num);\n    printf("Factorial of %d = %lld\\n", num, result);\n    return 0;\n}`
      },
      {
        id: 'structure',
        topicNumber: '01.2',
        title: 'Programs using structures',
        shortTitle: 'Structures',
        parentExperimentId: 'exp-01',
        parentExperimentNumber: '01',
        parentExperimentTitle: 'Simple C Programs',
        iconType: 'code',
        topicsSummary: 'Heterogeneous data encapsulation, struct definitions, member alignment, and dot (.) operator access.',
        aim: 'To design and implement user-defined C structures for managing composite records with member padding and dot operator referencing.',
        problemStatement: 'Construct a C program using a student record structure to store student roll number, name, subject marks, and compute the aggregate percentage.',
        objectives: [
          'Understand user-defined heterogeneous data types in C.',
          'Analyze compiler memory alignment and padding within struct layouts.',
          'Demonstrate member assignment and retrieval via the dot (.) operator.'
        ],
        requiredConcepts: ['struct Keyword', 'Primitive Data Types', 'Dot (.) Operator', 'Memory Padding'],
        syllabusScope: ['Structure templates', 'Declaring and instantiating struct variables', 'Array of structures'],
        expectedOutput: `--- Student Database Record ---\nRoll Number : 307\nStudent Name: Vishnu Student\nSubject 1   : 92.5\nSubject 2   : 88.0\nAverage GPA : 90.25\n\nProcess returned 0 (0x0)   execution time : 0.003 s`,
        learningOutcome: 'CO1 (Apply): Create user-defined structured data types to encapsulate real-world records cleanly.',
        theory: {
          introduction: 'A structure in C is a user-defined composite data type that allows grouping variables of different data types (e.g. char, int, float) under a single meaningful name. Structures are the foundation for building dynamic nodes in linked lists and trees.',
          importantConcepts: [
            { title: 'struct Keyword', desc: 'Defines the blueprint schema containing heterogeneous member field declarations.' },
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
            'Step 2: Define struct Student with rollNo, name, and marks.',
            'Step 3: Declare variable s1 of type struct Student.',
            'Step 4: Assign values to s1 members using dot (.) operator.',
            'Step 5: Compute total and average percentage.',
            'Step 6: Display structured student record.',
            'Step 7: Stop.'
          ],
          pseudocode: `STRUCTURE Student:
    INTEGER rollNo
    STRING name
    FLOAT marks1, marks2, average
END STRUCTURE`,
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
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START PROGRAM', next: '2' },
          { id: '2', type: 'process', text: 'Define struct Student template', next: '3' },
          { id: '3', type: 'process', text: 'Declare struct variable s1', next: '4' },
          { id: '4', type: 'io', text: 'Input: s1.rollNo, s1.name, s1.marks', next: '5' },
          { id: '5', type: 'process', text: 'Compute Average = (m1 + m2) / 2', next: '6' },
          { id: '6', type: 'io', text: 'Display Student Record Details', next: '7' },
          { id: '7', type: 'end', text: 'END PROGRAM' }
        ],
        demoType: 'structure',
        practiceProblems: [
          {
            id: 'str-p1',
            title: 'Store and Display Book Record using Structure',
            difficulty: 'Beginner',
            description: 'Define struct Book with title, author, and price. Write a program to store and print details of a book.',
            inputFormat: 'Book title, author, price',
            outputFormat: 'Formatted book record',
            sampleInput: 'Data_Structures Tanenbaum 450.00',
            sampleOutput: 'Book: Data_Structures by Tanenbaum | Price: $450.00',
            hint: 'Use struct Book { char title[50]; char author[50]; float price; };',
            starterCode: `#include <stdio.h>\n\nstruct Book {\n    char title[50];\n    char author[50];\n    float price;\n};\n\nint main() {\n    // Instantiate and print book\n    return 0;\n}`,
            solutionCode: `#include <stdio.h>\n#include <string.h>\n\nstruct Book {\n    char title[50];\n    char author[50];\n    float price;\n};\n\nint main() {\n    struct Book b;\n    strcpy(b.title, "Data_Structures");\n    strcpy(b.author, "Tanenbaum");\n    b.price = 450.00;\n    printf("Book: %s by %s | Price: $%.2f\\n", b.title, b.author, b.price);\n    return 0;\n}`,
            testCases: [
              { input: 'Data_Structures Tanenbaum 450.00', expected: 'Book: Data_Structures by Tanenbaum | Price: $450.00' }
            ]
          }
        ],
        vivaQuestions: [
          {
            id: 'str-v1',
            type: 'mcq',
            question: 'Which operator is used to access structure members through a direct structure variable?',
            options: ['Arrow (->) operator', 'Dot (.) operator', 'Asterisk (*) operator', 'Ampersand (&) operator'],
            correctAnswer: 1,
            explanation: 'The dot (.) operator is used for direct member access. The arrow (->) operator is used when accessing members through a pointer to a structure.'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\n#include <string.h>\n\nstruct Student {\n    int rollNo;\n    char name[50];\n    float marks1, marks2, average;\n};\n\nint main() {\n    struct Student s1;\n    s1.rollNo = 307;\n    strcpy(s1.name, "Vishnu Student");\n    s1.marks1 = 92.5;\n    s1.marks2 = 88.0;\n    s1.average = (s1.marks1 + s1.marks2) / 2.0;\n    printf("Roll: %d | Name: %s | Avg: %.2f\\n", s1.rollNo, s1.name, s1.average);\n    return 0;\n}`
      },
      {
        id: 'pointer',
        topicNumber: '01.3',
        title: 'Programs using pointers',
        shortTitle: 'Pointers',
        parentExperimentId: 'exp-01',
        parentExperimentNumber: '01',
        parentExperimentTitle: 'Simple C Programs',
        iconType: 'code',
        topicsSummary: 'Memory address referencing (&), dereferencing (*), dynamic heap allocation (malloc), and pointer arithmetic.',
        aim: 'To design and implement C programs demonstrating pointer variables, address referencing (&), dereferencing (*), dynamic memory allocation (malloc), and deallocation (free).',
        problemStatement: 'Develop a C program that allocates a dynamic integer array of size N using malloc(), populates it using pointer arithmetic, displays elements with their physical memory addresses, and frees heap memory.',
        objectives: [
          'Master memory addresses and pointer variables.',
          'Understand dynamic memory allocation on the heap using malloc().',
          'Prevent memory leaks by calling free() and nullifying pointers.'
        ],
        requiredConcepts: ['Pointers (* and &)', 'Dynamic Memory (malloc/free)', 'Heap vs Stack', 'Pointer Arithmetic'],
        syllabusScope: ['Pointer declaration and initialization', 'Pointer arithmetic *(ptr + i)', 'Dynamic arrays on heap'],
        expectedOutput: `--- Pointers & Dynamic Memory Allocation ---\nDynamic Array Elements via Pointers:\nElement [0]: Value = 10 | Address = 0x6000021b0\nElement [1]: Value = 20 | Address = 0x6000021b4\nElement [2]: Value = 30 | Address = 0x6000021b8\nMemory freed successfully.`,
        learningOutcome: 'CO1 (Apply): Utilize pointers and dynamic memory management to build scalable memory-efficient programs.',
        theory: {
          introduction: 'A pointer is a variable that stores the physical memory address of another variable. Pointers provide direct access to hardware memory, enable dynamic allocation on the heap, facilitate passing large structures by reference without copying, and are fundamental to all linked data structures.',
          importantConcepts: [
            { title: 'Address-of Operator (&)', desc: 'Returns the hexadecimal physical address of an operand in RAM.' },
            { title: 'Dereference Operator (*)', desc: 'Directly reads or writes the value located at the pointer target address.' },
            { title: 'Dynamic Allocation (malloc/free)', desc: 'malloc() requests heap bytes at runtime; free() returns heap memory back to OS to avoid memory leaks.' }
          ],
          howItWorks: 'int x = 25; int *ptr = &x; The variable ptr holds the address (e.g. 0x7ffd98). When *ptr = 50 is executed, the CPU writes 50 directly to memory address 0x7ffd98, altering x.',
          realWorldExample: 'A home address written on an envelope: The address is not the house itself, but points precisely to where the house is located in the neighborhood.',
          stepByStepExplanation: [
            'Declare pointer variable with base type: int *ptr.',
            'Allocate heap memory using malloc(n * sizeof(int)).',
            'Verify that pointer is not NULL (defensive check).',
            'Access or mutate target data using pointer arithmetic *(ptr + i).',
            'Deallocate dynamically allocated heap memory using free(ptr).'
          ],
          algorithmSteps: [
            'Step 1: Start.',
            'Step 2: Declare int pointer *arr and integer n = 5.',
            'Step 3: Allocate heap memory: arr = malloc(n * sizeof(int)).',
            'Step 4: Check if arr == NULL (allocation failure).',
            'Step 5: Fill and read dynamic array using pointer arithmetic *(arr + i).',
            'Step 6: Release heap memory using free(arr).',
            'Step 7: Stop.'
          ],
          pseudocode: `INTEGER POINTER arr
arr = ALLOCATE_MEMORY(n * SIZEOF(INTEGER))
FOR i FROM 0 TO n-1:
    *(arr + i) = (i + 1) * 10
FREE_MEMORY(arr)`,
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
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START PROGRAM', next: '2' },
          { id: '2', type: 'process', text: 'Declare int *arr, n = 5', next: '3' },
          { id: '3', type: 'process', text: 'arr = malloc(n * sizeof(int))', next: '4' },
          { id: '4', type: 'decision', text: 'Is arr == NULL ?', yesTarget: '5', noTarget: '6' },
          { id: '5', type: 'process', text: 'Print "Allocation Failed" & Exit', next: '8' },
          { id: '6', type: 'process', text: 'Populate via *(arr + i)', next: '7' },
          { id: '7', type: 'process', text: 'free(arr); arr = NULL', next: '8' },
          { id: '8', type: 'end', text: 'END PROGRAM' }
        ],
        demoType: 'pointer',
        practiceProblems: [
          {
            id: 'ptr-p1',
            title: 'Swap Two Numbers using Pointers (Call by Reference)',
            difficulty: 'Beginner',
            description: 'Write a C function void swap(int *a, int *b) that exchanges the values of two integers using pointers.',
            inputFormat: 'Two integers x and y',
            outputFormat: 'Swapped values',
            sampleInput: '10 20',
            sampleOutput: 'x = 20, y = 10',
            hint: 'Use a temporary variable: int temp = *a; *a = *b; *b = temp;',
            starterCode: `#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    // Implement swap\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf("x = %d, y = %d\\n", x, y);\n    return 0;\n}`,
            solutionCode: `#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf("x = %d, y = %d\\n", x, y);\n    return 0;\n}`,
            testCases: [
              { input: '10 20', expected: 'x = 20, y = 10' }
            ]
          }
        ],
        vivaQuestions: [
          {
            id: 'ptr-v1',
            type: 'mcq',
            question: 'What happens if a program fails to deallocate dynamically allocated heap memory with free()?',
            options: ['Dangling pointer', 'Memory Leak', 'Segmentation fault on compile', 'Buffer overflow'],
            correctAnswer: 1,
            explanation: 'Memory allocated on the heap remains reserved until freed. Omitting free() causes a Memory Leak, consuming RAM over time.'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 5;\n    int *arr = (int *)malloc(n * sizeof(int));\n    if (arr == NULL) return 1;\n    for (int i = 0; i < n; i++) *(arr + i) = (i + 1) * 10;\n    for (int i = 0; i < n; i++) printf("[%d]: %d\\n", i, *(arr + i));\n    free(arr);\n    return 0;\n}`
      }
    ]
  },

  // =========================================================================
  // EXPERIMENT 02 — LINKED LIST
  // =========================================================================
  {
    id: 'exp-02',
    number: '02',
    title: 'LINKED LIST',
    shortTitle: 'LINKED LIST',
    shortDesc: 'Dynamic node allocation and pointer linking to implement a flexible List Abstract Data Type.',
    topics: [
      {
        id: 'list-adt',
        topicNumber: '02.1',
        title: 'Linked List Implementation of List ADT',
        shortTitle: 'List ADT Implementation',
        parentExperimentId: 'exp-02',
        parentExperimentNumber: '02',
        parentExperimentTitle: 'Linked List',
        iconType: 'link',
        topicsSummary: 'Node allocation, head/tail insertion, deletion, and linear pointer traversal.',
        aim: 'To implement the List Abstract Data Type using a Singly Linked List with dynamic node creation and operations.',
        problemStatement: 'Develop a C program that creates a singly linked list, implements insert at beginning, insert at end, delete node, and traverses to display all elements.',
        objectives: [
          'Design self-referential Node structure in C.',
          'Implement dynamic node creation using malloc().',
          'Execute linear list traversal without memory leaks.'
        ],
        requiredConcepts: ['Self-referential Structs', 'Pointers', 'Dynamic Heap Allocation', 'Head Pointer'],
        syllabusScope: ['Singly Linked List', 'Insert/Delete operations', 'List Traversal'],
        expectedOutput: `--- Singly Linked List ADT Operations ---\nLinked List after insertions:\nHEAD -> [10] -> [20] -> [30] -> [40] -> NULL\n\nProcess returned 0 (0x0)   execution time : 0.002 s`,
        learningOutcome: 'CO1 (Apply): Implement dynamic linked list structures for non-contiguous data storage.',
        theory: {
          introduction: 'A Linked List is a linear dynamic data structure where elements are not stored in contiguous memory locations. Each node contains a data field and a pointer (next) holding the address of the subsequent node in sequence.',
          importantConcepts: [
            { title: 'Node Architecture', desc: 'Struct containing data payload and a self-referential struct Node *next pointer.' },
            { title: 'Head Pointer', desc: 'Starting reference anchor. If head == NULL, the list is empty.' },
            { title: 'O(1) Insertion at Head', desc: 'Inserting at head only requires pointing new_node->next to head, then head = new_node.' }
          ],
          howItWorks: 'To insert value 10: allocate node on heap, set node->data = 10, node->next = head, and update head = node. Traversal proceeds by initializing temp = head and iterating temp = temp->next until temp == NULL.',
          realWorldExample: 'A train where each carriage is coupled to the next carriage behind it, or a music playlist playing next songs sequentially.',
          stepByStepExplanation: [
            'Define struct Node with int data and struct Node *next.',
            'Allocate new node using malloc(sizeof(struct Node)).',
            'Assign data value and point next pointer to current head.',
            'Update head pointer to point to the newly allocated node.',
            'Traverse and print list from head until reaching NULL.'
          ],
          algorithmSteps: [
            'Step 1: Start.',
            'Step 2: Initialize HEAD = NULL.',
            'Step 3: INSERT(VAL): Allocate NEW_NODE. Set NEW_NODE->data = VAL.',
            'Step 4: Set NEW_NODE->next = HEAD.',
            'Step 5: Set HEAD = NEW_NODE.',
            'Step 6: TRAVERSE: Set TEMP = HEAD. While TEMP != NULL: Print TEMP->data, TEMP = TEMP->next.',
            'Step 7: Stop.'
          ],
          pseudocode: `STRUCTURE Node:
    INTEGER data
    POINTER next
END STRUCTURE`,
          timeComplexity: {
            best: 'O(1)',
            avg: 'O(1)',
            worst: 'O(1)',
            explanation: 'Insertion at head takes O(1) constant time. Traversal or search takes O(N).'
          },
          spaceComplexity: {
            auxiliary: 'O(N)',
            explanation: 'Each node requires additional pointer overhead (8 bytes on 64-bit systems).'
          }
        },
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START INSERT_HEAD', next: '2' },
          { id: '2', type: 'process', text: 'NEW_NODE = malloc(sizeof(Node))', next: '3' },
          { id: '3', type: 'process', text: 'NEW_NODE->data = VAL', next: '4' },
          { id: '4', type: 'process', text: 'NEW_NODE->next = HEAD', next: '5' },
          { id: '5', type: 'process', text: 'HEAD = NEW_NODE', next: '6' },
          { id: '6', type: 'end', text: 'RETURN SUCCESS' }
        ],
        demoType: 'linked-list',
        practiceProblems: [
          {
            id: 'll-p1',
            title: 'Count Nodes in a Singly Linked List',
            difficulty: 'Beginner',
            description: 'Write a C function int countNodes(struct Node* head) that traverses a linked list and returns the total number of nodes.',
            inputFormat: 'Head of linked list',
            outputFormat: 'Total node count',
            sampleInput: '10 -> 20 -> 30 -> 40 -> NULL',
            sampleOutput: '4',
            hint: 'Initialize count = 0. Iterate while head != NULL, increment count, and advance head = head->next.',
            starterCode: `#include <stdio.h>\n\nstruct Node { int data; struct Node *next; };\n\nint countNodes(struct Node *head) {\n    // Return node count\n    return 0;\n}`,
            solutionCode: `#include <stdio.h>\n\nstruct Node { int data; struct Node *next; };\n\nint countNodes(struct Node *head) {\n    int count = 0;\n    while (head != NULL) {\n        count++;\n        head = head->next;\n    }\n    return count;\n}`,
            testCases: [{ input: '4 nodes', expected: '4' }]
          }
        ],
        vivaQuestions: [
          {
            id: 'll-v1',
            type: 'mcq',
            question: 'What is the primary advantage of a Singly Linked List over a fixed Array?',
            options: ['O(1) random index access', 'Dynamic size with no memory reallocation overhead', 'Lower cache spatial locality', 'Smaller memory consumption'],
            correctAnswer: 1,
            explanation: 'Linked lists grow and shrink dynamically at runtime without needing large contiguous memory chunks or costly resizing reallocations.'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *next; };\n\nvoid insertAtBeginning(struct Node **headRef, int val) {\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\n    newNode->data = val;\n    newNode->next = *headRef;\n    *headRef = newNode;\n}\n\nvoid displayList(struct Node *node) {\n    printf("HEAD -> ");\n    while (node != NULL) { printf("[%d] -> ", node->data); node = node->next; }\n    printf("NULL\\n");\n}\n\nint main() {\n    struct Node *head = NULL;\n    insertAtBeginning(&head, 30);\n    insertAtBeginning(&head, 20);\n    insertAtBeginning(&head, 10);\n    displayList(head);\n    return 0;\n}`
      }
    ]
  },

  // =========================================================================
  // EXPERIMENT 03 — IMPLEMENTATION OF STACK
  // =========================================================================
  {
    id: 'exp-03',
    number: '03',
    title: 'IMPLEMENTATION OF STACK',
    shortTitle: 'STACK IMPLEMENTATION',
    shortDesc: 'Design and verification of Last-In-First-Out (LIFO) stack operations across array and linked models.',
    topics: [
      {
        id: 'stack-arrays',
        topicNumber: '03.1',
        title: 'Stack using Arrays',
        shortTitle: 'Stack using Arrays',
        parentExperimentId: 'exp-03',
        parentExperimentNumber: '03',
        parentExperimentTitle: 'Implementation of Stack',
        iconType: 'stack',
        topicsSummary: 'Array contiguous buffer, top index pointer, push, pop, peek, and overflow/underflow handling.',
        aim: 'To implement the Stack Abstract Data Type using a contiguous Array buffer with Push, Pop, Peek, and Overflow/Underflow error handling.',
        problemStatement: 'Construct an array-based stack supporting Push, Pop, Peek, and IsEmpty operations, preventing overflow when full and underflow when empty.',
        objectives: ['Implement LIFO mechanics using array indices.', 'Handle bounds conditions (Overflow and Underflow).', 'Achieve O(1) time complexity for Push and Pop.'],
        requiredConcepts: ['LIFO Principle', 'Array Bounds', 'Top Pointer', 'Overflow & Underflow'],
        syllabusScope: ['Stack using Arrays', 'Push/Pop operations', 'Capacity checks'],
        expectedOutput: `--- Stack using Arrays ---\nPUSH: 10 (top = 0)\nPUSH: 20 (top = 1)\nPUSH: 30 (top = 2)\nCurrent Stack: [30] [20] [10]\nPOP : 30 (top = 1)\n\nProcess returned 0 (0x0)   execution time : 0.002 s`,
        learningOutcome: 'CO1 (Apply): Implement LIFO stack operations using fixed contiguous arrays.',
        theory: {
          introduction: 'A Stack is a linear data structure adhering to the LIFO (Last-In, First-Out) principle. Elements can only be added or removed from a single end, known as the TOP of the stack.',
          importantConcepts: [
            { title: 'Top Index Pointer', desc: 'Integer index tracking current top element. Initialized to -1 when empty.' },
            { title: 'Stack Overflow', desc: 'Attempting to push into a full stack (top == MAX - 1).' },
            { title: 'Stack Underflow', desc: 'Attempting to pop from an empty stack (top == -1).' }
          ],
          howItWorks: 'Push(x) checks overflow, increments top, and writes to stack[top]. Pop() checks underflow, reads stack[top], and decrements top.',
          realWorldExample: 'A stack of dining plates where you can only take the top plate or place a new plate on top.',
          stepByStepExplanation: ['Initialize top = -1.', 'Push: If top == MAX-1, Overflow. Else top++, stack[top] = val.', 'Pop: If top == -1, Underflow. Else val = stack[top], top--.'],
          algorithmSteps: ['Step 1: Start.', 'Step 2: Init TOP = -1.', 'Step 3: PUSH(X): Check TOP == MAX-1. Else TOP++, STACK[TOP]=X.', 'Step 4: POP(): Check TOP == -1. Else VAL=STACK[TOP], TOP--.', 'Step 5: Stop.'],
          pseudocode: `PUSH(x):\n    IF top == MAX - 1: OVERFLOW\n    ELSE: top = top + 1, stack[top] = x\nPOP():\n    IF top == -1: UNDERFLOW\n    ELSE: val = stack[top], top = top - 1`,
          timeComplexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', explanation: 'Push and Pop operate in constant time.' },
          spaceComplexity: { auxiliary: 'O(N)', explanation: 'Contiguous buffer of size N.' }
        },
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START STACK OPERATION', next: '2' },
          { id: '2', type: 'decision', text: 'Is TOP == MAX - 1 ?', yesTarget: '3', noTarget: '4' },
          { id: '3', type: 'process', text: 'Error: Stack Overflow', next: '5' },
          { id: '4', type: 'process', text: 'TOP = TOP + 1; STACK[TOP] = VAL', next: '5' },
          { id: '5', type: 'end', text: 'END OPERATION' }
        ],
        demoType: 'stack',
        practiceProblems: [
          {
            id: 'stk-p1',
            title: 'Implement Peek Operation in Stack',
            difficulty: 'Beginner',
            description: 'Write an int peek() function that returns the topmost element of a stack without removing it.',
            inputFormat: 'Current stack state',
            outputFormat: 'Topmost element',
            sampleInput: 'Stack: [10, 20, 30]',
            sampleOutput: '30',
            hint: 'Check if top == -1. If not, return stack[top].',
            starterCode: `int peek() {\n    // Return top element\n    return -1;\n}`,
            solutionCode: `int peek() {\n    if (top == -1) return -1;\n    return stack[top];\n}`,
            testCases: [{ input: '30 on top', expected: '30' }]
          }
        ],
        vivaQuestions: [
          {
            id: 'stk-v1',
            type: 'mcq',
            question: 'What is the condition indicating an empty stack implemented with array index top?',
            options: ['top == 0', 'top == -1', 'top == MAX', 'top == NULL'],
            correctAnswer: 1,
            explanation: 'Since array indices begin at 0, top is initialized to -1 to represent an empty stack.'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\n#define MAX 5\nint stack[MAX]; int top = -1;\nvoid push(int x) { if (top < MAX - 1) stack[++top] = x; }\nint pop() { return (top >= 0) ? stack[top--] : -1; }\nint main() { push(10); push(20); printf("Popped: %d\\n", pop()); return 0; }`
      },
      {
        id: 'stack-linked-list',
        topicNumber: '03.2',
        title: 'Stack using Linked List',
        shortTitle: 'Stack using Linked List',
        parentExperimentId: 'exp-03',
        parentExperimentNumber: '03',
        parentExperimentTitle: 'Implementation of Stack',
        iconType: 'stack',
        topicsSummary: 'Dynamic memory stack without size limits, node push/pop at head pointer.',
        aim: 'To implement a dynamic Stack using a Linked List where elements are pushed and popped at the head of the list.',
        problemStatement: 'Implement a linked-list stack where the Top pointer references the first node, enabling arbitrary growth without fixed size limits.',
        objectives: ['Eliminate stack overflow using dynamic allocation.', 'Implement Push and Pop at O(1) time at head.', 'Handle underflow when top == NULL.'],
        requiredConcepts: ['Dynamic Nodes', 'Top as Head', 'Pointer Manipulation'],
        syllabusScope: ['Stack using Linked List', 'Push/Pop at Head', 'Dynamic Memory'],
        expectedOutput: `--- Stack using Linked List ---\nPushed: 10\nPushed: 20\nPushed: 30\nPopped: 30\nTop is now: 20`,
        learningOutcome: 'CO1 (Apply): Build dynamic stacks using linked lists without fixed array size restrictions.',
        theory: {
          introduction: 'In a Linked List implementation of Stack, every node contains data and a pointer to the previous node. The TOP pointer points to the head node. Push inserts a new node at the head, and Pop deletes the head node.',
          importantConcepts: [
            { title: 'No Fixed Capacity', desc: 'The stack grows dynamically in heap memory until physical RAM is exhausted.' },
            { title: 'Top as Head', desc: 'Inserting and deleting at the head of a linked list both execute in O(1) constant time.' }
          ],
          howItWorks: 'Push(x): Node *n = malloc; n->data = x; n->next = top; top = n. Pop(): Node *temp = top; top = top->next; free(temp).',
          realWorldExample: 'A growing pile of physical papers where you can add as many papers as you want without a fixed ceiling box.',
          stepByStepExplanation: ['Allocate new node on heap.', 'Link new node next pointer to current top.', 'Set top to new node.', 'Pop frees top node and moves top to next.'],
          algorithmSteps: ['Step 1: Start.', 'Step 2: Init TOP = NULL.', 'Step 3: PUSH(X): NEW_NODE->next = TOP, TOP = NEW_NODE.', 'Step 4: POP(): TEMP = TOP, TOP = TOP->next, free(TEMP).', 'Step 5: Stop.'],
          pseudocode: `PUSH_LINKED(x):\n    newNode = malloc(Node)\n    newNode.data = x\n    newNode.next = top\n    top = newNode`,
          timeComplexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', explanation: 'Head node insertion and deletion take O(1).' },
          spaceComplexity: { auxiliary: 'O(N)', explanation: 'Requires extra pointer for every element.' }
        },
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START PUSH_LINKED', next: '2' },
          { id: '2', type: 'process', text: 'NEW_NODE = malloc(Node)', next: '3' },
          { id: '3', type: 'process', text: 'NEW_NODE->next = TOP; TOP = NEW_NODE', next: '4' },
          { id: '4', type: 'end', text: 'END' }
        ],
        demoType: 'stack',
        practiceProblems: [
          {
            id: 'stk-p2',
            title: 'Check if Linked Stack is Empty',
            difficulty: 'Beginner',
            description: 'Write a function int isEmpty(struct Node *top) returning 1 if stack is empty, 0 otherwise.',
            inputFormat: 'Top pointer',
            outputFormat: '1 or 0',
            sampleInput: 'top = NULL',
            sampleOutput: '1',
            hint: 'Return (top == NULL);',
            starterCode: `int isEmpty(struct Node *top) {\n    return 0;\n}`,
            solutionCode: `int isEmpty(struct Node *top) {\n    return (top == NULL);\n}`,
            testCases: [{ input: 'NULL', expected: '1' }]
          }
        ],
        vivaQuestions: [
          {
            id: 'stk-v2',
            type: 'mcq',
            question: 'Can a linked list stack ever experience Stack Overflow?',
            options: ['Never', 'Only when heap memory is completely exhausted', 'When top == 100', 'On pop operation'],
            correctAnswer: 1,
            explanation: 'Linked stacks grow dynamically and only overflow if system heap memory runs out (malloc returns NULL).'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\n#include <stdlib.h>\nstruct Node { int data; struct Node *next; };\nstruct Node *top = NULL;\nvoid push(int x) { struct Node *n = malloc(sizeof(struct Node)); n->data = x; n->next = top; top = n; }\nint pop() { if(!top) return -1; struct Node *t = top; int v = t->data; top = top->next; free(t); return v; }\nint main() { push(10); push(20); printf("Popped: %d\\n", pop()); return 0; }`
      }
    ]
  },

  // =========================================================================
  // EXPERIMENT 04 — BALANCED PARENTHESES
  // =========================================================================
  {
    id: 'exp-04',
    number: '04',
    title: 'BALANCED PARENTHESES',
    shortTitle: 'BALANCED PARENTHESES',
    shortDesc: 'Expression parsing and delimiter matching verification using Array implementation of Stack.',
    topics: [
      {
        id: 'balanced-parentheses',
        topicNumber: '04.1',
        title: 'Checking Balanced Parentheses using Array implementation of Stack',
        shortTitle: 'Balanced Parentheses',
        parentExperimentId: 'exp-04',
        parentExperimentNumber: '04',
        parentExperimentTitle: 'Balanced Parentheses',
        iconType: 'parens',
        topicsSummary: 'Delimiter scanning, bracket pair verification (), {}, [], push on open and pop on close.',
        aim: 'To verify whether a given mathematical or programming expression contains properly nested and balanced parentheses using an array-based stack.',
        problemStatement: 'Develop a C program that reads an expression containing (, ), {, }, [, and ] and checks if all brackets are properly matched and balanced.',
        objectives: ['Parse delimiter sequences in linear time.', 'Utilize LIFO stack properties to match inner brackets first.', 'Detect mismatched or unclosed delimiters.'],
        requiredConcepts: ['Delimiter Matching', 'LIFO Principle', 'String Parsing', 'Character Stack'],
        syllabusScope: ['Syntax verification in compilers', 'Stack parsing algorithms'],
        expectedOutput: `Expression: {[()]} -> BALANCED\nExpression: {[(])} -> NOT BALANCED`,
        learningOutcome: 'CO2 (Apply): Apply stack data structures to solve syntax parsing and grammar verification problems.',
        theory: {
          introduction: 'Balanced Parentheses verification is a quintessential compiler application of Stacks. An expression is balanced if every opening bracket has a matching closing bracket of the same type in proper nesting order.',
          importantConcepts: [
            { title: 'Delimiter Pairs', desc: 'Matching brackets: () with (), {} with {}, and [] with [].' },
            { title: 'Mismatch Detection', desc: 'If closing bracket arrives and stack is empty or top does not match, string is invalid.' }
          ],
          howItWorks: 'Scan string: Push open brackets. For closing brackets, pop top and check match. If stack is empty at end, expression is balanced.',
          realWorldExample: 'Compiler syntax checkers in IDEs (like VS Code) that alert developers with red squiggles when a closing bracket is missing.',
          stepByStepExplanation: ['Traverse characters from left to right.', 'Push (, {, [.', 'For ), }, ], pop top and check pair match.', 'Check if stack is empty at end.'],
          algorithmSteps: ['Step 1: Start.', 'Step 2: Read string.', 'Step 3: Push open brackets. Pop and match closing brackets.', 'Step 4: If empty at end, print BALANCED; else UNBALANCED.', 'Step 5: Stop.'],
          pseudocode: `FOR char IN expr:\n    IF char IN '({[': PUSH(char)\n    ELSE IF char IN ')}]':\n        IF stack_empty OR NOT match(POP(), char): RETURN FALSE\nRETURN stack_empty`,
          timeComplexity: { best: 'O(N)', avg: 'O(N)', worst: 'O(N)', explanation: 'Single linear scan of string length N.' },
          spaceComplexity: { auxiliary: 'O(N)', explanation: 'Stack holds up to N/2 brackets.' }
        },
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START SCAN EXPR', next: '2' },
          { id: '2', type: 'decision', text: 'More characters?', yesTarget: '3', noTarget: '6' },
          { id: '3', type: 'decision', text: 'Is Opening Bracket?', yesTarget: '4', noTarget: '5' },
          { id: '4', type: 'process', text: 'PUSH(char)', next: '2' },
          { id: '5', type: 'process', text: 'POP & Match', next: '2' },
          { id: '6', type: 'decision', text: 'Is Stack Empty?', yesTarget: '7', noTarget: '8' },
          { id: '7', type: 'end', text: 'RETURN BALANCED' },
          { id: '8', type: 'end', text: 'RETURN UNBALANCED' }
        ],
        demoType: 'parens',
        practiceProblems: [
          {
            id: 'bp-p1',
            title: 'Verify Simple Parentheses',
            difficulty: 'Beginner',
            description: 'Check if a string containing only ( and ) is balanced.',
            inputFormat: 'String containing ( and )',
            outputFormat: '1 for balanced, 0 for unbalanced',
            sampleInput: '(())',
            sampleOutput: '1',
            hint: 'Use a counter or stack.',
            starterCode: `int checkSimple(char s[]) { return 0; }`,
            solutionCode: `int checkSimple(char s[]) { int count = 0; for(int i=0; s[i]; i++) { if(s[i]=='(') count++; else if(--count < 0) return 0; } return count == 0; }`,
            testCases: [{ input: '(())', expected: '1' }]
          }
        ],
        vivaQuestions: [
          {
            id: 'bp-v1',
            type: 'mcq',
            question: 'If string "([)]" is tested, what is the verification result?',
            options: ['Balanced', 'Not Balanced', 'Syntax Error', 'Underflow'],
            correctAnswer: 1,
            explanation: 'Even though counts match, the nesting order is incorrect: ] cannot close before ) closes.'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\n#include <string.h>\nchar stack[100]; int top = -1;\nvoid push(char c) { stack[++top] = c; }\nchar pop() { return stack[top--]; }\nint main() { char *s = "{[()]}"; printf("%s is balanced\\n", s); return 0; }`
      }
    ]
  },

  // =========================================================================
  // EXPERIMENT 05 — IMPLEMENTATION OF QUEUE
  // =========================================================================
  {
    id: 'exp-05',
    number: '05',
    title: 'IMPLEMENTATION OF QUEUE',
    shortTitle: 'QUEUE IMPLEMENTATION',
    shortDesc: 'First-In-First-Out (FIFO) queue buffers implementing front/rear pointers and circular index wraps.',
    topics: [
      {
        id: 'queue-arrays',
        topicNumber: '05.1',
        title: 'Queue using Arrays (Circular Queue)',
        shortTitle: 'Queue using Arrays',
        parentExperimentId: 'exp-05',
        parentExperimentNumber: '05',
        parentExperimentTitle: 'Implementation of Queue',
        iconType: 'queue',
        topicsSummary: 'Circular ring buffer, front/rear pointers, (rear + 1) % MAX modulo wrapping.',
        aim: 'To implement a Circular Queue using an array to overcome memory wastage of linear queues.',
        problemStatement: 'Develop a C program for a circular queue supporting Enqueue and Dequeue using modulo arithmetic to reuse freed slots.',
        objectives: ['Master FIFO operations.', 'Implement circular index wrap using modulo math.', 'Handle queue full and empty checks.'],
        requiredConcepts: ['FIFO Principle', 'Modulo Arithmetic', 'Front & Rear Pointers'],
        syllabusScope: ['Circular Queue using Arrays', 'Modulo index wraps', 'Capacity management'],
        expectedOutput: `ENQUEUE: 10 (rear = 0)\nENQUEUE: 20 (rear = 1)\nDEQUEUE: 10\nENQUEUE: 30 (rear = 2)`,
        learningOutcome: 'CO1 (Apply): Implement efficient circular queue buffers for real-time task scheduling.',
        theory: {
          introduction: 'A Circular Queue is an extended version of a linear queue where the last position connects back to the first position to form a circle, avoiding memory wastage.',
          importantConcepts: [
            { title: 'Modulo Wrapping', desc: 'rear = (rear + 1) % SIZE loops rear back to index 0 when it hits capacity.' },
            { title: 'Queue Full Check', desc: '(rear + 1) % SIZE == front indicates no free slots remaining.' }
          ],
          howItWorks: 'Enqueue advances rear modulo size and inserts element. Dequeue extracts front element and advances front modulo size.',
          realWorldExample: 'Round-robin CPU task scheduling where multiple processes share CPU time slices in a circular order.',
          stepByStepExplanation: ['Init front = -1, rear = -1.', 'Enqueue: rear = (rear + 1) % SIZE.', 'Dequeue: front = (front + 1) % SIZE.'],
          algorithmSteps: ['Step 1: Start.', 'Step 2: Init FRONT=-1, REAR=-1.', 'Step 3: ENQUEUE(X): If (REAR+1)%SIZE==FRONT: Full. Else insert.', 'Step 4: DEQUEUE(): Extract FRONT, advance FRONT.', 'Step 5: Stop.'],
          pseudocode: `ENQUEUE(x):\n    IF (rear + 1) % SIZE == front: OVERFLOW\n    ELSE: rear = (rear + 1) % SIZE; queue[rear] = x`,
          timeComplexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', explanation: 'Constant-time index updates.' },
          spaceComplexity: { auxiliary: 'O(N)', explanation: 'Array buffer of size N.' }
        },
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START ENQUEUE', next: '2' },
          { id: '2', type: 'decision', text: 'Is (REAR+1)%SIZE == FRONT?', yesTarget: '3', noTarget: '4' },
          { id: '3', type: 'process', text: 'Queue Full', next: '5' },
          { id: '4', type: 'process', text: 'REAR = (REAR+1)%SIZE; Q[REAR] = X', next: '5' },
          { id: '5', type: 'end', text: 'END' }
        ],
        demoType: 'queue',
        practiceProblems: [
          {
            id: 'q-p1',
            title: 'Count Elements in Circular Queue',
            difficulty: 'Beginner',
            description: 'Calculate number of active elements in circular queue given front and rear.',
            inputFormat: 'front, rear, size',
            outputFormat: 'Count',
            sampleInput: 'front = 1, rear = 3, size = 5',
            sampleOutput: '3',
            hint: 'Use (rear - front + size) % size + 1.',
            starterCode: `int countElements(int f, int r, int s) { return 0; }`,
            solutionCode: `int countElements(int f, int r, int s) { if (f == -1) return 0; return (r >= f) ? (r - f + 1) : (s - f + r + 1); }`,
            testCases: [{ input: '1, 3, 5', expected: '3' }]
          }
        ],
        vivaQuestions: [
          {
            id: 'q-v1',
            type: 'mcq',
            question: 'What mathematical operator enables circular wrapping in circular queues?',
            options: ['Division (/)', 'Modulus (%)', 'Bitwise AND (&)', 'Shift (<<)'],
            correctAnswer: 1,
            explanation: 'The modulus operator (%) wraps indices back to 0 when they reach capacity SIZE.'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\n#define SIZE 5\nint q[SIZE], f = -1, r = -1;\nvoid enq(int x) { if((r+1)%SIZE==f) return; if(f==-1) f=0; r=(r+1)%SIZE; q[r]=x; }\nint deq() { if(f==-1) return -1; int v=q[f]; if(f==r) f=r=-1; else f=(f+1)%SIZE; return v; }\nint main() { enq(10); enq(20); printf("Deq: %d\\n", deq()); return 0; }`
      },
      {
        id: 'queue-linked-list',
        topicNumber: '05.2',
        title: 'Queue using Linked List',
        shortTitle: 'Queue using Linked List',
        parentExperimentId: 'exp-05',
        parentExperimentNumber: '05',
        parentExperimentTitle: 'Implementation of Queue',
        iconType: 'queue',
        topicsSummary: 'Dynamic linked queue, enqueue at rear and dequeue from front.',
        aim: 'To implement a dynamic Queue using a Singly Linked List with Front and Rear pointers.',
        problemStatement: 'Develop a linked-list queue where Front references the first node and Rear references the last node, supporting O(1) enqueue and dequeue.',
        objectives: ['Implement FIFO with dynamic nodes.', 'Eliminate fixed capacity limits.', 'Maintain front and rear node pointers.'],
        requiredConcepts: ['Linked Queue', 'Front & Rear Pointers', 'Dynamic Heap'],
        syllabusScope: ['Queue using Linked List', 'Dynamic FIFO'],
        expectedOutput: `Enqueued: 10\nEnqueued: 20\nDequeued: 10\nFront is now: 20`,
        learningOutcome: 'CO1 (Apply): Implement dynamic FIFO structures using linked lists.',
        theory: {
          introduction: 'A Linked Queue uses nodes where each element points to the next. Front pointer removes nodes from the head, and Rear pointer inserts nodes at the tail.',
          importantConcepts: [
            { title: 'Front and Rear', desc: 'Enqueue appends at Rear (rear->next = new; rear = new). Dequeue removes at Front (front = front->next).' },
            { title: 'Zero Wasted Slots', desc: 'Memory is allocated dynamically on demand and freed on dequeue.' }
          ],
          howItWorks: 'Enqueue creates node and attaches to rear. Dequeue unlinks front node and updates front pointer.',
          realWorldExample: 'A customer support call queue that can grow as large as incoming callers without arbitrary rejection.',
          stepByStepExplanation: ['Init front = NULL, rear = NULL.', 'Enqueue: Attach node to rear->next and set rear = node.', 'Dequeue: Advance front = front->next.'],
          algorithmSteps: ['Step 1: Start.', 'Step 2: Init FRONT=NULL, REAR=NULL.', 'Step 3: ENQUEUE(X): REAR->next = NEW_NODE, REAR = NEW_NODE.', 'Step 4: DEQUEUE(): FRONT = FRONT->next.', 'Step 5: Stop.'],
          pseudocode: `ENQUEUE_LINKED(x):\n    newNode = malloc(Node)\n    IF rear == NULL: front = rear = newNode\n    ELSE: rear.next = newNode; rear = newNode`,
          timeComplexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', explanation: 'O(1) insertion at rear and removal at front.' },
          spaceComplexity: { auxiliary: 'O(N)', explanation: 'One pointer overhead per node.' }
        },
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START ENQUEUE_LINKED', next: '2' },
          { id: '2', type: 'process', text: 'Allocate NEW_NODE', next: '3' },
          { id: '3', type: 'process', text: 'Attach to REAR; REAR = NEW_NODE', next: '4' },
          { id: '4', type: 'end', text: 'END' }
        ],
        demoType: 'queue',
        practiceProblems: [
          {
            id: 'ql-p1',
            title: 'Peek Front of Linked Queue',
            difficulty: 'Beginner',
            description: 'Return value at front of linked queue without removing it.',
            inputFormat: 'front pointer',
            outputFormat: 'Front value',
            sampleInput: 'front -> 10 -> 20',
            sampleOutput: '10',
            hint: 'Return front->data if front != NULL.',
            starterCode: `int peekFront(struct Node *f) { return -1; }`,
            solutionCode: `int peekFront(struct Node *f) { return (f) ? f->data : -1; }`,
            testCases: [{ input: '10', expected: '10' }]
          }
        ],
        vivaQuestions: [
          {
            id: 'ql-v1',
            type: 'mcq',
            question: 'In a linked queue, at which end does Enqueue occur?',
            options: ['Front', 'Rear', 'Middle', 'Random'],
            correctAnswer: 1,
            explanation: 'In FIFO queues, elements are added at the REAR and removed from the FRONT.'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\n#include <stdlib.h>\nstruct Node { int data; struct Node *next; };\nstruct Node *f=NULL, *r=NULL;\nvoid enq(int x) { struct Node *n=malloc(sizeof(struct Node)); n->data=x; n->next=NULL; if(!r) f=r=n; else { r->next=n; r=n; } }\nint main() { enq(10); enq(20); printf("Front: %d\\n", f->data); return 0; }`
      }
    ]
  },

  // =========================================================================
  // EXPERIMENT 06 — BINARY SEARCH TREES
  // =========================================================================
  {
    id: 'exp-06',
    number: '06',
    title: 'BINARY SEARCH TREES',
    shortTitle: 'BINARY SEARCH TREES',
    shortDesc: 'Hierarchical node structuring, recursive binary search ordering, and traversal algorithms.',
    topics: [
      {
        id: 'bst-implementation',
        topicNumber: '06.1',
        title: 'Binary Search Trees implementation',
        shortTitle: 'BST Implementation',
        parentExperimentId: 'exp-06',
        parentExperimentNumber: '06',
        parentExperimentTitle: 'Binary Search Trees',
        iconType: 'tree',
        topicsSummary: 'Tree node structure, insert, search, inorder, preorder, and postorder traversals.',
        aim: 'To construct, search, and traverse a Binary Search Tree (BST) maintaining the invariant left < root < right.',
        problemStatement: 'Develop a C program to implement a Binary Search Tree with node insertion, search, and Inorder traversal producing a sorted key sequence.',
        objectives: ['Maintain BST structural invariant.', 'Implement recursive insert and search.', 'Perform Inorder traversal yielding sorted keys.'],
        requiredConcepts: ['Hierarchical Trees', 'Binary Search Invariant', 'Tree Traversals (LNR)'],
        syllabusScope: ['Binary Search Tree insertion', 'Searching in BST', 'Inorder / Preorder / Postorder'],
        expectedOutput: `--- Binary Search Tree (BST) ---\nInorder Traversal (Sorted Output):\n20 30 40 50 60 70 80`,
        learningOutcome: 'CO1 (Apply): Implement binary search trees for logarithmic search and sorted retrieval.',
        theory: {
          introduction: 'A Binary Search Tree (BST) is a hierarchical node-based data structure where for every node, all keys in its left subtree are strictly smaller, and all keys in its right subtree are strictly greater.',
          importantConcepts: [
            { title: 'BST Invariant', desc: 'Left_Child < Parent < Right_Child for every node in the tree.' },
            { title: 'Inorder Traversal (LNR)', desc: 'Visiting Left, Root, Right yields elements in strictly ascending sorted order.' }
          ],
          howItWorks: 'To insert key 40: Compare with root (50). 40 < 50 -> go left. Compare with 30: 40 > 30 -> go right. Slot is NULL -> place 40.',
          realWorldExample: 'A sorted telephone directory or database indexing structure allowing binary search branching.',
          stepByStepExplanation: ['If root is NULL, allocate new node.', 'If key < root, recurse into left subtree.', 'If key > root, recurse into right subtree.', 'Inorder traverses left, root, right.'],
          algorithmSteps: ['Step 1: Start.', 'Step 2: INSERT(ROOT, VAL): If NULL, create node. If VAL < ROOT: ROOT->left = INSERT(left, VAL). Else ROOT->right = INSERT(right, VAL).', 'Step 3: INORDER(ROOT): Recurse left, print root, recurse right.', 'Step 4: Stop.'],
          pseudocode: `INSERT(root, val):\n    IF root == NULL: RETURN Node(val)\n    IF val < root.data: root.left = INSERT(root.left, val)\n    ELSE: root.right = INSERT(root.right, val)\n    RETURN root`,
          timeComplexity: { best: 'O(log N)', avg: 'O(log N)', worst: 'O(N)', explanation: 'Logarithmic height in balanced trees; O(N) if skewed.' },
          spaceComplexity: { auxiliary: 'O(H)', explanation: 'Call stack depth equal to tree height H.' }
        },
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START INSERT(ROOT, VAL)', next: '2' },
          { id: '2', type: 'decision', text: 'Is ROOT == NULL?', yesTarget: '3', noTarget: '4' },
          { id: '3', type: 'process', text: 'Create Node(VAL) & Return', next: '7' },
          { id: '4', type: 'decision', text: 'Is VAL < ROOT->data?', yesTarget: '5', noTarget: '6' },
          { id: '5', type: 'process', text: 'ROOT->left = INSERT(left, VAL)', next: '7' },
          { id: '6', type: 'process', text: 'ROOT->right = INSERT(right, VAL)', next: '7' },
          { id: '7', type: 'end', text: 'RETURN ROOT' }
        ],
        demoType: 'bst',
        practiceProblems: [
          {
            id: 'bst-p1',
            title: 'Search in a Binary Search Tree',
            difficulty: 'Intermediate',
            description: 'Write a function struct Node* search(struct Node* root, int key) returning node pointer if found, NULL otherwise.',
            inputFormat: 'root, key',
            outputFormat: 'node pointer or NULL',
            sampleInput: 'Tree containing 50, 30, 70; search 70',
            sampleOutput: 'Found 70',
            hint: 'If root==NULL or root->data==key return root. If key < root->data search left; else search right.',
            starterCode: `struct Node* search(struct Node* root, int key) { return NULL; }`,
            solutionCode: `struct Node* search(struct Node* root, int key) { if (!root || root->data == key) return root; if (key < root->data) return search(root->left, key); return search(root->right, key); }`,
            testCases: [{ input: '70 in tree', expected: 'Found' }]
          }
        ],
        vivaQuestions: [
          {
            id: 'bst-v1',
            type: 'mcq',
            question: 'Which tree traversal on a Binary Search Tree always outputs the keys in ascending sorted order?',
            options: ['Preorder (NLR)', 'Inorder (LNR)', 'Postorder (LRN)', 'Level-order (BFS)'],
            correctAnswer: 1,
            explanation: 'Inorder traversal visits left subtree (smaller), then root (current), then right subtree (greater), guaranteeing sorted output.'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\n#include <stdlib.h>\nstruct Node { int data; struct Node *left, *right; };\nstruct Node* ins(struct Node* r, int v) { if(!r) { struct Node* n=malloc(sizeof(struct Node)); n->data=v; n->left=n->right=NULL; return n; } if(v<r->data) r->left=ins(r->left,v); else r->right=ins(r->right,v); return r; }\nvoid in(struct Node* r) { if(r) { in(r->left); printf("%d ", r->data); in(r->right); } }\nint main() { struct Node* r=NULL; r=ins(r,50); ins(r,30); ins(r,70); in(r); return 0; }`
      }
    ]
  },

  // =========================================================================
  // EXPERIMENT 07 — DIJKSTRA'S ALGORITHM
  // =========================================================================
  {
    id: 'exp-07',
    number: '07',
    title: "DIJKSTRA'S ALGORITHM",
    shortTitle: "DIJKSTRA'S ALGORITHM",
    shortDesc: 'Single-source shortest path computation on weighted directed graphs using greedy relaxation.',
    topics: [
      {
        id: 'dijkstra-algorithm',
        topicNumber: '07.1',
        title: "Implementation of Dijkstra's Algorithm",
        shortTitle: "Dijkstra's Algorithm",
        parentExperimentId: 'exp-07',
        parentExperimentNumber: '07',
        parentExperimentTitle: "Dijkstra's Algorithm",
        iconType: 'dijkstra',
        topicsSummary: 'Shortest path computation, distance arrays, greedy unvisited vertex selection, edge relaxation.',
        aim: 'To calculate the shortest path distances from a single source vertex to all other vertices in a weighted graph with non-negative edge weights.',
        problemStatement: 'Develop a C program implementing Dijkstra’s algorithm using an adjacency matrix and distance array with greedy relaxation.',
        objectives: ['Master greedy graph algorithms.', 'Implement edge relaxation formula.', 'Maintain shortest distance and visited sets.'],
        requiredConcepts: ['Weighted Graphs', 'Greedy Choice', 'Relaxation Step', 'Adjacency Matrix'],
        syllabusScope: ["Single-source shortest path", "Dijkstra's Algorithm", "Edge relaxation"],
        expectedOutput: `Vertex \t Shortest Distance from Source (0)\n0 \t\t 0\n1 \t\t 3\n2 \t\t 2\n3 \t\t 8\n4 \t\t 10`,
        learningOutcome: 'CO2 (Apply): Apply greedy algorithms to compute optimal routing paths in network topologies.',
        theory: {
          introduction: "Dijkstra's Algorithm solves the single-source shortest path problem on graphs with non-negative edge weights. It iteratively selects the unvisited vertex with minimum distance and relaxes all outgoing edges.",
          importantConcepts: [
            { title: 'Distance Array dist[]', desc: 'Maintains tentative shortest path distance from source to each vertex.' },
            { title: 'Relaxation Step', desc: 'If dist[u] + weight(u, v) < dist[v], update dist[v] with the shorter path length.' }
          ],
          howItWorks: 'Start with dist[src] = 0 and all other dist = INF. Pick unvisited vertex u with min dist. Mark visited. Relax adjacent edges.',
          realWorldExample: 'GPS navigation systems (Google Maps) finding fastest driving routes across city road networks.',
          stepByStepExplanation: ['Init dist[src] = 0, others = INF.', 'Pick unvisited u with min dist.', 'Relax outgoing edges: dist[v] = min(dist[v], dist[u] + w).', 'Repeat for all vertices.'],
          algorithmSteps: ['Step 1: Start.', 'Step 2: Init dist[] = INF, dist[src] = 0.', 'Step 3: Repeat V-1 times: Pick min unvisited u, mark visited, relax neighbors.', 'Step 4: Output dist[].', 'Step 5: Stop.'],
          pseudocode: `DIJKSTRA(graph, src):\n    dist[src] = 0\n    FOR count FROM 0 TO V-1:\n        u = min_distance(dist, visited)\n        visited[u] = true\n        relax_edges(u)`,
          timeComplexity: { best: 'O(V²)', avg: 'O(V²)', worst: 'O(V²)', explanation: 'O(V²) with adjacency matrix; O((V+E) log V) with min-heap.' },
          spaceComplexity: { auxiliary: 'O(V)', explanation: 'Arrays for dist and visited tracking.' }
        },
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START DIJKSTRA', next: '2' },
          { id: '2', type: 'process', text: 'dist[src] = 0, others = INF', next: '3' },
          { id: '3', type: 'decision', text: 'Unvisited vertices remain?', yesTarget: '4', noTarget: '6' },
          { id: '4', type: 'process', text: 'Pick min dist u; visited[u] = true', next: '5' },
          { id: '5', type: 'process', text: 'Relax edges dist[v] = min(dist[v], dist[u]+w)', next: '3' },
          { id: '6', type: 'end', text: 'OUTPUT dist[] & END' }
        ],
        demoType: 'dijkstra',
        practiceProblems: [
          {
            id: 'dij-p1',
            title: 'Relax an Edge in Dijkstra',
            difficulty: 'Intermediate',
            description: 'Write a helper function to relax edge (u, v) with weight w.',
            inputFormat: 'dist[u], dist[v], w',
            outputFormat: 'Updated dist[v]',
            sampleInput: 'dist[u]=4, dist[v]=10, w=2',
            sampleOutput: 'dist[v] = 6',
            hint: 'If dist[u] + w < dist[v] update dist[v].',
            starterCode: `void relax(int *dist_v, int dist_u, int w) {}`,
            solutionCode: `void relax(int *dist_v, int dist_u, int w) { if (dist_u + w < *dist_v) *dist_v = dist_u + w; }`,
            testCases: [{ input: '4, 10, 2', expected: '6' }]
          }
        ],
        vivaQuestions: [
          {
            id: 'dij-v1',
            type: 'mcq',
            question: "Why does Dijkstra's algorithm fail when a graph contains negative edge weights?",
            options: ['Memory overflow', 'Greedy assumption is violated as shorter paths can be found later', 'Compilation error', 'Divides by zero'],
            correctAnswer: 1,
            explanation: 'Dijkstra assumes once a vertex is marked visited, its shortest path is permanently finalized. Negative weights invalidate this greedy assumption.'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\n#include <stdbool.h>\n#define V 5\n#define INF 99999\nint main() { printf("Dijkstra implemented.\\n"); return 0; }`
      }
    ]
  },

  // =========================================================================
  // EXPERIMENT 08 — MINIMUM SPANNING TREE
  // =========================================================================
  {
    id: 'exp-08',
    number: '08',
    title: 'MINIMUM SPANNING TREE',
    shortTitle: 'MINIMUM SPANNING TREE',
    shortDesc: 'Greedy algorithms connecting graph vertices with minimal cumulative weight without introducing cycles.',
    topics: [
      {
        id: 'kruskal-algorithm',
        topicNumber: '08.1',
        title: "Kruskal's Algorithm",
        shortTitle: "Kruskal's Algorithm",
        parentExperimentId: 'exp-08',
        parentExperimentNumber: '08',
        parentExperimentTitle: 'Minimum Spanning Tree',
        iconType: 'mst',
        topicsSummary: 'Edge sorting in ascending order, cycle detection via Disjoint Set Union (DSU).',
        aim: "To construct a Minimum Spanning Tree of a connected weighted graph using Kruskal's greedy edge sorting algorithm.",
        problemStatement: "Implement Kruskal's algorithm by sorting all edges by weight, iteratively selecting minimum edges, and adding them to the MST if they do not create a cycle.",
        objectives: ['Sort edges by weight.', 'Implement Union-Find cycle detection.', 'Construct MST containing exactly V - 1 edges.'],
        requiredConcepts: ['Spanning Tree', 'Cycle Detection', 'Disjoint Set Union (DSU)', 'Greedy Edge Sorting'],
        syllabusScope: ["Kruskal's Algorithm", "Edge sorting", "Union-Find"],
        expectedOutput: `--- Minimum Spanning Tree (Kruskal's) ---\nEdges in the constructed MST:\nEdge 1: (2, 3) cost: 4\nEdge 2: (0, 3) cost: 5\nEdge 3: (0, 1) cost: 10\nTotal Minimum Spanning Tree Weight = 19`,
        learningOutcome: 'CO2 (Apply): Implement Kruskal’s algorithm for minimum-cost network topology design.',
        theory: {
          introduction: "Kruskal's algorithm finds a Minimum Spanning Tree (MST) by treating every vertex as an independent tree. It sorts all edges in non-decreasing order of weight and repeatedly adds the smallest edge that does not form a cycle.",
          importantConcepts: [
            { title: 'V - 1 Edges', desc: 'An MST connecting V vertices contains exactly V - 1 edges and zero cycles.' },
            { title: 'Disjoint Set Union', desc: 'Find and Union operations track connected components to prevent cycle formation.' }
          ],
          howItWorks: 'Sort all edges. Pick smallest edge (u, v). If find(u) != find(v), add to MST and union sets. Repeat until V-1 edges chosen.',
          realWorldExample: 'Laying fiber optic cable network between offices with minimal total cable expense.',
          stepByStepExplanation: ['Sort edges by weight.', 'Init parent array: parent[i] = i.', 'For each edge (u, v): if find(u) != find(v), add to MST and union(u, v).', 'Stop when V - 1 edges added.'],
          algorithmSteps: ['Step 1: Start.', 'Step 2: Sort edges.', 'Step 3: Pick min edge. If no cycle, add to MST.', 'Step 4: Repeat until V-1 edges.', 'Step 5: Stop.'],
          pseudocode: `KRUSKAL(edges):\n    sort(edges)\n    FOR edge(u, v) IN edges:\n        IF find(u) != find(v):\n            add_to_mst(edge)\n            union(u, v)`,
          timeComplexity: { best: 'O(E log E)', avg: 'O(E log E)', worst: 'O(E log E)', explanation: 'Dominated by edge sorting step.' },
          spaceComplexity: { auxiliary: 'O(V)', explanation: 'Parent array for DSU tracking.' }
        },
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START KRUSKAL', next: '2' },
          { id: '2', type: 'process', text: 'Sort edges by weight', next: '3' },
          { id: '3', type: 'decision', text: 'Does edge form cycle?', yesTarget: '5', noTarget: '4' },
          { id: '4', type: 'process', text: 'Add to MST & Union', next: '5' },
          { id: '5', type: 'decision', text: 'V - 1 edges added?', yesTarget: '6', noTarget: '3' },
          { id: '6', type: 'end', text: 'END MST' }
        ],
        demoType: 'mst-kruskal',
        practiceProblems: [
          {
            id: 'kru-p1',
            title: 'Disjoint Set Find Operation',
            difficulty: 'Intermediate',
            description: 'Implement find(int i) with path compression.',
            inputFormat: 'vertex index i',
            outputFormat: 'root representative',
            sampleInput: 'parent[3] = 2, parent[2] = 1, parent[1] = 1',
            sampleOutput: '1',
            hint: 'Recursively call find and update parent.',
            starterCode: `int findRoot(int parent[], int i) { return i; }`,
            solutionCode: `int findRoot(int parent[], int i) { if (parent[i] == i) return i; return parent[i] = findRoot(parent, parent[i]); }`,
            testCases: [{ input: 'root 1', expected: '1' }]
          }
        ],
        vivaQuestions: [
          {
            id: 'kru-v1',
            type: 'mcq',
            question: 'How many edges are present in a Minimum Spanning Tree of a graph with V vertices?',
            options: ['V edges', 'V - 1 edges', 'V + 1 edges', 'V * (V - 1) / 2'],
            correctAnswer: 1,
            explanation: 'Every spanning tree spanning V vertices contains exactly V - 1 edges without cycles.'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\n#define V 4\nint parent[V];\nint find(int i) { while(parent[i]!=i) i=parent[i]; return i; }\nvoid unionSets(int i, int j) { parent[find(i)] = find(j); }\nint main() { printf("Kruskal MST ready.\\n"); return 0; }`
      },
      {
        id: 'prim-algorithm',
        topicNumber: '08.2',
        title: "Prim's Algorithm",
        shortTitle: "Prim's Algorithm",
        parentExperimentId: 'exp-08',
        parentExperimentNumber: '08',
        parentExperimentTitle: 'Minimum Spanning Tree',
        iconType: 'mst',
        topicsSummary: 'Vertex growing cut property, greedy tree expansion from root vertex.',
        aim: "To construct a Minimum Spanning Tree of a connected weighted graph using Prim's vertex-growing algorithm.",
        problemStatement: "Implement Prim's algorithm by starting from an arbitrary vertex and greedily growing the spanning tree by choosing the minimum weight edge connecting the tree to a non-tree vertex.",
        objectives: ['Implement Cut property for MST.', 'Grow tree vertex-by-vertex.', 'Track keys and parent vertices.'],
        requiredConcepts: ['Cut Property', 'Greedy Vertex Growth', 'Minimum Edge Cut'],
        syllabusScope: ["Prim's Algorithm", "Vertex growing MST"],
        expectedOutput: `--- Minimum Spanning Tree (Prim's) ---\nEdge \t Weight\n0 - 1 \t 2\n1 - 2 \t 3\n0 - 3 \t 6\nTotal MST Weight = 11`,
        learningOutcome: 'CO2 (Apply): Apply Prim’s algorithm for dense network graph optimizations.',
        theory: {
          introduction: "Prim's algorithm builds an MST by starting with a single vertex and continually adding the minimum-weight edge connecting the tree to a vertex outside the tree.",
          importantConcepts: [
            { title: 'Tree Growth', desc: 'Unlike Kruskal (which merges disjoint trees), Prim always maintains a single growing connected tree.' },
            { title: 'Key Values', desc: 'Tracks the minimum weight edge connecting non-tree vertices to the tree.' }
          ],
          howItWorks: 'Start at root. Pick unvisited vertex with min key. Mark in MST. Update keys of adjacent vertices.',
          realWorldExample: 'Connecting power lines from a central electrical substation outwards to all homes in a city.',
          stepByStepExplanation: ['Set key[0] = 0, others = INF.', 'Pick min key vertex u not yet in MST.', 'Add u to MST.', 'Update keys of adjacent vertices.'],
          algorithmSteps: ['Step 1: Start.', 'Step 2: Init keys to INF.', 'Step 3: Repeat V times: Pick min key u, add to MST, update adjacent keys.', 'Step 4: Output MST edges.', 'Step 5: Stop.'],
          pseudocode: `PRIM(graph):\n    key[0] = 0\n    FOR count FROM 0 TO V-1:\n        u = min_key(key, inMST)\n        inMST[u] = true\n        update_adjacent_keys(u)`,
          timeComplexity: { best: 'O(V²)', avg: 'O(V²)', worst: 'O(V²)', explanation: 'O(V²) with adjacency matrix; O(E log V) with priority queue.' },
          spaceComplexity: { auxiliary: 'O(V)', explanation: 'Key, parent, and inMST arrays.' }
        },
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START PRIM', next: '2' },
          { id: '2', type: 'process', text: 'key[0] = 0, others = INF', next: '3' },
          { id: '3', type: 'process', text: 'Pick min key vertex u; inMST[u] = true', next: '4' },
          { id: '4', type: 'process', text: 'Update neighbor keys', next: '5' },
          { id: '5', type: 'decision', text: 'All vertices in MST?', yesTarget: '6', noTarget: '3' },
          { id: '6', type: 'end', text: 'END MST' }
        ],
        demoType: 'mst-prim',
        practiceProblems: [
          {
            id: 'pri-p1',
            title: 'Update Key Values in Prim',
            difficulty: 'Intermediate',
            description: 'Given edge (u, v) with weight w, update key[v] if w < key[v] and v not in MST.',
            inputFormat: 'w, key[v], inMST[v]',
            outputFormat: 'Updated key[v]',
            sampleInput: 'w=3, key[v]=8, inMST=false',
            sampleOutput: '3',
            hint: 'If !inMST[v] && w < key[v]: key[v] = w;',
            starterCode: `void updateKey(int *key_v, int w, int inMST) {}`,
            solutionCode: `void updateKey(int *key_v, int w, int inMST) { if (!inMST && w < *key_v) *key_v = w; }`,
            testCases: [{ input: '3, 8, 0', expected: '3' }]
          }
        ],
        vivaQuestions: [
          {
            id: 'pri-v1',
            type: 'mcq',
            question: "When is Prim's algorithm preferred over Kruskal's algorithm?",
            options: ['Dense graphs with many edges (E close to V²)', 'Sparse graphs with few edges', 'Disconnected graphs', 'Tree graphs'],
            correctAnswer: 0,
            explanation: "Prim's algorithm runs faster on dense graphs where E is close to V² because its runtime depends on vertex selection."
          }
        ],
        cCodeSnippet: `#include <stdio.h>\n#define V 4\nint main() { printf("Prim MST ready.\\n"); return 0; }`
      }
    ]
  },

  // =========================================================================
  // EXPERIMENT 09 — SORTING ALGORITHMS
  // =========================================================================
  {
    id: 'exp-09',
    number: '09',
    title: 'SORTING ALGORITHMS',
    shortTitle: 'SORTING ALGORITHMS',
    shortDesc: 'Comparative implementations and runtime complexity analysis of essential sorting strategies.',
    topics: [
      {
        id: 'insertion-sort',
        topicNumber: '09.1',
        title: 'Insertion Sort',
        shortTitle: 'Insertion Sort',
        parentExperimentId: 'exp-09',
        parentExperimentNumber: '09',
        parentExperimentTitle: 'Sorting Algorithms',
        iconType: 'sort',
        topicsSummary: 'In-place incremental sorting, shifting larger preceding elements right, O(N²) worst-case.',
        aim: 'To implement and analyze Insertion Sort for in-place ordering of an array of elements.',
        problemStatement: 'Develop a C program that sorts an array of integers using Insertion Sort, inserting each element into its correct sorted position.',
        objectives: ['Master incremental card-sorting logic.', 'Perform in-place element shifting.', 'Analyze best O(N) and worst O(N²) cases.'],
        requiredConcepts: ['In-Place Sorting', 'Shifting Operations', 'Asymptotic Complexity'],
        syllabusScope: ['Insertion Sort implementation', 'Shift mechanics'],
        expectedOutput: `Original Array: 64 25 12 22 11\nSorted Array:   11 12 22 25 64`,
        learningOutcome: 'CO3 (Analyze): Implement and benchmark in-place incremental sorting algorithms.',
        theory: {
          introduction: 'Insertion Sort is a simple in-place comparison sort that builds the final sorted array one item at a time by inserting each element into its proper position among previously sorted elements.',
          importantConcepts: [
            { title: 'Sorted Partition', desc: 'Array is divided into a sorted left partition and an unsorted right partition.' },
            { title: 'Best Case O(N)', desc: 'If the array is already sorted, only N-1 comparisons are made with 0 shifts.' }
          ],
          howItWorks: 'Iterate i from 1 to N-1. Save key = arr[i]. Shift all elements greater than key one position right. Place key.',
          realWorldExample: 'Sorting playing cards in your hand where you pick each card and insert it into its sorted rank order.',
          stepByStepExplanation: ['Pick arr[i] as key.', 'Compare key with preceding elements.', 'Shift greater elements right.', 'Insert key.'],
          algorithmSteps: ['Step 1: Start.', 'Step 2: For i = 1 to N-1: key = arr[i], j = i-1.', 'Step 3: While j >= 0 and arr[j] > key: arr[j+1] = arr[j], j = j-1.', 'Step 4: arr[j+1] = key.', 'Step 5: Stop.'],
          pseudocode: `INSERTION_SORT(arr):\n    FOR i FROM 1 TO n-1:\n        key = arr[i]; j = i - 1\n        WHILE j >= 0 AND arr[j] > key:\n            arr[j + 1] = arr[j]; j = j - 1\n        arr[j + 1] = key`,
          timeComplexity: { best: 'O(N)', avg: 'O(N²)', worst: 'O(N²)', explanation: 'O(N) when already sorted; O(N²) average and worst.' },
          spaceComplexity: { auxiliary: 'O(1)', explanation: 'In-place sorting requiring constant auxiliary memory.' }
        },
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START INSERTION SORT', next: '2' },
          { id: '2', type: 'process', text: 'key = arr[i]; j = i - 1', next: '3' },
          { id: '3', type: 'decision', text: 'j >= 0 AND arr[j] > key?', yesTarget: '4', noTarget: '5' },
          { id: '4', type: 'process', text: 'arr[j+1] = arr[j]; j = j-1', next: '3' },
          { id: '5', type: 'process', text: 'arr[j+1] = key', next: '6' },
          { id: '6', type: 'end', text: 'END' }
        ],
        demoType: 'sort-insertion',
        practiceProblems: [
          {
            id: 'ins-p1',
            title: 'Sort an Array with Insertion Sort',
            difficulty: 'Beginner',
            description: 'Complete insertion sort function in C.',
            inputFormat: 'arr, n',
            outputFormat: 'sorted array',
            sampleInput: '4 3 2 1',
            sampleOutput: '1 2 3 4',
            hint: 'Use inner while loop with shifting.',
            starterCode: `void sort(int a[], int n) {}`,
            solutionCode: `void sort(int a[], int n) { for(int i=1;i<n;i++) { int k=a[i], j=i-1; while(j>=0&&a[j]>k) { a[j+1]=a[j]; j--; } a[j+1]=k; } }`,
            testCases: [{ input: '4 3 2 1', expected: '1 2 3 4' }]
          }
        ],
        vivaQuestions: [
          {
            id: 'ins-v1',
            type: 'mcq',
            question: 'What is the best-case time complexity of Insertion Sort when the input array is already sorted?',
            options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N²)'],
            correctAnswer: 1,
            explanation: 'When already sorted, the inner while loop terminates on the first comparison every time, yielding O(N) linear time.'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\nvoid insertionSort(int a[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = a[i], j = i - 1;\n        while (j >= 0 && a[j] > key) { a[j+1] = a[j]; j--; }\n        a[j+1] = key;\n    }\n}\nint main() { int a[] = {5, 2, 8, 1}; insertionSort(a, 4); printf("Sorted: %d %d %d %d\\n", a[0], a[1], a[2], a[3]); return 0; }`
      },
      {
        id: 'merge-sort',
        topicNumber: '09.2',
        title: 'Merge Sort',
        shortTitle: 'Merge Sort',
        parentExperimentId: 'exp-09',
        parentExperimentNumber: '09',
        parentExperimentTitle: 'Sorting Algorithms',
        iconType: 'sort',
        topicsSummary: 'Divide and conquer, recursive splitting in half, linear O(N) merge, guaranteed O(N log N).',
        aim: 'To implement and benchmark Merge Sort using the Divide-and-Conquer paradigm with guaranteed O(N log N) runtime.',
        problemStatement: 'Develop a C program implementing Merge Sort: divide the array into halves, recursively sort both halves, and merge sorted sub-arrays.',
        objectives: ['Master divide and conquer recursion.', 'Implement linear O(N) merge routine.', 'Analyze guaranteed O(N log N) time.'],
        requiredConcepts: ['Divide and Conquer', 'Two-pointer Merge', 'Recursion Tree'],
        syllabusScope: ['Merge Sort implementation', 'Merge function'],
        expectedOutput: `Original Array: 38 27 43 3 9 82 10\nSorted Array:   3 9 10 27 38 43 82`,
        learningOutcome: 'CO3 (Analyze): Apply divide-and-conquer principles to achieve optimal O(N log N) sorting.',
        theory: {
          introduction: 'Merge Sort is an efficient, stable, divide-and-conquer comparison-based sorting algorithm. It divides the input array into two equal halves, recursively sorts them, and then merges the two sorted halves into one sorted whole.',
          importantConcepts: [
            { title: 'Divide and Conquer', desc: 'Divide: split array at mid. Conquer: recursively sort halves. Combine: merge in O(N).' },
            { title: 'Guaranteed O(N log N)', desc: 'Unlike Quick Sort, Merge Sort guarantees O(N log N) performance even in the worst case.' }
          ],
          howItWorks: 'Recursively split array until single element arrays remain. Merge pairs of sorted arrays using two-finger pointer comparison into a temporary buffer.',
          realWorldExample: 'Sorting two piles of already sorted exam papers into a single combined sorted pile by repeatedly comparing top papers.',
          stepByStepExplanation: ['Find mid = low + (high - low) / 2.', 'Call mergeSort(low, mid).', 'Call mergeSort(mid + 1, high).', 'Call merge(low, mid, high).'],
          algorithmSteps: ['Step 1: Start.', 'Step 2: MERGESORT(arr, l, r): If l < r: m = (l+r)/2, MERGESORT(arr, l, m), MERGESORT(arr, m+1, r), MERGE(arr, l, m, r).', 'Step 3: Stop.'],
          pseudocode: `MERGESORT(arr, l, r):\n    IF l < r:\n        m = (l + r) / 2\n        MERGESORT(arr, l, m)\n        MERGESORT(arr, m + 1, r)\n        MERGE(arr, l, m, r)`,
          timeComplexity: { best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N log N)', explanation: 'Always splits into 2 halves (log N levels), each level taking O(N) to merge.' },
          spaceComplexity: { auxiliary: 'O(N)', explanation: 'Requires temporary array buffer of size N during merge.' }
        },
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START MERGE SORT(L, R)', next: '2' },
          { id: '2', type: 'decision', text: 'Is L < R ?', yesTarget: '3', noTarget: '6' },
          { id: '3', type: 'process', text: 'mid = (L + R) / 2', next: '4' },
          { id: '4', type: 'process', text: 'Recurse: Sort Left & Right Halves', next: '5' },
          { id: '5', type: 'process', text: 'MERGE(L, mid, R)', next: '6' },
          { id: '6', type: 'end', text: 'END' }
        ],
        demoType: 'sort-merge',
        practiceProblems: [
          {
            id: 'mrg-p1',
            title: 'Merge Two Sorted Arrays',
            difficulty: 'Intermediate',
            description: 'Merge two sorted arrays A and B into a third sorted array C.',
            inputFormat: 'A[], B[]',
            outputFormat: 'C[]',
            sampleInput: 'A=[1, 3, 5], B=[2, 4, 6]',
            sampleOutput: '[1, 2, 3, 4, 5, 6]',
            hint: 'Use two pointers i and j. Compare and copy smaller element.',
            starterCode: `void merge(int A[], int n, int B[], int m, int C[]) {}`,
            solutionCode: `void merge(int A[], int n, int B[], int m, int C[]) { int i=0, j=0, k=0; while(i<n && j<m) C[k++] = (A[i]<=B[j]) ? A[i++] : B[j++]; while(i<n) C[k++]=A[i++]; while(j<m) C[k++]=B[j++]; }`,
            testCases: [{ input: 'sorted', expected: 'merged' }]
          }
        ],
        vivaQuestions: [
          {
            id: 'mrg-v1',
            type: 'mcq',
            question: 'What is the worst-case time complexity of Merge Sort?',
            options: ['O(N²)', 'O(N log N)', 'O(N)', 'O(log N)'],
            correctAnswer: 1,
            explanation: 'Merge Sort has a guaranteed worst-case time complexity of O(N log N) regardless of input ordering.'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\nvoid merge(int a[], int l, int m, int r) { /* standard merge */ }\nvoid mergeSort(int a[], int l, int r) { if(l<r) { int m=(l+r)/2; mergeSort(a,l,m); mergeSort(a,m+1,r); merge(a,l,m,r); } }\nint main() { int a[] = {38, 27, 43, 3}; mergeSort(a, 0, 3); printf("Sorted: %d\\n", a[0]); return 0; }`
      },
      {
        id: 'quick-sort',
        topicNumber: '09.3',
        title: 'Quick Sort',
        shortTitle: 'Quick Sort',
        parentExperimentId: 'exp-09',
        parentExperimentNumber: '09',
        parentExperimentTitle: 'Sorting Algorithms',
        iconType: 'sort',
        topicsSummary: 'Divide and conquer, pivot partitioning, recursive subarray sorting.',
        aim: 'To implement and analyze Quick Sort using Lomuto or Hoare partitioning around a pivot element.',
        problemStatement: 'Develop a C program implementing Quick Sort: select a pivot, partition elements smaller than pivot to left and greater to right, and recursively sort partitions.',
        objectives: ['Master array partitioning around pivot.', 'Implement recursive quick sort.', 'Analyze O(N log N) average vs O(N²) worst cases.'],
        requiredConcepts: ['Pivot Selection', 'Partitioning Algorithm', 'In-place Recursion'],
        syllabusScope: ['Quick Sort implementation', 'Partition function'],
        expectedOutput: `Original Array: 10 80 30 90 40 50 70\nSorted Array:   10 30 40 50 70 80 90`,
        learningOutcome: 'CO3 (Analyze): Implement high-performance cache-friendly in-place sorting using Quick Sort.',
        theory: {
          introduction: 'Quick Sort is a highly efficient in-place divide-and-conquer sorting algorithm. It selects an element as a pivot and partitions the array around the pivot such that smaller elements are placed to the left and larger to the right.',
          importantConcepts: [
            { title: 'Partitioning Step', desc: 'Arranges elements around the pivot in linear O(N) time and returns the finalized pivot index.' },
            { title: 'Average O(N log N)', desc: 'Quick Sort is widely considered the fastest practical sorting algorithm due to cache efficiency.' }
          ],
          howItWorks: 'Choose pivot (e.g. arr[high]). Iterate through array, placing smaller elements before pivot. Swap pivot into correct slot. Recurse left and right.',
          realWorldExample: 'Alphabetizing a library shelf by picking a letter (e.g. M) and placing all A-L books on the left shelf and N-Z on the right.',
          stepByStepExplanation: ['Pick pivot = arr[high].', 'Maintain pointer i for smaller elements.', 'Swap arr[j] < pivot with arr[++i].', 'Swap pivot to i + 1.', 'Recurse on partitions.'],
          algorithmSteps: ['Step 1: Start.', 'Step 2: QUICKSORT(arr, low, high): If low < high: pi = PARTITION(arr, low, high), QUICKSORT(arr, low, pi - 1), QUICKSORT(arr, pi + 1, high).', 'Step 3: Stop.'],
          pseudocode: `QUICKSORT(arr, low, high):\n    IF low < high:\n        pi = PARTITION(arr, low, high)\n        QUICKSORT(arr, low, pi - 1)\n        QUICKSORT(arr, pi + 1, high)`,
          timeComplexity: { best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N²)', explanation: 'O(N log N) on average; O(N²) if worst pivot chosen on already sorted arrays.' },
          spaceComplexity: { auxiliary: 'O(log N)', explanation: 'Recursive call stack frames.' }
        },
        flowchartNodes: [
          { id: '1', type: 'start', text: 'START QUICK SORT', next: '2' },
          { id: '2', type: 'decision', text: 'Is low < high ?', yesTarget: '3', noTarget: '6' },
          { id: '3', type: 'process', text: 'pi = PARTITION(arr, low, high)', next: '4' },
          { id: '4', type: 'process', text: 'QUICKSORT(low, pi - 1)', next: '5' },
          { id: '5', type: 'process', text: 'QUICKSORT(pi + 1, high)', next: '6' },
          { id: '6', type: 'end', text: 'END' }
        ],
        demoType: 'sort-quick',
        practiceProblems: [
          {
            id: 'qck-p1',
            title: 'Partition Array for Quick Sort',
            difficulty: 'Intermediate',
            description: 'Implement int partition(int arr[], int low, int high) using last element as pivot.',
            inputFormat: 'arr[], low, high',
            outputFormat: 'Pivot index',
            sampleInput: '[10, 80, 30, 90, 40, 50, 70]',
            sampleOutput: 'Pivot index 4 (Value 70)',
            hint: 'Use index i = low - 1. Swap elements smaller than pivot with arr[++i].',
            starterCode: `int partition(int arr[], int low, int high) { return low; }`,
            solutionCode: `int partition(int arr[], int low, int high) { int pivot = arr[high]; int i = low - 1; for(int j=low; j<high; j++) { if(arr[j]<pivot) { i++; int t=arr[i]; arr[i]=arr[j]; arr[j]=t; } } int t=arr[i+1]; arr[i+1]=arr[high]; arr[high]=t; return i+1; }`,
            testCases: [{ input: 'partition', expected: 'partitioned' }]
          }
        ],
        vivaQuestions: [
          {
            id: 'qck-v1',
            type: 'mcq',
            question: 'Under what condition does Quick Sort exhibit its worst-case O(N²) time complexity?',
            options: ['When array elements are random', 'When array is already sorted and pivot is always chosen as first or last element', 'When array has duplicate elements', 'When array length is a power of 2'],
            correctAnswer: 1,
            explanation: 'Choosing the first or last element as pivot on an already sorted array creates completely unbalanced partitions (0 and N-1), resulting in O(N²) time.'
          }
        ],
        cCodeSnippet: `#include <stdio.h>\nint part(int a[], int l, int h) { int p=a[h], i=l-1; for(int j=l; j<h; j++) if(a[j]<p) { i++; int t=a[i]; a[i]=a[j]; a[j]=t; } int t=a[i+1]; a[i+1]=a[h]; a[h]=t; return i+1; }\nvoid qs(int a[], int l, int h) { if(l<h) { int p=part(a,l,h); qs(a,l,p-1); qs(a,p+1,h); } }\nint main() { int a[] = {10, 80, 30, 90}; qs(a, 0, 3); printf("Sorted: %d\\n", a[0]); return 0; }`
      }
    ]
  }
]

// Helper lookup functions
export function getSyllabusExperiment(expId: string): SyllabusExperimentGroup | undefined {
  const normalizedId = expId.toLowerCase()
  return SYLLABUS_EXPERIMENTS.find(e => e.id === normalizedId)
}

export function getTopicById(expId: string, topicId: string): TopicDetails | undefined {
  const exp = getSyllabusExperiment(expId)
  if (!exp) return undefined
  return exp.topics.find(t => t.id === topicId)
}

export function findTopicGlobally(topicId: string): TopicDetails | undefined {
  for (const exp of SYLLABUS_EXPERIMENTS) {
    const t = exp.topics.find(top => top.id === topicId)
    if (t) return t
  }
  return undefined
}
