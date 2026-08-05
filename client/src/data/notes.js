export const notes = [
    {
        topic: "Arrays",

        definition:
            "Arrays store elements in contiguous memory locations and allow constant time random access.",

        complexity: [
            { operation: "Access", value: "O(1)" },
            { operation: "Search", value: "O(n)" },
            { operation: "Insertion", value: "O(n)" },
            { operation: "Deletion", value: "O(n)" },
        ],

        tips: [
            "Think about Prefix Sum.",
            "Use Sliding Window when dealing with subarrays.",
            "Two Pointer technique solves many problems efficiently.",
        ],

        mistakes: [
            "Forgetting edge cases.",
            "Index out of bounds.",
            "Ignoring duplicate elements.",
        ],
        patterns: [
            "Prefix Sum",
            "Sliding Window",
            "Two Pointer",
            "Kadane's Algorithm",
            "Binary Search on Answer",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/array-data-structure-guide/",
            video: "https://www.youtube.com/watch?v=37E9ckMDdTk",
            practice: "https://leetcode.com/tag/array/",
            visualizer: "https://visualgo.net/en/array",
        },
    },

    {
        topic: "Strings",

        definition:
            "Strings are sequences of characters used to represent text.",

        complexity: [
            { operation: "Traversal", value: "O(n)" },
            { operation: "Concatenation", value: "O(n)" },
        ],

        tips: [
            "Use frequency arrays.",
            "HashMap is useful.",
            "Sliding Window appears frequently.",
        ],

        mistakes: [
            "Ignoring uppercase/lowercase.",
            "Wrong substring indexes.",
        ],
        patterns: [
            "Sliding Window",
            "HashMap",
            "Frequency Count",
            "Two Pointer",
            "KMP (Advanced)",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/string-data-structure/",
            video: "https://www.youtube.com/watch?v=-AQAB6kPq5U",
            practice: "https://leetcode.com/tag/string/",
            visualizer: "https://visualgo.net/en",
        },
    },
    {
        topic: "Linked List",

        definition:
            "A Linked List is a linear data structure where each node contains data and a reference to the next node, allowing efficient insertion and deletion.",

        complexity: [
            { operation: "Access", value: "O(n)" },
            { operation: "Search", value: "O(n)" },
            { operation: "Insertion", value: "O(1)" },
            { operation: "Deletion", value: "O(1)" },
        ],

        tips: [
            "Always draw the linked list before coding.",
            "Use dummy nodes to simplify edge cases.",
            "Carefully update next pointers.",
        ],

        mistakes: [
            "Losing the head pointer.",
            "Forgetting to check for null.",
            "Incorrect pointer updates.",
        ],

        patterns: [
            "Fast & Slow Pointer",
            "Dummy Node",
            "Reverse Linked List",
            "Merge Lists",
            "Cycle Detection",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/data-structures/linked-list/",
            video: "https://www.youtube.com/watch?v=58YbpRDc4yw",
            practice: "https://leetcode.com/tag/linked-list/",
            visualizer: "https://visualgo.net/en/list",
        },
    },
    {
        topic: "Stack",

        definition:
            "A Stack is a linear data structure that follows the Last In First Out (LIFO) principle.",

        complexity: [
            { operation: "Push", value: "O(1)" },
            { operation: "Pop", value: "O(1)" },
            { operation: "Peek", value: "O(1)" },
            { operation: "Search", value: "O(n)" },
        ],

        tips: [
            "Think LIFO whenever stack is mentioned.",
            "Stacks are useful for recursion problems.",
            "Monotonic Stack is frequently asked in interviews.",
        ],

        mistakes: [
            "Popping from an empty stack.",
            "Confusing queue with stack.",
            "Ignoring stack overflow/underflow.",
        ],

        patterns: [
            "Monotonic Stack",
            "Next Greater Element",
            "Balanced Parentheses",
            "Expression Evaluation",
            "Recursion Simulation",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/stack-data-structure/",
            video: "https://www.youtube.com/watch?v=GYptUgnIM_I",
            practice: "https://leetcode.com/tag/stack/",
            visualizer: "https://visualgo.net/en/list",
        },
    },
    {
        topic: "Queue",

        definition:
            "A Queue is a linear data structure that follows the First In First Out (FIFO) principle.",

        complexity: [
            { operation: "Enqueue", value: "O(1)" },
            { operation: "Dequeue", value: "O(1)" },
            { operation: "Front", value: "O(1)" },
            { operation: "Search", value: "O(n)" },
        ],

        tips: [
            "Think FIFO whenever queue is mentioned.",
            "Deque is useful in Sliding Window problems.",
            "Queues are heavily used in BFS traversal.",
        ],

        mistakes: [
            "Dequeuing from an empty queue.",
            "Confusing queue with stack.",
            "Incorrect front and rear updates.",
        ],

        patterns: [
            "Breadth First Search",
            "Deque",
            "Circular Queue",
            "Level Order Traversal",
            "Sliding Window Maximum",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/queue-data-structure/",
            video: "https://www.youtube.com/watch?v=MuvopJ4QslI",
            practice: "https://leetcode.com/tag/queue/",
            visualizer: "https://visualgo.net/en/list",
        },
    },
    {
        topic: "Trees",

        definition:
            "A Tree is a hierarchical data structure consisting of nodes connected by edges with one root node and zero or more child nodes.",

        complexity: [
            { operation: "Traversal", value: "O(n)" },
            { operation: "Search", value: "O(n)" },
            { operation: "Insertion", value: "O(n)" },
            { operation: "Deletion", value: "O(n)" },
        ],

        tips: [
            "Draw the tree before solving.",
            "Master DFS and BFS traversals.",
            "Recursion is the key to most tree problems.",
        ],

        mistakes: [
            "Incorrect base case.",
            "Confusing preorder, inorder and postorder.",
            "Forgetting null checks.",
        ],

        patterns: [
            "DFS",
            "BFS",
            "Recursive Traversal",
            "Level Order",
            "Lowest Common Ancestor",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/binary-tree-data-structure/",
            video: "https://www.youtube.com/watch?v=_ANrF3FJm7I",
            practice: "https://leetcode.com/tag/tree/",
            visualizer: "https://visualgo.net/en/bst",
        },
    },
    {
        topic: "Binary Search Tree",

        definition:
            "A Binary Search Tree (BST) is a binary tree where the left subtree contains smaller values and the right subtree contains larger values.",

        complexity: [
            { operation: "Search", value: "O(log n)" },
            { operation: "Insertion", value: "O(log n)" },
            { operation: "Deletion", value: "O(log n)" },
            { operation: "Traversal", value: "O(n)" },
        ],

        tips: [
            "Remember the BST property.",
            "Inorder traversal gives sorted order.",
            "Think recursively.",
        ],

        mistakes: [
            "Violating BST property.",
            "Incorrect deletion cases.",
            "Ignoring duplicate values.",
        ],

        patterns: [
            "BST Validation",
            "Inorder Traversal",
            "Successor/Predecessor",
            "Lowest Common Ancestor",
            "Balanced BST",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/",
            video: "https://www.youtube.com/watch?v=pYT9F8_LFTM",
            practice: "https://leetcode.com/tag/binary-search-tree/",
            visualizer: "https://visualgo.net/en/bst",
        },
    },
    {
        topic: "Heap",

        definition:
            "A Heap is a complete binary tree that satisfies the heap property and is commonly used to implement priority queues.",

        complexity: [
            { operation: "Insert", value: "O(log n)" },
            { operation: "Delete", value: "O(log n)" },
            { operation: "Peek", value: "O(1)" },
            { operation: "Build Heap", value: "O(n)" },
        ],

        tips: [
            "Use Priority Queue instead of implementing heap manually.",
            "Max Heap and Min Heap are equally important.",
            "Heaps are useful for Top K problems.",
        ],

        mistakes: [
            "Confusing heap with BST.",
            "Using wrong heap type.",
            "Forgetting heapify after deletion.",
        ],

        patterns: [
            "Top K Elements",
            "Priority Queue",
            "Kth Largest",
            "Merge K Sorted Lists",
            "Median Finder",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/heap-data-structure/",
            video: "https://www.youtube.com/watch?v=HqPJF2L5h9U",
            practice: "https://leetcode.com/tag/heap-priority-queue/",
            visualizer: "https://visualgo.net/en/heap",
        },
    },
    {
        topic: "Graph",

        definition:
            "A Graph is a non-linear data structure consisting of vertices (nodes) connected by edges.",

        complexity: [
            { operation: "DFS", value: "O(V + E)" },
            { operation: "BFS", value: "O(V + E)" },
            { operation: "Shortest Path", value: "O((V+E) logV)" },
            { operation: "Topological Sort", value: "O(V + E)" },
        ],

        tips: [
            "Always identify whether the graph is directed or undirected.",
            "Know both BFS and DFS thoroughly.",
            "Draw the graph whenever possible.",
        ],

        mistakes: [
            "Not marking visited nodes.",
            "Infinite recursion in DFS.",
            "Choosing wrong graph representation.",
        ],

        patterns: [
            "DFS",
            "BFS",
            "Topological Sort",
            "Union Find",
            "Shortest Path",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
            video: "https://www.youtube.com/watch?v=Qzf1a--rhp8",
            practice: "https://leetcode.com/tag/graph/",
            visualizer: "https://visualgo.net/en/graph",
        },
    },
    {
        topic: "Dynamic Programming",

        definition:
            "Dynamic Programming is an optimization technique used to solve overlapping subproblems by storing previously computed results.",

        complexity: [
            { operation: "Memoization", value: "Depends on state" },
            { operation: "Tabulation", value: "Depends on state" },
        ],

        tips: [
            "Find the state first.",
            "Write recurrence relation.",
            "Convert recursion into tabulation.",
        ],

        mistakes: [
            "Wrong state definition.",
            "Incorrect transitions.",
            "Forgetting base cases.",
        ],

        patterns: [
            "0/1 Knapsack",
            "LCS",
            "LIS",
            "Grid DP",
            "DP on Trees",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/dynamic-programming/",
            video: "https://www.youtube.com/watch?v=tyB0ztf0DNY",
            practice: "https://leetcode.com/tag/dynamic-programming/",
            visualizer: "https://visualgo.net/en",
        },
    },
    {
        topic: "Greedy",

        definition:
            "Greedy algorithms make the locally optimal choice at every step hoping to achieve a global optimum.",

        complexity: [
            { operation: "Sorting Based", value: "O(n log n)" },
            { operation: "Selection", value: "O(n)" },
        ],

        tips: [
            "Always try to prove why greedy works.",
            "Sorting is often required.",
            "Think locally optimal.",
        ],

        mistakes: [
            "Applying greedy where DP is needed.",
            "Ignoring proof of correctness.",
            "Choosing wrong sorting order.",
        ],

        patterns: [
            "Activity Selection",
            "Intervals",
            "Scheduling",
            "Fractional Knapsack",
            "Minimum Platforms",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/greedy-algorithms/",
            video: "https://www.youtube.com/watch?v=ARvQcqJ_-NY",
            practice: "https://leetcode.com/tag/greedy/",
            visualizer: "https://visualgo.net/en",
        },
    },
    {
        topic: "Backtracking",

        definition:
            "Backtracking is a recursive technique that explores all possible solutions and backtracks whenever a solution is invalid.",

        complexity: [
            { operation: "Worst Case", value: "Exponential" },
        ],

        tips: [
            "Think recursively.",
            "Draw recursion tree.",
            "Undo every choice before returning.",
        ],

        mistakes: [
            "Forgetting to backtrack.",
            "Wrong base case.",
            "Modifying shared state incorrectly.",
        ],

        patterns: [
            "Subsets",
            "Permutations",
            "N Queens",
            "Sudoku Solver",
            "Combination Sum",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/backtracking-algorithms/",
            video: "https://www.youtube.com/watch?v=DKCbsiDBN6c",
            practice: "https://leetcode.com/tag/backtracking/",
            visualizer: "https://visualgo.net/en",
        },
    },
    {
        topic: "Trie",

        definition:
            "Trie is a tree-based data structure used for efficient storage and searching of strings.",

        complexity: [
            { operation: "Insert", value: "O(L)" },
            { operation: "Search", value: "O(L)" },
            { operation: "Delete", value: "O(L)" },
        ],

        tips: [
            "Each level represents one character.",
            "Useful for dictionary problems.",
            "Excellent for prefix matching.",
        ],

        mistakes: [
            "Wrong child indexing.",
            "Ignoring end-of-word flag.",
            "Memory wastage.",
        ],

        patterns: [
            "Autocomplete",
            "Prefix Search",
            "Word Dictionary",
            "Bitwise Trie",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/trie-insert-and-search/",
            video: "https://www.youtube.com/watch?v=dBGUmUQhjaM",
            practice: "https://leetcode.com/tag/trie/",
            visualizer: "https://visualgo.net/en",
        },
    },
    {
        topic: "Binary Search",

        definition:
            "Binary Search efficiently finds an element in a sorted array by repeatedly dividing the search interval in half.",

        complexity: [
            { operation: "Search", value: "O(log n)" },
        ],

        tips: [
            "Always calculate mid safely.",
            "Think about search space.",
            "Binary Search on Answer is common.",
        ],

        mistakes: [
            "Infinite loops.",
            "Wrong mid calculation.",
            "Incorrect boundary updates.",
        ],

        patterns: [
            "Search Space",
            "Lower Bound",
            "Upper Bound",
            "Binary Search on Answer",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/binary-search/",
            video: "https://www.youtube.com/watch?v=tgVSkMA8joQ",
            practice: "https://leetcode.com/tag/binary-search/",
            visualizer: "https://visualgo.net/en/bst",
        },
    },
    {
        topic: "Sliding Window",

        definition:
            "Sliding Window is an optimization technique used to process contiguous subarrays or substrings efficiently.",

        complexity: [
            { operation: "Traversal", value: "O(n)" },
        ],

        tips: [
            "Use two pointers.",
            "Expand and shrink wisely.",
            "Maintain window condition.",
        ],

        mistakes: [
            "Not shrinking window.",
            "Incorrect frequency updates.",
            "Wrong window size.",
        ],

        patterns: [
            "Fixed Window",
            "Variable Window",
            "Longest Substring",
            "Minimum Window",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/window-sliding-technique/",
            video: "https://www.youtube.com/watch?v=MK-NZ4hN7rs",
            practice: "https://leetcode.com/problem-list/sliding-window/",
            visualizer: "https://visualgo.net/en",
        },
    },
    {
        topic: "System Design",

        definition:
            "System Design focuses on designing scalable, reliable and efficient software systems.",

        complexity: [
            { operation: "Scalability", value: "Conceptual" },
            { operation: "Availability", value: "Conceptual" },
        ],

        tips: [
            "Clarify requirements first.",
            "Discuss trade-offs.",
            "Think about scalability.",
        ],

        mistakes: [
            "Jumping into architecture too early.",
            "Ignoring bottlenecks.",
            "No discussion on trade-offs.",
        ],

        patterns: [
            "Load Balancer",
            "Caching",
            "Database Sharding",
            "Microservices",
            "Message Queue",
        ],

        resources: {
            notes: "https://www.geeksforgeeks.org/system-design-tutorial/",
            video: "https://www.youtube.com/watch?v=m8Icp_Cid5o",
            practice: "https://github.com/donnemartin/system-design-primer",
            visualizer: "https://excalidraw.com/",
        },
    },
];