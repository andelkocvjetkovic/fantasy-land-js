import { List } from "../daggy/list.mjs";
import { Bool } from "../daggy/bool.mjs";
const { True, False } = Bool;

const list1 = List.from([True, False, True, False]);
const list2 = List.from([True, True, True, False]);

const res = list1.equals(list2);

console.log("result: ", res);
