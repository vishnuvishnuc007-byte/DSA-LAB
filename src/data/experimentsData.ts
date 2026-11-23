export interface PracticeProblem {
  id: string
  title: string
  difficulty: 'Beginner' | 'Intermediate'
  description: string
  inputFormat: string
  outputFormat: string
  sampleInput: string
  sampleOutput: string
  hint: string
  starterCode: string
  solutionCode: string
  testCases: { input: string; expected: string }[]
}

export interface VivaQuestion {
  id: string
  type: 'mcq' | 'short'
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
}

export interface FlowchartNode {
  id: string
  type: 'start' | 'process' | 'decision' | 'io' | 'end'
  text: string
  yesTarget?: string
  noTarget?: string
  next?: string
}

export interface ExperimentDetail {
  id: string
  number: string
  title: string
  shortTitle: string
  topics: string
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
  practiceProblems: PracticeProblem[]
  vivaQuestions: VivaQuestion[]
  defaultCodeSnippet: string
}

export const EXPERIMENTS_DATA: Record<string, ExperimentDetail> = {
  'exp-01': {
    id: 'exp-01',
    number: '01',
    title: 'SIMPLE C PROGRAMS',
    shortTitle: 'SIMPLE C PROGRAMS',
    topics: 'Programs using recursion, structures, and pointers',
    aim: 'To design and implement fundamental C programs demonstrating recursive execution, structure memory allocation, and pointer manipulations.',
    problemStatement: 'Develop modular C programs that implement mathematical recursion (e.g. Factorial and Tower of Hanoi), maintain student records using C structures, and manipulate dynamic memory using pointers.',
    objectives: [
      'Understand function call-stack mechanics and base-case termination in recursive routines.',
      'Construct user-defined structure data types and analyze member alignment in memory.',
      'Demonstrate dynamic memory allocation using malloc(), pointer dereferencing, and pointer arithmetic.'
    ],
    requiredConcepts: [
      'C Data Types and Operators',
      'Function Call Stack and Activation Records',
      'Memory Addresses and Pointers (* and & operators)',
      'Structures and typedef in C'
    ],
    syllabusScope: [
      'Programs using recursion (Factorial calculation, Fibonacci series)',
      'Programs using structures (Student database records)',
      'Programs using pointers (Dynamic arrays, pointer arithmetic)'
    ],
    expectedOutput: `Factorial of 5: 120\nFibonacci Series (first 6): 0 1 1 2 3 5\nStudent Record:\n  Roll: 21UIT307 | Name: Vishnu Student | GPA: 9.15\nDynamic Array: [10, 20, 30, 40, 50]`,
    learningOutcome: 'CO1 (Apply): Apply recursive logic, structures, and pointer addressing to build modular C programs.',
    theory: {
      introduction: 'Recursion is a programming technique where a function calls itself to solve a smaller instance of the same problem. Structures group heterogeneous data items, and pointers store memory addresses, granting direct access to heap and stack memory.',
      importantConcepts: [
        { title: 'Base Case & Recursive Step', desc: 'The base case stops recursion. Without a base case, the function calls itself indefinitely, causing a Stack Overflow.' },
        { title: 'Activation Record', desc: 'Each recursive call allocates a new stack frame storing local variables, parameters, and the return address.' },
        { title: 'Pointers & Dereferencing', desc: 'A pointer variable holds the address of another variable. The * operator accesses the value at that address.' },
        { title: 'Structures & Arrow Operator', desc: 'A structure groups variables of different types. Access pointer-to-struct members using the -> operator.' }
      ],
      howItWorks: 'When factorial(n) is invoked, the CPU pushes a stack frame with parameter n. If n > 1, it calls factorial(n-1), pushing successive frames until the base condition (n <= 1) is met. Values are then returned and multiplied as frames pop.',
      realWorldExample: 'Russian Nesting Dolls (Matryoshka) or directory folder tree traversal on your file system.',
      stepByStepExplanation: [
        'Check base case: if n == 0 or n == 1, return 1.',
        'Recursive call: compute factorial(n - 1).',
        'Multiply n with the returned result and return it.',
        'Unwind call stack step by step back to main().'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: Read integer N.',
        'Step 3: Call function FACTORIAL(N).',
        'Step 4: Inside FACTORIAL: if N <= 1, return 1.',
        'Step 5: Else return N * FACTORIAL(N - 1).',
        'Step 6: Display computed result and terminate.'
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
        explanation: 'There are N recursive calls made sequentially, leading to linear time complexity.'
      },
      spaceComplexity: {
        auxiliary: 'O(N)',
        explanation: 'The call stack grows to depth N before unwinding, requiring O(N) auxiliary stack memory.'
      }
    },
    flowchartNodes: [
      { id: '1', type: 'start', text: 'START', next: '2' },
      { id: '2', type: 'io', text: 'Input integer N', next: '3' },
      { id: '3', type: 'decision', text: 'Is N <= 1 ?', yesTarget: '4', noTarget: '5' },
      { id: '4', type: 'process', text: 'Return 1 (Base Case)', next: '6' },
      { id: '5', type: 'process', text: 'Result = N * Factorial(N - 1)', next: '6' },
      { id: '6', type: 'io', text: 'Output Computed Result', next: '7' },
      { id: '7', type: 'end', text: 'END' }
    ],
    practiceProblems: [
      {
        id: 'p1',
        title: 'Calculate Sum of Natural Numbers using Recursion',
        difficulty: 'Beginner',
        description: 'Write a recursive function in C that accepts an integer N and returns the sum of all natural numbers up to N (1 + 2 + ... + N).',
        inputFormat: 'A single positive integer N',
        outputFormat: 'Single integer representing the sum',
        sampleInput: '5',
        sampleOutput: '15',
        hint: 'Base case: if N == 1, return 1. Otherwise return N + sum(N - 1).',
        starterCode: `#include <stdio.h>\n\nint sumNatural(int n) {\n    // Write your recursive code here\n    return 0;\n}\n\nint main() {\n    int n = 5;\n    printf("%d", sumNatural(n));\n    return 0;\n}`,
        solutionCode: `int sumNatural(int n) {\n    if (n <= 1) return n;\n    return n + sumNatural(n - 1);\n}`,
        testCases: [
          { input: '5', expected: '15' },
          { input: '10', expected: '55' },
          { input: '1', expected: '1' }
        ]
      },
      {
        id: 'p2',
        title: 'Swap Two Numbers Using Pointers',
        difficulty: 'Intermediate',
        description: 'Write a C function swap(int *a, int *b) that exchanges the values of two integers using pointer dereferencing.',
        inputFormat: 'Two integers a and b',
        outputFormat: 'Swapped values of a and b',
        sampleInput: '10 20',
        sampleOutput: '20 10',
        hint: 'Use a temporary variable to hold the value pointed to by a: int temp = *a;',
        starterCode: `#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    // Implement swap using pointers\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf("%d %d", x, y);\n    return 0;\n}`,
        solutionCode: `void swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}`,
        testCases: [
          { input: '10 20', expected: '20 10' },
          { input: '7 99', expected: '99 7' }
        ]
      }
    ],
    vivaQuestions: [
      {
        id: 'v1',
        type: 'mcq',
        question: 'What occurs if a recursive function does not have a valid base case?',
        options: ['Compilation error', 'Stack Overflow runtime error', 'Division by zero', 'Code terminates immediately'],
        correctAnswer: 1,
        explanation: 'Without a base case, recursion continues indefinitely until the call stack memory is exhausted, throwing a Stack Overflow.'
      },
      {
        id: 'v2',
        type: 'mcq',
        question: 'Which operator is used to access structure members through a pointer?',
        options: ['. (dot)', '-> (arrow)', '& (ampersand)', '* (asterisk)'],
        correctAnswer: 1,
        explanation: 'In C, ptr->member is shorthand for (*ptr).member.'
      },
      {
        id: 'v3',
        type: 'short',
        question: 'What is the difference between malloc() and calloc() in C?',
        correctAnswer: 'malloc allocates uninitialized memory; calloc initializes all allocated bytes to zero.',
        explanation: 'malloc(size) leaves garbage values in the allocated block, while calloc(n, size) clears memory to zero.'
      }
    ],
    defaultCodeSnippet: `#include <stdio.h>\n#include <stdlib.h>\n\nlong factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    int num = 5;\n    printf("Factorial of %d = %ld\\n", num, factorial(num));\n    return 0;\n}`
  },

  'exp-02': {
    id: 'exp-02',
    number: '02',
    title: 'LINKED LIST',
    shortTitle: 'LINKED LIST',
    topics: 'Linked List Implementation of List ADT',
    aim: 'To implement a singly linked list representing the List Abstract Data Type (ADT) with basic operations including insertion, deletion, and traversal.',
    problemStatement: 'Design a dynamic singly linked list structure in C to manage a sequence of items, allowing insertion at beginning, middle, and end, deletion of specified nodes, and linear display.',
    objectives: [
      'Define a self-referential Node structure with data and next pointer.',
      'Implement dynamic memory allocation for node creation at runtime.',
      'Perform node insertions and deletions without data shifting.',
      'Analyze linear traversal and memory management in C.'
    ],
    requiredConcepts: [
      'Self-referential structures',
      'Dynamic memory allocation (malloc, free)',
      'Pointer tracking (Head and Current pointers)',
      'Boundary conditions (empty list, single node)'
    ],
    syllabusScope: [
      'Node definition and initialization',
      'Insert at front, end, and arbitrary position',
      'Delete from beginning, end, and by value',
      'Display and length routines'
    ],
    expectedOutput: `List: 10 -> 20 -> 30 -> NULL\nInserted 5 at beginning: 5 -> 10 -> 20 -> 30 -> NULL\nDeleted 20: 5 -> 10 -> 30 -> NULL\nList Length: 3`,
    learningOutcome: 'CO1 (Apply): Apply pointers and dynamic allocation to implement Linked List ADT operations.',
    theory: {
      introduction: 'A Linked List is a linear data structure where elements are not stored at contiguous memory locations. Elements are linked using pointers. Each node contains a data payload and a reference pointer to the next node in sequence.',
      importantConcepts: [
        { title: 'Node Anatomy', desc: 'Each node contains two fields: Data (stores element) and Next (stores pointer to next node).' },
        { title: 'Head Pointer', desc: 'Head points to the first node. If Head is NULL, the list is empty.' },
        { title: 'Non-Contiguous Allocation', desc: 'Nodes are scattered in heap memory, unlike arrays which require contiguous blocks.' },
        { title: 'O(1) Insertion', desc: 'Inserting at the beginning takes O(1) time since no elements need to be shifted.' }
      ],
      howItWorks: 'To insert a node at the head: allocate a new node, set its data, point its next to the current head, and update head to point to the new node.',
      realWorldExample: 'A music playlist (each song points to the next), or browser forward/backward history navigation.',
      stepByStepExplanation: [
        'Allocate heap memory for newNode using malloc.',
        'Assign data to newNode->data.',
        'Set newNode->next = head.',
        'Update head = newNode.'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: Allocate memory for newNode: newNode = malloc(sizeof(struct Node)).',
        'Step 3: If allocation fails, print Overflow and Exit.',
        'Step 4: Set newNode->data = value, newNode->next = HEAD.',
        'Step 5: Set HEAD = newNode.',
        'Step 6: Display success and return.'
      ],
      pseudocode: `FUNCTION InsertFront(head, val):
    newNode = ALLOCATE(Node)
    newNode.data = val
    newNode.next = head
    head = newNode
    RETURN head
END FUNCTION`,
      timeComplexity: {
        best: 'O(1) (Insert at front)',
        avg: 'O(N) (Insert/Search arbitrary)',
        worst: 'O(N) (Traversal)',
        explanation: 'Insertion at the front takes constant time O(1). Accessing or searching the N-th element requires linear traversal O(N).'
      },
      spaceComplexity: {
        auxiliary: 'O(1)',
        explanation: 'Only a few pointer variables are needed; auxiliary space is constant.'
      }
    },
    flowchartNodes: [
      { id: '1', type: 'start', text: 'START', next: '2' },
      { id: '2', type: 'process', text: 'Allocate newNode = malloc()', next: '3' },
      { id: '3', type: 'decision', text: 'Is newNode == NULL?', yesTarget: '4', noTarget: '5' },
      { id: '4', type: 'io', text: 'Memory Allocation Failed', next: '8' },
      { id: '5', type: 'process', text: 'Set newNode->data = value\nSet newNode->next = HEAD', next: '6' },
      { id: '6', type: 'process', text: 'Update HEAD = newNode', next: '7' },
      { id: '7', type: 'io', text: 'Print "Node Inserted"', next: '8' },
      { id: '8', type: 'end', text: 'END' }
    ],
    practiceProblems: [
      {
        id: 'll-p1',
        title: 'Count Nodes in a Singly Linked List',
        difficulty: 'Beginner',
        description: 'Implement a function int countNodes(struct Node* head) that traverses the linked list and returns the total count of nodes.',
        inputFormat: 'A linked list containing N elements',
        outputFormat: 'Single integer representing count',
        sampleInput: '10 -> 20 -> 30 -> NULL',
        sampleOutput: '3',
        hint: 'Use a temporary pointer temp = head, loop while temp != NULL, and increment count.',
        starterCode: `int countNodes(struct Node* head) {\n    int count = 0;\n    // Write traversal here\n    return count;\n}`,
        solutionCode: `int countNodes(struct Node* head) {\n    int count = 0;\n    struct Node* temp = head;\n    while (temp != NULL) {\n        count++;\n        temp = temp->next;\n    }\n    return count;\n}`,
        testCases: [
          { input: '3 nodes', expected: '3' },
          { input: '0 nodes (NULL)', expected: '0' }
        ]
      }
    ],
    vivaQuestions: [
      {
        id: 'll-v1',
        type: 'mcq',
        question: 'What is the time complexity to insert a node at the beginning of a singly linked list?',
        options: ['O(N)', 'O(1)', 'O(log N)', 'O(N^2)'],
        correctAnswer: 1,
        explanation: 'Inserting at the front only requires updating two pointers, which is an O(1) constant time operation.'
      },
      {
        id: 'll-v2',
        type: 'mcq',
        question: 'Why does an array allow random access while a linked list only allows sequential access?',
        options: ['Arrays are dynamic', 'Array elements reside in contiguous memory addresses', 'Linked list nodes contain data', 'Arrays use less memory'],
        correctAnswer: 1,
        explanation: 'Contiguous memory in arrays allows computing the memory address of element i using base_address + i * size in O(1).'
      }
    ],
    defaultCodeSnippet: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nstruct Node* head = NULL;\n\nvoid insertFront(int val) {\n    struct Node* newNode = malloc(sizeof(struct Node));\n    newNode->data = val;\n    newNode->next = head;\n    head = newNode;\n}`
  },

  'exp-03': {
    id: 'exp-03',
    number: '03',
    title: 'IMPLEMENTATION OF STACK',
    shortTitle: 'IMPLEMENTATION OF STACK',
    topics: 'Stack using Arrays and Stack using Linked List',
    aim: 'To implement Stack Abstract Data Type using both static array and dynamic linked list representations, validating Push, Pop, Peek, and IsEmpty operations.',
    problemStatement: 'Construct a LIFO (Last-In-First-Out) stack container. Implement boundary assertions for Overflow (array full) and Underflow (empty stack pop).',
    objectives: [
      'Implement static stack using fixed-size array and integer top index.',
      'Implement dynamic stack using linked list without capacity overflow.',
      'Verify LIFO order during sequential push and pop cycles.'
    ],
    requiredConcepts: [
      'LIFO Principle',
      'Top pointer indexing',
      'Overflow and Underflow assertions',
      'Comparison between array and linked list stacks'
    ],
    syllabusScope: [
      'Array implementation of stack (push, pop, peek, display)',
      'Linked list implementation of stack (dynamic push, pop)'
    ],
    expectedOutput: `Stack Push: 10, 20, 30\nTop Element: 30\nPopped: 30\nPopped: 20\nStack Status: Non-empty (top = 10)`,
    learningOutcome: 'CO1 (Apply): Implement LIFO stack storage and handle boundary conditions.',
    theory: {
      introduction: 'A Stack is a linear data structure following the LIFO (Last In First Out) principle. All insertions and deletions take place at only one end, termed the Top of the stack.',
      importantConcepts: [
        { title: 'LIFO Behavior', desc: 'The last element inserted is the first element to be removed.' },
        { title: 'Top Index', desc: 'Integer index tracking current top position. Initialized to -1 when empty.' },
        { title: 'Stack Overflow', desc: 'Occurs when attempting to push onto a full array stack (top == MAX - 1).' },
        { title: 'Stack Underflow', desc: 'Occurs when attempting to pop from an empty stack (top == -1).' }
      ],
      howItWorks: 'To push: verify top < MAX - 1, increment top, and store item at stack[top]. To pop: verify top >= 0, retrieve stack[top], and decrement top.',
      realWorldExample: 'A stack of plates in a cafeteria, or the Undo/Redo function in a text editor.',
      stepByStepExplanation: [
        'Check if top == MAX - 1. If true, report Overflow.',
        'Increment top by 1.',
        'Insert element at stack[top].',
        'For pop: check if top == -1. If true, report Underflow. Otherwise return stack[top--].'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: If TOP == MAX - 1, print "Stack Overflow" and exit.',
        'Step 3: Increment TOP = TOP + 1.',
        'Step 4: Set STACK[TOP] = item.',
        'Step 5: Exit.'
      ],
      pseudocode: `FUNCTION Push(item):
    IF top == MAX - 1 THEN
        PRINT "Stack Overflow"
    ELSE
        top = top + 1
        stack[top] = item
    END IF
END FUNCTION`,
      timeComplexity: {
        best: 'O(1)',
        avg: 'O(1)',
        worst: 'O(1)',
        explanation: 'Push, Pop, and Peek operate directly on the top pointer and execute in constant time O(1).'
      },
      spaceComplexity: {
        auxiliary: 'O(N)',
        explanation: 'Space proportional to maximum capacity allocated for the stack buffer.'
      }
    },
    flowchartNodes: [
      { id: '1', type: 'start', text: 'START PUSH', next: '2' },
      { id: '2', type: 'decision', text: 'Is top == MAX - 1 ?', yesTarget: '3', noTarget: '4' },
      { id: '3', type: 'io', text: 'Print "Stack Overflow"', next: '6' },
      { id: '4', type: 'process', text: 'top = top + 1\nstack[top] = item', next: '5' },
      { id: '5', type: 'io', text: 'Print "Item Pushed"', next: '6' },
      { id: '6', type: 'end', text: 'END' }
    ],
    practiceProblems: [
      {
        id: 'st-p1',
        title: 'Reverse a String using Stack',
        difficulty: 'Beginner',
        description: 'Using stack push and pop operations, reverse a given null-terminated string in C.',
        inputFormat: 'String of characters',
        outputFormat: 'Reversed string',
        sampleInput: 'HELLO',
        sampleOutput: 'OLLEH',
        hint: 'Push every character to stack, then pop until empty.',
        starterCode: `void reverseString(char str[]) {\n    // Implement using stack\n}`,
        solutionCode: `void reverseString(char str[]) {\n    int n = strlen(str);\n    char stack[100]; int top = -1;\n    for(int i=0; i<n; i++) stack[++top] = str[i];\n    for(int i=0; i<n; i++) str[i] = stack[top--];\n}`,
        testCases: [{ input: 'HELLO', expected: 'OLLEH' }]
      }
    ],
    vivaQuestions: [
      {
        id: 'st-v1',
        type: 'mcq',
        question: 'Which of the following applications strictly uses a Stack?',
        options: ['CPU Process Scheduling', 'Function call recursion handling', 'Print spooling queue', 'Breadth-First Search'],
        correctAnswer: 1,
        explanation: 'Recursion and function call memory frames are managed using the runtime call stack.'
      }
    ],
    defaultCodeSnippet: `#include <stdio.h>\n#define MAX 5\nint stack[MAX]; int top = -1;\n\nvoid push(int val) {\n    if (top == MAX - 1) printf("Overflow\\n");\n    else stack[++top] = val;\n}\nint pop() {\n    if (top == -1) { printf("Underflow\\n"); return -1; }\n    return stack[top--];\n}`
  },

  'exp-04': {
    id: 'exp-04',
    number: '04',
    title: 'BALANCED PARENTHESES',
    shortTitle: 'BALANCED PARENTHESES',
    topics: 'Checking Balanced Parentheses using Array implementation of Stack',
    aim: 'To verify whether a mathematical expression contains balanced delimiters including (), {}, and [] using a stack.',
    problemStatement: 'Write an algorithm that parses an arithmetic expression character-by-character. Ensure every opening bracket has a corresponding closing bracket in correct matching order.',
    objectives: [
      'Parse string characters sequentially.',
      'Push open brackets onto stack and pop on closing brackets.',
      'Check character matching and stack emptiness at end of expression.'
    ],
    requiredConcepts: [
      'Stack parsing application',
      'Bracket matching rules',
      'Early termination on mismatch'
    ],
    syllabusScope: [
      'Checking Balanced Parentheses using Array implementation of Stack',
      'Multi-bracket syntax validation (), {}, []'
    ],
    expectedOutput: `Expression: {[()]} -> Balanced\nExpression: {[(])} -> Unbalanced (Mismatch at index 3)\nExpression: ((() -> Unbalanced (Unclosed bracket at end)`,
    learningOutcome: 'CO2 (Apply): Implement expression parsing algorithms to solve compiler syntax validation problems.',
    theory: {
      introduction: 'Compilers evaluate mathematical expressions and code blocks to verify that all opening brackets are properly closed in correct reverse order.',
      importantConcepts: [
        { title: 'Open Delimiters', desc: '(, {, [ are pushed onto the stack.' },
        { title: 'Close Delimiters', desc: '), }, ] cause the stack top to be popped and checked for a matching pair.' },
        { title: 'Valid Condition', desc: 'The expression is balanced if no mismatch occurs and the stack is empty at the end.' }
      ],
      howItWorks: 'Traverse expression string: for opening bracket, push to stack. For closing bracket: if stack is empty, it is unbalanced; otherwise pop top and check if it matches.',
      realWorldExample: 'Syntax checking and linting in IDEs like VS Code or gcc compiler syntax validation.',
      stepByStepExplanation: [
        'Iterate through expression from left to right.',
        'If char is (, {, or [, push to stack.',
        'If char is ), }, or ], check if stack is empty (if so, Unbalanced).',
        'Pop top char and check if it forms a valid pair. If not, Unbalanced.',
        'At end of string, if stack is empty -> Balanced; otherwise Unbalanced.'
      ],
      algorithmSteps: [
        'Step 1: Initialize empty stack.',
        'Step 2: Read character from expression.',
        'Step 3: If opening bracket, push to stack.',
        'Step 4: If closing bracket, pop and verify pair match.',
        'Step 5: If mismatch or stack underflow, declare NOT BALANCED.',
        'Step 6: At end, if stack empty, declare BALANCED.'
      ],
      pseudocode: `FUNCTION IsBalanced(expr):
    stack = EmptyStack()
    FOR EACH char IN expr:
        IF char IN ['(', '{', '['] THEN
            stack.Push(char)
        ELSE IF char IN [')', '}', ']'] THEN
            IF stack.IsEmpty() THEN RETURN FALSE
            topChar = stack.Pop()
            IF NOT Matches(topChar, char) THEN RETURN FALSE
        END IF
    END FOR
    RETURN stack.IsEmpty()
END FUNCTION`,
      timeComplexity: {
        best: 'O(N)',
        avg: 'O(N)',
        worst: 'O(N)',
        explanation: 'Each character in the expression of length N is scanned once.'
      },
      spaceComplexity: {
        auxiliary: 'O(N)',
        explanation: 'In the worst case (all opening brackets e.g. "(((("), stack stores all N characters.'
      }
    },
    flowchartNodes: [
      { id: '1', type: 'start', text: 'START', next: '2' },
      { id: '2', type: 'process', text: 'Initialize stack, i = 0', next: '3' },
      { id: '3', type: 'decision', text: 'Is str[i] == NULL ?', yesTarget: '8', noTarget: '4' },
      { id: '4', type: 'decision', text: 'Is str[i] an open bracket?', yesTarget: '5', noTarget: '6' },
      { id: '5', type: 'process', text: 'Push str[i] to stack\ni = i + 1', next: '3' },
      { id: '6', type: 'decision', text: 'Stack empty or mismatch?', yesTarget: '7', noTarget: '5' },
      { id: '7', type: 'io', text: 'Return "NOT BALANCED"', next: '10' },
      { id: '8', type: 'decision', text: 'Is stack empty ?', yesTarget: '9', noTarget: '7' },
      { id: '9', type: 'io', text: 'Return "BALANCED"', next: '10' },
      { id: '10', type: 'end', text: 'END' }
    ],
    practiceProblems: [
      {
        id: 'bp-p1',
        title: 'Check Single Type Parentheses ()',
        difficulty: 'Beginner',
        description: 'Verify if a string containing only ( and ) is balanced using a counter or stack.',
        inputFormat: 'String containing only ( and )',
        outputFormat: '1 if balanced, 0 if not',
        sampleInput: '(())()',
        sampleOutput: '1',
        hint: 'Increment counter on (, decrement on ). If counter < 0, return 0.',
        starterCode: `int checkSimple(char str[]) {\n    // return 1 for balanced, 0 otherwise\n    return 0;\n}`,
        solutionCode: `int checkSimple(char str[]) {\n    int count = 0;\n    for(int i=0; str[i]; i++) {\n        if(str[i]=='(') count++;\n        else if(str[i]==')') { count--; if(count<0) return 0; }\n    }\n    return count == 0;\n}`,
        testCases: [{ input: '(())()', expected: '1' }, { input: '(()', expected: '0' }]
      }
    ],
    vivaQuestions: [
      {
        id: 'bp-v1',
        type: 'mcq',
        question: 'What is the state of the stack when an expression "{[}]" is processed?',
        options: ['Stack is empty', 'Mismatch detected when checking } against [', 'Stack overflow', 'Valid balanced'],
        correctAnswer: 1,
        explanation: 'At index 2, ] expects [ on top of stack, but encounters } or vice versa, causing an immediate mismatch.'
      }
    ],
    defaultCodeSnippet: `#include <stdio.h>\n#include <string.h>\n\nint isBalanced(char exp[]) {\n    char stack[100]; int top = -1;\n    for(int i = 0; i < strlen(exp); i++) {\n        char c = exp[i];\n        if (c == '(' || c == '{' || c == '[') stack[++top] = c;\n        else if (c == ')' || c == '}' || c == ']') {\n            if (top == -1) return 0;\n            char topChar = stack[top--];\n            if (c == ')' && topChar != '(') return 0;\n            if (c == '}' && topChar != '{') return 0;\n            if (c == ']' && topChar != '[') return 0;\n        }\n    }\n    return top == -1;\n}`
  },

  'exp-05': {
    id: 'exp-05',
    number: '05',
    title: 'IMPLEMENTATION OF QUEUE',
    shortTitle: 'IMPLEMENTATION OF QUEUE',
    topics: 'Queue using Arrays and Queue using Linked List',
    aim: 'To implement the Queue Abstract Data Type using array circular buffer and linked list, supporting Enqueue and Dequeue operations.',
    problemStatement: 'Develop a First-In-First-Out (FIFO) queue data structure. Address the false overflow problem of linear arrays by implementing circular wrap-around indexing.',
    objectives: [
      'Implement FIFO queue with front and rear pointers.',
      'Implement circular array arithmetic: rear = (rear + 1) % MAX.',
      'Implement dynamic linked queue without capacity limitations.'
    ],
    requiredConcepts: ['FIFO Principle', 'Front and Rear indexing', 'Circular array modulo arithmetic'],
    syllabusScope: ['Queue using Arrays (linear/circular)', 'Queue using Linked List'],
    expectedOutput: `Enqueue: 10, 20, 30\nFront: 10, Rear: 30\nDequeued: 10\nDequeued: 20\nRemaining Queue: [30]`,
    learningOutcome: 'CO1 (Apply): Implement FIFO queue buffering and circular indexing.',
    theory: {
      introduction: 'A Queue is a linear data structure adhering to FIFO (First In First Out). Insertion happens at the Rear end and deletion occurs at the Front end.',
      importantConcepts: [
        { title: 'FIFO Order', desc: 'First element inserted is the first element serviced.' },
        { title: 'Circular Queue', desc: 'Connects the last position back to the first position using modulo arithmetic: (rear + 1) % SIZE.' },
        { title: 'Queue Full Condition', desc: '(front == 0 && rear == SIZE - 1) || (rear == (front - 1) % (SIZE - 1)).' }
      ],
      howItWorks: 'Enqueue advances rear pointer. Dequeue advances front pointer. Modulo indexing ensures deleted space is reused.',
      realWorldExample: 'Ticket counter queue, CPU round-robin task scheduler, or print spooler.',
      stepByStepExplanation: [
        'Check full condition. If full, print Queue Overflow.',
        'If empty (front == -1), set front = rear = 0.',
        'Else if rear == SIZE - 1 and front != 0, wrap rear = 0.',
        'Else increment rear = rear + 1.',
        'Insert element at items[rear].'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: Check if queue is full.',
        'Step 3: If not full, advance rear and insert item.',
        'Step 4: For dequeue, retrieve items[front] and advance front.',
        'Step 5: Exit.'
      ],
      pseudocode: `FUNCTION Enqueue(val):
    IF IsFull() THEN
        PRINT "Queue Overflow"
    ELSE
        rear = (rear + 1) % MAX
        queue[rear] = val
    END IF
END FUNCTION`,
      timeComplexity: {
        best: 'O(1)',
        avg: 'O(1)',
        worst: 'O(1)',
        explanation: 'Enqueue and Dequeue modify front/rear index directly in constant time.'
      },
      spaceComplexity: {
        auxiliary: 'O(N)',
        explanation: 'Allocated array buffer size.'
      }
    },
    flowchartNodes: [
      { id: '1', type: 'start', text: 'START ENQUEUE', next: '2' },
      { id: '2', type: 'decision', text: 'Is Queue Full?', yesTarget: '3', noTarget: '4' },
      { id: '3', type: 'io', text: 'Print "Queue Full"', next: '6' },
      { id: '4', type: 'process', text: 'rear = (rear + 1) % SIZE\nqueue[rear] = item', next: '5' },
      { id: '5', type: 'io', text: 'Print "Enqueued"', next: '6' },
      { id: '6', type: 'end', text: 'END' }
    ],
    practiceProblems: [
      {
        id: 'q-p1',
        title: 'Check if Circular Queue is Full',
        difficulty: 'Beginner',
        description: 'Given front, rear, and size, return 1 if circular queue is full, else 0.',
        inputFormat: 'int front, int rear, int size',
        outputFormat: '1 or 0',
        sampleInput: 'front=0, rear=4, size=5',
        sampleOutput: '1',
        hint: 'Full when (rear + 1) % size == front.',
        starterCode: `int isFull(int front, int rear, int size) {\n    return 0;\n}`,
        solutionCode: `int isFull(int front, int rear, int size) {\n    return (rear + 1) % size == front;\n}`,
        testCases: [{ input: '0 4 5', expected: '1' }]
      }
    ],
    vivaQuestions: [
      {
        id: 'q-v1',
        type: 'mcq',
        question: 'What is the primary advantage of a Circular Queue over a Linear Queue?',
        options: ['O(1) search', 'Memory reuse without shifting elements', 'Stores multiple data types', 'No need for pointers'],
        correctAnswer: 1,
        explanation: 'Circular queues reuse slots freed by dequeue operations using modulo arithmetic.'
      }
    ],
    defaultCodeSnippet: `#include <stdio.h>\n#define SIZE 5\nint q[SIZE], front = -1, rear = -1;\n\nvoid enqueue(int val) {\n    if ((rear + 1) % SIZE == front) { printf("Full\\n"); return; }\n    if (front == -1) front = 0;\n    rear = (rear + 1) % SIZE;\n    q[rear] = val;\n}`
  },

  'exp-06': {
    id: 'exp-06',
    number: '06',
    title: 'BINARY SEARCH TREES',
    shortTitle: 'BINARY SEARCH TREES',
    topics: 'Binary Search Trees implementation and traversals',
    aim: 'To implement a Binary Search Tree (BST) supporting recursive insertion, search, and Inorder, Preorder, and Postorder tree traversals.',
    problemStatement: 'Construct a hierarchical binary tree where each node adheres to the BST property: left subtree keys < node key < right subtree keys. Implement depth traversals and search validation.',
    objectives: [
      'Define tree node structure with data, left, and right child pointers.',
      'Implement recursive insertion maintaining binary search property.',
      'Implement Inorder, Preorder, and Postorder traversals.'
    ],
    requiredConcepts: ['Hierarchical non-linear structures', 'BST invariant', 'Tree traversals'],
    syllabusScope: ['BST Node structure', 'Recursive insert and search', 'Inorder, Preorder, Postorder'],
    expectedOutput: `Inserted Keys: 50, 30, 70, 20, 40, 60, 80\nInorder Traversal (Sorted): 20 30 40 50 60 70 80\nPreorder Traversal: 50 30 20 40 70 60 80\nSearch Key 40: FOUND`,
    learningOutcome: 'CO1 (Apply): Implement hierarchical non-linear binary search trees and traversals.',
    theory: {
      introduction: 'A Binary Search Tree (BST) is a node-based binary tree data structure where each node has at most two children, and the key in any node is greater than all keys in its left subtree and less than all keys in its right subtree.',
      importantConcepts: [
        { title: 'BST Property', desc: 'Left child < Parent < Right child.' },
        { title: 'Inorder Property', desc: 'Inorder traversal (Left, Root, Right) of a BST produces elements in strictly ascending sorted order.' },
        { title: 'Logarithmic Search', desc: 'At each node, half of the remaining tree is eliminated, achieving O(log N) search time on balanced trees.' }
      ],
      howItWorks: 'To insert: compare new key with current root. If smaller, recurse left; if larger, recurse right. Attach new node at first NULL pointer found.',
      realWorldExample: 'Database indexing (B-Trees / BST variants) and dictionary auto-completion.',
      stepByStepExplanation: [
        'If tree is empty, return newly allocated node.',
        'If key < root->key, root->left = insert(root->left, key).',
        'Else if key > root->key, root->right = insert(root->right, key).',
        'Return root pointer.'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: If root is NULL, allocate and return new node.',
        'Step 3: If val < root->data, insert into left subtree.',
        'Step 4: Else insert into right subtree.',
        'Step 5: Return root.'
      ],
      pseudocode: `FUNCTION InsertBST(root, val):
    IF root == NULL THEN
        RETURN NewNode(val)
    IF val < root.data THEN
        root.left = InsertBST(root.left, val)
    ELSE
        root.right = InsertBST(root.right, val)
    END IF
    RETURN root
END FUNCTION`,
      timeComplexity: {
        best: 'O(log N)',
        avg: 'O(log N)',
        worst: 'O(N) (Skewed tree)',
        explanation: 'Balanced BST provides O(log N) operations. In the worst case (unbalanced linked-list shape), it degrades to O(N).'
      },
      spaceComplexity: {
        auxiliary: 'O(H)',
        explanation: 'Recursive call stack height H, where H = log N (balanced) or N (skewed).'
      }
    },
    flowchartNodes: [
      { id: '1', type: 'start', text: 'START INSERT', next: '2' },
      { id: '2', type: 'decision', text: 'Is root == NULL ?', yesTarget: '3', noTarget: '4' },
      { id: '3', type: 'process', text: 'Create NewNode(val)\nReturn NewNode', next: '7' },
      { id: '4', type: 'decision', text: 'Is val < root->data ?', yesTarget: '5', noTarget: '6' },
      { id: '5', type: 'process', text: 'root->left = Insert(root->left, val)', next: '7' },
      { id: '6', type: 'process', text: 'root->right = Insert(root->right, val)', next: '7' },
      { id: '7', type: 'end', text: 'END' }
    ],
    practiceProblems: [
      {
        id: 'bst-p1',
        title: 'Search in a Binary Search Tree',
        difficulty: 'Beginner',
        description: 'Implement struct Node* searchBST(struct Node* root, int key) returning node if key exists, NULL otherwise.',
        inputFormat: 'BST root pointer and key to search',
        outputFormat: 'Pointer to node or NULL',
        sampleInput: 'Tree: 10, 20, 30 | Search: 20',
        sampleOutput: 'Found Node (20)',
        hint: 'If root == NULL or root->data == key, return root. If key < root->data search left, else right.',
        starterCode: `struct Node* searchBST(struct Node* root, int key) {\n    // Implement search\n    return NULL;\n}`,
        solutionCode: `struct Node* searchBST(struct Node* root, int key) {\n    if (root == NULL || root->data == key) return root;\n    if (key < root->data) return searchBST(root->left, key);\n    return searchBST(root->right, key);\n}`,
        testCases: [{ input: 'root 20', expected: 'Node 20' }]
      }
    ],
    vivaQuestions: [
      {
        id: 'bst-v1',
        type: 'mcq',
        question: 'Which traversal of a Binary Search Tree produces values in strictly sorted ascending order?',
        options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
        correctAnswer: 1,
        explanation: 'Inorder visits Left Subtree, Root, then Right Subtree, which maps to sorted numerical order in a BST.'
      }
    ],
    defaultCodeSnippet: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *left, *right;\n};\n\nstruct Node* insert(struct Node* node, int key) {\n    if (node == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = key; n->left = n->right = NULL;\n        return n;\n    }\n    if (key < node->data) node->left = insert(node->left, key);\n    else node->right = insert(node->right, key);\n    return node;\n}`
  },

  'exp-07': {
    id: 'exp-07',
    number: '07',
    title: "DIJKSTRA'S ALGORITHM",
    shortTitle: "DIJKSTRA'S ALGORITHM",
    topics: "Implementation of Dijkstra's Algorithm",
    aim: "To implement Dijkstra's Single-Source Shortest Path algorithm on a weighted directed/undirected graph.",
    problemStatement: 'Given a connected weighted graph with non-negative edge weights and a source vertex, find the minimum distance from the source to every other vertex.',
    objectives: [
      'Represent graph as an adjacency matrix with edge weights.',
      'Maintain distance array and visited (sptSet) array.',
      'Apply greedy relaxation: dist[v] = min(dist[v], dist[u] + weight(u, v)).'
    ],
    requiredConcepts: ['Graph Adjacency Matrix', 'Greedy Choice Property', 'Edge Relaxation'],
    syllabusScope: ["Implementation of Dijkstra's Algorithm", 'Greedy vertex relaxation'],
    expectedOutput: `Source Vertex: 0\nVertex   Distance from Source\n0        0\n1        4\n2        12\n3        19\n4        21\n5        11`,
    learningOutcome: 'CO2 (Apply): Implement greedy graph shortest-path optimization algorithms.',
    theory: {
      introduction: "Dijkstra's Algorithm solves the single-source shortest path problem for a graph with non-negative edge weights using a greedy strategy.",
      importantConcepts: [
        { title: 'Distance Array', desc: 'dist[i] holds shortest distance from source to vertex i. Initialized to Infinity, with dist[source] = 0.' },
        { title: 'Visited Set (sptSet)', desc: 'Keeps track of vertices whose minimum distance is finalized.' },
        { title: 'Edge Relaxation', desc: 'If dist[u] + weight(u, v) < dist[v], update dist[v] = dist[u] + weight(u, v).' }
      ],
      howItWorks: 'Find unvisited vertex u with minimum dist[u]. Mark u visited. For all neighbors v of u, relax edge (u, v). Repeat V times.',
      realWorldExample: 'Google Maps GPS route optimization finding shortest road distance from start to destination.',
      stepByStepExplanation: [
        'Set dist[src] = 0 and all other dist[v] = Infinity.',
        'Choose unvisited vertex u with minimum dist[u].',
        'Mark u as visited.',
        'Update dist[v] for all adjacent vertices v.',
        'Repeat until all vertices are visited.'
      ],
      algorithmSteps: [
        'Step 1: Initialize dist[] to INF, dist[src] = 0.',
        'Step 2: Loop V times.',
        'Step 3: Pick vertex u with min dist not yet processed.',
        'Step 4: Mark u as visited.',
        'Step 5: Relax adjacent vertices v: if dist[u] + graph[u][v] < dist[v], update dist[v].',
        'Step 6: Output dist[] array.'
      ],
      pseudocode: `FUNCTION Dijkstra(graph, src):
    FOR v = 0 TO V-1:
        dist[v] = INF, visited[v] = FALSE
    dist[src] = 0
    FOR count = 0 TO V-1:
        u = MinDistanceVertex(dist, visited)
        visited[u] = TRUE
        FOR EACH neighbor v OF u:
            IF NOT visited[v] AND dist[u] + weight(u, v) < dist[v] THEN
                dist[v] = dist[u] + weight(u, v)
    RETURN dist
