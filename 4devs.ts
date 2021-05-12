export class ForDevs {
  constructor() {}

  private async requestTo4Devs(options: any, json: boolean) {
    const data = new FormData();
    Object.entries(options).forEach((item: any) =>
      data.append(item[0], item[1])
    );

    const request = await fetch(
      'https://www.4devs.com.br/ferramentas_online.php',
      {
        body: data,
        method: 'post',
      }
    );

    const result = json ? await request.json() : await request.text();

    return result;
  }

  public async generatePeople(options?: {
    sexo?: 'HOMEM' | 'MULHER';
    pontuacao?: 'SIM' | 'NAO';
    idade?: number;
    sigla_estado?:
      | 'AC'
      | 'AL'
      | 'AM'
      | 'AP'
      | 'BA'
      | 'CE'
      | 'DF'
      | 'ES'
      | 'GO'
      | 'MA'
      | 'MG'
      | 'MS'
      | 'MT'
      | 'PA'
      | 'PB'
      | 'PE'
      | 'PI'
      | 'PR'
      | 'RJ'
      | 'RN'
      | 'RS'
      | 'RO'
      | 'RR'
      | 'SC'
      | 'SE'
      | 'SP'
      | 'TO';
    quantidade?: number;
  }) {
    const opt = {
      acao: 'gerar_pessoa',
      sexo: `${options?.sexo?.slice(0) || 'I'}`,
      pontuacao: `${options?.pontuacao?.slice(0) || 'N'}`,
      idade: `${options?.idade || 0}`,
      cep_estado: `${options?.sigla_estado || ''}`,
      txt_qtde: `${options?.quantidade || 1}`,
      cep_cidade: '',
    };

    return this.requestTo4Devs(opt, true);
  }

  public async generateText(options?: {
    txt_qtde?: number;
    tipo?: 'PARAGRAFOS' | 'PALAVRAS';
    retorno?: 'texto' | 'html';
    lorem?: 'S' | 'N';
  }) {
    const opt = {
      acao: 'gerar_textos',
      txt_quantidade: `${options?.txt_qtde || 1}`,
      opcoes: options?.tipo?.toLowerCase().slice(0, 4),
      tipo_texto: `${options?.retorno || 'texto'}`,
      iniciar: `${options?.lorem || 'S'}`,
    };

    return this.requestTo4Devs(opt, false);
  }

  public fixGeneratePeopleSearchParams(options?: {
    sexo?: string;
    pontuacao?: string;
    idade?: string;
    estado?: string;
    quantidade?: string;
  }) {
    let return_object: any = {};

    return_object.idade = new Number(options?.idade || 0);

    return_object.quantidade = new Number(options?.quantidade || 1);

    return_object.sigla_estado = options?.estado;

    switch (options?.sexo) {
      case 'HOMEM':
      case 'MULHER':
        return_object.sexo = options.sexo[0];
        break;

      default:
        return_object.sexo = undefined;
        break;
    }

    switch (options?.pontuacao) {
      case 'SIM':
      case 'NAO':
        return_object.pontuacao = options.pontuacao[0];
        break;

      default:
        return_object.pontuacao = undefined;
        break;
    }

    return return_object;
  }

  public fixGenerateTextSearchParams(options?: {
    quantidade?: string;
    tipo?: string;
    retorno?: string;
    lorem?: string;
  }) {
    let return_object: any = {};

    return_object.txt_qtde = Number.parseInt(options?.quantidade || '1');

    switch (options?.tipo) {
      case 'PALAVRA':
      case 'PARAGRAFO':
        return_object.tipo = options.tipo;
        break;

      default:
        return_object.tipo = undefined;
        break;
    }

    console.log(options?.retorno == 'TEXTO' || 'HTML');

    switch (options?.retorno) {
      case 'TEXTO':
      case 'HTML':
        return_object.retorno = options.retorno.toLowerCase();
        break;

      default:
        return_object.retorno = undefined;
        break;
    }

    switch (options?.lorem) {
      case 'SIM':
      case 'NAO':
        return_object.lorem = options.lorem[0];
        break;

      default:
        return_object.lorem = undefined;
        break;
    }

    return return_object;
  }
}
