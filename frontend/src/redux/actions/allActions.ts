//bu acitonlar reducer'a state'i nasıl güncelleyeceğini söyler
export const increment = () => {
 return{
    type: 'INCREMENT',
 };
};
export const decrement = () => {
 return{
    type:'DECREMENT',
 }
};