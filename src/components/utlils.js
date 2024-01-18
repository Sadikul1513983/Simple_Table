export const BookData = [
  {
    name: "Java Script",
    id: 1,
    rate: 4,
    publisherName: "John Duck",
    price: 450,
    publishYear: 2010,
  },
  {
    name: "Python",
    id: 2,
    rate: 4,
    publisherName: "Johnson",
    price: 350,
    publishYear: 2012,
  },
  {
    name: "PhP",
    id: 3,
    rate: 4,
    publisherName: "Mitchell",
    price: 320,
    publishYear: 2013,
  },
  {
    name: "C The Mother Language",
    id: 4,
    rate: 4,
    publisherName: "Nathan",
    price: 200,
    publishYear: 2015,
  },
  {
    name: "C Sharp The Founder",
    id: 5,
    rate: 4,
    publisherName: "Morgan",
    price: 250,
    publishYear: 2016,
  },
  {
    name: "React JS The GodFather",
    id: 6,
    rate: 4,
    publisherName: "Joe",
    price: 400,
    publishYear: 2017,
  },
  {
    name: "Next JS The Extension",
    id: 7,
    rate: 4,
    publisherName: "Butler",
    price: 500,
    publishYear: 2018,
  },
  { name: "Js && Jquery ", id: 8, rate: 4, publisherName: "Chris", price: 300 },
  {
    name: "The Programming World",
    id: 9,
    rate: 4,
    publisherName: "Wood",
    price: 180,
    publishYear: 2022,
  },
];

export default function useDebounce() {
  let typingTimeout = null;

  function debounce(func, wait = 1500) {
    clearTimeout(typingTimeout);
    const timer = setTimeout(() => {
      func();
    }, wait);
    typingTimeout = timer;
  }

  return debounce;
}
