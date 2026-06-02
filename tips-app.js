const readline = require('readline');

const tips = {
  java: [
    "Use 'StringBuilder' instead of '+' for string concatenation in loops to avoid creating multiple intermediate String objects.",
    "The 'final' keyword can be used to prevent method overriding and variable reassignment, which helps the compiler optimize code.",
    "Use try-with-resources statements to automatically close resources like files and streams, preventing resource leaks.",
    "Prefer composition over inheritance to create more flexible and maintainable code.",
    "Use the Stream API for functional-style operations on collections instead of traditional loops for cleaner code.",
    "Cache the results of expensive operations using memoization or lazy initialization patterns.",
    "Always override 'equals()' and 'hashCode()' together to maintain the contract when using objects in collections.",
    "Use Optional<T> instead of returning null to explicitly indicate that a value may be absent.",
    "Avoid using raw types; always use generics to ensure type safety and catch errors at compile time.",
    "Use 'instanceof' checks before casting objects to prevent ClassCastException at runtime.",
    "Prefer immutable objects to reduce bugs and improve thread safety in multi-threaded applications.",
    "Use the 'volatile' keyword for variables accessed by multiple threads to ensure visibility of changes."
  ],
  react: [
    "Use the 'key' prop correctly when rendering lists to help React identify which items have changed, improving performance and preventing bugs.",
    "Break your components into smaller, reusable pieces instead of creating large monolithic components for better maintainability and testability.",
    "Use React.memo() for functional components to prevent unnecessary re-renders when props haven't changed.",
    "Always clean up side effects in useEffect by returning a cleanup function to prevent memory leaks and duplicate subscriptions.",
    "Use the Context API for state that is accessed by many components to avoid prop drilling and simplify component trees.",
    "Use useCallback() to memoize functions passed to child components, preventing unnecessary child re-renders.",
    "Prefer controlled components where form input values are managed by React state for predictable behavior.",
    "Use useMemo() to memoize expensive computations and only recalculate when dependencies change.",
    "Use Error Boundaries to catch JavaScript errors anywhere in the component tree and display a fallback UI.",
    "Implement lazy loading with React.lazy() and Suspense to code split and load components only when needed.",
    "Lift state up to the nearest common ancestor when multiple components need to share state for better data flow.",
    "Use custom hooks to extract and reuse stateful logic across multiple components for cleaner code."
  ]
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.clear();
  console.log('╔═══════════════════════════════════╗');
  console.log('║      Tips Generator App           ║');
  console.log('╚═══════════════════════════════════╝\n');
  console.log('Select a topic:\n');

  const topics = Object.keys(tips);
  topics.forEach((topic, index) => {
    console.log(`  ${index + 1}. ${topic.charAt(0).toUpperCase() + topic.slice(1)}`);
  });

  console.log(`  ${topics.length + 1}. Exit\n`);
}

function getRandomTip(topic) {
  const topicTips = tips[topic];
  const randomIndex = Math.floor(Math.random() * topicTips.length);
  return topicTips[randomIndex];
}

function askQuestion(query) {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
}

async function main() {
  let running = true;

  while (running) {
    displayMenu();

    const choice = await askQuestion('Enter your choice: ');
    const topicKeys = Object.keys(tips);
    const selectedIndex = parseInt(choice) - 1;

    if (selectedIndex === topicKeys.length) {
      console.log('\nGoodbye! 👋\n');
      running = false;
    } else if (selectedIndex >= 0 && selectedIndex < topicKeys.length) {
      const selectedTopic = topicKeys[selectedIndex];
      const tip = getRandomTip(selectedTopic);

      console.log('\n' + '═'.repeat(60));
      console.log(`\n💡 ${selectedTopic.toUpperCase()} TIP:\n`);
      console.log(`${tip}\n`);
      console.log('═'.repeat(60) + '\n');

      await askQuestion('Press Enter to continue...');
    } else {
      console.log('\n❌ Invalid selection. Please try again.\n');
      await askQuestion('Press Enter to continue...');
    }
  }

  rl.close();
}

main().catch(err => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});
