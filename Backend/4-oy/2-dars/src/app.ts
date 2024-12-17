interface Foydalanuvchi {
  id: number;
  first_name: string;
  second_name: string;
  third_name?: string;
}

const user: Foydalanuvchi = {
  id: 1,
  first_name: "Ali",
  second_name: "Ali",
};

interface Foydalanuvchi2 extends Foydalanuvchi {
  third_name: string;
  age: number;
}

const user2: Foydalanuvchi2 = {
  id: 1,
  first_name: "Ali",
  second_name: "Ali",
  third_name: "ali",
  age: 34,
};
