/**
 * DSA LAB AI Explanation Service
 * Generates accurate, beginner-friendly line explanations and compiler error insights in English & Tanglish
 */

import type { ParsedCompilerError } from './compilerService'

export type ExplanationLanguage = 'english' | 'tanglish'

export interface LineExplanationResult {
  lineNumber: string
  codeSnippet: string
  language: ExplanationLanguage
  tag: string
  whatItDoes: string
  whyItIsUsed: string
  keywords: { keyword: string; meaning: string }[]
  example?: string
  multiLineOverview?: string
}

export interface ErrorExplanationResult {
  errorMessage: string
  errorLocation: string
  category: string
  meaningEnglish: string
  meaningTanglish: string
  whyItOccurred: string
  suggestedCorrection: string
  codeSnippet?: string
}

// =========================================================================
// 1. C CODE LINE EXPLANATION LOGIC
// =========================================================================

export function explainCodeLine(
  selectedCode: string,
  lineNumber: number | string,
  fullCode: string,
  lang: ExplanationLanguage = 'english'
): LineExplanationResult {
  const trimmed = selectedCode.trim()
  const isMultiLine = typeof lineNumber === 'string' && lineNumber.includes('-')

  // Check multi-line block
  if (isMultiLine) {
    if (lang === 'tanglish') {
      return {
        lineNumber: String(lineNumber),
        codeSnippet: selectedCode,
        language: 'tanglish',
        tag: 'Code Block',
        whatItDoes: 'Intha code block pala lines sernthu oru logic-ah (loop, function, or condition) run pannuthu.',
        whyItIsUsed: 'Sequential statements sernthu oru complete operation-ah execute panna ithu thevai.',
        keywords: [
          { keyword: 'Code Block { }', meaning: 'Multiple lines-ah grouping panni single unit-ah treat pannum container.' }
        ],
        multiLineOverview: 'Block-oda entry point-la irunthu exit point varaikkum step-by-step execution nadakuthu.'
      }
    }
    return {
      lineNumber: String(lineNumber),
      codeSnippet: selectedCode,
      language: 'english',
      tag: 'Code Block',
      whatItDoes: 'This selected code block executes multiple sequential statements working together as a single computational logic.',
      whyItIsUsed: 'Code blocks group operations, maintain localized variable scopes, and manage control flow branches.',
      keywords: [
        { keyword: 'Scope { }', meaning: 'Defines the boundary within which local variables and statements exist and execute.' }
      ],
      multiLineOverview: 'Control enters at the first line, executes internal statements sequentially, and exits upon block termination.'
    }
  }

  // Preprocessor Directives
  if (trimmed.startsWith('#include')) {
    const isStdio = trimmed.includes('stdio.h')
    const isStdlib = trimmed.includes('stdlib.h')
    if (lang === 'tanglish') {
      return {
        lineNumber: String(lineNumber),
        codeSnippet: trimmed,
        language: 'tanglish',
        tag: 'Header File',
        whatItDoes: isStdio
          ? 'Standard Input/Output library header-ah import pannuthu. Ithu iruntha thaan printf() mathiri functions work aagum.'
          : isStdlib
          ? 'Standard Utility Library-ah include pannuthu. malloc(), free(), exit() functions use panna ithu must.'
          : 'External header library-ah C program kulla link pannuthu.',
        whyItIsUsed: 'C language-la in-built functions direct-ah irukaathu, athanala compile panrathuku munnadi declarations thevai.',
        keywords: [
          { keyword: '#include', meaning: 'Preprocessor directive - compilation munnadi file-ah merge pannum.' },
          { keyword: isStdio ? '<stdio.h>' : '<stdlib.h>', meaning: 'C standard library header file.' }
        ],
        example: isStdio ? 'printf("Hello!");' : 'int *p = (int*)malloc(sizeof(int));'
      }
    }
    return {
      lineNumber: String(lineNumber),
      codeSnippet: trimmed,
      language: 'english',
      tag: 'Header File',
      whatItDoes: isStdio
        ? 'Includes the Standard Input Output header file, declaring fundamental I/O routines like printf() and scanf().'
        : isStdlib
        ? 'Includes the Standard Library header, enabling dynamic memory management (malloc, free) and process control.'
        : 'Instructs the C preprocessor to embed external header file declarations before compilation begins.',
      whyItIsUsed: 'In C, standard library functions must be formally declared in header files before they can be compiled and invoked.',
      keywords: [
        { keyword: '#include', meaning: 'Preprocessor command that copies and pastes header declarations into this compilation unit.' },
        { keyword: isStdio ? '<stdio.h>' : '<stdlib.h>', meaning: 'Standard C library header specification.' }
      ],
      example: isStdio ? 'printf("Result: %d", sum);' : 'ptr = (int*)malloc(10 * sizeof(int));'
    }
  }

  // Main Function Header
  if (trimmed.includes('main(')) {
    if (lang === 'tanglish') {
      return {
        lineNumber: String(lineNumber),
        codeSnippet: trimmed,
        language: 'tanglish',
        tag: 'Entry Point',
        whatItDoes: 'C Program-oda starting point ithu thaan. OS program-ah execute panna start pannum pothu main() function-ah thaan first call pannum.',
        whyItIsUsed: 'Every C application-ku mandatory entry point irukanum. Ithu illana linker error varum.',
        keywords: [
          { keyword: 'int', meaning: 'Function mudiyum pothu operating system-ku integer status code return pannum.' },
          { keyword: 'main()', meaning: 'C program-oda primary execution entry function.' }
        ],
        example: 'int main() { ... return 0; }'
      }
    }
    return {
      lineNumber: String(lineNumber),
      codeSnippet: trimmed,
      language: 'english',
      tag: 'Entry Point',
      whatItDoes: 'Declares the main() function, which serves as the designated entry point where program execution initiates.',
      whyItIsUsed: 'The operating system and C runtime environment mandate main() as the starting routine for process creation.',
      keywords: [
        { keyword: 'int', meaning: 'Return type indicating the process termination status back to the host operating system.' },
        { keyword: 'main()', meaning: 'The designated execution entry point function signature.' }
      ],
      example: 'int main(int argc, char *argv[])'
    }
  }

  // Return Statement
  if (trimmed.startsWith('return')) {
    const isZero = trimmed.includes('0')
    if (lang === 'tanglish') {
      return {
        lineNumber: String(lineNumber),
        codeSnippet: trimmed,
        language: 'tanglish',
        tag: 'Control Return',
        whatItDoes: isZero
          ? 'Function mudinji OS-ku "0" return pannuthu. "0" na program entha error-um illama success-ah execute aagiruchi nu artham.'
          : 'Calculated value-ah call panna function-ku back tharuthu athoda intha function execution terminate aagum.',
        whyItIsUsed: 'Current function activation record-ah pop panni calling function-kitta control-ah thiruppi anupa ithu thevai.',
        keywords: [
          { keyword: 'return', meaning: 'Function execution-ah stop panni specified value-ah caller-kitta tharum keyword.' }
        ],
        example: 'return result;'
      }
    }
    return {
      lineNumber: String(lineNumber),
      codeSnippet: trimmed,
      language: 'english',
      tag: 'Control Return',
      whatItDoes: isZero
        ? 'Terminates main() and returns exit code 0 to the OS, signalling normal, error-free program termination.'
        : 'Passes the computed return value back to the caller function and pops the current stack frame from the call stack.',
      whyItIsUsed: 'Functions use return statements to transmit computational outputs and yield execution control back to their callers.',
      keywords: [
        { keyword: 'return', meaning: 'Jumps out of the executing function, destroying local stack scope and returning the operand.' }
      ],
      example: 'return n * factorial(n - 1);'
    }
  }

  // Recursion / Base Case Condition
  if (trimmed.startsWith('if') && (trimmed.includes('<= 1') || trimmed.includes('== 0') || trimmed.includes('== 1') || trimmed.includes('== NULL'))) {
    if (lang === 'tanglish') {
      return {
        lineNumber: String(lineNumber),
        codeSnippet: trimmed,
        language: 'tanglish',
        tag: 'Base Condition',
        whatItDoes: 'Recursion-oda Base Case check ithu. Condition match aana recursive call pogaama constant value return pannum.',
        whyItIsUsed: 'Base case illana recursive function mudiyame thirumba thirumba call aagi Stack Overflow error vanthurum!',
        keywords: [
          { keyword: 'if', meaning: 'Decision making statement - condition true-ah iruntha inner code run aagum.' },
          { keyword: 'Base Case', meaning: 'Recursion loop-ah terminate panna koodiya termination safety condition.' }
        ],
        example: 'if (n <= 1) return 1;'
      }
    }
    return {
      lineNumber: String(lineNumber),
      codeSnippet: trimmed,
      language: 'english',
      tag: 'Base Condition',
      whatItDoes: 'Evaluates the base case termination condition for the recursive routine. If true, it initiates stack unwinding without further recursion.',
      whyItIsUsed: 'Without a strictly reachable base case, recursive functions trigger unbounded call-stack growth resulting in stack overflow.',
      keywords: [
        { keyword: 'if (...)', meaning: 'Conditional control branch evaluating boolean truth value.' },
        { keyword: 'Base Case', meaning: 'The terminating condition that halts inductive recursion and initiates call-stack return propagation.' }
      ],
      example: 'if (head == NULL) return 0;'
    }
  }

  // Printf / Output
  if (trimmed.includes('printf(')) {
    if (lang === 'tanglish') {
      return {
        lineNumber: String(lineNumber),
        codeSnippet: trimmed,
        language: 'tanglish',
        tag: 'Standard Output',
        whatItDoes: 'Formatted text and variable values-ah terminal screen-la print panni display pannuthu.',
        whyItIsUsed: 'User-ku calculation results, prompts, matrum program output-ah kaatrathe intha function thaan.',
        keywords: [
          { keyword: 'printf()', meaning: 'Print Formatted function from stdio.h library.' },
          { keyword: '%d / %s', meaning: 'Format specifier - integer or string values-ah string-kulla inject panna use aagum.' }
        ],
        example: 'printf("Factorial of %d = %d\\n", n, fact);'
      }
    }
    return {
      lineNumber: String(lineNumber),
      codeSnippet: trimmed,
      language: 'english',
      tag: 'Standard Output',
      whatItDoes: 'Outputs formatted character sequences and formatted variables to stdout (standard output console stream).',
      whyItIsUsed: 'Provides interactive user feedback and renders final algorithmic results on the terminal interface.',
      keywords: [
        { keyword: 'printf()', meaning: 'Standard I/O library function that converts internal binary representations into formatted ASCII text.' },
        { keyword: '%d, %s, \\n', meaning: 'Format specifiers indicating variable interpolation types and newline escape sequences.' }
      ],
      example: 'printf("Result: %ld\\n", total);'
    }
  }

  // Pointer Operations
  if (trimmed.includes('*') && (trimmed.includes('int *') || trimmed.includes('struct Node*') || trimmed.includes('->') || trimmed.includes('&'))) {
    if (lang === 'tanglish') {
      return {
        lineNumber: String(lineNumber),
        codeSnippet: trimmed,
        language: 'tanglish',
        tag: 'Pointers & Memory',
        whatItDoes: 'Memory address-ah direct-ah access panni manipulate pannuthu. Variable-oda physical memory location-la velai seiyuthu.',
        whyItIsUsed: 'Pointers use panni dynamic memory allocation, linked lists, and call-by-reference operations-ah perform panna mudiyum.',
        keywords: [
          { keyword: '*', meaning: 'Dereference operator / Pointer type declarator.' },
          { keyword: '&', meaning: 'Address-of operator - variable-oda RAM memory address-ah tharum.' },
          { keyword: '->', meaning: 'Arrow operator - structure pointer moolama members-ah access panna use aagum.' }
        ],
        example: 'int *ptr = &val; printf("%d", *ptr);'
      }
    }
    return {
      lineNumber: String(lineNumber),
      codeSnippet: trimmed,
      language: 'english',
      tag: 'Pointers & Memory',
      whatItDoes: 'Performs memory address referencing or dereferencing, directly accessing memory locations in RAM.',
      whyItIsUsed: 'Pointers facilitate dynamic data structures (Linked Lists, BSTs), pass-by-reference modifications, and efficient memory operations.',
      keywords: [
        { keyword: '* (Pointer)', meaning: 'Declares pointer variables or dereferences pointers to access stored target values.' },
        { keyword: '& (Address-of)', meaning: 'Returns the hexadecimal memory address of the given operand variable in RAM.' }
      ],
      example: 'Node* temp = head->next;'
    }
  }

  // Loop Structures
  if (trimmed.startsWith('for') || trimmed.startsWith('while')) {
    if (lang === 'tanglish') {
      return {
        lineNumber: String(lineNumber),
        codeSnippet: trimmed,
        language: 'tanglish',
        tag: 'Looping',
        whatItDoes: 'Kudukapatta condition true-ah irukura varaikkum kulla irukura statements-ah repeatedly iterate panni execute pannuthu.',
        whyItIsUsed: 'Array elements-ah visit panna, list traverse panna, math calculation repeatedly panna loop thevai.',
        keywords: [
          { keyword: trimmed.startsWith('for') ? 'for loop' : 'while loop', meaning: 'Iterative control structure executing repeated blocks.' }
        ],
        example: 'for (int i = 0; i < n; i++)'
      }
    }
    return {
      lineNumber: String(lineNumber),
      codeSnippet: trimmed,
      language: 'english',
      tag: 'Looping',
      whatItDoes: 'Initiates a repetition loop that evaluates its control condition on every cycle, iterating through block statements until false.',
      whyItIsUsed: 'Essential for traversing linear data structures (arrays, linked lists) and executing repetitive transformations.',
      keywords: [
        { keyword: trimmed.startsWith('for') ? 'for' : 'while', meaning: 'Loop control construct checking initialization, condition, and increment/step.' }
      ],
      example: 'while (curr != NULL) { curr = curr->next; }'
    }
  }

  // Struct Definition
  if (trimmed.startsWith('struct') || trimmed.includes('typedef struct')) {
    if (lang === 'tanglish') {
      return {
        lineNumber: String(lineNumber),
        codeSnippet: trimmed,
        language: 'tanglish',
        tag: 'Data Structure',
        whatItDoes: 'User-defined composite data type create pannuthu. Pala different data types-ah (int, char, pointers) ore object kulla pack pannum.',
        whyItIsUsed: 'Linked List Node, Student Records mathiri complex real-world data structures-ah represent panna struct thevai.',
        keywords: [
          { keyword: 'struct', meaning: 'Heterogeneous data members-ah single group-ah define pannum C keyword.' }
        ],
        example: 'struct Node { int data; struct Node* next; };'
      }
    }
    return {
      lineNumber: String(lineNumber),
      codeSnippet: trimmed,
      language: 'english',
      tag: 'Data Structure',
      whatItDoes: 'Defines a user-defined record structure (struct) combining multiple heterogeneous fields under one type name.',
      whyItIsUsed: 'Core building block for ADTs including Singly Linked Lists, Stacks, Queues, and Binary Search Trees.',
      keywords: [
        { keyword: 'struct', meaning: 'Keyword declaring a compound data type composed of multiple named members in contiguous memory.' }
      ],
      example: 'struct Node { int val; struct Node *next; };'
    }
  }

  // General Statement Fallback
  if (lang === 'tanglish') {
    return {
      lineNumber: String(lineNumber),
      codeSnippet: trimmed,
      language: 'tanglish',
      tag: 'Statement',
      whatItDoes: `Intha line-la oru specific computation or assignment operation execute aaguthu: "${trimmed}".`,
      whyItIsUsed: 'Program flow-la variables-ah update panna, state change panna intha statement thevai.',
      keywords: [
        { keyword: 'Expression', meaning: 'C language-la evaluation mudinji memory update aagum operational unit.' }
      ],
      example: trimmed
    }
  }

  return {
    lineNumber: String(lineNumber),
    codeSnippet: trimmed,
    language: 'english',
    tag: 'Statement',
    whatItDoes: `Executes the statement: "${trimmed}", updating program memory state or performing an evaluation.`,
    whyItIsUsed: 'Implements algorithmic logic, variable mutation, or function parameter binding.',
    keywords: [
      { keyword: 'Statement', meaning: 'An executable line in C ending with a semicolon or establishing a control boundary.' }
    ],
    example: trimmed
  }
}

