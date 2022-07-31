import Task from "folktale/concurrency/task/index.js";
const { task, waitAll, of } = Task;

const users = [
  {
    userId: "1",
    name: "andjelko",
    friends: ["2", "3"],
  },
  {
    userId: "2",
    name: "julijana",
    friends: ["1", "3"],
  },
  {
    userId: "3",
    name: "nedeljko",
    friends: ["1", "2"],
  },
];

// getUserByName :: String -> Task String User
export const getUserByName = (name) =>
  task((resolver) => {
    const timerId = setTimeout(() => {
      const u = users.find((u) => u.name === name);
      u ? resolver.resolve(u) : resolver.reject("User not found");
    }, 2000);

    resolver.cleanup(() => {
      clearTimeout(timerId);
    });
  });

// getUserById :: String -> Task String User
export const getUserById = (userId) =>
  task((resolver) => {
    const timerId = setTimeout(() => {
      const u = users.find((u) => u.userId === userId);
      u ? resolver.resolve(u) : resolver.reject("User not found");
    }, 2000);

    resolver.cleanup(() => {
      clearTimeout(timerId);
    });
  });

// getFriends :: User -> Task String [User]
export const getFriends = (user) =>
  task((resolver) => {
    const timerId = setTimeout(() => {
      const u = users.find((u) => u === user);
      u ? resolver.resolve(u.friends) : resolver.reject("User not found");
    }, 2000);

    resolver.cleanup(() => {
      clearTimeout(timerId);
    });
  });

const optimisedGetFriends = (user) =>
  user.name == "Aki" ? of([]) : getFriends(user);
