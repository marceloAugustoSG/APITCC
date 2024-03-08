import { prisma } from "../services/prisma.js";
// receber parametros da url , como por exemplo:

//pagina 1 com 4 consultas, vai me retornar as 4 primeiras consultas do meu bd

//pagina 3 com 4 consultas ,vai me retornar a partir da decima segunda (12) consulta com 4 consultas

//como fazer isso :

// digamos que eu tenh 10 consultas,quero paginar da seguinte forma:
// quero ter 4 itens por pagina,sendo assim terei duas paginas de 4 itens e 1 pagina com 2 ,totalizando 10 consultas
//numero total de itens = 10 ; numero de itens por pagina = 4, total de paginas = numero total de itens /

export const ConsultasPagination = async () => {
  const results = await prisma.consulta.findMany({
    take: 1,
    skip: 0,
  
  });
  console.log("entrou aqui");
  return results;
};
