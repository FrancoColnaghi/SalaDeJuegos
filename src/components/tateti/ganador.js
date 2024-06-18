export const controlarGanador = (arr) => {
    let combinaciones_ganadoras = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    let hay_ganador = 0;
    combinaciones_ganadoras.map((comb, index) => {
      if (
        arr[comb[0]] !== null &&
        arr[comb[0]] === arr[comb[1]] &&
        arr[comb[0]] === arr[comb[2]]
        ) {
          hay_ganador = 1;
        }
    });
    if ( !arr.includes(null) && hay_ganador == 0 ) {
      hay_ganador = 2;
    }
    return hay_ganador;
  };