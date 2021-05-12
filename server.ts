import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

import { ForDevs } from './4devs.ts';

const forDevs = new ForDevs();

const app = new Application();
const router = new Router();
const PORT = 3000;

router.get('/', async (ctx) => {
  const text = Deno.readTextFile('./index.html');
  await text.then((txt: string) => (ctx.response.body = txt));
});

router.get('/gerar-pessoa', async (ctx) => {
  const sexo = ctx.request.url.searchParams.get('sexo') || undefined;
  const pontuacao = ctx.request.url.searchParams.get('mascara') || undefined;
  const idade = ctx.request.url.searchParams.get('idade') || undefined;
  const estado = ctx.request.url.searchParams.get('estado') || undefined;
  const quantidade =
    ctx.request.url.searchParams.get('quantidade') || undefined;

  ctx.response.body = await forDevs.generatePeople(
    forDevs.fixGeneratePeopleSearchParams({
      sexo,
      pontuacao,
      idade,
      estado,
      quantidade,
    })
  );
});

router.get('/gerar-texto', async (ctx) => {
  const lorem = ctx.request.url.searchParams.get('lorem') || undefined;
  const retorno = ctx.request.url.searchParams.get('retorno') || undefined;
  const tipo = ctx.request.url.searchParams.get('tipo') || undefined;
  const quantidade =
    ctx.request.url.searchParams.get('quantidade') || undefined;

  ctx.response.body = await forDevs.generateText(
    forDevs.fixGenerateTextSearchParams({
      quantidade: quantidade,
      tipo,
      retorno,
      lorem,
    })
  );
});

router.get('/:file', async (ctx) => {
  const text = Deno.readTextFile(`./${ctx.params.file}.json`);
  await text.then((txt: Object) => (ctx.response.body = txt));
});

router.put('/:file', async (ctx) => {
  const write = Deno.writeTextFile(
    `./${ctx.params.file}.json`,
    JSON.stringify(await ctx.request.body().value)
  );
  write.then(() => console.log(`File written to ./${ctx.params.file}.json`));
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port: PORT });
