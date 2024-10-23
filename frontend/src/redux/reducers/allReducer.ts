import { FaSwift } from 'react-icons/fa';

const initialState = {
  value: 0, // Test state değeri
};

const exampleReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'INCREMENT': // Sayacı arttırma
      return {
        ...state,
        value: state.value + 1,
      };
      case 'DECREMENT': // Azaltma İşlemi
      return{
        ...state,
        value: state.value - 1,
      };
default:
    return state; // Başka action olmadığında state'i olduğu gibi döner.
  }
};

export default exampleReducer;