import { add } from "./index";

function main() {
  const v = add(1, 2);
  console.log(v);
}

if (require.main === module) {
  main();
}