// =========================================================================
// 2. COMPILER ERROR EXPLANATION LOGIC
// =========================================================================

export function explainCompilerError(
  error: ParsedCompilerError,
  sourceCode: string,
  lang: ExplanationLanguage = 'english'
): ErrorExplanationResult {
  const msg = error.message.toLowerCase()
  const loc = error.line ? `Line ${error.line}${error.column ? `, Column ${error.column}` : ''}` : 'Location unconfirmed'

  // Scenario 1: Missing semicolon
  if (msg.includes("expected ';'") || msg.includes("expected ',' or ';'")) {
    return {
      errorMessage: error.message,
      errorLocation: loc,
      category: 'Syntax Error (Missing Semicolon)',
      meaningEnglish:
        'The C compiler encountered an incomplete statement. Every executable statement in C must terminate with a semicolon (;).',
      meaningTanglish:
        'C language-la ovvoru statement mudiyum pothum semicolon (;) koodukanum. Inga semicolon miss aana kaaranathala compiler adutha line-ah purinjika mudiyama error kaatudhu.',
      whyItOccurred:
        `Line ${error.line || 'before this'} has an expression or variable declaration that ended without a semicolon. The compiler tried to read the next token as part of the same line.`,
      suggestedCorrection:
        `Go to line ${error.line || 'the preceding line'} and append a semicolon (;) at the end of the statement before running again.`,
      codeSnippet: `// Add missing semicolon at end of statement\nint value = 10;  // <-- Ensure ';' is present`
    }
  }

  // Scenario 2: Undeclared identifier
  if (msg.includes('undeclared') || msg.includes('has not been declared')) {
    const varNameMatch = error.message.match(/‘([^’]+)’/) || error.message.match(/'([^']+)'/)
    const varName = varNameMatch ? varNameMatch[1] : 'the variable'
    return {
      errorMessage: error.message,
      errorLocation: loc,
      category: 'Declaration Error (Undeclared Identifier)',
      meaningEnglish:
        `You referenced '${varName}' before declaring its data type (e.g. int, float, char, or pointer). C requires all variables to be declared prior to use.`,
      meaningTanglish:
        `Neenga '${varName}' variable-ah use panrathukku munnadi athoda data type-ah (int, float, etc.) declare pannala. C-la declare pannama entha variable-um direct-ah use panna mudiyaathu.`,
      whyItOccurred:
        `The compiler looked in the local and global symbol tables for '${varName}' and found no matching definition. Either there is a spelling typo or the declaration is missing.`,
      suggestedCorrection:
        `Declare '${varName}' with its appropriate type at the top of the block, or check for typos in the variable name.`,
      codeSnippet: `int ${varName} = 0;  // <-- Declare variable before using it`
    }
  }

  // Scenario 3: Expected ')' or '}'
  if (msg.includes("expected ')'") || msg.includes("expected '}'")) {
    const isBrace = msg.includes("'}'")
    return {
      errorMessage: error.message,
      errorLocation: loc,
      category: 'Syntax Error (Unclosed Parenthesis / Block)',
      meaningEnglish:
        `A closing ${isBrace ? 'curly brace (})' : 'parenthesis ())'} is missing. In C, all opened blocks and argument lists must be properly matched and closed.`,
      meaningTanglish:
        `Oru open panna ${isBrace ? 'curly brace { }' : 'bracket ( )'} close aagama vitrukeenga. C-la ovvoru open bracket-kum kandippa matching closing bracket irukanum.`,
      whyItOccurred:
        `An open ${isBrace ? '{' : '('} was opened previously but the file ended or another block began before closing it.`,
      suggestedCorrection:
        `Trace the opened ${isBrace ? 'curly braces in your function' : 'parentheses in your expression'} and add the matching closing token.`,
      codeSnippet: isBrace ? `void myFunc() {\n    // Code here\n}  // <-- Ensure closing brace exists` : `if (x > 0) {  // <-- Ensure closing ')' exists`
    }
  }

  // Scenario 4: Undefined reference (Linker Error)
  if (msg.includes('undefined reference') || error.category === 'Linker Error') {
    return {
      errorMessage: error.message,
      errorLocation: loc,
      category: 'Linker Error (Undefined Reference)',
      meaningEnglish:
        'The compiler compiled the code into object format, but the linker cannot find the physical implementation of a function being called.',
      meaningTanglish:
        'Function-ah call pannirukeenga, aana antha function-oda body/implementation code-la illai. Linker-ala function address-ah kandupidikka mudiyala.',
      whyItOccurred:
        'A function prototype was declared or called, but its matching definition was never provided, or standard library headers were omitted.',
      suggestedCorrection:
        'Check function name spelling and verify that the full function body is written in your C file.',
      codeSnippet: `int calculateSum(int a, int b) {\n    return a + b; // <-- Make sure function body is written\n}`
    }
  }

  // Scenario 5: Segmentation Fault / Runtime Error
  if (error.category === 'Runtime Error' || msg.includes('segmentation fault') || msg.includes('sigsegv')) {
    return {
      errorMessage: error.message,
      errorLocation: loc,
      category: 'Runtime Error (Segmentation Fault)',
      meaningEnglish:
        'The program attempted to access an invalid or restricted memory location, typically via a NULL or dangling pointer.',
      meaningTanglish:
        'Program thappana memory address-ah access panna try panniruku (Segmentation Fault). NULL pointer-ah dereference pannumpotho illana array boundary thandumpotho ithu nadakkum.',
      whyItOccurred:
        'A pointer was dereferenced (e.g. ptr->next or *ptr) while ptr was equal to NULL, or memory was accessed out of allocated array bounds.',
      suggestedCorrection:
        'Add safety checks like `if (ptr != NULL)` before accessing pointer members, and ensure malloc() returned a valid address.',
      codeSnippet: `if (ptr != NULL) {\n    printf("%d", ptr->data); // Safe pointer access\n}`
    }
  }

  // Fallback General Compiler Error
  return {
    errorMessage: error.message,
    errorLocation: loc,
    category: error.category || 'Compiler Error',
    meaningEnglish:
      `The GCC compiler halted compilation because the source code violated C language grammatical or type safety rules: "${error.message}".`,
    meaningTanglish:
      `C Compiler code-la syntax or type safety thappu kandupudichiruku: "${error.message}". Intha line-la irukura syntax-ah correct panna thaan compile aagum.`,
    whyItOccurred:
      `GCC encountered unexpected tokens or invalid type conversions at ${loc}.`,
    suggestedCorrection:
      'Review the specified line and column against standard C syntax guidelines and verify all identifiers and symbols.',
    codeSnippet: `// Verify syntax near ${loc}\n${error.rawSnippet || ''}`
  }
}