END FUNCTION`,
      timeComplexity: {
        best: 'O(V^2) or O((V+E)log V)',
        avg: 'O(V^2)',
        worst: 'O(V^2)',
        explanation: 'With adjacency matrix, finding min vertex takes O(V) across V iterations -> O(V^2). With min-heap, it is O((V+E) log V).'
      },
      spaceComplexity: {
        auxiliary: 'O(V)',
        explanation: 'Distance and visited arrays of size V.'
      }
    },
    flowchartNodes: [
      { id: '1', type: 'start', text: 'START', next: '2' },
      { id: '2', type: 'process', text: 'Initialize dist[v] = INF\ndist[src] = 0, sptSet[] = FALSE', next: '3' },
      { id: '3', type: 'decision', text: 'All vertices processed?', yesTarget: '7', noTarget: '4' },
      { id: '4', type: 'process', text: 'u = minDistance(dist, sptSet)\nsptSet[u] = TRUE', next: '5' },
      { id: '5', type: 'process', text: 'For each neighbor v:\nIf dist[u] + w < dist[v] -> dist[v] = dist[u] + w', next: '3' },
      { id: '6', type: 'io', text: 'Display Shortest Distances', next: '7' },
      { id: '7', type: 'end', text: 'END' }
    ],
    practiceProblems: [
      {
        id: 'dijk-p1',
        title: 'Find Minimum Distance Vertex',
        difficulty: 'Beginner',
        description: 'Write a helper function int minDistance(int dist[], int sptSet[], int V) that returns index of vertex with minimum dist value among unvisited vertices.',
        inputFormat: 'dist array, sptSet array, V',
        outputFormat: 'Index of min distance vertex',
        sampleInput: 'dist = [0, 4, 12], sptSet = [1, 0, 0]',
        sampleOutput: '1',
        hint: 'Loop through vertices, find minimum dist[v] where sptSet[v] == 0.',
        starterCode: `int minDistance(int dist[], int sptSet[], int V) {\n    // Implement min distance search\n    return 0;\n}`,
        solutionCode: `int minDistance(int dist[], int sptSet[], int V) {\n    int min = 999999, min_index = -1;\n    for(int v=0; v<V; v++) {\n        if(!sptSet[v] && dist[v] <= min) { min = dist[v]; min_index = v; }\n    }\n    return min_index;\n}`,
        testCases: [{ input: 'dist=[0,4,12]', expected: '1' }]
      }
    ],
    vivaQuestions: [
      {
        id: 'dijk-v1',
        type: 'mcq',
        question: "Why does Dijkstra's Algorithm fail on graphs with negative edge weights?",
        options: ['Greedy choice assumes path costs can never decrease later', 'Causes infinite loop', 'Adjacency matrix cannot store negative values', 'Takes exponential time'],
        correctAnswer: 0,
        explanation: 'Once a node is marked visited in Dijkstra, its distance is assumed final. A negative edge can retroactively decrease that cost, violating the greedy invariant.'
      }
    ],
    defaultCodeSnippet: `#include <stdio.h>\n#include <limits.h>\n#define V 5\n\nint minDistance(int dist[], int sptSet[]) {\n    int min = INT_MAX, min_index;\n    for (int v = 0; v < V; v++)\n        if (!sptSet[v] && dist[v] <= min) min = dist[v], min_index = v;\n    return min_index;\n}`
  },

  'exp-08': {
    id: 'exp-08',
    number: '08',
    title: 'MINIMUM SPANNING TREE',
    shortTitle: 'MINIMUM SPANNING TREE',
    topics: "Implementation of minimum spanning using Kruskal's and Prim's algorithms",
    aim: "To implement Kruskal's (Disjoint Set Union) and Prim's (Cut property) greedy algorithms to find the Minimum Spanning Tree (MST) of a weighted connected graph.",
    problemStatement: 'Connect all V vertices in a weighted graph using exactly V - 1 edges such that total edge weight is minimized without forming cycles.',
    objectives: [
      "Implement Kruskal's algorithm by sorting edges and using Disjoint Set Union (find & union) for cycle detection.",
      "Implement Prim's algorithm by growing a tree from an arbitrary start vertex using priority vertex cut.",
      'Compute and print minimum spanning tree edges and cumulative weight.'
    ],
    requiredConcepts: ['Spanning Tree (V vertices, V-1 edges)', 'Disjoint Set Union (DSU)', 'Cut Property'],
    syllabusScope: ["Kruskal's algorithm (edge sorting, DSU)", "Prim's algorithm (vertex expansion)"],
    expectedOutput: `Selected MST Edges:\nEdge (0 - 1) Cost: 2\nEdge (1 - 2) Cost: 3\nEdge (0 - 3) Cost: 6\nTotal MST Weight: 11`,
    learningOutcome: 'CO3 (Analyze): Analyze and implement minimum spanning tree greedy algorithms for network optimization.',
    theory: {
      introduction: 'A Spanning Tree of a connected graph is a subgraph containing all vertices with minimum number of edges (V - 1) and no cycles. A Minimum Spanning Tree (MST) has minimum possible total edge weight.',
      importantConcepts: [
        { title: "Kruskal's Algorithm", desc: 'Sorts all edges in ascending order. Greedily adds edges that do not create cycles using Disjoint Set Union (Find/Union).' },
        { title: "Prim's Algorithm", desc: 'Grows an MST from a starting vertex by repeatedly selecting the minimum weight edge crossing from visited to unvisited vertices.' },
        { title: 'Cycle Detection', desc: 'In Kruskal, if find(u) == find(v), adding edge (u, v) would form a cycle.' }
      ],
      howItWorks: "In Kruskal's: sort edges. Iterate through sorted edges: if source and dest belong to different sets, add edge to MST and union their sets until V-1 edges are added.",
      realWorldExample: 'Laying telecommunication cables, electrical power grid lines, or designing road networks connecting cities at minimum construction cost.',
      stepByStepExplanation: [
        'Sort all edges in non-decreasing order of weight.',
        'Initialize disjoint set with V isolated subsets.',
        'Pick smallest edge. Check if endpoints belong to same set.',
        'If not, include edge in MST and union subsets.',
        'Repeat until V - 1 edges are included.'
      ],
      algorithmSteps: [
        'Step 1: Sort edges E by weight.',
        'Step 2: Initialize DSU parent array parent[i] = -1.',
        'Step 3: For each edge (u, v): if find(u) != find(v), add to MST and Union(u, v).',
        'Step 4: Stop when edge count == V - 1.',
        'Step 5: Output MST edges and total weight.'
      ],
      pseudocode: `FUNCTION Kruskal(edges, V):
    SORT(edges BY weight)
    dsu = NewDSU(V)
    mst = []
    FOR EACH edge(u, v, w) IN edges:
        IF dsu.Find(u) != dsu.Find(v) THEN
            mst.Append(edge)
            dsu.Union(u, v)
            IF len(mst) == V - 1 THEN BREAK
    RETURN mst
END FUNCTION`,
      timeComplexity: {
        best: 'O(E log E)',
        avg: 'O(E log E)',
        worst: 'O(E log E)',
        explanation: 'Dominant step is sorting edges: O(E log E). DSU operations take near-constant time O(alpha(V)).'
      },
      spaceComplexity: {
        auxiliary: 'O(V + E)',
        explanation: 'Parent and rank arrays for DSU take O(V); edge list takes O(E).'
      }
    },
    flowchartNodes: [
      { id: '1', type: 'start', text: 'START KRUSKAL', next: '2' },
      { id: '2', type: 'process', text: 'Sort all edges in ascending weight', next: '3' },
      { id: '3', type: 'process', text: 'Initialize DSU: parent[i] = i, count = 0', next: '4' },
      { id: '4', type: 'decision', text: 'Count < V - 1 ?', yesTarget: '5', noTarget: '8' },
      { id: '5', type: 'decision', text: 'Find(u) == Find(v) ? (Cycle?)', yesTarget: '4', noTarget: '6' },
      { id: '6', type: 'process', text: 'Add (u, v) to MST\nUnion(u, v)\ncount = count + 1', next: '4' },
      { id: '7', type: 'io', text: 'Display MST Edges & Weight', next: '8' },
      { id: '8', type: 'end', text: 'END' }
    ],
    practiceProblems: [
      {
        id: 'mst-p1',
        title: 'Disjoint Set Find Operation',
        difficulty: 'Beginner',
        description: 'Implement find(int parent[], int i) with path compression for cycle detection.',
        inputFormat: 'parent array and node index',
        outputFormat: 'Root representative of node',
        sampleInput: 'parent=[0,0,1], find(2)',
        sampleOutput: '0',
        hint: 'If parent[i] == i, return i; otherwise return find(parent, parent[i]).',
        starterCode: `int findRoot(int parent[], int i) {\n    // Implement find\n    return i;\n}`,
        solutionCode: `int findRoot(int parent[], int i) {\n    if (parent[i] == i) return i;\n    return parent[i] = findRoot(parent, parent[i]);\n}`,
        testCases: [{ input: '2', expected: '0' }]
      }
    ],
    vivaQuestions: [
      {
        id: 'mst-v1',
        type: 'mcq',
        question: 'How many edges are present in a Minimum Spanning Tree of a connected graph with V vertices?',
        options: ['V', 'V - 1', 'V + 1', 'E - 1'],
        correctAnswer: 1,
        explanation: 'Any tree with V vertices has exactly V - 1 edges and no cycles.'
      }
    ],
    defaultCodeSnippet: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Edge {\n    int src, dest, weight;\n};\n\nint find(int parent[], int i) {\n    if (parent[i] == -1) return i;\n    return find(parent, parent[i]);\n}\n\nvoid Union(int parent[], int x, int y) {\n    parent[x] = y;\n}`
  },

  'exp-09': {
    id: 'exp-09',
    number: '09',
    title: 'SORTING ALGORITHMS',
    shortTitle: 'SORTING ALGORITHMS',
    topics: 'Program to sort set of elements using Insertion sort, Merge sort, and Quick sort',
    aim: 'To implement, benchmark, and compare Insertion Sort, Merge Sort (Divide & Conquer), and Quick Sort algorithms.',
    problemStatement: 'Develop C programs to sort an array of N integers using Insertion Sort, Merge Sort, and Quick Sort. Analyze their comparative running times and partition strategies.',
    objectives: [
      'Implement in-place adaptive Insertion Sort for small/nearly sorted data.',
      'Implement divide-and-conquer Merge Sort with guaranteed O(N log N) time.',
      'Implement in-place divide-and-conquer Quick Sort using Lomuto or Hoare partitioning.'
    ],
    requiredConcepts: ['Divide and Conquer paradigm', 'In-place vs Auxiliary storage', 'Pivot selection & partition'],
    syllabusScope: ['Insertion Sort', 'Merge Sort', 'Quick Sort'],
    expectedOutput: `Original: [64, 25, 12, 22, 11]\nInsertion Sort: [11, 12, 22, 25, 64]\nMerge Sort:     [11, 12, 22, 25, 64]\nQuick Sort:     [11, 12, 22, 25, 64]`,
    learningOutcome: 'CO3 (Analyze): Evaluate time and space efficiency of sorting algorithms.',
    theory: {
      introduction: 'Sorting is the process of arranging elements in numerical or lexicographical order. Insertion sort builds sorted prefix iteratively. Merge sort divides array in halves and merges them. Quick sort partitions around a pivot.',
      importantConcepts: [
        { title: 'Insertion Sort', desc: 'Takes element and inserts it into its correct position in the already-sorted sub-array.' },
        { title: 'Merge Sort', desc: 'Divides array into halves until singletons remain, then merges sorted halves using O(N) auxiliary space.' },
        { title: 'Quick Sort', desc: 'Selects pivot, places pivot in correct position with smaller elements on left and larger on right, then recurses.' }
      ],
      howItWorks: 'Merge sort splits at mid = (l+r)/2, sorts left and right recursively, then merges both halves. Quick sort partitions array around pivot such that left <= pivot <= right.',
      realWorldExample: 'Sorting playing cards in hand (Insertion Sort), or sorting massive databases with external merge sort.',
      stepByStepExplanation: [
        'Insertion: For i = 1 to n-1: key = arr[i], shift larger elements right, insert key.',
        'Merge: If l < r: mid = (l+r)/2, mergeSort(l, mid), mergeSort(mid+1, r), merge(l, mid, r).',
        'Quick: If l < r: p = partition(l, r), quickSort(l, p-1), quickSort(p+1, r).'
      ],
      algorithmSteps: [
        'Step 1: Start.',
        'Step 2: Choose algorithm.',
        'Step 3: For Merge: split array, recurse on halves, merge sorted sub-arrays.',
        'Step 4: For Quick: pick pivot, partition array, recurse on left and right.',
        'Step 5: Output sorted array.'
      ],
      pseudocode: `FUNCTION MergeSort(arr, l, r):
    IF l < r THEN
        m = (l + r) / 2
        MergeSort(arr, l, m)
        MergeSort(arr, m + 1, r)
        Merge(arr, l, m, r)
    END IF
END FUNCTION`,
      timeComplexity: {
        best: 'Insertion: O(N) | Merge: O(N log N) | Quick: O(N log N)',
        avg: 'Insertion: O(N^2) | Merge: O(N log N) | Quick: O(N log N)',
        worst: 'Insertion: O(N^2) | Merge: O(N log N) | Quick: O(N^2)',
        explanation: 'Merge sort guarantees O(N log N) in all cases. Quick sort average is O(N log N), but worst-case is O(N^2) on bad pivot choices.'
      },
      spaceComplexity: {
        auxiliary: 'Insertion: O(1) | Merge: O(N) | Quick: O(log N)',
        explanation: 'Merge sort requires O(N) buffer for merging; Quick sort requires O(log N) stack frames; Insertion sort is in-place O(1).'
      }
    },
    flowchartNodes: [
      { id: '1', type: 'start', text: 'START MERGE SORT', next: '2' },
      { id: '2', type: 'decision', text: 'Is left < right ?', yesTarget: '3', noTarget: '6' },
      { id: '3', type: 'process', text: 'mid = (left + right) / 2\nMergeSort(left, mid)\nMergeSort(mid + 1, right)', next: '4' },
      { id: '4', type: 'process', text: 'Merge(left, mid, right)', next: '5' },
      { id: '5', type: 'io', text: 'Sorted Sub-array', next: '6' },
      { id: '6', type: 'end', text: 'END' }
    ],
    practiceProblems: [
      {
        id: 'sort-p1',
        title: 'Partition Array for Quick Sort',
        difficulty: 'Intermediate',
        description: 'Implement int partition(int arr[], int low, int high) using last element as pivot.',
        inputFormat: 'int arr[], int low, int high',
        outputFormat: 'Pivot index',
        sampleInput: '[10, 80, 30, 90, 40, 50, 70]',
        sampleOutput: 'Pivot index 4 (Value 70)',
        hint: 'Use index i = low - 1. Swap elements smaller than pivot with arr[++i].',
        starterCode: `int partition(int arr[], int low, int high) {\n    // Implement partition\n    return low;\n}`,
        solutionCode: `int partition(int arr[], int low, int high) {\n    int pivot = arr[high]; int i = low - 1;\n    for(int j=low; j<high; j++) {\n        if(arr[j] < pivot) { i++; int t=arr[i]; arr[i]=arr[j]; arr[j]=t; }\n    }\n    int t = arr[i+1]; arr[i+1] = arr[high]; arr[high] = t;\n    return i + 1;\n}`,
        testCases: [{ input: 'array', expected: 'partitioned' }]
      }
    ],
    vivaQuestions: [
      {
        id: 'sort-v1',
        type: 'mcq',
        question: 'Which sorting algorithm has a guaranteed worst-case time complexity of O(N log N)?',
        options: ['Quick Sort', 'Merge Sort', 'Insertion Sort', 'Bubble Sort'],
        correctAnswer: 1,
        explanation: 'Merge Sort always divides the problem into equal halves and takes O(N) to merge, guaranteeing O(N log N) worst-case time.'
      }
    ],
    defaultCodeSnippet: `#include <stdio.h>\n\nvoid insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i], j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}`
  }
}
