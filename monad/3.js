import daggy from "daggy";
import readline from "readline";
import Task from "folktale/concurrency/task/index.js";

const { task, of } = Task;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const User = daggy.tagged("User", ["name", "age"]);

// prompt :: Task _ String
const prompt = task((resolver) => rl.question(">", resolver.resolve));

// Unit == undefined
// speak :: String -> Promise Unit
const speak = (string) =>
  task((resolver) => resolver.resolve(console.log(string)));

// MyApp :: Task _ String
export const MyApp = speak("Whats your name?")
  .chain((_) => prompt)
  .chain((name) =>
    speak("And what is your age?")
      .chain((_) => prompt)
      .chain((age) =>
        age > 30
          ? speak("Seriously, " + name + "?!")
              .chain((_) =>
                speak("You don't look a day over " + (age - 10) + "!")
              )
              .chain((_) => of(age))
          : speak("Hmm, I can believe that!").chain((_) => of(age))
      )
      .chain((age) => of(User(name, age)))
  );

const BigApp = speak("PLAYER ONE")
  .chain((_) => MyApp)
  .chain((player1) =>
    speak("PLAYER TWO")
      .chain((_) => MyApp)
      .chain((player2) => speak(player1 + " vs " + player2))
  );
await BigApp.run().promise();
