import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Code2, BookOpen, FlaskConical, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

// DSA Topics data
const topics = [
  {
    id: 'arrays',
    title: 'Arrays',
    icon: '▦',
    color: '#123D2C',
    description: 'Arrays are contiguous memory locations that store elements of the same data type. They provide O(1) random access but O(n) for insertion/deletion.',
    timeComplexity: { access: 'O(1)', search: 'O(n)', insert: 'O(n)', delete: 'O(n)' },
    spaceComplexity: 'O(n)',
    code: `#include <stdio.h>
#define MAX 10

int arr[MAX];
int n = 0;

void insert(int element, int pos) {
    if (n >= MAX) {
        printf("Array is full!\\n");
        return;
    }
    for (int i = n; i > pos; i--)
        arr[i] = arr[i-1];
    arr[pos] = element;
    n++;
}

void display() {
    printf("Array: ");
    for (int i = 0; i < n; i++)
        printf("[%d] ", arr[i]);
    printf("\\n");
}

int main() {
    insert(10, 0);
    insert(20, 1);
    insert(15, 1); // Insert 15 at position 1
    display();
    return 0;
}`,
    visualization: 'array',
    problems: [
      'Find the maximum element in an array.',
      'Reverse an array in place.',
      'Find if a given element exists in a sorted array.',
      'Rotate an array by k positions.',
    ],
  },
  {
    id: 'linked-list',
    title: 'Linked Lists',
    icon: '→',
    color: '#1E5C3A',
    description: 'A linked list is a dynamic data structure where each node contains data and a pointer to the next node. Provides O(1) insertion/deletion at known positions.',
    timeComplexity: { access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)' },
    spaceComplexity: 'O(n)',
    code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void insertFront(int data) {
    struct Node* newNode = 
        (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = head;
    head = newNode;
}

void display() {
    struct Node* temp = head;
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");
}

int main() {
    insertFront(30);
    insertFront(20);
    insertFront(10);
    display(); // 10 -> 20 -> 30 -> NULL
    return 0;
}`,
    visualization: 'linked-list',
    problems: [
      'Reverse a singly linked list.',
      'Detect a cycle in a linked list.',
      'Find the middle element.',
      'Merge two sorted linked lists.',
    ],
  },
  {
    id: 'stack',
    title: 'Stack',
    icon: '⊕',
    color: '#2D7A5A',
    description: 'A Stack follows LIFO (Last In, First Out) principle. It supports push (insert) and pop (remove) operations from the same end called the "top".',
    timeComplexity: { access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)' },
    spaceComplexity: 'O(n)',
    code: `#include <stdio.h>
#define MAX 100

int stack[MAX];
int top = -1;

void push(int data) {
    if (top >= MAX - 1) {
        printf("Stack Overflow!\\n");
        return;
    }
    stack[++top] = data;
    printf("Pushed: %d\\n", data);
}

int pop() {
    if (top < 0) {
        printf("Stack Underflow!\\n");
        return -1;
    }
    return stack[top--];
}

void display() {
    printf("Stack (top to bottom): ");
    for (int i = top; i >= 0; i--)
        printf("%d ", stack[i]);
    printf("\\n");
}

int main() {
    push(10); push(20); push(30);
    display();
    printf("Popped: %d\\n", pop());
    display();
    return 0;
}`,
    visualization: 'stack',
    problems: [
      'Implement balanced parentheses checker.',
      'Evaluate a postfix expression.',
      'Implement stack using two queues.',
      'Next Greater Element for each array element.',
    ],
  },
  {
    id: 'queue',
    title: 'Queue',
    icon: '⇒',
    color: '#123D2C',
    description: 'A Queue follows FIFO (First In, First Out) principle. Elements are enqueued at the rear and dequeued from the front.',
    timeComplexity: { access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)' },
    spaceComplexity: 'O(n)',
    code: `#include <stdio.h>
#define MAX 100

int queue[MAX];
int front = 0, rear = -1, size = 0;

void enqueue(int data) {
    if (size >= MAX) {
        printf("Queue Full!\\n");
        return;
    }
    rear = (rear + 1) % MAX;
    queue[rear] = data;
    size++;
    printf("Enqueued: %d\\n", data);
}

int dequeue() {
    if (size == 0) {
        printf("Queue Empty!\\n");
        return -1;
    }
    int val = queue[front];
    front = (front + 1) % MAX;
    size--;
    return val;
}

int main() {
    enqueue(10); enqueue(20); enqueue(30);
    printf("Dequeued: %d\\n", dequeue());
    printf("Front: %d\\n", queue[front]);
    return 0;
}`,
    visualization: 'queue',
    problems: [
      'Implement queue using two stacks.',
      'Level-order traversal of a tree.',
      'Sliding window maximum.',
      'First non-repeating character in a stream.',
    ],
  },
  {
    id: 'bst',
    title: 'Binary Search Tree',
    icon: '⌥',
    color: '#1E5C3A',
    description: 'A BST is a binary tree where the left subtree has values less than the root and the right subtree has values greater. Provides O(log n) average-case operations.',
    timeComplexity: { access: 'O(log n)', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)' },
    spaceComplexity: 'O(n)',
    code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left, *right;
};

struct Node* newNode(int data) {
    struct Node* n = malloc(sizeof(struct Node));
    n->data = data;
    n->left = n->right = NULL;
    return n;
}

struct Node* insert(struct Node* root, int data) {
    if (!root) return newNode(data);
    if (data < root->data)
        root->left = insert(root->left, data);
    else if (data > root->data)
        root->right = insert(root->right, data);
    return root;
}

void inorder(struct Node* root) {
    if (root) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}

int main() {
    struct Node* root = NULL;
    root = insert(root, 50);
    insert(root, 30); insert(root, 70);
    insert(root, 20); insert(root, 40);
    printf("Inorder: ");
    inorder(root); // 20 30 40 50 70
    return 0;
}`,
    visualization: 'bst',
    problems: [
      'Find the kth smallest element in a BST.',
      'Convert BST to sorted doubly linked list.',
      'Check if a binary tree is a valid BST.',
      'Find LCA of two nodes in a BST.',
    ],
  },
  {
    id: 'graphs',
    title: 'Graphs',
    icon: '⬡',
    color: '#2D7A5A',
    description: 'A Graph is a collection of vertices (nodes) and edges connecting them. Used to model networks, relationships, and paths.',
    timeComplexity: { access: 'O(V+E)', search: 'O(V+E)', insert: 'O(1)', delete: 'O(E)' },
    spaceComplexity: 'O(V+E)',
    code: `#include <stdio.h>
#define V 6

int graph[V][V] = {0};

void addEdge(int u, int v) {
    graph[u][v] = 1;
    graph[v][u] = 1; // Undirected
}

// BFS Traversal
void bfs(int start) {
    int visited[V] = {0};
    int queue[V], front = 0, rear = 0;
    
    visited[start] = 1;
    queue[rear++] = start;
    
    printf("BFS: ");
    while (front < rear) {
        int v = queue[front++];
        printf("%d ", v);
        for (int i = 0; i < V; i++) {
            if (graph[v][i] && !visited[i]) {
                visited[i] = 1;
                queue[rear++] = i;
            }
        }
    }
    printf("\\n");
}

int main() {
    addEdge(0, 1); addEdge(0, 2);
    addEdge(1, 3); addEdge(2, 4);
    bfs(0); // 0 1 2 3 4
    return 0;
}`,
    visualization: 'graph',
    problems: [
      "Implement Dijkstra's shortest path algorithm.",
      'Find if a graph is bipartite.',
      'Detect a cycle in a directed graph.',
      'Find the number of connected components.',
    ],
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    icon: '↕',
    color: '#123D2C',
    description: 'Sorting arranges elements in a specific order. Covers Insertion Sort O(n²), Merge Sort O(n log n), and Quick Sort O(n log n) average.',
    timeComplexity: { access: 'N/A', search: 'N/A', insert: 'O(n log n)', delete: 'N/A' },
    spaceComplexity: 'O(log n)',
    code: `#include <stdio.h>

// Quick Sort
int partition(int arr[], int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i+1];
    arr[i+1] = arr[high];
    arr[high] = temp;
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = 5;
    quickSort(arr, 0, n - 1);
    printf("Sorted: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    // 11 12 22 25 64
    return 0;
}`,
    visualization: 'sorting',
    problems: [
      'Implement merge sort on a linked list.',
      'Sort an array of 0s, 1s, and 2s.',
      'Find the kth largest element using quickselect.',
      'Count inversions in an array.',
    ],
  },
  {
    id: 'searching',
    title: 'Searching Algorithms',
    icon: '🔍',
    color: '#1E5C3A',
    description: 'Searching finds a target element in a dataset. Linear Search is O(n) for unsorted, Binary Search is O(log n) for sorted arrays.',
    timeComplexity: { access: 'O(n)', search: 'O(log n)', insert: 'N/A', delete: 'N/A' },
    spaceComplexity: 'O(1)',
    code: `#include <stdio.h>

// Binary Search
int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1; // Not found
}

// Linear Search
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++)
        if (arr[i] == target) return i;
    return -1;
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56};
    int n = 8, target = 23;
    
    int idx = binarySearch(arr, n, target);
    if (idx != -1)
        printf("Found at index %d\\n", idx);
    else
        printf("Not found\\n");
    return 0;
}`,
    visualization: 'searching',
    problems: [
      'Find the first and last occurrence of an element.',
      'Search in a rotated sorted array.',
      'Find the peak element in an array.',
      'Find the floor and ceil of a number.',
    ],
  },
]

// Visualization components
function ArrayViz() {
  const [arr, setArr] = useState([12, 34, 56, 23, 45, 78, 11])
  const [highlighted, setHighlighted] = useState<number[]>([])
  const [inputVal, setInputVal] = useState('')

  const addElement = () => {
    const val = parseInt(inputVal)
    if (!isNaN(val)) {
      setArr(prev => [...prev, val])
      setInputVal('')
    }
  }

  const removeElement = (i: number) => {
    setHighlighted([i])
    setTimeout(() => {
      setArr(prev => prev.filter((_, idx) => idx !== i))
      setHighlighted([])
    }, 500)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-end">
        {arr.map((val, i) => (
          <motion.div
            key={i}
            layout
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex flex-col items-center gap-1 cursor-pointer"
            onClick={() => removeElement(i)}
          >
            <div
              className="w-12 flex items-center justify-center font-mono font-bold text-sm rounded-lg border-2 transition-all duration-300"
              style={{
                height: `${Math.min(val + 20, 100)}px`,
                background: highlighted.includes(i) ? '#ef4444' : '#123D2C',
                borderColor: highlighted.includes(i) ? '#ef4444' : '#B8E8D0',
                color: 'white',
              }}
            >
              {val}
            </div>
            <span className="text-xs text-text-dark/40">[{i}]</span>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="Value"
          className="border border-border-color rounded-lg px-3 py-2 text-sm w-24 focus:outline-none focus:border-primary-green"
          onKeyDown={e => e.key === 'Enter' && addElement()}
        />
        <button onClick={addElement} className="btn-primary text-xs px-4 py-2">Insert</button>
        <span className="text-xs text-text-dark/50">Click element to remove</span>
      </div>
    </div>
  )
}

function StackViz() {
  const [stack, setStack] = useState([10, 20, 30])
  const [inputVal, setInputVal] = useState('')

  const push = () => {
    const val = parseInt(inputVal)
    if (!isNaN(val) && stack.length < 8) {
      setStack(prev => [...prev, val])
      setInputVal('')
    }
  }

  const pop = () => {
    if (stack.length > 0) setStack(prev => prev.slice(0, -1))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col-reverse items-center gap-1" style={{ minHeight: 200 }}>
        <div className="w-28 h-1 bg-primary-green rounded-full" />
        {stack.map((val, i) => (
          <motion.div
            key={i}
            layout
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            className={`w-28 h-10 flex items-center justify-center font-mono font-bold text-sm rounded-lg border-2 ${
              i === stack.length - 1 ? 'bg-mint/30 border-primary-green text-primary-green' : 'bg-white border-border-color text-text-dark'
            }`}
          >
            {val} {i === stack.length - 1 && <span className="text-xs ml-1 text-secondary-green">← TOP</span>}
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="Value"
          className="border border-border-color rounded-lg px-3 py-2 text-sm w-24 focus:outline-none focus:border-primary-green"
          onKeyDown={e => e.key === 'Enter' && push()}
        />
        <button onClick={push} className="btn-primary text-xs px-4 py-2">PUSH</button>
        <button onClick={pop} className="bg-red-50 text-red-600 border border-red-200 text-xs px-4 py-2 rounded-full hover:bg-red-100 transition-colors">POP</button>
      </div>
    </div>
  )
}

function QueueViz() {
  const [queue, setQueue] = useState([10, 20, 30, 40])
  const [inputVal, setInputVal] = useState('')

  const enqueue = () => {
    const val = parseInt(inputVal)
    if (!isNaN(val) && queue.length < 8) {
      setQueue(prev => [...prev, val])
      setInputVal('')
    }
  }

  const dequeue = () => {
    if (queue.length > 0) setQueue(prev => prev.slice(1))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-1 items-center overflow-x-auto pb-2">
        <span className="text-xs text-secondary-green font-semibold mr-1">FRONT →</span>
        {queue.map((val, i) => (
          <motion.div
            key={i}
            layout
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className={`flex-shrink-0 w-14 h-14 flex items-center justify-center font-mono font-bold text-sm rounded-lg border-2 ${
              i === 0
                ? 'bg-mint/30 border-primary-green text-primary-green'
                : 'bg-white border-border-color text-text-dark'
            }`}
          >
            {val}
          </motion.div>
        ))}
        <span className="text-xs text-secondary-green font-semibold ml-1">← REAR</span>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="Value"
          className="border border-border-color rounded-lg px-3 py-2 text-sm w-24 focus:outline-none focus:border-primary-green"
          onKeyDown={e => e.key === 'Enter' && enqueue()}
        />
        <button onClick={enqueue} className="btn-primary text-xs px-4 py-2">ENQUEUE</button>
        <button onClick={dequeue} className="bg-red-50 text-red-600 border border-red-200 text-xs px-4 py-2 rounded-full hover:bg-red-100 transition-colors">DEQUEUE</button>
      </div>
    </div>
  )
}

function BSTViz() {
  const [nodes] = useState([
    { val: 50, x: 50, y: 10, left: 1, right: 2 },
    { val: 30, x: 25, y: 35, left: 3, right: 4, parent: 0 },
    { val: 70, x: 75, y: 35, left: null, right: null, parent: 0 },
    { val: 20, x: 12, y: 60, left: null, right: null, parent: 1 },
    { val: 40, x: 38, y: 60, left: null, right: null, parent: 1 },
  ])

  return (
    <div className="relative h-48 bg-bg rounded-xl border border-border-color overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        {/* Edges */}
        <line x1="50%" y1="18%" x2="25%" y2="41%" stroke="#B8E8D0" strokeWidth="2" />
        <line x1="50%" y1="18%" x2="75%" y2="41%" stroke="#B8E8D0" strokeWidth="2" />
        <line x1="25%" y1="41%" x2="12%" y2="66%" stroke="#B8E8D0" strokeWidth="2" />
        <line x1="25%" y1="41%" x2="38%" y2="66%" stroke="#B8E8D0" strokeWidth="2" />
      </svg>
      {nodes.map((node, i) => (
        <div
          key={i}
          className="absolute w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-bold border-2"
          style={{
            left: `calc(${node.x}% - 20px)`,
            top: `calc(${node.y}% - 10px)`,
            background: i === 0 ? '#123D2C' : '#F4EBDD',
            color: i === 0 ? 'white' : '#123D2C',
            borderColor: '#123D2C',
          }}
        >
          {node.val}
        </div>
      ))}
    </div>
  )
}

function SortingViz() {
  const [arr, setArr] = useState([64, 34, 25, 12, 22, 11, 90])
  const [sorting, setSorting] = useState(false)
  const [highlighted, setHighlighted] = useState<number[]>([])
  const [sorted, setSorted] = useState<number[]>([])

  const bubbleSort = async () => {
    setSorting(true)
    setSorted([])
    const a = [...arr]
    const n = a.length
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setHighlighted([j, j + 1])
        await new Promise(r => setTimeout(r, 300))
        if (a[j] > a[j + 1]) {
          const tmp = a[j]; a[j] = a[j + 1]; a[j + 1] = tmp
          setArr([...a])
        }
      }
      setSorted(prev => [...prev, n - 1 - i])
    }
    setSorted(a.map((_, i) => i))
    setHighlighted([])
    setSorting(false)
  }

  const reset = () => {
    setArr([64, 34, 25, 12, 22, 11, 90])
    setSorted([])
    setHighlighted([])
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-end" style={{ height: 120 }}>
        {arr.map((val, i) => (
          <motion.div
            key={i}
            layout
            className="flex-1 flex flex-col items-center justify-end gap-1"
          >
            <span className="text-xs font-mono text-text-dark/60">{val}</span>
            <div
              className="w-full rounded-t-lg transition-all duration-300"
              style={{
                height: `${val * 1.0}px`,
                background: sorted.includes(i) ? '#B8E8D0' : highlighted.includes(i) ? '#ef4444' : '#123D2C',
              }}
            />
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={bubbleSort} disabled={sorting} className="btn-primary text-xs px-4 py-2 disabled:opacity-50">
          <Play size={12} className="inline mr-1" /> Bubble Sort
        </button>
        <button onClick={reset} className="border border-border-color text-xs px-4 py-2 rounded-full hover:bg-mint/20">Reset</button>
      </div>
    </div>
  )
}

function SearchingViz() {
  const [arr] = useState([2, 5, 8, 12, 16, 23, 38, 56, 72, 91])
  const [target, setTarget] = useState('')
  const [searching, setSearching] = useState(false)
  const [low, setLow] = useState(-1)
  const [high, setHigh] = useState(-1)
  const [mid, setMid] = useState(-1)
  const [found, setFound] = useState(-1)

  const binarySearch = async () => {
    const t = parseInt(target)
    if (isNaN(t)) return
    setSearching(true)
    setFound(-1)
    let lo = 0, hi = arr.length - 1

    while (lo <= hi) {
      const m = Math.floor((lo + hi) / 2)
      setLow(lo); setHigh(hi); setMid(m)
      await new Promise(r => setTimeout(r, 600))

      if (arr[m] === t) {
        setFound(m)
        setSearching(false)
        return
      } else if (arr[m] < t) {
        lo = m + 1
      } else {
        hi = m - 1
      }
    }
    setLow(-1); setHigh(-1); setMid(-1)
    setSearching(false)
  }

  const reset = () => {
    setLow(-1); setHigh(-1); setMid(-1); setFound(-1); setTarget('')
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-1 flex-wrap">
        {arr.map((val, i) => (
          <div
            key={i}
            className="w-12 h-12 flex items-center justify-center rounded-lg font-mono text-sm font-bold border-2 transition-all duration-300"
            style={{
              background: found === i ? '#B8E8D0' : mid === i ? '#fbbf24' : (i >= low && i <= high && low !== -1) ? '#e0f2fe' : 'white',
              borderColor: found === i ? '#123D2C' : mid === i ? '#d97706' : '#D9E1D9',
              color: '#171917',
            }}
          >
            {val}
          </div>
        ))}
      </div>
      <div className="flex gap-2 text-xs text-text-dark/60">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-100 rounded" /> Search range</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-300 rounded" /> Mid element</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-mint rounded" /> Found</span>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={target}
          onChange={e => setTarget(e.target.value)}
          placeholder="Search for..."
          className="border border-border-color rounded-lg px-3 py-2 text-sm w-32 focus:outline-none focus:border-primary-green"
          onKeyDown={e => e.key === 'Enter' && binarySearch()}
        />
        <button onClick={binarySearch} disabled={searching} className="btn-primary text-xs px-4 py-2 disabled:opacity-50">
          Binary Search
        </button>
        <button onClick={reset} className="border border-border-color text-xs px-4 py-2 rounded-full hover:bg-mint/20">Reset</button>
      </div>
      {found !== -1 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-green-600 font-medium">
          ✓ Found {arr[found]} at index {found}
        </motion.p>
      )}
    </div>
  )
}

function GraphViz() {
  const nodes = [
    { id: 0, x: 50, y: 10, label: 'A' },
    { id: 1, x: 20, y: 40, label: 'B' },
    { id: 2, x: 80, y: 40, label: 'C' },
    { id: 3, x: 10, y: 75, label: 'D' },
    { id: 4, x: 50, y: 75, label: 'E' },
    { id: 5, x: 90, y: 75, label: 'F' },
  ]
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5]]

  return (
    <div className="relative h-52 bg-bg rounded-xl border border-border-color overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        {edges.map(([u, v], i) => (
          <line
            key={i}
            x1={`${nodes[u].x}%`} y1={`${nodes[u].y}%`}
            x2={`${nodes[v].x}%`} y2={`${nodes[v].y}%`}
            stroke="#B8E8D0" strokeWidth="2"
          />
        ))}
      </svg>
      {nodes.map(node => (
        <div
          key={node.id}
          className="absolute w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 border-primary-green bg-primary-green text-white hover:scale-110 transition-transform cursor-pointer"
          style={{ left: `calc(${node.x}% - 20px)`, top: `calc(${node.y}% - 20px)` }}
        >
          {node.label}
        </div>
      ))}
    </div>
  )
}

function LinkedListViz() {
  const [nodes, setNodes] = useState([10, 20, 30, 40])
  const [inputVal, setInputVal] = useState('')

  const addFront = () => {
    const v = parseInt(inputVal)
    if (!isNaN(v)) { setNodes(p => [v, ...p]); setInputVal('') }
  }
  const removeFront = () => setNodes(p => p.slice(1))

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center justify-center w-14 h-10 rounded-lg bg-secondary-green/20 text-secondary-green text-xs font-semibold">HEAD</div>
        <span className="text-secondary-green font-bold">→</span>
        {nodes.map((val, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="flex border-2 border-primary-green rounded-lg overflow-hidden">
              <div className="w-12 h-10 flex items-center justify-center font-mono text-sm font-bold bg-white text-primary-green">
                {val}
              </div>
              <div className="w-8 h-10 flex items-center justify-center bg-primary-green/10 text-primary-green text-xs">
                →
              </div>
            </div>
            {i < nodes.length - 1 && <span className="text-secondary-green font-bold">→</span>}
          </div>
        ))}
        <div className="flex items-center justify-center w-14 h-10 rounded-lg bg-red-50 text-red-400 text-xs font-semibold border border-red-200">NULL</div>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="Value"
          className="border border-border-color rounded-lg px-3 py-2 text-sm w-24 focus:outline-none focus:border-primary-green"
          onKeyDown={e => e.key === 'Enter' && addFront()}
        />
        <button onClick={addFront} className="btn-primary text-xs px-4 py-2">Insert Front</button>
        <button onClick={removeFront} className="bg-red-50 text-red-600 border border-red-200 text-xs px-4 py-2 rounded-full hover:bg-red-100 transition-colors">Remove Front</button>
      </div>
    </div>
  )
}

const vizMap: Record<string, React.FC> = {
  'array': ArrayViz,
  'linked-list': LinkedListViz,
  'stack': StackViz,
  'queue': QueueViz,
  'bst': BSTViz,
  'graph': GraphViz,
  'sorting': SortingViz,
  'searching': SearchingViz,
}

export default function LabsPage() {
  const [selectedTopic, setSelectedTopic] = useState(0)
  const [activeTab, setActiveTab] = useState<'concept' | 'code' | 'practice'>('concept')
  const { completedTopics, markTopicComplete, user } = useAuth()

  const topic = topics[selectedTopic]
  const VizComponent = vizMap[topic.visualization]

  return (
    <div className="page-transition min-h-screen bg-bg pt-16">
      {/* Header */}
      <div className="bg-primary-green text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <FlaskConical size={20} className="text-mint" />
              <span className="text-mint text-sm font-medium tracking-wide uppercase">Virtual Laboratory</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold">DSA Labs</h1>
            <p className="text-white/60 mt-2">Interactive Data Structures & Algorithms Learning</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">

          {/* Sidebar – Topic list */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-border-color shadow-sm overflow-hidden sticky top-20">
              <div className="p-4 bg-primary-green/5 border-b border-border-color">
                <h2 className="font-serif font-bold text-primary-green text-sm">Topics</h2>
                <p className="text-xs text-text-dark/50 mt-1">{completedTopics.length}/{topics.length} completed</p>
                <div className="mt-2 h-1.5 bg-border-color rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-green rounded-full transition-all duration-500"
                    style={{ width: `${(completedTopics.length / topics.length) * 100}%` }}
                  />
                </div>
              </div>
              <div className="divide-y divide-border-color">
                {topics.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => { setSelectedTopic(i); setActiveTab('concept') }}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors text-sm ${
                      selectedTopic === i ? 'bg-mint/20 text-primary-green' : 'hover:bg-bg text-text-dark/70'
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{t.icon}</span>
                    <span className="font-medium flex-1">{t.title}</span>
                    {completedTopics.includes(t.id) && (
                      <CheckCircle2 size={14} className="text-secondary-green flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Topic header */}
              <div className="bg-white rounded-2xl border border-border-color shadow-sm p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{topic.icon}</span>
                      <h2 className="font-serif text-2xl font-bold text-primary-green">{topic.title}</h2>
                      {completedTopics.includes(topic.id) && (
                        <span className="bg-mint/30 text-primary-green text-xs px-2 py-1 rounded-full font-medium">
                          Completed ✓
                        </span>
                      )}
                    </div>
                    <p className="text-text-dark/70 text-sm leading-relaxed">{topic.description}</p>
                  </div>
                  {user && !completedTopics.includes(topic.id) && (
                    <button
                      onClick={() => markTopicComplete(topic.id)}
                      className="flex-shrink-0 text-xs bg-primary-green text-white px-3 py-2 rounded-full hover:bg-green-mid transition-colors"
                    >
                      Mark Done
                    </button>
                  )}
                </div>

                {/* Complexity badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {Object.entries(topic.timeComplexity).map(([op, val]) => (
                    <span key={op} className="text-xs bg-bg border border-border-color px-2.5 py-1 rounded-full text-text-dark/60">
                      <span className="text-secondary-green font-semibold capitalize">{op}:</span> {val}
                    </span>
                  ))}
                  <span className="text-xs bg-bg border border-border-color px-2.5 py-1 rounded-full text-text-dark/60">
                    <span className="text-secondary-green font-semibold">Space:</span> {topic.spaceComplexity}
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-white rounded-xl border border-border-color p-1 shadow-sm">
                {(['concept', 'code', 'practice'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-primary-green text-white shadow-sm'
                        : 'text-text-dark/60 hover:text-primary-green'
                    }`}
                  >
                    {tab === 'concept' && <><BookOpen size={14} className="inline mr-1.5" />Concept</>}
                    {tab === 'code' && <><Code2 size={14} className="inline mr-1.5" />C Code</>}
                    {tab === 'practice' && <><FlaskConical size={14} className="inline mr-1.5" />Practice</>}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'concept' && (
                    <div className="bg-white rounded-2xl border border-border-color shadow-sm p-6">
                      <h3 className="font-serif text-lg font-bold text-primary-green mb-4">Interactive Visualization</h3>
                      {VizComponent && <VizComponent />}
                    </div>
                  )}

                  {activeTab === 'code' && (
                    <div className="bg-white rounded-2xl border border-border-color shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-serif text-lg font-bold text-primary-green">C Implementation</h3>
                        <button
                          onClick={() => navigator.clipboard.writeText(topic.code)}
                          className="text-xs text-secondary-green border border-border-color px-3 py-1 rounded-full hover:bg-mint/20"
                        >
                          Copy Code
                        </button>
                      </div>
                      <pre className="code-block overflow-x-auto">
                        <code>{topic.code}</code>
                      </pre>
                    </div>
                  )}

                  {activeTab === 'practice' && (
                    <div className="bg-white rounded-2xl border border-border-color shadow-sm p-6">
                      <h3 className="font-serif text-lg font-bold text-primary-green mb-4">Practice Problems</h3>
                      <div className="space-y-3">
                        {topic.problems.map((problem, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4 p-4 bg-bg rounded-xl border border-border-color hover:border-secondary-green transition-colors"
                          >
                            <span className="flex-shrink-0 w-7 h-7 bg-primary-green/10 text-primary-green rounded-full flex items-center justify-center text-xs font-bold">
                              {i + 1}
                            </span>
                            <span className="text-sm text-text-dark/80">{problem}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setSelectedTopic(p => Math.max(0, p - 1))}
                  disabled={selectedTopic === 0}
                  className="flex items-center gap-2 text-sm font-medium text-primary-green disabled:opacity-30 hover:text-green-mid transition-colors px-4 py-2 rounded-full border border-border-color"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span className="text-xs text-text-dark/40">{selectedTopic + 1} / {topics.length}</span>
                <button
                  onClick={() => setSelectedTopic(p => Math.min(topics.length - 1, p + 1))}
                  disabled={selectedTopic === topics.length - 1}
                  className="flex items-center gap-2 text-sm font-medium text-primary-green disabled:opacity-30 hover:text-green-mid transition-colors px-4 py-2 rounded-full border border-border-color"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

